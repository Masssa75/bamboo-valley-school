// Meta Conversions API — the server-side twin of the browser pixel.
//
// This is where signal quality comes from, not the pixel. The browser event is
// lost to ad blockers and ITP; this one is not, and it carries hashed email and
// phone, which is what actually drives Event Match Quality. Both carry the same
// event_id so Meta counts one conversion, not two.
//
// It can also attribute when the pixel never ran at all: if _fbc is missing we
// rebuild it from the fbclid that src/lib/attribution.ts captured off the URL.
//
// Not a Netlify function — this directory has no lib.ts / index.ts.

import { createHash } from "node:crypto";

const PIXEL_ID = process.env.META_PIXEL_ID;
const TOKEN = process.env.META_ADS_TOKEN;
const GRAPH = "https://graph.facebook.com/v25.0";

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

const hashEmail = (email?: string | null) =>
  email?.includes("@") ? sha256(email.trim().toLowerCase()) : undefined;

// Meta wants digits only, including country code. A leading 0 on a 9-10 digit
// number is a domestic Thai format, so it gets +66. Anything already carrying a
// country code passes through.
// ponytail: heuristic, not a phone library. It only affects match quality, never
// correctness — a mis-normalised number simply fails to match.
function hashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.startsWith("0") && digits.length >= 9 && digits.length <= 10) {
    digits = `66${digits.slice(1)}`;
  }
  return sha256(digits);
}

function cookie(header: string | undefined, name: string): string | undefined {
  return header?.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))?.[1];
}

type Attribution = { first?: Record<string, unknown>; last?: Record<string, unknown> } | null | undefined;

/** Rebuild Meta's click cookie from a captured fbclid when the pixel didn't set one. */
function deriveFbc(cookieHeader: string | undefined, attribution: Attribution): string | undefined {
  const existing = cookie(cookieHeader, "_fbc");
  if (existing) return existing;

  const touch = (attribution?.last ?? attribution?.first) as Record<string, unknown> | undefined;
  if (touch?.click_id_type !== "fbclid" || typeof touch.click_id !== "string") return undefined;

  const clickedAt = typeof touch.captured_at === "string" ? Date.parse(touch.captured_at) : NaN;
  return `fb.1.${Number.isFinite(clickedAt) ? clickedAt : Date.now()}.${touch.click_id}`;
}

export type CapiEvent = {
  eventName: "Lead" | "CompleteRegistration" | "InitiateCheckout";
  eventId: string;
  email?: string | null;
  phone?: string | null;
  sourceUrl?: string;
  headers: Record<string, string | undefined>;
  attribution?: Attribution;
  customData?: Record<string, string | number>;
};

/**
 * Fire and await. Netlify tears the container down as soon as the handler
 * returns, so an un-awaited fetch here is silently dropped — do not "optimise"
 * this into a background call.
 *
 * Never throws: a conversion that reached the database must not fail because
 * an ad platform was unreachable.
 */
export async function sendCapiEvent(e: CapiEvent): Promise<void> {
  if (!PIXEL_ID || !TOKEN) return;

  const h = e.headers ?? {};
  const lower = Object.fromEntries(Object.entries(h).map(([k, v]) => [k.toLowerCase(), v]));

  const userData: Record<string, string> = {};
  const em = hashEmail(e.email);
  const ph = hashPhone(e.phone);
  if (em) userData.em = em;
  if (ph) userData.ph = ph;

  const ip = lower["x-nf-client-connection-ip"] || lower["x-forwarded-for"]?.split(",")[0]?.trim();
  if (ip) userData.client_ip_address = ip;
  if (lower["user-agent"]) userData.client_user_agent = lower["user-agent"]!;

  const fbp = cookie(lower["cookie"], "_fbp");
  if (fbp) userData.fbp = fbp;
  const fbc = deriveFbc(lower["cookie"], e.attribution);
  if (fbc) userData.fbc = fbc;

  // No identifiers at all means Meta cannot attribute it and will reject the
  // event. Sending it anyway just degrades the dataset's quality score.
  if (Object.keys(userData).length === 0) return;

  try {
    const res = await fetch(`${GRAPH}/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: TOKEN,
        data: [
          {
            event_name: e.eventName,
            event_time: Math.floor(Date.now() / 1000),
            event_id: e.eventId,
            action_source: "website",
            event_source_url: e.sourceUrl,
            user_data: userData,
            custom_data: e.customData,
          },
        ],
      }),
    });
    if (!res.ok) console.error("CAPI rejected:", res.status, (await res.text()).slice(0, 400));
  } catch (err) {
    console.error("CAPI send failed:", err);
  }
}
