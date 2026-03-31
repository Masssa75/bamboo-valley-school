// src/components/enrollment/StepFamilyProfile.tsx
"use client";

import FormField, { inputClassName, textareaClassName } from "./FormField";
import ConditionalField from "./ConditionalField";
import ChildTabs from "./ChildTabs";
import type { EnrollmentFormState, ChildFormState } from "@/lib/enrollment/types";

interface StepFamilyProfileProps {
  formData: EnrollmentFormState;
  activeChildIndex: number;
  onActiveChildChange: (index: number) => void;
  onChange: (updates: Partial<EnrollmentFormState>) => void;
  errors: Record<string, string>;
  t: (key: string) => string;
}

export default function StepFamilyProfile({
  formData,
  activeChildIndex,
  onActiveChildChange,
  onChange,
  errors,
  t,
}: StepFamilyProfileProps) {
  const family = formData.family;
  const children = formData.children;
  const child = children[activeChildIndex];

  const updateFamily = (field: string, value: unknown) => {
    onChange({ family: { ...family, [field]: value } });
  };

  const updateParent1 = (field: string, value: string) => {
    onChange({
      family: { ...family, parent1: { ...family.parent1, [field]: value } },
    });
  };

  const updateParent2 = (field: string, value: string) => {
    onChange({
      family: { ...family, parent2: { ...family.parent2, [field]: value } },
    });
  };

  const updateEmergency = (field: string, value: string) => {
    onChange({
      family: { ...family, emergencyContact: { ...family.emergencyContact, [field]: value } },
    });
  };

  const updateChild = (field: keyof ChildFormState, value: unknown) => {
    const updated = [...children];
    updated[activeChildIndex] = { ...child, [field]: value };
    onChange({ children: updated });
  };

  const parentsSeparated = !family.parentsTogether;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-2">
          {t("step3Title")}
        </h2>
        <p className="text-sm text-[#666]">{t("step3Subtitle")}</p>
      </div>

      {/* Parent / Guardian 1 — summary from Step 1 + additional fields */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("parent1Additional")}</h3>

        {/* Read-only summary of Step 1 fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
          <div>
            <p className="text-xs text-[#999] mb-0.5">{t("parentName")}</p>
            <p className="text-sm text-[#2d2d2d] font-medium">{family.parent1.fullName || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-[#999] mb-0.5">{t("parentEmail")}</p>
            <p className="text-sm text-[#2d2d2d]">{family.parent1.email || "—"}</p>
          </div>
          <div>
            <p className="text-xs text-[#999] mb-0.5">{t("parentPhone")}</p>
            <p className="text-sm text-[#2d2d2d]">{family.parent1.phone || "—"}</p>
          </div>
        </div>

        {/* Editable additional fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField label={t("nationality")} id="p1-nationality">
            <input type="text" id="p1-nationality" value={family.parent1.nationality}
              onChange={(e) => updateParent1("nationality", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("languages")} id="p1-languages">
            <input type="text" id="p1-languages" value={family.parent1.languages}
              onChange={(e) => updateParent1("languages", e.target.value)} className={inputClassName}
              placeholder={t("languagesPlaceholder")} />
          </FormField>
          <FormField label={t("occupation")} id="p1-occupation">
            <input type="text" id="p1-occupation" value={family.parent1.occupation}
              onChange={(e) => updateParent1("occupation", e.target.value)} className={inputClassName} />
          </FormField>
        </div>
      </div>

      {/* Parent / Guardian 2 */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("parent2Title")}</h3>
        <p className="text-sm text-[#666]">{t("parent2Optional")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t("parentName")} id="p2-name">
            <input type="text" id="p2-name" value={family.parent2?.fullName || ""}
              onChange={(e) => updateParent2("fullName", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("parentPhone")} id="p2-phone">
            <input type="tel" id="p2-phone" value={family.parent2?.phone || ""}
              onChange={(e) => updateParent2("phone", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("parentEmail")} id="p2-email">
            <input type="email" id="p2-email" value={family.parent2?.email || ""}
              onChange={(e) => updateParent2("email", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("nationality")} id="p2-nationality">
            <input type="text" id="p2-nationality" value={family.parent2?.nationality || ""}
              onChange={(e) => updateParent2("nationality", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("languages")} id="p2-languages">
            <input type="text" id="p2-languages" value={family.parent2?.languages || ""}
              onChange={(e) => updateParent2("languages", e.target.value)} className={inputClassName}
              placeholder={t("languagesPlaceholder")} />
          </FormField>
          <FormField label={t("occupation")} id="p2-occupation">
            <input type="text" id="p2-occupation" value={family.parent2?.occupation || ""}
              onChange={(e) => updateParent2("occupation", e.target.value)} className={inputClassName} />
          </FormField>
        </div>
      </div>

      {/* Family situation — BEFORE address so it sets context */}
      <ConditionalField
        question={t("parentsTogether")}
        value={!family.parentsTogether}
        onChange={(notTogether) => updateFamily("parentsTogether", !notTogether)}
        yesLabel={t("no")}
        noLabel={t("yes")}
      >
        <FormField label={t("parentalStatus")} id="parental-status">
          <input type="text" id="parental-status" value={family.parentalStatus}
            onChange={(e) => updateFamily("parentalStatus", e.target.value)} className={inputClassName}
            placeholder={t("parentalStatusPlaceholder")} />
        </FormField>
        <FormField label={t("childLivingWith")} id="living-with">
          <input type="text" id="living-with" value={family.childLivingWith}
            onChange={(e) => updateFamily("childLivingWith", e.target.value)} className={inputClassName} />
        </FormField>
        <FormField label={t("custodyArrangement")} id="custody">
          <input type="text" id="custody" value={family.custodyArrangement}
            onChange={(e) => updateFamily("custodyArrangement", e.target.value)} className={inputClassName} />
        </FormField>
      </ConditionalField>

      {/* Address — adapts based on family situation */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">
          {parentsSeparated ? t("childAddressTitle") : t("addressTitle")}
        </h3>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="not-in-phuket"
            checked={family.notYetInPhuket}
            onChange={(e) => updateFamily("notYetInPhuket", e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="not-in-phuket" className="text-sm text-[#666]">{t("notYetInPhuket")}</label>
        </div>

        {family.notYetInPhuket ? (
          <FormField label={t("expectedArrival")} id="arrival-date">
            <input type="date" id="arrival-date" value={family.expectedArrivalDate}
              onChange={(e) => updateFamily("expectedArrivalDate", e.target.value)} className={inputClassName} />
          </FormField>
        ) : parentsSeparated ? (
          /* Separated parents: show both addresses */
          <div className="space-y-5">
            <FormField label={`${family.parent1.fullName || t("parent1Additional")} — ${t("currentAddress")}`} id="p1-address">
              <textarea id="p1-address" rows={2} value={family.address}
                onChange={(e) => updateFamily("address", e.target.value)} className={textareaClassName}
                placeholder={t("addressPlaceholder")} />
            </FormField>
            {family.parent2?.fullName && (
              <FormField label={`${family.parent2.fullName} — ${t("currentAddress")}`} id="p2-address">
                <textarea id="p2-address" rows={2} value={family.parent2Address}
                  onChange={(e) => updateFamily("parent2Address", e.target.value)} className={textareaClassName}
                  placeholder={t("addressPlaceholder")} />
              </FormField>
            )}
          </div>
        ) : (
          /* Together: one shared address */
          <FormField label={t("currentAddress")} id="address">
            <textarea id="address" rows={3} value={family.address}
              onChange={(e) => updateFamily("address", e.target.value)} className={textareaClassName}
              placeholder={t("addressPlaceholder")} />
          </FormField>
        )}
      </div>

      {/* Guardian */}
      <ConditionalField
        question={t("hasGuardian")}
        value={family.hasGuardian}
        onChange={(v) => updateFamily("hasGuardian", v)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label={t("guardianName")} id="guardian-name" required>
            <input type="text" id="guardian-name" value={family.guardianName}
              onChange={(e) => updateFamily("guardianName", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("occupation")} id="guardian-occupation">
            <input type="text" id="guardian-occupation" value={family.guardianOccupation}
              onChange={(e) => updateFamily("guardianOccupation", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("parentPhone")} id="guardian-phone" required>
            <input type="tel" id="guardian-phone" value={family.guardianPhone}
              onChange={(e) => updateFamily("guardianPhone", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("parentEmail")} id="guardian-email">
            <input type="email" id="guardian-email" value={family.guardianEmail}
              onChange={(e) => updateFamily("guardianEmail", e.target.value)} className={inputClassName} />
          </FormField>
        </div>
      </ConditionalField>

      {/* Emergency contact */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("emergencyContact")}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FormField label={t("emergencyName")} id="emergency-name" required error={errors["family.emergencyContact.fullName"]}>
            <input type="text" id="emergency-name" value={family.emergencyContact.fullName}
              onChange={(e) => updateEmergency("fullName", e.target.value)} className={inputClassName} />
          </FormField>
          <FormField label={t("emergencyRelationship")} id="emergency-rel" required error={errors["family.emergencyContact.relationship"]}>
            <input type="text" id="emergency-rel" value={family.emergencyContact.relationship}
              onChange={(e) => updateEmergency("relationship", e.target.value)} className={inputClassName}
              placeholder={t("emergencyRelPlaceholder")} />
          </FormField>
          <FormField label={t("emergencyPhone")} id="emergency-phone" required error={errors["family.emergencyContact.phone"]}>
            <input type="tel" id="emergency-phone" value={family.emergencyContact.phone}
              onChange={(e) => updateEmergency("phone", e.target.value)} className={inputClassName} />
          </FormField>
        </div>
      </div>

      {/* Per-child social/emotional */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("socialEmotional")}</h3>

        {errors._childSwitch && (
          <div data-child-switch-banner className="p-3 rounded-lg bg-[#FAD7AA]/30 border border-[#FAD7AA] text-sm text-[#2d2d2d]">
            {errors._childSwitch}
          </div>
        )}

        <ChildTabs
          children={children}
          activeIndex={activeChildIndex}
          onSelect={onActiveChildChange}
          showAddButton={false}
          t={t}
        />
        <FormField label={t("favoriteActivities")} id="child-fav" required error={errors[`children.${activeChildIndex}.favoriteActivities`]}>
          <textarea id="child-fav" rows={2} value={child.favoriteActivities}
            onChange={(e) => updateChild("favoriteActivities", e.target.value)} className={textareaClassName}
            placeholder={t("favoriteActivitiesPlaceholder")} />
        </FormField>
        <FormField label={t("whatUpsets")} id="child-upsets" required error={errors[`children.${activeChildIndex}.whatUpsetsChild`]}>
          <textarea id="child-upsets" rows={2} value={child.whatUpsetsChild}
            onChange={(e) => updateChild("whatUpsetsChild", e.target.value)} className={textareaClassName}
            placeholder={t("whatUpsetsPlaceholder")} />
        </FormField>
        <FormField label={t("howExpresses")} id="child-expresses" required error={errors[`children.${activeChildIndex}.howExpressesUpset`]}>
          <textarea id="child-expresses" rows={2} value={child.howExpressesUpset}
            onChange={(e) => updateChild("howExpressesUpset", e.target.value)} className={textareaClassName}
            placeholder={t("howExpressesPlaceholder")} />
        </FormField>
      </div>
    </div>
  );
}
