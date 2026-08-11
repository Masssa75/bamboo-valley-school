-- Ad / campaign attribution on the two conversion tables.
--
-- enrollment_applications already had utm_source, utm_medium, utm_campaign and
-- referrer. They have been NULL on every row since the table was created because
-- nothing in the app ever wrote them. This adds the missing click-id columns and
-- wires the whole set up (see src/lib/attribution.ts).
--
-- Flat columns hold the FIRST touch; `attribution` jsonb holds {first,last}.

alter table public.school_enquiries
  add column if not exists utm_source    text,
  add column if not exists utm_medium    text,
  add column if not exists utm_campaign  text,
  add column if not exists referrer      text,
  add column if not exists landing_page  text,
  add column if not exists click_id      text,
  add column if not exists click_id_type text,
  add column if not exists attribution   jsonb;

alter table public.enrollment_applications
  add column if not exists landing_page  text,
  add column if not exists click_id      text,
  add column if not exists click_id_type text,
  add column if not exists attribution   jsonb;

create index if not exists school_enquiries_utm_source_idx
  on public.school_enquiries (utm_source, created_at desc);
create index if not exists enrollment_applications_utm_source_idx
  on public.enrollment_applications (utm_source, created_at desc);
