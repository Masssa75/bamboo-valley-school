// src/components/enrollment/StepGettingStarted.tsx
"use client";

import FormField, { inputClassName } from "./FormField";
import type { EnrollmentFormState } from "@/lib/enrollment/types";

interface StepGettingStartedProps {
  formData: EnrollmentFormState;
  childCount: number;
  onChange: (updates: Partial<EnrollmentFormState>) => void;
  onChildCountChange: (count: number) => void;
  errors: Record<string, string>;
  t: (key: string) => string;
}

export default function StepGettingStarted({
  formData,
  childCount,
  onChange,
  onChildCountChange,
  errors,
  t,
}: StepGettingStartedProps) {
  const parent1 = formData.family.parent1;

  const updateParent1 = (field: string, value: string) => {
    onChange({
      family: {
        ...formData.family,
        parent1: { ...parent1, [field]: value },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-2">
          {t("step1Title")}
        </h2>
        <p className="text-sm text-[#666]">{t("step1Subtitle")}</p>
      </div>

      <FormField label={t("parentName")} id="parent1-name" required error={errors["parent1.fullName"]}>
        <input
          type="text"
          id="parent1-name"
          value={parent1.fullName}
          onChange={(e) => updateParent1("fullName", e.target.value)}
          className={inputClassName}
          placeholder={t("parentNamePlaceholder")}
        />
      </FormField>

      <FormField label={t("parentEmail")} id="parent1-email" required error={errors["parent1.email"]}>
        <input
          type="email"
          id="parent1-email"
          value={parent1.email}
          onChange={(e) => updateParent1("email", e.target.value)}
          className={inputClassName}
          placeholder={t("parentEmailPlaceholder")}
        />
      </FormField>

      <FormField label={t("parentPhone")} id="parent1-phone" required error={errors["parent1.phone"]} helper={t("phoneHelper")}>
        <input
          type="tel"
          id="parent1-phone"
          value={parent1.phone}
          onChange={(e) => updateParent1("phone", e.target.value)}
          className={inputClassName}
          placeholder={t("parentPhonePlaceholder")}
        />
      </FormField>

      <FormField label={t("childCount")} id="child-count">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChildCountChange(Math.max(1, childCount - 1))}
            disabled={childCount <= 1}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-medium text-[#2d2d2d] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            -
          </button>
          <span className="text-lg font-medium text-[#2d2d2d] w-8 text-center">{childCount}</span>
          <button
            type="button"
            onClick={() => onChildCountChange(Math.min(6, childCount + 1))}
            disabled={childCount >= 6}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-lg font-medium text-[#2d2d2d] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>
      </FormField>
    </div>
  );
}
