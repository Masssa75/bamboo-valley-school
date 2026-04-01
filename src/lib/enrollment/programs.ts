// src/lib/enrollment/programs.ts

export interface ProgramDef {
  value: string;
  label: string;
  ageMin: number; // in months
  ageMax: number; // in months
}

export const PROGRAMS: ProgramDef[] = [
  { value: 'parent_toddler', label: 'Parent & Toddler', ageMin: 12, ageMax: 36 },
  { value: 'nursery_half_day', label: 'Nursery Half Day (9am-12pm)', ageMin: 18, ageMax: 36 },
  { value: 'nursery_full_day', label: 'Nursery Full Day (9am-3pm)', ageMin: 18, ageMax: 36 },
  { value: 'kindergarten', label: 'Kindergarten', ageMin: 36, ageMax: 72 },
  { value: 'primary', label: 'Primary', ageMin: 72, ageMax: 108 },
];

// Given a date of birth string (YYYY-MM-DD), return age in months
export function getAgeInMonths(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
}

// Suggest a program based on age
export function suggestProgram(dob: string): string | null {
  const months = getAgeInMonths(dob);
  if (months === null) return null;

  // Find best match (prefer more specific: nursery_full_day over parent_toddler)
  // Priority order: primary > kindergarten > nursery_full_day > nursery_half_day > parent_toddler
  const prioritized = [...PROGRAMS].reverse();
  for (const p of prioritized) {
    if (months >= p.ageMin && months < p.ageMax) {
      return p.value;
    }
  }
  return null;
}

// Get age display string from DOB
export function getAgeDisplay(dob: string): string {
  const months = getAgeInMonths(dob);
  if (months === null) return '';
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
  return `${years}y ${remainingMonths}m`;
}

// "How did you find us?" options
export const HOW_FOUND_US_OPTIONS = [
  'google_search',
  'instagram',
  'facebook',
  'friend_referral',
  'school_visit',
  'event',
  'tripadvisor',
  'directory',
  'other',
] as const;

// Diagnosed conditions checklist options
export const DIAGNOSED_CONDITIONS = [
  'ADHD',
  'ASD (Autism Spectrum)',
  'Dyslexia',
  'Dyscalculia',
  'Dysgraphia',
  'Speech/Language Delay',
  'Sensory Processing',
  'Intellectual Disability',
  'Giftedness',
  'Other',
] as const;

// Physical limitations checklist options
export const PHYSICAL_LIMITATIONS = [
  'Vision',
  'Hearing',
  'Mobility',
  'Other',
  'None',
] as const;

// Support received checklist options
export const SUPPORT_RECEIVED = [
  'Speech Therapy',
  'Educational Therapy',
  'Occupational Therapy',
  'Vision Therapy',
  'Physical Therapy',
  'Other',
  'None',
] as const;

// Duration options
export const DURATION_OPTIONS = [
  { value: 'short_term', label: 'Short-term' },
  { value: 'one_term', label: 'One term' },
  { value: 'one_year', label: 'One year' },
  { value: 'long_term', label: 'Long-term' },
  { value: 'not_sure', label: 'Not sure yet' },
] as const;

// Gender options
export const GENDER_OPTIONS = ['Girl', 'Boy'] as const;

// English level options
export const ENGLISH_LEVELS = [
  { value: 'none', label: 'None' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'native', label: 'Native' },
] as const;

// Photo permission options
export const PHOTO_PERMISSIONS = [
  { value: 'full', label: 'Full consent — allow Bamboo Valley Phuket to use photos across our promotional materials and social media' },
  { value: 'blurred_face', label: 'Blur face — my child can appear in photos but with face obscured' },
  { value: 'internal_only', label: 'Not allowed — photos and videos used for school records only' },
] as const;
