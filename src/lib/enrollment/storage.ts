// src/lib/enrollment/storage.ts
import type { EnrollmentFormState } from './types';

const LS_KEY = 'bv_enrollment_draft';
const LS_TOKEN_KEY = 'bv_enrollment_token';

// --- localStorage helpers ---

export function saveToLocalStorage(formData: EnrollmentFormState, resumeToken: string | null): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(formData));
    if (resumeToken) {
      localStorage.setItem(LS_TOKEN_KEY, resumeToken);
    }
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function loadFromLocalStorage(): { formData: EnrollmentFormState | null; resumeToken: string | null } {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const token = localStorage.getItem(LS_TOKEN_KEY);
    return {
      formData: raw ? JSON.parse(raw) : null,
      resumeToken: token,
    };
  } catch {
    return { formData: null, resumeToken: null };
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_TOKEN_KEY);
  } catch {
    // ignore
  }
}

// --- Debounced auto-save ---

let localSaveTimer: ReturnType<typeof setTimeout> | null = null;
let remoteSaveTimer: ReturnType<typeof setTimeout> | null = null;

export function scheduleLocalSave(formData: EnrollmentFormState, resumeToken: string | null): void {
  if (localSaveTimer) clearTimeout(localSaveTimer);
  localSaveTimer = setTimeout(() => {
    saveToLocalStorage(formData, resumeToken);
  }, 3000);
}

export function scheduleRemoteSave(
  resumeToken: string,
  formData: EnrollmentFormState,
  currentStep: number,
  onSaving: () => void,
  onSaved: () => void,
  onError: () => void
): void {
  if (remoteSaveTimer) clearTimeout(remoteSaveTimer);
  remoteSaveTimer = setTimeout(async () => {
    onSaving();
    try {
      const { updateDraft } = await import('./api');
      const result = await updateDraft(resumeToken, formData, currentStep);
      if (result.ok) {
        onSaved();
      } else {
        onError();
      }
    } catch {
      onError();
    }
  }, 5000);
}

export function cancelPendingSaves(): void {
  if (localSaveTimer) clearTimeout(localSaveTimer);
  if (remoteSaveTimer) clearTimeout(remoteSaveTimer);
}
