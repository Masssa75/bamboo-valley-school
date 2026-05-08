-- Teacher Application Form — Supabase migration
-- Date: 2026-05-08
-- Spec: Operations/primary-teacher-hiring/working-docs/teacher-application-form/spec.md
--
-- Apply via: Supabase dashboard → SQL Editor → paste this file → Run
-- Project: xunccqdrybxpwcvafvag (bamboovalleyphuket.com / phuketcamp Supabase project)

-- ============================================================
-- 1. Application table
-- ============================================================
-- Note: Schema prefix `public.` is explicit to match the project convention
-- in 20260329_enrollment_form.sql (CREATE TABLE public.enrollment_applications).
-- This is technically optional since `public` is on the default search_path
-- in Supabase, but explicit is safer if the migration is ever applied with
-- a non-default search_path.

CREATE TABLE IF NOT EXISTS public.teacher_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  location text,
  citizenship text,
  visa_status text,
  cv_path text,                  -- Storage path inside teacher-application-documents bucket (not URL)
  cover_letter text,
  q1_child_came_alive text,      -- "A child you watched come alive"
  q2_first_month_setup text,     -- "What you'd start setting up in your first month"
  q3_getting_along text,         -- "Getting along, and moving through conflict"
  reviewed boolean NOT NULL DEFAULT false,
  reviewer_notes text
);

-- Index on created_at for chronological listing in admin tools later
CREATE INDEX IF NOT EXISTS teacher_applications_created_at_idx
  ON public.teacher_applications (created_at DESC);

-- Index on reviewed flag for filtering unreviewed applications
CREATE INDEX IF NOT EXISTS teacher_applications_reviewed_idx
  ON public.teacher_applications (reviewed)
  WHERE reviewed = false;

-- ============================================================
-- 2. RLS — service-role-only access
-- ============================================================
-- The Netlify function uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS by design.
-- We enable RLS with no policies so that anon/authenticated clients have zero access.
-- This is the same pattern used by other admin-only tables in this project.

ALTER TABLE public.teacher_applications ENABLE ROW LEVEL SECURITY;

-- No policies are created → anon and authenticated roles get no access.
-- Service role bypasses RLS automatically.

-- ============================================================
-- 3. Storage bucket — private, CV documents
-- ============================================================
-- Bucket is private (public = false). Reads happen via service role only;
-- writes happen via signed upload URLs minted by the Netlify function.
-- file_size_limit is enforced by the storage gateway (10 MB = 10485760 bytes).

INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('teacher-application-documents', 'teacher-application-documents', false, 10485760)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 4. Storage policies — REQUIRED for signed-upload PUT to succeed
-- ============================================================
-- Supabase Storage runs RLS on storage.objects. The signed-upload PUT is
-- authenticated as the anon role (the apikey/Authorization header on the
-- client-side PUT is the anon JWT), and without an INSERT policy the PUT
-- fails with "new row violates row-level security policy".
-- This mirrors the policy used for the existing enrollment-documents bucket.

-- DROP IF EXISTS makes this migration re-runnable.
DROP POLICY IF EXISTS "Allow signed uploads to teacher-application-documents" ON storage.objects;
DROP POLICY IF EXISTS "Service role reads teacher-application-documents" ON storage.objects;
DROP POLICY IF EXISTS "Service role deletes teacher-application-documents" ON storage.objects;

CREATE POLICY "Allow signed uploads to teacher-application-documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'teacher-application-documents');

CREATE POLICY "Service role reads teacher-application-documents"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'teacher-application-documents' AND auth.role() = 'service_role');

CREATE POLICY "Service role deletes teacher-application-documents"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'teacher-application-documents' AND auth.role() = 'service_role');

-- ============================================================
-- 5. Verification queries (run AFTER applying the above)
-- ============================================================
-- Expected results documented next to each query.

-- Confirm table exists with the expected columns:
--   SELECT column_name, data_type, is_nullable
--   FROM information_schema.columns
--   WHERE table_schema = 'public' AND table_name = 'teacher_applications'
--   ORDER BY ordinal_position;
-- Expected: 14 rows (id, created_at, name, email, location, citizenship,
--                    visa_status, cv_path, cover_letter, q1_child_came_alive,
--                    q2_first_month_setup, q3_getting_along, reviewed, reviewer_notes)

-- Confirm RLS is enabled:
--   SELECT relname, relrowsecurity
--   FROM pg_class
--   WHERE relname = 'teacher_applications' AND relnamespace = 'public'::regnamespace;
-- Expected: relrowsecurity = true

-- Confirm bucket exists and is private:
--   SELECT id, name, public, file_size_limit FROM storage.buckets WHERE id = 'teacher-application-documents';
-- Expected: 1 row, public = false, file_size_limit = 10485760

-- Confirm there is no policy granting anon/authenticated access on the table:
--   SELECT polname FROM pg_policy
--   WHERE polrelid = 'public.teacher_applications'::regclass;
-- Expected: 0 rows

-- Confirm storage policies exist (one INSERT, one SELECT, one DELETE for the bucket):
--   SELECT polname FROM pg_policy
--   WHERE polrelid = 'storage.objects'::regclass
--   AND polname LIKE '%teacher-application-documents%';
-- Expected: 3 rows
