// Shared by contact.ts and enrollment-save.ts.
//
// Not a Netlify function: this directory has no `lib.ts` / `index.ts`, so the
// bundler treats it as ordinary imported code. Do not add one.
//
// The client sends { first, last } (see src/lib/attribution.ts). The flat
// columns get the FIRST touch — the question the school actually asks of this
// data is "where did this family come from", and for a 7-day consideration
// cycle the last touch is usually just them typing the URL again. The full
// object goes into `attribution` jsonb so last-touch is never lost.

type Touch = Record<string, unknown> | null | undefined;

export type AttributionPayload = { first?: Touch; last?: Touch } | null | undefined;

const str = (v: unknown, max = 500): string | null =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null;

/** Columns to merge into an insert. Safe on undefined/garbage input. */
export function attributionColumns(payload: AttributionPayload) {
  const first = (payload?.first ?? payload?.last ?? {}) as Record<string, unknown>;

  return {
    utm_source: str(first.utm_source, 200),
    utm_medium: str(first.utm_medium, 200),
    utm_campaign: str(first.utm_campaign, 200),
    referrer: str(first.referrer),
    landing_page: str(first.landing_page, 200),
    click_id: str(first.click_id, 200),
    click_id_type: str(first.click_id_type, 32),
    attribution: payload && (payload.first || payload.last) ? payload : null,
  };
}

/** One-line summary for the Telegram ping, so staff see the source immediately. */
export function attributionSummary(payload: AttributionPayload): string {
  const c = attributionColumns(payload);
  const source = c.utm_source || c.click_id_type || c.referrer || "direct";
  const parts = [source];
  if (c.utm_campaign) parts.push(c.utm_campaign);
  if (c.landing_page) parts.push(`landed ${c.landing_page}`);
  return parts.join(" · ");
}
