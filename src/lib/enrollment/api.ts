// src/lib/enrollment/api.ts
import type { EnrollmentFormState } from './types';

const BASE = '/.netlify/functions';

// --- enrollment-save: create draft ---
export async function createDraft(data: {
  fullName: string;
  email: string;
  phone: string;
  childCount: number;
  honeypot: string;
  formLoadedAt: number;
  forceNew?: boolean;
}): Promise<{ id?: string; resumeToken?: string; existingDraft?: boolean; existingToken?: string; error?: string }> {
  const res = await fetch(`${BASE}/enrollment-save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// --- enrollment-save: update draft ---
export async function updateDraft(
  resumeToken: string,
  formData: EnrollmentFormState,
  currentStep: number
): Promise<{ ok?: boolean; error?: string }> {
  const res = await fetch(`${BASE}/enrollment-save`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeToken, formData, currentStep }),
  });
  return res.json();
}

// --- enrollment-resume: load draft ---
export async function resumeDraft(token: string): Promise<{
  form_data?: EnrollmentFormState;
  current_step?: number;
  status?: string;
  reference_number?: string;
  error?: string;
}> {
  const res = await fetch(`${BASE}/enrollment-resume?token=${encodeURIComponent(token)}`);
  if (res.status === 404) return { error: 'not_found' };
  if (res.status === 410) return { error: 'expired' };
  return res.json();
}

// --- enrollment-submit: final submit ---
export async function submitEnrollment(resumeToken: string): Promise<{
  referenceNumber?: string;
  error?: string;
}> {
  const res = await fetch(`${BASE}/enrollment-submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeToken }),
  });
  return res.json();
}

// --- enrollment-upload: get signed URL ---
export async function getUploadUrl(params: {
  resumeToken: string;
  documentScope: 'child' | 'parent1' | 'parent2';
  childIndex?: number;
  fileType: 'passport' | 'video';
  contentType: string;
}): Promise<{
  uploadTarget?: 'supabase' | 'google-drive';
  signedUrl?: string; path?: string; token?: string;  // Supabase
  uploadUri?: string; fileName?: string;               // Google Drive
  error?: string;
}> {
  const res = await fetch(`${BASE}/enrollment-upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
}

// --- enrollment-upload: confirm upload ---
export async function confirmUpload(params: {
  action: 'confirm';
  resumeToken: string;
  documentScope: 'child' | 'parent1' | 'parent2';
  childIndex?: number;
  fileType: 'passport' | 'video';
  filePath: string;
}): Promise<{ ok?: boolean; error?: string }> {
  const res = await fetch(`${BASE}/enrollment-upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
}
