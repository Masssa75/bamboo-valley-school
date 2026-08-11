// Ad + campaign attribution capture.
//
// The site is a static export, so there is no server to read the query string —
// this all runs client-side and rides along on the form POSTs.
//
// Two touches are kept, because this school's consideration cycle is long:
// BV-2026-0047 clicked in from Naver on 4 Aug and submitted the enrolment on
// 11 Aug. A session-scoped capture would have recorded that enrolment as
// "direct" and Naver would have looked worthless.
//
//   first touch  → localStorage, 90 days. "Where did this family come from."
//   last touch   → sessionStorage.        "What brought them back this time."
//
// ponytail: two web-storage keys, no cookie banner, no vendor SDK. If we ever
// need cross-device stitching, that's a server-side job with a user id, not a
// bigger version of this.

const FIRST_KEY = "bv_attr_first";
const LAST_KEY = "bv_attr_last";
const FIRST_TTL_MS = 90 * 24 * 60 * 60 * 1000;

// Ad platform click ids, in the order we prefer them if somehow several appear.
const CLICK_IDS = ["fbclid", "gclid", "ttclid", "msclkid", "li_fat_id", "twclid"] as const;

export type Touch = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  click_id: string | null;
  click_id_type: string | null;
  referrer: string | null;
  landing_page: string | null;
  captured_at: string;
};

export type Attribution = { first: Touch | null; last: Touch | null };

function read(store: Storage, key: string): (Touch & { _t?: number }) | null {
  try {
    const raw = store.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null; // private mode, quota, corrupt value — never break the form over analytics
  }
}

function write(store: Storage, key: string, value: unknown) {
  try {
    store.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

function isInternal(referrer: string): boolean {
  if (!referrer) return true;
  try {
    return new URL(referrer).hostname.replace(/^www\./, "") ===
      window.location.hostname.replace(/^www\./, "");
  } catch {
    return true;
  }
}

/** Build a Touch from the current URL + referrer, or null if there is nothing to record. */
function currentTouch(): Touch | null {
  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k)?.slice(0, 200) || null;

  const clickIdType = CLICK_IDS.find((k) => params.get(k)) ?? null;
  const referrer = isInternal(document.referrer) ? null : document.referrer.slice(0, 500);

  const touch: Touch = {
    utm_source: get("utm_source"),
    utm_medium: get("utm_medium"),
    utm_campaign: get("utm_campaign"),
    utm_content: get("utm_content"),
    utm_term: get("utm_term"),
    click_id: clickIdType ? get(clickIdType) : null,
    click_id_type: clickIdType,
    referrer,
    landing_page: window.location.pathname,
    captured_at: new Date().toISOString(),
  };

  // Nothing external happened — internal navigation, or a bookmark/typed visit
  // that we've already recorded once this session.
  const hasSignal = touch.utm_source || touch.click_id || touch.referrer;
  return hasSignal ? touch : null;
}

/**
 * Record the current visit. Safe to call on every page — it only writes when
 * the visit actually carries a new source, so internal clicks never overwrite
 * the campaign that brought someone in.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  const touch = currentTouch();
  const existingLast = read(sessionStorage, LAST_KEY);

  if (touch) {
    write(sessionStorage, LAST_KEY, touch);
  } else if (!existingLast) {
    // Direct visit, first page of the session. Worth recording as "direct"
    // rather than leaving a hole we can't tell apart from a tracking failure.
    write(sessionStorage, LAST_KEY, {
      utm_source: null, utm_medium: null, utm_campaign: null,
      utm_content: null, utm_term: null, click_id: null, click_id_type: null,
      referrer: null, landing_page: window.location.pathname,
      captured_at: new Date().toISOString(),
    } satisfies Touch);
  }

  const first = read(localStorage, FIRST_KEY);
  const expired = first?._t ? Date.now() - first._t > FIRST_TTL_MS : true;
  if (!first || expired) {
    const seed = touch ?? read(sessionStorage, LAST_KEY);
    if (seed) write(localStorage, FIRST_KEY, { ...seed, _t: Date.now() });
  }
}

/** Whatever we know, for attaching to a form submission. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return { first: null, last: null };
  const first = read(localStorage, FIRST_KEY);
  if (first) delete first._t;
  return { first: first as Touch | null, last: read(sessionStorage, LAST_KEY) };
}
