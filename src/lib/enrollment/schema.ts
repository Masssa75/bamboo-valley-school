// src/lib/enrollment/schema.ts
import { z } from 'zod';

// === Parent schema ===
export const parentSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(5, 'Phone number required'),
  nationality: z.string().optional(),
  languages: z.string().optional(),
  occupation: z.string().optional(),
});

// Parent 2: all fields optional, but if fullName is provided, phone is required
export const parent2Schema = parentSchema.partial().optional().refine(
  (data) => !data?.fullName || (data.fullName && data.phone),
  { message: 'Phone is required if parent name is provided' }
);

// === Emergency contact ===
export const emergencyContactSchema = z.object({
  fullName: z.string().min(1, 'Emergency contact name required'),
  relationship: z.string().min(1, 'Relationship required'),
  phone: z.string().min(5, 'Phone required'),
});

// === Child schema (all 39 fields explicitly listed) ===
export const childSchema = z.object({
  // Identity (Step 2)
  fullName: z.string().min(1, 'Child name is required'),
  preferredName: z.string().optional(),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Girl', 'Boy']),
  nationality: z.string().min(1, 'Nationality is required'),
  program: z.string().min(1, 'Program is required'),
  previousSchool: z.string().optional(),
  preferredStartDate: z.string().optional(),
  intendedDuration: z.enum(['short_term', 'one_term', 'one_year', 'long_term', 'not_sure']).optional(),

  // Social/emotional (Step 3)
  favoriteActivities: z.string().min(1, 'Required'),
  whatUpsetsChild: z.string().min(1, 'Required'),
  howExpressesUpset: z.string().min(1, 'Required'),

  // Language (Step 4)
  homeLanguages: z.string().min(1, 'Required'),
  englishLevel: z.enum(['none', 'beginner', 'conversational', 'fluent', 'native']),

  // Learning support (Step 4, conditional)
  needsLearningSupport: z.boolean(),
  diagnosedConditions: z.array(z.string()).optional(),
  diagnosisDescription: z.string().optional(),
  physicalLimitations: z.array(z.string()).optional(),
  physicalLimitationsDetail: z.string().optional(),
  supportReceived: z.array(z.string()).optional(),
  classroomAccommodations: z.string().optional(),
  hasBehavioralChallenges: z.boolean(),
  seesTherapist: z.boolean().optional(),
  behavioralDetails: z.string().optional(),

  // Health (Step 4)
  hasLifeThreatening: z.boolean(),
  lifeThreateningDetail: z.string().optional(),
  hasAllergies: z.boolean(),
  allergyDetail: z.string().optional(),
  hasDailyMedication: z.boolean(),
  medicationDetail: z.string().optional(),
  hasPeRestriction: z.boolean(),
  peRestrictionDetail: z.string().optional(),
  hasInsurance: z.boolean(),
  insuranceCompany: z.string().optional(),
  policyNumber: z.string().optional(),
  otherHealthInfo: z.string().optional(),

  // Documents (Step 2 + Step 5)
  passportUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  videoSubmittedVia: z.enum(['upload', 'whatsapp']).optional(),
});

// === Family schema ===
export const familySchema = z.object({
  parent1: parentSchema,
  parent2: parent2Schema,
  emergencyContact: emergencyContactSchema,
  parentsTogether: z.boolean(),
  parentalStatus: z.string().optional(),
  childLivingWith: z.string().optional(),
  custodyArrangement: z.string().optional(),
  hasGuardian: z.boolean().optional(),
  guardianName: z.string().optional(),
  guardianOccupation: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianEmail: z.string().optional(),
  address: z.string().optional(),
  parent2Address: z.string().optional(),
  notYetInPhuket: z.boolean().optional(),
  expectedArrivalDate: z.string().optional(),
  parent1PassportUrl: z.string().optional(),
  parent2PassportUrl: z.string().optional(),
});

// === Discovery schema ===
export const discoverySchema = z.object({
  howFoundUs: z.array(z.string()).min(1, 'Please tell us how you found us'),
  whyJoining: z.string().min(1, 'Please tell us why you want to join'),
  additionalInfo: z.string().optional(),
});

// === Permissions schema ===
export const permissionsSchema = z.object({
  photoPermission: z.enum(['full', 'blurred_face', 'internal_only']),
  termsAcknowledged: z.literal(true, { error: 'Required' }),
  allStatementsTrue: z.literal(true, { error: 'Required' }),
});

// === Complete enrollment schema (used for final submit validation) ===
export const enrollmentSchema = z.object({
  family: familySchema,
  children: z.array(childSchema).min(1, 'At least one child required'),
  discovery: discoverySchema,
  permissions: permissionsSchema,
});

// For draft saves (partial data is OK) — Zod 4 uses .partial() (no deepPartial)
// Draft validation is lenient — we just save whatever state exists
export const draftSchema = enrollmentSchema.partial();

// Inferred types
export type Parent = z.infer<typeof parentSchema>;
export type Child = z.infer<typeof childSchema>;
export type Family = z.infer<typeof familySchema>;
export type Discovery = z.infer<typeof discoverySchema>;
export type Permissions = z.infer<typeof permissionsSchema>;
export type EnrollmentData = z.infer<typeof enrollmentSchema>;
