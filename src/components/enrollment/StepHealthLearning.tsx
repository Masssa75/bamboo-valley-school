// src/components/enrollment/StepHealthLearning.tsx
"use client";

import FormField, { inputClassName, textareaClassName, selectClassName } from "./FormField";
import ConditionalField from "./ConditionalField";
import ChecklistField from "./ChecklistField";
import ChildTabs from "./ChildTabs";
import type { EnrollmentFormState, ChildFormState } from "@/lib/enrollment/types";
import {
  ENGLISH_LEVELS,
  DIAGNOSED_CONDITIONS,
  PHYSICAL_LIMITATIONS,
  SUPPORT_RECEIVED,
} from "@/lib/enrollment/programs";

interface StepHealthLearningProps {
  formData: EnrollmentFormState;
  activeChildIndex: number;
  onActiveChildChange: (index: number) => void;
  onChange: (updates: Partial<EnrollmentFormState>) => void;
  errors: Record<string, string>;
  t: (key: string) => string;
}

export default function StepHealthLearning({
  formData,
  activeChildIndex,
  onActiveChildChange,
  onChange,
  errors,
  t,
}: StepHealthLearningProps) {
  const children = formData.children;
  const child = children[activeChildIndex];

  const updateChild = (field: keyof ChildFormState, value: unknown) => {
    const updated = [...children];
    updated[activeChildIndex] = { ...child, [field]: value };
    onChange({ children: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-2">
          {t("step4Title")}
        </h2>
        <p className="text-sm text-[#666]">{t("step4Subtitle")}</p>
      </div>

      <ChildTabs
        children={children}
        activeIndex={activeChildIndex}
        onSelect={onActiveChildChange}
        showAddButton={false}
        t={t}
      />

      {/* Language */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("languageSection")}</h3>
        <FormField label={t("homeLanguages")} id="home-langs" required>
          <input type="text" id="home-langs" value={child.homeLanguages}
            onChange={(e) => updateChild("homeLanguages", e.target.value)} className={inputClassName}
            placeholder={t("homeLanguagesPlaceholder")} />
        </FormField>
        <FormField label={t("englishLevel")} id="english-level" required>
          <select id="english-level" value={child.englishLevel}
            onChange={(e) => updateChild("englishLevel", e.target.value)} className={selectClassName}>
            <option value="">{t("selectEnglishLevel")}</option>
            {ENGLISH_LEVELS.map((l) => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Health */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("healthSection")}</h3>

        <ConditionalField question={t("lifeThreatening")} value={child.hasLifeThreatening}
          onChange={(v) => updateChild("hasLifeThreatening", v)} required>
          <FormField label={t("pleaseDescribe")} id="lt-detail" required>
            <textarea id="lt-detail" rows={2} value={child.lifeThreateningDetail}
              onChange={(e) => updateChild("lifeThreateningDetail", e.target.value)} className={textareaClassName} />
          </FormField>
        </ConditionalField>

        <ConditionalField question={t("allergies")} value={child.hasAllergies}
          onChange={(v) => updateChild("hasAllergies", v)} required>
          <FormField label={t("pleaseDescribe")} id="allergy-detail" required>
            <textarea id="allergy-detail" rows={2} value={child.allergyDetail}
              onChange={(e) => updateChild("allergyDetail", e.target.value)} className={textareaClassName} />
          </FormField>
        </ConditionalField>

        <ConditionalField question={t("dailyMedication")} value={child.hasDailyMedication}
          onChange={(v) => updateChild("hasDailyMedication", v)} required>
          <FormField label={t("pleaseDescribe")} id="med-detail" required>
            <textarea id="med-detail" rows={2} value={child.medicationDetail}
              onChange={(e) => updateChild("medicationDetail", e.target.value)} className={textareaClassName} />
          </FormField>
        </ConditionalField>

        <ConditionalField question={t("peRestriction")} value={child.hasPeRestriction}
          onChange={(v) => updateChild("hasPeRestriction", v)} required>
          <FormField label={t("pleaseDescribe")} id="pe-detail" required>
            <textarea id="pe-detail" rows={2} value={child.peRestrictionDetail}
              onChange={(e) => updateChild("peRestrictionDetail", e.target.value)} className={textareaClassName} />
          </FormField>
        </ConditionalField>

        <FormField label={t("additionalHealth")} id="other-health">
          <textarea id="other-health" rows={2} value={child.otherHealthInfo}
            onChange={(e) => updateChild("otherHealthInfo", e.target.value)} className={textareaClassName}
            placeholder={t("additionalHealthPlaceholder")} />
        </FormField>

        <ConditionalField question={t("hasInsurance")} value={child.hasInsurance}
          onChange={(v) => updateChild("hasInsurance", v)} required>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField label={t("insuranceCompany")} id="ins-company">
              <input type="text" id="ins-company" value={child.insuranceCompany}
                onChange={(e) => updateChild("insuranceCompany", e.target.value)} className={inputClassName} />
            </FormField>
            <FormField label={t("policyNumber")} id="ins-policy">
              <input type="text" id="ins-policy" value={child.policyNumber}
                onChange={(e) => updateChild("policyNumber", e.target.value)} className={inputClassName} />
            </FormField>
          </div>
        </ConditionalField>
      </div>

      {/* Learning support */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("learningSection")}</h3>

        <ConditionalField question={t("needsLearningSupport")} value={child.needsLearningSupport}
          onChange={(v) => updateChild("needsLearningSupport", v)} required>
          <ChecklistField label={t("diagnosedConditions")} options={DIAGNOSED_CONDITIONS}
            selected={child.diagnosedConditions} onChange={(v) => updateChild("diagnosedConditions", v)} />
          <FormField label={t("diagnosisDescription")} id="diag-desc">
            <textarea id="diag-desc" rows={3} value={child.diagnosisDescription}
              onChange={(e) => updateChild("diagnosisDescription", e.target.value)} className={textareaClassName}
              placeholder={t("diagnosisDescriptionPlaceholder")} />
          </FormField>
          <ChecklistField label={t("physicalLimitations")} options={PHYSICAL_LIMITATIONS}
            selected={child.physicalLimitations} onChange={(v) => updateChild("physicalLimitations", v)} />
          {child.physicalLimitations.includes("Other") && (
            <FormField label={t("physicalLimitationsDetail")} id="phys-detail" required>
              <textarea id="phys-detail" rows={2} value={child.physicalLimitationsDetail}
                onChange={(e) => updateChild("physicalLimitationsDetail", e.target.value)} className={textareaClassName} />
            </FormField>
          )}
          <ChecklistField label={t("supportReceived")} options={SUPPORT_RECEIVED}
            selected={child.supportReceived} onChange={(v) => updateChild("supportReceived", v)} />
          <FormField label={t("classroomAccommodations")} id="accommodations">
            <textarea id="accommodations" rows={2} value={child.classroomAccommodations}
              onChange={(e) => updateChild("classroomAccommodations", e.target.value)} className={textareaClassName}
              placeholder={t("accommodationsPlaceholder")} />
          </FormField>
        </ConditionalField>

        <ConditionalField question={t("behavioralChallenges")} value={child.hasBehavioralChallenges}
          onChange={(v) => updateChild("hasBehavioralChallenges", v)} required>
          <ConditionalField question={t("seesTherapist")} value={child.seesTherapist}
            onChange={(v) => updateChild("seesTherapist", v)}>
            <span />
          </ConditionalField>
          <FormField label={t("behavioralDetails")} id="beh-detail">
            <textarea id="beh-detail" rows={3} value={child.behavioralDetails}
              onChange={(e) => updateChild("behavioralDetails", e.target.value)} className={textareaClassName} />
          </FormField>
        </ConditionalField>
      </div>
    </div>
  );
}
