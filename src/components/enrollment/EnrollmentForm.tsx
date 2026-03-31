// src/components/enrollment/EnrollmentForm.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import StepIndicator from "./StepIndicator";
import StepGettingStarted from "./StepGettingStarted";
import StepChildren from "./StepChildren";
import StepFamilyProfile from "./StepFamilyProfile";
import StepHealthLearning from "./StepHealthLearning";
import StepFinalize from "./StepFinalize";
import SaveIndicator from "./SaveIndicator";
import ConfirmationScreen from "./ConfirmationScreen";

import { createDraft, resumeDraft, submitEnrollment } from "@/lib/enrollment/api";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
  scheduleLocalSave,
  scheduleRemoteSave,
  cancelPendingSaves,
} from "@/lib/enrollment/storage";
import {
  createInitialFormState,
  createBlankChild,
  prepareForValidation,
  type EnrollmentFormState,
  type EnrollmentMeta,
} from "@/lib/enrollment/types";
import { enrollmentSchema } from "@/lib/enrollment/schema";

export default function EnrollmentForm() {
  const t = useTranslations("enrollment");
  const searchParams = useSearchParams();


  const [formData, setFormData] = useState<EnrollmentFormState>(createInitialFormState);
  const [meta, setMeta] = useState<EnrollmentMeta>({
    resumeToken: null,
    currentStep: 1,
    activeChildIndex: 0,
    saveStatus: "idle",
    submitStatus: "idle",
    referenceNumber: null,
    existingDraftFound: false,
    existingToken: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt] = useState(() => Date.now());
  const [isLoading, setIsLoading] = useState(true);

  // --- Initialize: check URL param or localStorage for resume token ---
  useEffect(() => {
    const init = async () => {
      const urlToken = searchParams.get("resume");
      const ls = loadFromLocalStorage();
      const token = urlToken || ls.resumeToken;

      // [AUDIT R2 FIX I10] Validate token format before API call.
      // nanoid(12) produces 12 chars from [A-Za-z0-9_-].
      if (token && !/^[A-Za-z0-9_-]{10,20}$/.test(token)) {
        // Invalid token format — ignore it
        setIsLoading(false);
        return;
      }

      if (token) {
        const result = await resumeDraft(token);
        if (result.error === "not_found" || result.error === "expired") {
          clearLocalStorage();
          setIsLoading(false);
          return;
        }
        if (result.status === "submitted") {
          setMeta((m) => ({ ...m, submitStatus: "submitted", referenceNumber: result.reference_number || null }));
          setIsLoading(false);
          return;
        }
        if (result.form_data) {
          // Merge loaded data with defaults to fill any missing fields
          const loaded = result.form_data as EnrollmentFormState;
          const merged = { ...createInitialFormState(), ...loaded };
          // Ensure children array has at least one child with all fields
          if (merged.children && merged.children.length > 0) {
            merged.children = merged.children.map((c) => ({ ...createBlankChild(), ...c }));
          }
          // Ensure family sub-objects exist
          merged.family = {
            ...createInitialFormState().family,
            ...merged.family,
            parent1: { ...createInitialFormState().family.parent1, ...merged.family?.parent1 },
            parent2: { ...createInitialFormState().family.parent2, ...merged.family?.parent2 },
            emergencyContact: { ...createInitialFormState().family.emergencyContact, ...merged.family?.emergencyContact },
          };
          merged.discovery = { ...createInitialFormState().discovery, ...merged.discovery };
          merged.permissions = { ...createInitialFormState().permissions, ...merged.permissions };

          setFormData(merged);
          // [AUDIT R2 FIX C13] Restore activeChildIndex from saved _meta if present
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const savedChildIndex = (loaded as any)?._meta?.activeChildIndex ?? 0;
          setMeta((m) => ({
            ...m,
            resumeToken: token,
            currentStep: result.current_step || 1,
            activeChildIndex: Math.min(savedChildIndex, merged.children.length - 1),
          }));
        }
      }
      setIsLoading(false);
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save on form data changes ---
  // [AUDIT R2 FIX C13] Include activeChildIndex in the saved form_data
  // so it can be restored on resume (user returns to the same child tab).
  const triggerAutoSave = useCallback(
    (data: EnrollmentFormState) => {
      // Embed activeChildIndex in the data for remote persistence
      const dataWithMeta = { ...data, _meta: { activeChildIndex: meta.activeChildIndex } };
      scheduleLocalSave(data, meta.resumeToken);
      if (meta.resumeToken) {
        scheduleRemoteSave(
          meta.resumeToken,
          dataWithMeta as unknown as EnrollmentFormState,
          meta.currentStep,
          () => setMeta((m) => ({ ...m, saveStatus: "saving" })),
          () => setMeta((m) => ({ ...m, saveStatus: "saved" })),
          () => setMeta((m) => ({ ...m, saveStatus: "error" }))
        );
      }
    },
    [meta.resumeToken, meta.currentStep, meta.activeChildIndex]
  );

  // --- Form update handler ---
  const handleChange = (updates: Partial<EnrollmentFormState>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      triggerAutoSave(next);
      return next;
    });
  };

  // --- Child count change from Step 1 ---
  const handleChildCountChange = (count: number) => {
    const current = formData.children.length;
    if (count > current) {
      const newChildren = [...formData.children];
      for (let i = current; i < count; i++) newChildren.push(createBlankChild());
      handleChange({ children: newChildren });
    } else if (count < current) {
      handleChange({ children: formData.children.slice(0, count) });
      if (meta.activeChildIndex >= count) {
        setMeta((m) => ({ ...m, activeChildIndex: count - 1 }));
      }
    }
  };

  // --- Per-step validation [AUDIT R2 FIX C11] ---
  const validateStep = (step: number): Record<string, string> => {
    const errs: Record<string, string> = {};
    const p1 = formData.family.parent1;

    if (step === 1) {
      if (!p1.fullName.trim()) errs["parent1.fullName"] = t("required");
      if (!p1.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p1.email)) errs["parent1.email"] = t("validEmailRequired");
      if (!p1.phone.trim() || p1.phone.length < 5) errs["parent1.phone"] = t("required");
    }
    if (step === 2) {
      formData.children.forEach((c, i) => {
        if (!c.fullName.trim()) errs[`children.${i}.fullName`] = t("required");
        if (!c.dateOfBirth) errs[`children.${i}.dateOfBirth`] = t("required");
        if (!c.gender) errs[`children.${i}.gender`] = t("required");
        if (!c.nationality.trim()) errs[`children.${i}.nationality`] = t("required");
        if (!c.program) errs[`children.${i}.program`] = t("required");
      });
    }
    if (step === 3) {
      const ec = formData.family.emergencyContact;
      if (!ec.fullName.trim()) errs["family.emergencyContact.fullName"] = t("required");
      if (!ec.relationship.trim()) errs["family.emergencyContact.relationship"] = t("required");
      if (!ec.phone.trim()) errs["family.emergencyContact.phone"] = t("required");
      // [AUDIT R3 FIX F2] Step 3 also has per-child social/emotional fields marked required.
      // Validate them here so users can't advance with empty required textareas.
      formData.children.forEach((c, i) => {
        if (!c.favoriteActivities.trim()) errs[`children.${i}.favoriteActivities`] = t("required");
        if (!c.whatUpsetsChild.trim()) errs[`children.${i}.whatUpsetsChild`] = t("required");
        if (!c.howExpressesUpset.trim()) errs[`children.${i}.howExpressesUpset`] = t("required");
      });
    }
    // Step 4: Required health boolean fields are defaulted to false, which is valid.
    // Only validate language fields per child.
    if (step === 4) {
      formData.children.forEach((c, i) => {
        if (!c.homeLanguages.trim()) errs[`children.${i}.homeLanguages`] = t("required");
        if (!c.englishLevel) errs[`children.${i}.englishLevel`] = t("required");
      });
    }
    // [AUDIT R3 FIX F1] Step 5: Validate permissions, discovery, and per-child fields
    // before Zod parse runs. Catches common omissions with friendly error messages
    // instead of cryptic Zod enum errors like "received ''".
    if (step === 5) {
      if (!formData.permissions.photoPermission) errs["permissions.photoPermission"] = t("required");
      if (!formData.permissions.termsAcknowledged) errs["permissions.termsAcknowledged"] = t("required");
      if (!formData.permissions.allStatementsTrue) errs["permissions.allStatementsTrue"] = t("required");
      if (formData.discovery.howFoundUs.length === 0) errs["discovery.howFoundUs"] = t("required");
      if (!formData.discovery.whyJoining.trim()) errs["discovery.whyJoining"] = t("required");
    }
    return errs;
  };

  // Helper: check if a child has required Step 2 fields filled
  const isChildComplete = (c: typeof formData.children[0]) =>
    c.fullName.trim() && c.dateOfBirth && c.gender && c.nationality.trim() && c.program;

  // --- Step navigation ---
  const goToStep = async (step: number) => {
    // [AUDIT R2 FIX C11] Validate current step before advancing (not when going back)
    if (step > meta.currentStep) {
      // Multi-child: on per-child steps, if clicking Next and there's an incomplete child, switch to it
      if (formData.children.length > 1) {
        let incompleteCheck: ((c: typeof formData.children[0]) => boolean) | null = null;

        if (meta.currentStep === 2) {
          incompleteCheck = (c) => !isChildComplete(c);
        } else if (meta.currentStep === 3) {
          // Step 3 social questions
          incompleteCheck = (c) => !c.favoriteActivities.trim() || !c.whatUpsetsChild.trim() || !c.howExpressesUpset.trim();
        } else if (meta.currentStep === 4) {
          // Step 4 language fields
          incompleteCheck = (c) => !c.homeLanguages.trim() || !c.englishLevel;
        }

        if (incompleteCheck) {
          // First validate current child passes step validation
          const stepErrors = validateStep(meta.currentStep);
          const currentChildHasErrors = Object.keys(stepErrors).some(k => k.includes(`children.${meta.activeChildIndex}`));

          if (currentChildHasErrors) {
            setErrors(stepErrors);
            return;
          }

          // Check other children
          const nextIncomplete = formData.children.findIndex((c, i) => i !== meta.activeChildIndex && incompleteCheck!(c));
          if (nextIncomplete !== -1) {
            setMeta((m) => ({ ...m, activeChildIndex: nextIncomplete }));
            setErrors({ _childSwitch: t("pleaseCompleteChild").replace("{name}", formData.children[nextIncomplete].fullName || `Child ${nextIncomplete + 1}`) });
            // Scroll to the child tabs section, not the top of the page
            setTimeout(() => {
              const banner = document.querySelector('[data-child-switch-banner]');
              if (banner) {
                banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }, 50);
            return;
          }
        }
      }

      const stepErrors = validateStep(meta.currentStep);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return; // Block navigation — show errors on current step
      }
    }

    // Step 1 -> 2: create draft if no token
    if (meta.currentStep === 1 && step === 2 && !meta.resumeToken) {
      const result = await createDraft({
        fullName: formData.family.parent1.fullName,
        email: formData.family.parent1.email,
        phone: formData.family.parent1.phone,
        childCount: formData.children.length,
        honeypot,
        formLoadedAt,
      });

      if (result.existingDraft) {
        setMeta((m) => ({ ...m, existingDraftFound: true, existingToken: result.existingToken || null }));
        return;
      }

      if (result.error) {
        setErrors({ "parent1.email": result.error });
        return;
      }

      if (result.resumeToken) {
        setMeta((m) => ({ ...m, resumeToken: result.resumeToken! }));
        saveToLocalStorage(formData, result.resumeToken!);
        // Update URL with resume token (without navigation)
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("resume", result.resumeToken!);
          window.history.replaceState({}, "", url.toString());
        }
      }
    }

    setErrors({});
    // Reset to first child when entering a new step — prevents accidentally
    // filling data for the wrong child when per-child sections carry over the tab
    setMeta((m) => ({ ...m, currentStep: step, activeChildIndex: 0 }));

    // Scroll to the step indicator, not the very top (keeps nav out of view)
    setTimeout(() => {
      const indicator = document.querySelector('[data-step-indicator]');
      if (indicator) {
        indicator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  // --- Submit ---
  const handleSubmit = async () => {
    if (!meta.resumeToken) return;

    // [AUDIT R3 FIX F1] Run per-step validation for the current step (Step 5) first.
    // This catches common omissions with friendly error messages before the Zod parse.
    const stepErrors = validateStep(meta.currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // [AUDIT R2 FIX C10] Validate entire form with Zod before calling RPC.
    // This catches missing required fields, invalid enums, etc. before they
    // reach the PG function's CHECK constraints.
    const validation = enrollmentSchema.safeParse(prepareForValidation(formData));
    if (!validation.success) {
      console.error("Zod validation errors:", JSON.stringify(validation.error.issues, null, 2));
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      // Navigate to the first step that has errors
      const firstErrorPath = validation.error.issues[0]?.path[0];
      if (firstErrorPath === "family") setMeta((m) => ({ ...m, currentStep: 3 }));
      else if (firstErrorPath === "children") setMeta((m) => ({ ...m, currentStep: 2 }));
      else if (firstErrorPath === "discovery") setMeta((m) => ({ ...m, currentStep: 5 }));
      else if (firstErrorPath === "permissions") setMeta((m) => ({ ...m, currentStep: 5 }));
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setMeta((m) => ({ ...m, submitStatus: "submitting" }));

    // Final save before submit
    cancelPendingSaves();
    const { updateDraft } = await import("@/lib/enrollment/api");
    await updateDraft(meta.resumeToken!, formData, 5);

    const result = await submitEnrollment(meta.resumeToken!);

    if (result.error) {
      setMeta((m) => ({ ...m, submitStatus: "error" }));
      setErrors({ submit: result.error });
      return;
    }

    clearLocalStorage();
    setMeta((m) => ({
      ...m,
      submitStatus: "submitted",
      referenceNumber: result.referenceNumber || null,
    }));

    // Track GA4 event
    if (typeof window !== "undefined") {
      window.gtag?.("event", "enrollment_submit", {
        event_category: "conversion",
        event_label: result.referenceNumber,
      });
    }
  };

  // --- Resume existing draft ---
  const handleResumeDraft = async () => {
    const token = meta.existingToken;
    if (!token) return;

    const result = await resumeDraft(token);
    if (result.form_data) {
      setFormData(result.form_data as EnrollmentFormState);
      setMeta((m) => ({
        ...m,
        resumeToken: token,
        currentStep: result.current_step || 2,
        existingDraftFound: false,
      }));
      saveToLocalStorage(result.form_data as EnrollmentFormState, token);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("resume", token);
        window.history.replaceState({}, "", url.toString());
      }
    }
  };

  // --- Start fresh (expire old draft, create new) ---
  const handleStartFresh = async () => {
    const result = await createDraft({
      fullName: formData.family.parent1.fullName,
      email: formData.family.parent1.email,
      phone: formData.family.parent1.phone,
      childCount: formData.children.length,
      honeypot,
      formLoadedAt,
      forceNew: true,
    });

    if (result.resumeToken) {
      setMeta((m) => ({
        ...m,
        resumeToken: result.resumeToken!,
        existingDraftFound: false,
        currentStep: 2,
        activeChildIndex: 0,
      }));
      saveToLocalStorage(formData, result.resumeToken!);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("resume", result.resumeToken!);
        window.history.replaceState({}, "", url.toString());
      }
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (result.error) {
      setErrors({ _form: result.error });
    }
  };

  // --- Render ---
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#BED7AF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (meta.submitStatus === "submitted") {
    return <ConfirmationScreen referenceNumber={meta.referenceNumber || ""} t={t} />;
  }

  return (
    <div className="max-w-[720px] mx-auto">
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <StepIndicator currentStep={meta.currentStep} t={t} />

      {/* Resume banner */}
      {meta.resumeToken && meta.currentStep > 1 && (
        <div className="mb-6 p-3 rounded-lg bg-[#FAF9F6] border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-xs text-[#666]">{t("resumeBanner")}</p>
            <button
              type="button"
              onClick={() => {
                if (confirm("Start a completely new application? Your current progress will remain saved.")) {
                  localStorage.removeItem("bv_enrollment_token");
                  localStorage.removeItem("bv_enrollment_draft");
                  window.location.href = window.location.pathname;
                }
              }}
              className="text-xs text-[#999] hover:text-[#666] underline"
            >
              {t("startNewApplication")}
            </button>
          </div>
          <SaveIndicator status={meta.saveStatus} t={t} />
        </div>
      )}

      {/* Existing draft dialog */}
      {meta.existingDraftFound && (
        <div className="mb-6 p-4 rounded-lg bg-[#FAD7AA]/20 border border-[#FAD7AA]">
          <p className="text-sm text-[#2d2d2d] mb-3">{t("existingDraftMessage")}</p>
          <div className="flex gap-3">
            <button type="button" onClick={handleResumeDraft}
              className="px-4 py-2 text-sm bg-[#2d2d2d] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors">
              {t("resumeExisting")}
            </button>
            <button type="button" onClick={handleStartFresh}
              className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              {t("startFresh")}
            </button>
          </div>
        </div>
      )}

      {/* Step content */}
      <form onSubmit={(e) => e.preventDefault()}>
        {meta.currentStep === 1 && (
          <StepGettingStarted
            formData={formData}
            childCount={formData.children.length}
            onChange={handleChange}
            onChildCountChange={handleChildCountChange}
            errors={errors}
            t={t}
          />
        )}
        {meta.currentStep === 2 && (
          <StepChildren
            formData={formData}
            activeChildIndex={meta.activeChildIndex}
            resumeToken={meta.resumeToken || ""}
            onChange={handleChange}
            onActiveChildChange={(i) => { setMeta((m) => ({ ...m, activeChildIndex: i })); if (errors._childSwitch) setErrors({}); }}
            errors={errors}
            t={t}
          />
        )}
        {meta.currentStep === 3 && (
          <StepFamilyProfile
            formData={formData}
            activeChildIndex={meta.activeChildIndex}
            onActiveChildChange={(i) => setMeta((m) => ({ ...m, activeChildIndex: i }))}
            onChange={handleChange}
            errors={errors}
            t={t}
          />
        )}
        {meta.currentStep === 4 && (
          <StepHealthLearning
            formData={formData}
            activeChildIndex={meta.activeChildIndex}
            onActiveChildChange={(i) => setMeta((m) => ({ ...m, activeChildIndex: i }))}
            onChange={handleChange}
            errors={errors}
            t={t}
          />
        )}
        {meta.currentStep === 5 && (
          <StepFinalize
            formData={formData}
            activeChildIndex={meta.activeChildIndex}
            resumeToken={meta.resumeToken || ""}
            onActiveChildChange={(i) => setMeta((m) => ({ ...m, activeChildIndex: i }))}
            onChange={handleChange}
            errors={errors}
            t={t}
          />
        )}
      </form>

      {/* Navigation buttons — desktop only (mobile uses sticky bar below) */}
      <div className="hidden md:flex justify-between mt-10 pb-8">
        {meta.currentStep > 1 ? (
          <button
            type="button"
            onClick={() => goToStep(meta.currentStep - 1)}
            className="px-6 py-3 text-sm font-medium text-[#666] border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("back")}
          </button>
        ) : (
          <div />
        )}

        {meta.currentStep < 5 ? (
          <button
            type="button"
            onClick={() => goToStep(meta.currentStep + 1)}
            className="px-8 py-3 text-sm font-medium bg-[#2d2d2d] text-white rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            {t("next")}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={meta.submitStatus === "submitting"}
            className="px-8 py-3 text-sm font-medium bg-[#BED7AF] text-[#2d2d2d] rounded-lg hover:bg-[#8fb07a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {meta.submitStatus === "submitting" ? t("submitting") : t("submit")}
          </button>
        )}
      </div>

      {/* Submit error */}
      {errors.submit && (
        <p className="text-center text-sm text-red-500 mb-4">{errors.submit}</p>
      )}

      {/* Mobile sticky nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between z-40">
        {meta.currentStep > 1 ? (
          <button type="button" onClick={() => goToStep(meta.currentStep - 1)}
            className="px-5 py-2.5 text-sm font-medium text-[#666] border border-gray-200 rounded-lg">
            {t("back")}
          </button>
        ) : <div />}
        {meta.currentStep < 5 ? (
          <button type="button" onClick={() => goToStep(meta.currentStep + 1)}
            className="px-5 py-2.5 text-sm font-medium bg-[#2d2d2d] text-white rounded-lg">
            {t("next")}
          </button>
        ) : (
          <button type="button" onClick={handleSubmit}
            disabled={meta.submitStatus === "submitting"}
            className="px-5 py-2.5 text-sm font-medium bg-[#BED7AF] text-[#2d2d2d] rounded-lg disabled:opacity-50">
            {meta.submitStatus === "submitting" ? t("submitting") : t("submit")}
          </button>
        )}
      </div>

      {/* Spacer for mobile sticky nav */}
      <div className="md:hidden h-28" />
    </div>
  );
}
