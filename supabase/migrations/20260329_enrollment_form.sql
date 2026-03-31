-- ============================================================
-- ENROLLMENT FORM MIGRATION
-- Run as a single transaction in Supabase SQL Editor
-- ============================================================

-- 1. enrollment_applications table
CREATE TABLE public.enrollment_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),

  -- Application tracking
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'submitted', 'under_review',
                       'interview_scheduled', 'accepted', 'waitlisted', 'rejected')),
  resume_token TEXT UNIQUE NOT NULL,
  reference_number TEXT,
  current_step INT DEFAULT 1,
  form_data JSONB DEFAULT '{}'::jsonb,

  -- Parent/Guardian 1
  parent1_name TEXT,
  parent1_email TEXT,
  parent1_phone TEXT,
  parent1_nationality TEXT,
  parent1_languages TEXT,
  parent1_occupation TEXT,

  -- Parent/Guardian 2 (optional)
  parent2_name TEXT,
  parent2_email TEXT,
  parent2_phone TEXT,
  parent2_nationality TEXT,
  parent2_languages TEXT,
  parent2_occupation TEXT,
  parent1_passport_url TEXT,
  parent2_passport_url TEXT,

  -- Family situation
  parents_together BOOLEAN DEFAULT true,
  parental_status TEXT,
  child_living_with TEXT,
  custody_arrangement TEXT,

  -- Guardian (conditional)
  has_guardian BOOLEAN DEFAULT false,
  guardian_name TEXT,
  guardian_occupation TEXT,
  guardian_phone TEXT,
  guardian_email TEXT,

  -- Emergency contact
  emergency_name TEXT,
  emergency_relationship TEXT,
  emergency_phone TEXT,

  -- Address
  address TEXT,
  not_yet_in_phuket BOOLEAN DEFAULT false,
  expected_arrival_date DATE,

  -- Discovery & motivation
  how_found_us TEXT[],
  why_joining TEXT,
  additional_info TEXT,

  -- Permissions
  photo_permission TEXT CHECK (photo_permission IN ('full', 'blurred_face', 'internal_only')),
  terms_acknowledged BOOLEAN DEFAULT false,
  all_statements_true BOOLEAN DEFAULT false,

  -- Anti-spam
  honeypot TEXT,
  form_loaded_at BIGINT,

  -- Tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer TEXT,
  locale TEXT DEFAULT 'en'
);

CREATE INDEX idx_enrollment_apps_resume ON enrollment_applications(resume_token);
CREATE INDEX idx_enrollment_apps_email ON enrollment_applications(parent1_email);
CREATE INDEX idx_enrollment_apps_status ON enrollment_applications(status);
CREATE INDEX idx_enrollment_apps_submitted ON enrollment_applications(submitted_at DESC);
CREATE INDEX idx_enrollment_apps_expires ON enrollment_applications(expires_at)
  WHERE status = 'draft';

ALTER TABLE enrollment_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON enrollment_applications
  FOR ALL USING (auth.role() = 'service_role');

-- 2. enrollment_children table
CREATE TABLE public.enrollment_children (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES enrollment_applications(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  child_order INT DEFAULT 1,

  -- Identity
  full_name TEXT DEFAULT '',
  preferred_name TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Girl', 'Boy', 'Prefer not to say')),
  nationality TEXT,
  program TEXT,
  previous_school TEXT,
  preferred_start_date DATE,
  intended_duration TEXT CHECK (intended_duration IN (
    'one_term', 'one_year', 'long_term', 'not_sure'
  )),

  -- Social/emotional
  favorite_activities TEXT,
  what_upsets_child TEXT,
  how_expresses_upset TEXT,

  -- Language
  home_languages TEXT,
  english_level TEXT CHECK (english_level IN (
    'none', 'beginner', 'conversational', 'fluent', 'native'
  )),

  -- Learning support (conditional)
  needs_learning_support BOOLEAN DEFAULT false,
  diagnosed_conditions TEXT[],
  diagnosis_description TEXT,
  physical_limitations TEXT[],
  physical_limitations_detail TEXT,
  support_received TEXT[],
  classroom_accommodations TEXT,
  has_behavioral_challenges BOOLEAN DEFAULT false,
  sees_therapist BOOLEAN DEFAULT false,
  behavioral_details TEXT,

  -- Health
  has_life_threatening BOOLEAN DEFAULT false,
  life_threatening_detail TEXT,
  has_allergies BOOLEAN DEFAULT false,
  allergy_detail TEXT,
  has_daily_medication BOOLEAN DEFAULT false,
  medication_detail TEXT,
  has_pe_restriction BOOLEAN DEFAULT false,
  pe_restriction_detail TEXT,
  has_insurance BOOLEAN DEFAULT false,
  insurance_company TEXT,
  policy_number TEXT,
  other_health_info TEXT,

  -- Documents
  passport_url TEXT,
  video_url TEXT,
  video_submitted_via TEXT CHECK (video_submitted_via IN ('upload', 'whatsapp')),

  UNIQUE(application_id, child_order)
);

CREATE INDEX idx_enrollment_children_app ON enrollment_children(application_id);

ALTER TABLE enrollment_children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_all" ON enrollment_children
  FOR ALL USING (auth.role() = 'service_role');

-- 3. Reference number sequence
CREATE SEQUENCE enrollment_ref_seq START 1;
ALTER TABLE enrollment_applications ADD CONSTRAINT unique_reference_number UNIQUE (reference_number);

-- 4. Storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('enrollment-documents', 'enrollment-documents', false, 104857600)
ON CONFLICT (id) DO NOTHING;

-- 5. Storage policies
CREATE POLICY "Allow signed uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'enrollment-documents');

CREATE POLICY "Service role manages enrollment docs" ON storage.objects
  FOR SELECT USING (bucket_id = 'enrollment-documents' AND auth.role() = 'service_role');

CREATE POLICY "Service role deletes enrollment docs" ON storage.objects
  FOR DELETE USING (bucket_id = 'enrollment-documents' AND auth.role() = 'service_role');

-- 6. Submit function
CREATE OR REPLACE FUNCTION submit_enrollment(p_token TEXT)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  v_app RECORD;
  v_form JSONB;
  v_family JSONB;
  v_children JSONB;
  v_child JSONB;
  v_permissions JSONB;
  v_discovery JSONB;
  v_ref TEXT;
  v_i INT;
BEGIN
  -- 1. Load and lock application
  SELECT * INTO v_app
  FROM enrollment_applications
  WHERE resume_token = p_token AND status = 'draft'
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Application not found or already submitted');
  END IF;

  IF v_app.expires_at < NOW() THEN
    RETURN jsonb_build_object('error', 'Application has expired');
  END IF;

  v_form := v_app.form_data;
  v_family := v_form->'family';
  v_children := v_form->'children';
  v_permissions := v_form->'permissions';
  v_discovery := v_form->'discovery';

  IF jsonb_array_length(v_children) < 1 THEN
    RETURN jsonb_build_object('error', 'At least one child required');
  END IF;

  -- 2. Generate reference number
  v_ref := 'BV-' || EXTRACT(YEAR FROM NOW())::TEXT || '-' || LPAD(nextval('enrollment_ref_seq')::TEXT, 4, '0');

  -- 3. Update application with typed columns
  UPDATE enrollment_applications SET
    status = 'submitted',
    submitted_at = NOW(),
    reference_number = v_ref,
    parent1_name = v_family->'parent1'->>'fullName',
    parent1_email = v_family->'parent1'->>'email',
    parent1_phone = v_family->'parent1'->>'phone',
    parent1_nationality = v_family->'parent1'->>'nationality',
    parent1_languages = v_family->'parent1'->>'languages',
    parent1_occupation = v_family->'parent1'->>'occupation',
    parent2_name = v_family->'parent2'->>'fullName',
    parent2_email = v_family->'parent2'->>'email',
    parent2_phone = v_family->'parent2'->>'phone',
    parent2_nationality = v_family->'parent2'->>'nationality',
    parent2_languages = v_family->'parent2'->>'languages',
    parent2_occupation = v_family->'parent2'->>'occupation',
    parent1_passport_url = v_family->>'parent1PassportUrl',
    parent2_passport_url = v_family->>'parent2PassportUrl',
    parents_together = COALESCE((v_family->>'parentsTogether')::BOOLEAN, true),
    parental_status = v_family->>'parentalStatus',
    child_living_with = v_family->>'childLivingWith',
    custody_arrangement = v_family->>'custodyArrangement',
    has_guardian = COALESCE((v_family->>'hasGuardian')::BOOLEAN, false),
    guardian_name = v_family->>'guardianName',
    guardian_occupation = v_family->>'guardianOccupation',
    guardian_phone = v_family->>'guardianPhone',
    guardian_email = v_family->>'guardianEmail',
    emergency_name = v_family->'emergencyContact'->>'fullName',
    emergency_relationship = v_family->'emergencyContact'->>'relationship',
    emergency_phone = v_family->'emergencyContact'->>'phone',
    address = v_family->>'address',
    not_yet_in_phuket = COALESCE((v_family->>'notYetInPhuket')::BOOLEAN, false),
    expected_arrival_date = (NULLIF(v_family->>'expectedArrivalDate', ''))::DATE,
    how_found_us = ARRAY(SELECT jsonb_array_elements_text(v_discovery->'howFoundUs')),
    why_joining = v_discovery->>'whyJoining',
    additional_info = v_discovery->>'additionalInfo',
    photo_permission = NULLIF(v_permissions->>'photoPermission', ''),
    terms_acknowledged = COALESCE((v_permissions->>'termsAcknowledged')::BOOLEAN, false),
    all_statements_true = COALESCE((v_permissions->>'allStatementsTrue')::BOOLEAN, false),
    form_data = NULL
  WHERE id = v_app.id;

  -- 4. Insert children rows
  FOR v_i IN 0..jsonb_array_length(v_children) - 1 LOOP
    v_child := v_children->v_i;

    INSERT INTO enrollment_children (
      application_id, child_order,
      full_name, preferred_name, date_of_birth, gender, nationality,
      program, previous_school, preferred_start_date, intended_duration,
      favorite_activities, what_upsets_child, how_expresses_upset,
      home_languages, english_level,
      needs_learning_support, diagnosed_conditions, diagnosis_description,
      physical_limitations, physical_limitations_detail,
      support_received, classroom_accommodations,
      has_behavioral_challenges, sees_therapist, behavioral_details,
      has_life_threatening, life_threatening_detail,
      has_allergies, allergy_detail,
      has_daily_medication, medication_detail,
      has_pe_restriction, pe_restriction_detail,
      has_insurance, insurance_company, policy_number,
      other_health_info,
      passport_url, video_url, video_submitted_via
    ) VALUES (
      v_app.id, v_i + 1,
      v_child->>'fullName', v_child->>'preferredName',
      (NULLIF(v_child->>'dateOfBirth', ''))::DATE, NULLIF(v_child->>'gender', ''), v_child->>'nationality',
      v_child->>'program', v_child->>'previousSchool',
      (NULLIF(v_child->>'preferredStartDate', ''))::DATE, NULLIF(v_child->>'intendedDuration', ''),
      v_child->>'favoriteActivities', v_child->>'whatUpsetsChild',
      v_child->>'howExpressesUpset',
      v_child->>'homeLanguages', NULLIF(v_child->>'englishLevel', ''),
      COALESCE((v_child->>'needsLearningSupport')::BOOLEAN, false),
      ARRAY(SELECT jsonb_array_elements_text(COALESCE(v_child->'diagnosedConditions', '[]'::jsonb))),
      v_child->>'diagnosisDescription',
      ARRAY(SELECT jsonb_array_elements_text(COALESCE(v_child->'physicalLimitations', '[]'::jsonb))),
      v_child->>'physicalLimitationsDetail',
      ARRAY(SELECT jsonb_array_elements_text(COALESCE(v_child->'supportReceived', '[]'::jsonb))),
      v_child->>'classroomAccommodations',
      COALESCE((v_child->>'hasBehavioralChallenges')::BOOLEAN, false),
      COALESCE((v_child->>'seesTherapist')::BOOLEAN, false),
      v_child->>'behavioralDetails',
      COALESCE((v_child->>'hasLifeThreatening')::BOOLEAN, false),
      v_child->>'lifeThreateningDetail',
      COALESCE((v_child->>'hasAllergies')::BOOLEAN, false),
      v_child->>'allergyDetail',
      COALESCE((v_child->>'hasDailyMedication')::BOOLEAN, false),
      v_child->>'medicationDetail',
      COALESCE((v_child->>'hasPeRestriction')::BOOLEAN, false),
      v_child->>'peRestrictionDetail',
      COALESCE((v_child->>'hasInsurance')::BOOLEAN, false),
      v_child->>'insuranceCompany', v_child->>'policyNumber',
      v_child->>'otherHealthInfo',
      v_child->>'passportUrl',
      v_child->>'videoUrl',
      NULLIF(v_child->>'videoSubmittedVia', '')
    );
  END LOOP;

  -- 5. Return success
  RETURN jsonb_build_object('referenceNumber', v_ref, 'status', 'submitted');

EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object('error', SQLERRM);
END;
$$;

-- 7. Optional: ghost draft cleanup (pg_cron)
-- Uncomment if pg_cron extension is enabled:
-- SELECT cron.schedule('cleanup-draft-enrollments', '0 3 * * *',
--   $$DELETE FROM enrollment_applications WHERE status = 'draft' AND expires_at < NOW()$$
-- );
