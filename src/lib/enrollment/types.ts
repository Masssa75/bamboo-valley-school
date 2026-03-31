// src/lib/enrollment/types.ts
import type { EnrollmentData, Child } from './schema';

// The form state shape = the Zod schema shape = the JSONB blob saved to Supabase
// Plus metadata fields used only in React state (not saved)
export interface EnrollmentFormState {
  family: {
    parent1: {
      fullName: string;
      email: string;
      phone: string;
      nationality: string;
      languages: string;
      occupation: string;
    };
    parent2?: {
      fullName?: string;
      email?: string;
      phone?: string;
      nationality?: string;
      languages?: string;
      occupation?: string;
    };
    emergencyContact: {
      fullName: string;
      relationship: string;
      phone: string;
    };
    parentsTogether: boolean;
    parentalStatus: string;
    childLivingWith: string;
    custodyArrangement: string;
    hasGuardian: boolean;
    guardianName: string;
    guardianOccupation: string;
    guardianPhone: string;
    guardianEmail: string;
    address: string;
    parent2Address: string;
    notYetInPhuket: boolean;
    expectedArrivalDate: string;
    parent1PassportUrl: string;
    parent2PassportUrl: string;
  };
  children: ChildFormState[];
  discovery: {
    howFoundUs: string[];
    whyJoining: string;
    additionalInfo: string;
  };
  permissions: {
    photoPermission: '' | 'full' | 'blurred_face' | 'internal_only';
    termsAcknowledged: boolean;
    allStatementsTrue: boolean;
  };
}

export interface ChildFormState {
  fullName: string;
  preferredName: string;
  dateOfBirth: string;
  gender: '' | 'Girl' | 'Boy' | 'Prefer not to say';
  nationality: string;
  program: string;
  previousSchool: string;
  preferredStartDate: string;
  intendedDuration: '' | 'one_term' | 'one_year' | 'long_term' | 'not_sure';
  favoriteActivities: string;
  whatUpsetsChild: string;
  howExpressesUpset: string;
  homeLanguages: string;
  englishLevel: '' | 'none' | 'beginner' | 'conversational' | 'fluent' | 'native';
  needsLearningSupport: boolean;
  diagnosedConditions: string[];
  diagnosisDescription: string;
  physicalLimitations: string[];
  physicalLimitationsDetail: string;
  supportReceived: string[];
  classroomAccommodations: string;
  hasBehavioralChallenges: boolean;
  seesTherapist: boolean;
  behavioralDetails: string;
  hasLifeThreatening: boolean;
  lifeThreateningDetail: string;
  hasAllergies: boolean;
  allergyDetail: string;
  hasDailyMedication: boolean;
  medicationDetail: string;
  hasPeRestriction: boolean;
  peRestrictionDetail: string;
  hasInsurance: boolean;
  insuranceCompany: string;
  policyNumber: string;
  otherHealthInfo: string;
  passportUrl: string;
  videoUrl: string;
  videoSubmittedVia: '' | 'upload' | 'whatsapp';
}

// Metadata tracked in React state but NOT saved to JSONB
export interface EnrollmentMeta {
  resumeToken: string | null;
  currentStep: number;
  activeChildIndex: number;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  submitStatus: 'idle' | 'submitting' | 'submitted' | 'error';
  referenceNumber: string | null;
  existingDraftFound: boolean;
  existingToken?: string | null;
}

export function createBlankChild(): ChildFormState {
  return {
    fullName: '',
    preferredName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    program: '',
    previousSchool: '',
    preferredStartDate: '',
    intendedDuration: '',
    favoriteActivities: '',
    whatUpsetsChild: '',
    howExpressesUpset: '',
    homeLanguages: '',
    englishLevel: '',
    needsLearningSupport: false,
    diagnosedConditions: [],
    diagnosisDescription: '',
    physicalLimitations: [],
    physicalLimitationsDetail: '',
    supportReceived: [],
    classroomAccommodations: '',
    hasBehavioralChallenges: false,
    seesTherapist: false,
    behavioralDetails: '',
    hasLifeThreatening: false,
    lifeThreateningDetail: '',
    hasAllergies: false,
    allergyDetail: '',
    hasDailyMedication: false,
    medicationDetail: '',
    hasPeRestriction: false,
    peRestrictionDetail: '',
    hasInsurance: false,
    insuranceCompany: '',
    policyNumber: '',
    otherHealthInfo: '',
    passportUrl: '',
    videoUrl: '',
    videoSubmittedVia: '',
  };
}

export function createInitialFormState(): EnrollmentFormState {
  return {
    family: {
      parent1: { fullName: '', email: '', phone: '', nationality: '', languages: '', occupation: '' },
      parent2: { fullName: '', email: '', phone: '', nationality: '', languages: '', occupation: '' },
      emergencyContact: { fullName: '', relationship: '', phone: '' },
      parentsTogether: true,
      parentalStatus: '',
      childLivingWith: '',
      custodyArrangement: '',
      hasGuardian: false,
      guardianName: '',
      guardianOccupation: '',
      guardianPhone: '',
      guardianEmail: '',
      address: '',
      parent2Address: '',
      notYetInPhuket: false,
      expectedArrivalDate: '',
      parent1PassportUrl: '',
      parent2PassportUrl: '',
    },
    children: [createBlankChild()],
    discovery: {
      howFoundUs: [],
      whyJoining: '',
      additionalInfo: '',
    },
    permissions: {
      photoPermission: '',
      termsAcknowledged: false,
      allStatementsTrue: false,
    },
  };
}

/**
 * Transform form state for Zod validation.
 *
 * The form uses empty strings ('') as defaults for unselected fields,
 * but Zod expects `undefined` for absent optional fields and rejects ''
 * for enum values. This bridges that gap without mutating React state.
 */
export function prepareForValidation(data: EnrollmentFormState): Record<string, unknown> {
  // Shallow-clone each section so we never mutate React state
  const family: Record<string, unknown> = {
    ...data.family,
    parent1: { ...data.family.parent1 },
    emergencyContact: { ...data.family.emergencyContact },
  };

  // parent2: form always sends { fullName:'', email:'', ... } even when untouched.
  // Zod's parentSchema.partial().optional() needs undefined, not empty strings.
  const p2 = data.family.parent2;
  if (p2) {
    const hasAnyData = Object.values(p2).some(
      (v) => typeof v === 'string' && v.trim().length > 0
    );
    if (!hasAnyData) {
      family.parent2 = undefined;
    } else {
      // Keep filled fields, convert empties to undefined so .partial() accepts them
      const cleaned: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(p2)) {
        cleaned[k] = typeof v === 'string' && !v.trim() ? undefined : v;
      }
      family.parent2 = cleaned;
    }
  }

  // Children: convert '' to undefined for optional enum fields
  const children = data.children.map((c) => {
    const clone: Record<string, unknown> = { ...c };
    if (c.intendedDuration === '') clone.intendedDuration = undefined;
    if (c.videoSubmittedVia === '') clone.videoSubmittedVia = undefined;
    return clone;
  });

  return {
    family,
    children,
    discovery: { ...data.discovery },
    permissions: { ...data.permissions },
  };
}
