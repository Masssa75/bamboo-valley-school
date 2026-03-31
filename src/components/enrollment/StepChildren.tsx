// src/components/enrollment/StepChildren.tsx
"use client";

import { useEffect } from "react";
import FormField, { inputClassName, selectClassName } from "./FormField";
import FileUploadField from "./FileUploadField";
import ChildTabs from "./ChildTabs";
import ChildCard from "./ChildCard";
import type { EnrollmentFormState, ChildFormState } from "@/lib/enrollment/types";
import { createBlankChild } from "@/lib/enrollment/types";
import { PROGRAMS, suggestProgram, getAgeDisplay, GENDER_OPTIONS, DURATION_OPTIONS } from "@/lib/enrollment/programs";

interface StepChildrenProps {
  formData: EnrollmentFormState;
  activeChildIndex: number;
  resumeToken: string;
  onChange: (updates: Partial<EnrollmentFormState>) => void;
  onActiveChildChange: (index: number) => void;
  errors: Record<string, string>;
  t: (key: string) => string;
}

export default function StepChildren({
  formData,
  activeChildIndex,
  resumeToken,
  onChange,
  onActiveChildChange,
  errors,
  t,
}: StepChildrenProps) {
  const children = formData.children;
  const child = children[activeChildIndex] || createBlankChild();

  const updateChild = (field: keyof ChildFormState, value: unknown) => {
    const updated = [...children];
    updated[activeChildIndex] = { ...child, [field]: value };
    onChange({ children: updated });
  };

  const addChild = () => {
    const updated = [...children, createBlankChild()];
    onChange({ children: updated });
    onActiveChildChange(updated.length - 1);
  };

  const removeChild = (index: number) => {
    if (children.length <= 1) return;
    if (!confirm(t("removeChildConfirm").replace("{name}", children[index].fullName || `Child ${index + 1}`))) return;
    const updated = children.filter((_, i) => i !== index);
    onChange({ children: updated });
    // [AUDIT R2 FIX C12] Handle active index correctly when removing the active child
    // or a child before the active one (which shifts indices down)
    if (index === activeChildIndex) {
      // Removed the active child — select the previous one (or 0)
      onActiveChildChange(Math.max(0, activeChildIndex - 1));
    } else if (index < activeChildIndex) {
      // Removed a child before the active one — shift index down by 1
      onActiveChildChange(activeChildIndex - 1);
    } else if (activeChildIndex >= updated.length) {
      // Edge case: active index beyond array bounds
      onActiveChildChange(updated.length - 1);
    }
  };

  // Auto-suggest program when DOB changes
  useEffect(() => {
    if (child.dateOfBirth && !child.program) {
      const suggested = suggestProgram(child.dateOfBirth);
      if (suggested) {
        updateChild("program", suggested);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [child.dateOfBirth]);

  const errPrefix = `children.${activeChildIndex}.`;
  const childErr = (field: string) => errors[`${errPrefix}${field}`] || "";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-2">
          {t("step2Title")}
        </h2>
        <p className="text-sm text-[#666]">{t("step2Subtitle")}</p>
      </div>

      {/* Banner when auto-switched to incomplete child */}
      {errors._childSwitch && (
        <div data-child-switch-banner className="p-3 rounded-lg bg-[#FAD7AA]/30 border border-[#FAD7AA] text-sm text-[#2d2d2d]">
          {errors._childSwitch}
        </div>
      )}

      <ChildTabs
        children={children}
        activeIndex={activeChildIndex}
        onSelect={onActiveChildChange}
        onAdd={addChild}
        t={t}
      />

      {/* Child summary cards (visible when >1 child) */}
      {children.length > 1 && (
        <div className="space-y-2 mb-4">
          {children.map((c, i) => (
            <ChildCard
              key={i}
              child={c}
              index={i}
              canRemove={children.length > 1}
              onRemove={() => removeChild(i)}
              t={t}
            />
          ))}
        </div>
      )}

      {/* Active child form */}
      <div className="space-y-5">
        <FormField label={t("childFullName")} id="child-name" required error={childErr("fullName")}>
          <input
            type="text"
            id="child-name"
            value={child.fullName}
            onChange={(e) => updateChild("fullName", e.target.value)}
            className={inputClassName}
            placeholder={t("childFullNamePlaceholder")}
          />
        </FormField>

        <FormField label={t("preferredName")} id="child-nickname" helper={t("preferredNameHelper")}>
          <input
            type="text"
            id="child-nickname"
            value={child.preferredName}
            onChange={(e) => updateChild("preferredName", e.target.value)}
            className={inputClassName}
            placeholder={t("preferredNamePlaceholder")}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t("dateOfBirth")} id="child-dob" required error={childErr("dateOfBirth")}>
            <input
              type="date"
              id="child-dob"
              value={child.dateOfBirth}
              onChange={(e) => updateChild("dateOfBirth", e.target.value)}
              className={inputClassName}
            />
            {child.dateOfBirth && (
              <p className="text-xs text-[#8fb07a] mt-1">
                {t("age")}: {getAgeDisplay(child.dateOfBirth)}
              </p>
            )}
          </FormField>

          <FormField label={t("gender")} id="child-gender" required error={childErr("gender")}>
            <select
              id="child-gender"
              value={child.gender}
              onChange={(e) => updateChild("gender", e.target.value)}
              className={selectClassName}
            >
              <option value="">{t("selectGender")}</option>
              {GENDER_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label={t("nationality")} id="child-nationality" required error={childErr("nationality")}>
          <input
            type="text"
            id="child-nationality"
            value={child.nationality}
            onChange={(e) => updateChild("nationality", e.target.value)}
            className={inputClassName}
            placeholder={t("nationalityPlaceholder")}
          />
        </FormField>

        <FormField label={t("program")} id="child-program" required error={childErr("program")}>
          <select
            id="child-program"
            value={child.program}
            onChange={(e) => updateChild("program", e.target.value)}
            className={selectClassName}
          >
            <option value="">{t("selectProgram")}</option>
            {PROGRAMS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          {child.dateOfBirth && child.program && (
            <p className="text-xs text-[#8fb07a] mt-1">{t("programSuggested")}</p>
          )}
        </FormField>

        <FormField label={t("previousSchool")} id="child-prev-school">
          <input
            type="text"
            id="child-prev-school"
            value={child.previousSchool}
            onChange={(e) => updateChild("previousSchool", e.target.value)}
            className={inputClassName}
            placeholder={t("previousSchoolPlaceholder")}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t("preferredStartDate")} id="child-start-date">
            <input
              type="date"
              id="child-start-date"
              value={child.preferredStartDate}
              onChange={(e) => updateChild("preferredStartDate", e.target.value)}
              className={inputClassName}
            />
          </FormField>

          <FormField label={t("intendedDuration")} id="child-duration">
            <select
              id="child-duration"
              value={child.intendedDuration}
              onChange={(e) => updateChild("intendedDuration", e.target.value)}
              className={selectClassName}
            >
              <option value="">{t("selectDuration")}</option>
              {DURATION_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </FormField>
        </div>

        <FileUploadField
          key={`passport-child-${activeChildIndex}`}
          label={t("childPassport")}
          accept="image/jpeg,image/png,image/webp,application/pdf"
          maxSizeMB={10}
          resumeToken={resumeToken}
          documentScope="child"
          childIndex={activeChildIndex}
          fileType="passport"
          currentUrl={child.passportUrl || undefined}
          onUploaded={(path) => updateChild("passportUrl", path)}
          required
        />
      </div>
    </div>
  );
}
