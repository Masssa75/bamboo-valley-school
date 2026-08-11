// Run: node scripts/test-attribution.ts
//
// Guards the two rules that make this data trustworthy:
//   1. internal navigation must never overwrite the campaign that brought
//      someone in (otherwise every conversion reads as "direct")
//   2. the flat DB columns must carry the FIRST touch, not the last
//      (BV-2026-0047: Naver on 4 Aug, enrolment on 11 Aug)

import assert from "node:assert/strict";
import { createHash } from "node:crypto";

// --- minimal browser shim -------------------------------------------------
class MemStorage {
  private m = new Map<string, string>();
  getItem(k: string) { return this.m.get(k) ?? null; }
  setItem(k: string, v: string) { this.m.set(k, v); }
  removeItem(k: string) { this.m.delete(k); }
  clear() { this.m.clear(); }
  key() { return null; }
  get length() { return this.m.size; }
}

const g = globalThis as Record<string, unknown>;
const local = new MemStorage();
let session = new MemStorage();

function visit(url: string, referrer = "") {
  const u = new URL(url);
  g.window = { location: { search: u.search, pathname: u.pathname, hostname: u.hostname } };
  g.document = { referrer };
  g.localStorage = local;
  g.sessionStorage = session;
}
function newSession() { session = new MemStorage(); g.sessionStorage = session; }

visit("https://bamboovalleyphuket.com/en");
const { captureAttribution, getAttribution } = await import("../src/lib/attribution.ts");
const { attributionColumns, attributionSummary } = await import("../netlify/functions/lib/attribution.ts");

// --- 1. a paid click is captured, click id and all ------------------------
visit("https://bamboovalleyphuket.com/en?utm_source=facebook&utm_medium=paid&utm_campaign=kg-aug&fbclid=ABC123",
      "https://l.facebook.com/");
captureAttribution();
{
  const { first, last } = getAttribution();
  assert.equal(first?.utm_source, "facebook");
  assert.equal(first?.click_id, "ABC123");
  assert.equal(first?.click_id_type, "fbclid");
  assert.equal(first?.landing_page, "/en");
  assert.equal(last?.utm_campaign, "kg-aug");
}

// --- 2. internal navigation must not clobber it ---------------------------
visit("https://bamboovalleyphuket.com/en/enroll", "https://bamboovalleyphuket.com/en");
captureAttribution();
{
  const { first, last } = getAttribution();
  assert.equal(first?.utm_source, "facebook", "first touch survived internal nav");
  assert.equal(last?.utm_source, "facebook", "last touch survived internal nav");
  assert.equal(last?.landing_page, "/en", "landing page is where they entered, not where they are");
}

// www vs non-www is the same site — the 301 makes this a real case here.
visit("https://bamboovalleyphuket.com/en/contact", "https://www.bamboovalleyphuket.com/en");
captureAttribution();
assert.equal(getAttribution().last?.utm_source, "facebook", "www→non-www counts as internal");

// --- 3. a later organic session keeps first touch, updates last ----------
newSession();
visit("https://bamboovalleyphuket.com/en/short-term-school-phuket", "https://search.naver.com/");
captureAttribution();
{
  const { first, last } = getAttribution();
  assert.equal(first?.utm_source, "facebook", "first touch is sticky across sessions");
  assert.equal(first?.referrer, "https://l.facebook.com/");
  assert.equal(last?.referrer, "https://search.naver.com/", "last touch moved");
  assert.equal(last?.landing_page, "/en/short-term-school-phuket");
}

// --- 4. flat columns take the first touch --------------------------------
{
  const cols = attributionColumns(getAttribution());
  assert.equal(cols.utm_source, "facebook", "DB column = acquisition source, not the return visit");
  assert.equal(cols.click_id_type, "fbclid");
  assert.equal((cols.attribution as { last: { referrer: string } }).last.referrer,
    "https://search.naver.com/", "last touch is still recoverable from jsonb");
}

// --- 5. a pure direct visit records as direct, not as a hole -------------
local.clear(); newSession();
visit("https://bamboovalleyphuket.com/en");
captureAttribution();
{
  const { first, last } = getAttribution();
  assert.equal(last?.landing_page, "/en");
  assert.equal(last?.utm_source, null);
  assert.equal(first?.landing_page, "/en", "direct still seeds a first touch");
  assert.equal(attributionSummary({ first, last }), "direct · landed /en");
}

// --- 6. junk in must not throw on the way to the database ---------------
for (const junk of [null, undefined, {}, { first: null, last: null }, { first: "nope" }]) {
  const cols = attributionColumns(junk as never);
  assert.equal(cols.utm_source, null);
}

console.log("attribution: 6/6 ok");

// --- 7. Conversions API payload -----------------------------------------
// The parts that fail silently: a wrong hash or a missing fbc doesn't error,
// it just quietly produces a dataset Meta can't match anything against.

process.env.META_PIXEL_ID = "TESTPIXEL";
process.env.META_ADS_TOKEN = "TESTTOKEN";
const { sendCapiEvent } = await import("../netlify/functions/lib/capi.ts");

let sent: { url: string; body: Record<string, never> } | null = null;
g.fetch = async (url: string, init: { body: string }) => {
  sent = { url, body: JSON.parse(init.body) };
  return { ok: true, status: 200, text: async () => "" };
};

const capiHeaders = {
  "User-Agent": "Mozilla/5.0 test",
  "X-Nf-Client-Connection-Ip": "203.0.113.9",
  cookie: "_fbp=fb.1.1700000000.1234567890; other=x",
};

// fbclid captured off the URL, but the pixel never set _fbc (ad blocker).
// We must rebuild it, or this conversion is unattributable.
await sendCapiEvent({
  eventName: "Lead",
  eventId: "evt-1",
  email: " Parent@Example.COM ",
  phone: "089 812 4218",
  headers: capiHeaders,
  attribution: { last: { click_id: "ABC123", click_id_type: "fbclid", captured_at: "2026-08-11T00:00:00.000Z" } },
});
{
  const ev = (sent as never as { body: { data: { user_data: Record<string, string>; event_id: string } [] } }).body.data[0];
  const sha = (v: string) => createHash("sha256").update(v).digest("hex");
  assert.equal(ev.event_id, "evt-1", "event_id must match the browser event or Meta double-counts");
  assert.equal(ev.user_data.em, sha("parent@example.com"), "email lowercased and trimmed before hashing");
  assert.equal(ev.user_data.ph, sha("66898124218"), "leading 0 becomes +66");
  assert.equal(ev.user_data.fbc, `fb.1.${Date.parse("2026-08-11T00:00:00.000Z")}.ABC123`,
    "fbc rebuilt from the captured fbclid, stamped at click time");
  assert.equal(ev.user_data.fbp, "fb.1.1700000000.1234567890");
  assert.equal(ev.user_data.client_ip_address, "203.0.113.9");
  assert.match(ev.user_data.em, /^[a-f0-9]{64}$/, "hashed, never raw PII on the wire");
}

// A real _fbc cookie wins over the reconstructed one.
sent = null;
await sendCapiEvent({
  eventName: "Lead", eventId: "evt-2", email: "a@b.com",
  headers: { ...capiHeaders, cookie: "_fbc=fb.1.999.REAL; _fbp=fb.1.1.2" },
  attribution: { last: { click_id: "ABC123", click_id_type: "fbclid" } },
});
assert.equal((sent as never as { body: { data: { user_data: { fbc: string } }[] } }).body.data[0].user_data.fbc, "fb.1.999.REAL");

// No email, no phone, no cookies, no IP → nothing Meta can match. Sending it
// only drags the dataset's quality score down, so we don't.
sent = null;
await sendCapiEvent({ eventName: "Lead", eventId: "evt-3", headers: {} });
assert.equal(sent, null, "unmatched events are dropped, not sent");

console.log("capi: 3/3 ok");
