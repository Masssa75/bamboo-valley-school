// Meta pixel — dataset 28260931780209192 ("Bamboo Valley Website").
//
// Why the event map looks like this:
//
// Meta needs roughly 50 conversions per ad set per week to leave the learning
// phase. Bamboo Valley produces ~12 enquiries and ~4 enrolments a MONTH. An ad
// set optimised for Lead or CompleteRegistration will therefore never learn —
// it isn't a tuning problem, there is no amount of budget that fixes it.
//
// So the deep events exist for measurement and as the lookalike seed, and
// `QualifiedVisit` exists to be optimised against: 60 seconds AND half the page,
// which is a bar accidental and bot clicks don't clear but a real interested
// parent does. That's the event with enough volume to actually train on.
//
// ponytail: no tag manager, no consent SDK. Thailand has no GDPR-equivalent
// requiring prior consent. If we ever advertise into the EU, that changes and
// this needs a consent gate before init — not a bigger event map.

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type FbqParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Correlates the browser event with its Conversions API twin so Meta counts it once. */
export function newEventId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function metaTrack(event: string, params?: FbqParams, eventId?: string): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
}

/** Events Meta has no standard name for. Same dedupe rules apply. */
export function metaTrackCustom(event: string, params?: FbqParams, eventId?: string): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
}

// Pages where sustained attention means something. Everything else is a visit.
const KEY_PAGE_PATTERNS = [
  "/programs",
  "/short-term-school-phuket",
  "/kindergarten",
  "/expat-school-phuket-enroll",
  "/enroll",
  "/contact",
  "/fees",
];

export function isKeyPage(pathname: string): boolean {
  return KEY_PAGE_PATTERNS.some((p) => pathname.includes(p));
}
