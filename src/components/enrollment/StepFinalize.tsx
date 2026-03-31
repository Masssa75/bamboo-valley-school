// src/components/enrollment/StepFinalize.tsx
"use client";

import FormField, { textareaClassName } from "./FormField";
import FileUploadField from "./FileUploadField";
import VideoUpload from "./VideoUpload";
import ChecklistField from "./ChecklistField";
import ChildTabs from "./ChildTabs";
import ReviewPanel from "./ReviewPanel";
import type { EnrollmentFormState, ChildFormState } from "@/lib/enrollment/types";
import { HOW_FOUND_US_OPTIONS, PHOTO_PERMISSIONS } from "@/lib/enrollment/programs";
import { useMemo } from "react";

interface StepFinalizeProps {
  formData: EnrollmentFormState;
  activeChildIndex: number;
  resumeToken: string;
  onActiveChildChange: (index: number) => void;
  onChange: (updates: Partial<EnrollmentFormState>) => void;
  errors: Record<string, string>;
  t: (key: string) => string;
}

export default function StepFinalize({
  formData,
  activeChildIndex,
  resumeToken,
  onActiveChildChange,
  onChange,
  errors,
  t,
}: StepFinalizeProps) {
  const children = formData.children;
  const child = children[activeChildIndex];
  const discovery = formData.discovery;
  const permissions = formData.permissions;

  const updateChild = (field: keyof ChildFormState, value: unknown) => {
    const updated = [...children];
    updated[activeChildIndex] = { ...child, [field]: value };
    onChange({ children: updated });
  };

  const updateDiscovery = (field: string, value: unknown) => {
    onChange({ discovery: { ...discovery, [field]: value } });
  };

  const updatePermissions = (field: string, value: unknown) => {
    onChange({ permissions: { ...permissions, [field]: value } });
  };

  // [AUDIT R1 FIX C1] Build labels map: canonical value -> translated display text.
  // ChecklistField stores canonical values (e.g., 'google_search') in state,
  // but renders translated labels (e.g., 'Google search') for the user.
  const howFoundUsLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const o of HOW_FOUND_US_OPTIONS) {
      map[o] = t(`howFoundUs_${o}`);
    }
    return map;
  }, [t]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-2">
          {t("step5Title")}
        </h2>
        <p className="text-sm text-[#666]">{t("step5Subtitle")}</p>
      </div>

      {/* Video upload per child */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("childVideo")}</h3>
        <ChildTabs children={children} activeIndex={activeChildIndex}
          onSelect={onActiveChildChange} showAddButton={false} t={t} />
        <VideoUpload
          child={child}
          childIndex={activeChildIndex}
          resumeToken={resumeToken}
          onVideoUploaded={(path) => {
            updateChild("videoUrl", path);
            updateChild("videoSubmittedVia", "upload");
          }}
          onWhatsAppSelected={() => updateChild("videoSubmittedVia", "whatsapp")}
          t={t}
        />
      </div>

      {/* Parent passport uploads */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("parentPassports")}</h3>
        <FileUploadField
          label={t("parent1Passport")}
          accept="image/jpeg,image/png,image/webp,application/pdf"
          maxSizeMB={10}
          resumeToken={resumeToken}
          documentScope="parent1"
          fileType="passport"
          currentUrl={formData.family.parent1PassportUrl || undefined}
          onUploaded={(path) => onChange({ family: { ...formData.family, parent1PassportUrl: path } })}
          required
        />
        <FileUploadField
          label={t("parent2Passport")}
          accept="image/jpeg,image/png,image/webp,application/pdf"
          maxSizeMB={10}
          resumeToken={resumeToken}
          documentScope="parent2"
          fileType="passport"
          currentUrl={formData.family.parent2PassportUrl || undefined}
          onUploaded={(path) => onChange({ family: { ...formData.family, parent2PassportUrl: path } })}
        />
      </div>

      {/* Discovery */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("discoveryTitle")}</h3>
        <ChecklistField
          label={t("howFoundUs")}
          options={HOW_FOUND_US_OPTIONS}
          labels={howFoundUsLabels}
          selected={discovery.howFoundUs}
          onChange={(v) => updateDiscovery("howFoundUs", v)}
          required
        />
        {errors["discovery.howFoundUs"] && (
          <p className="text-xs text-red-500 -mt-3">{errors["discovery.howFoundUs"]}</p>
        )}
        <FormField label={t("whyJoining")} id="why-joining" required error={errors["discovery.whyJoining"]}>
          <textarea id="why-joining" rows={4} value={discovery.whyJoining}
            onChange={(e) => updateDiscovery("whyJoining", e.target.value)} className={textareaClassName}
            placeholder={t("whyJoiningPlaceholder")} />
        </FormField>
        <FormField label={t("additionalInfo")} id="additional-info">
          <textarea id="additional-info" rows={3} value={discovery.additionalInfo}
            onChange={(e) => updateDiscovery("additionalInfo", e.target.value)} className={textareaClassName}
            placeholder={t("additionalInfoPlaceholder")} />
        </FormField>
      </div>

      {/* Permissions */}
      <div className="space-y-5">
        <h3 className="text-lg font-medium text-[#2d2d2d]">{t("permissionsTitle")}</h3>

        <div>
          <p className="text-sm font-medium text-[#2d2d2d] mb-3">
            {t("photoPermission")} <span className="text-red-500">*</span>
          </p>
          <div className="space-y-2">
            {PHOTO_PERMISSIONS.map((option) => (
              <label key={option.value}
                className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  permissions.photoPermission === option.value
                    ? "border-[#BED7AF] bg-[#BED7AF]/10"
                    : "border-gray-200"
                }`}>
                <input type="radio" name="photoPermission" value={option.value}
                  checked={permissions.photoPermission === option.value}
                  onChange={() => updatePermissions("photoPermission", option.value)}
                  className="sr-only" />
                <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0 ${
                  permissions.photoPermission === option.value
                    ? "border-[#BED7AF] bg-[#BED7AF]"
                    : "border-gray-300"
                }`} />
                <span className="text-sm text-[#2d2d2d]">{option.label}</span>
              </label>
            ))}
          </div>
          {errors["permissions.photoPermission"] && (
            <p className="text-xs text-red-500 mt-1">{errors["permissions.photoPermission"]}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={permissions.termsAcknowledged}
              onChange={(e) => updatePermissions("termsAcknowledged", e.target.checked)}
              className="mt-1 rounded border-gray-300" />
            <span className="text-sm text-[#2d2d2d]">{t("termsAcknowledge")}</span>
          </label>
          {errors["permissions.termsAcknowledged"] && (
            <p className="text-xs text-red-500 ml-7">{errors["permissions.termsAcknowledged"]}</p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={permissions.allStatementsTrue}
              onChange={(e) => updatePermissions("allStatementsTrue", e.target.checked)}
              className="mt-1 rounded border-gray-300" />
            <span className="text-sm text-[#2d2d2d]">{t("allStatementsTrue")}</span>
          </label>
          {errors["permissions.allStatementsTrue"] && (
            <p className="text-xs text-red-500 ml-7">{errors["permissions.allStatementsTrue"]}</p>
          )}
        </div>
      </div>

      {/* Review panel */}
      <ReviewPanel formData={formData} t={t} />
    </div>
  );
}
