// src/components/enrollment/ReviewPanel.tsx
"use client";

import { useState } from "react";
import type { EnrollmentFormState } from "@/lib/enrollment/types";
import { PROGRAMS, ENGLISH_LEVELS, PHOTO_PERMISSIONS, DIAGNOSED_CONDITIONS, PHYSICAL_LIMITATIONS, SUPPORT_RECEIVED, HOW_FOUND_US_OPTIONS } from "@/lib/enrollment/programs";

interface ReviewPanelProps {
  formData: EnrollmentFormState;
  t: (key: string) => string;
}

function Field({ label, value }: { label: string; value?: string | boolean | null }) {
  if (value === undefined || value === null || value === "") return null;
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
  return (
    <div className="grid grid-cols-3 gap-2 py-1.5 border-b border-gray-50 last:border-0">
      <dt className="text-[#999] text-xs">{label}</dt>
      <dd className="col-span-2 text-[#2d2d2d] text-sm">{display}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <h4 className="text-sm font-medium text-[#2d2d2d] border-b border-gray-200 pb-1 mb-2">{title}</h4>
      <dl>{children}</dl>
    </div>
  );
}

export default function ReviewPanel({ formData, t }: ReviewPanelProps) {
  const [open, setOpen] = useState(false);
  const family = formData.family;
  const p1 = family.parent1;
  const p2 = family.parent2;
  const ec = family.emergencyContact;

  const programLabel = (val: string) => PROGRAMS.find((p) => p.value === val)?.label || val;
  const englishLabel = (val: string) => ENGLISH_LEVELS.find((e) => e.value === val)?.label || val;
  const photoLabel = (val: string) => PHOTO_PERMISSIONS.find((p) => p.value === val)?.label || val;
  const howFoundLabels = (vals: string[]) => vals.map(v => {
    const key = `howFoundUs_${v}`;
    try { return t(key); } catch { return v; }
  }).join(", ");

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-[#FAF9F6] hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-[#2d2d2d]">{t("reviewTitle")}</span>
        <svg
          className={`w-4 h-4 text-[#666] transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="p-4 space-y-6 text-sm">
          {/* Parent 1 */}
          <Section title={t("parent1Additional")}>
            <Field label={t("parentName")} value={p1.fullName} />
            <Field label={t("parentEmail")} value={p1.email} />
            <Field label={t("parentPhone")} value={p1.phone} />
            <Field label={t("nationality")} value={p1.nationality} />
            <Field label={t("languages")} value={p1.languages} />
            <Field label={t("occupation")} value={p1.occupation} />
          </Section>

          {/* Parent 2 */}
          {p2?.fullName && (
            <Section title={t("parent2Title")}>
              <Field label={t("parentName")} value={p2.fullName} />
              <Field label={t("parentEmail")} value={p2.email} />
              <Field label={t("parentPhone")} value={p2.phone} />
              <Field label={t("nationality")} value={p2.nationality} />
              <Field label={t("languages")} value={p2.languages} />
              <Field label={t("occupation")} value={p2.occupation} />
            </Section>
          )}

          {/* Family situation */}
          {!family.parentsTogether && (
            <Section title={t("parentsTogether")}>
              <Field label={t("parentalStatus")} value={family.parentalStatus} />
              <Field label={t("childLivingWith")} value={family.childLivingWith} />
              <Field label={t("custodyArrangement")} value={family.custodyArrangement} />
            </Section>
          )}

          {/* Address */}
          <Section title={t("addressTitle")}>
            {family.notYetInPhuket ? (
              <Field label={t("expectedArrival")} value={family.expectedArrivalDate} />
            ) : (
              <>
                <Field label={t("currentAddress")} value={family.address} />
                {family.parent2Address && <Field label={`${p2?.fullName || "Parent 2"}`} value={family.parent2Address} />}
              </>
            )}
          </Section>

          {/* Guardian */}
          {family.hasGuardian && family.guardianName && (
            <Section title={t("hasGuardian")}>
              <Field label={t("guardianName")} value={family.guardianName} />
              <Field label={t("occupation")} value={family.guardianOccupation} />
              <Field label={t("parentPhone")} value={family.guardianPhone} />
              <Field label={t("parentEmail")} value={family.guardianEmail} />
            </Section>
          )}

          {/* Emergency contact */}
          <Section title={t("emergencyContact")}>
            <Field label={t("emergencyName")} value={ec.fullName} />
            <Field label={t("emergencyRelationship")} value={ec.relationship} />
            <Field label={t("emergencyPhone")} value={ec.phone} />
          </Section>

          {/* Each child */}
          {formData.children.map((child, i) => (
            <div key={i} className="space-y-4">
              <Section title={child.fullName || `Child ${i + 1}`}>
                <Field label={t("preferredName")} value={child.preferredName} />
                <Field label={t("dateOfBirth")} value={child.dateOfBirth} />
                <Field label={t("gender")} value={child.gender} />
                <Field label={t("nationality")} value={child.nationality} />
                <Field label={t("program")} value={programLabel(child.program)} />
                <Field label={t("previousSchool")} value={child.previousSchool} />
                <Field label={t("preferredStartDate")} value={child.preferredStartDate} />
                <Field label={t("intendedDuration")} value={child.intendedDuration} />
              </Section>

              {/* Social */}
              <Section title={`${child.fullName || `Child ${i + 1}`} — ${t("socialEmotional")}`}>
                <Field label={t("favoriteActivities")} value={child.favoriteActivities} />
                <Field label={t("whatUpsets")} value={child.whatUpsetsChild} />
                <Field label={t("howExpresses")} value={child.howExpressesUpset} />
              </Section>

              {/* Health */}
              <Section title={`${child.fullName || `Child ${i + 1}`} — ${t("healthTitle")}`}>
                <Field label={t("homeLanguages")} value={child.homeLanguages} />
                <Field label={t("englishLevel")} value={englishLabel(child.englishLevel)} />
                <Field label={t("lifeThreatening")} value={child.hasLifeThreatening} />
                {child.lifeThreateningDetail && <Field label="Details" value={child.lifeThreateningDetail} />}
                <Field label={t("allergies")} value={child.hasAllergies} />
                {child.allergyDetail && <Field label="Details" value={child.allergyDetail} />}
                <Field label={t("dailyMedication")} value={child.hasDailyMedication} />
                {child.medicationDetail && <Field label="Details" value={child.medicationDetail} />}
                <Field label={t("peRestriction")} value={child.hasPeRestriction} />
                {child.peRestrictionDetail && <Field label="Details" value={child.peRestrictionDetail} />}
                <Field label={t("hasInsurance")} value={child.hasInsurance} />
                {child.insuranceCompany && <Field label={t("insuranceCompany")} value={child.insuranceCompany} />}
                {child.policyNumber && <Field label={t("policyNumber")} value={child.policyNumber} />}
                {child.otherHealthInfo && <Field label={t("otherHealthInfo")} value={child.otherHealthInfo} />}
              </Section>

              {/* Learning */}
              {child.needsLearningSupport && (
                <Section title={`${child.fullName || `Child ${i + 1}`} — ${t("learningSupport")}`}>
                  {child.diagnosedConditions.length > 0 && (
                    <Field label={t("diagnosedConditions")} value={child.diagnosedConditions.join(", ")} />
                  )}
                  <Field label={t("diagnosisDescription")} value={child.diagnosisDescription} />
                  {child.physicalLimitations.length > 0 && (
                    <Field label={t("physicalLimitations")} value={child.physicalLimitations.join(", ")} />
                  )}
                  <Field label="Details" value={child.physicalLimitationsDetail} />
                  {child.supportReceived.length > 0 && (
                    <Field label={t("supportReceived")} value={child.supportReceived.join(", ")} />
                  )}
                  <Field label={t("classroomAccommodations")} value={child.classroomAccommodations} />
                </Section>
              )}

              {child.hasBehavioralChallenges && (
                <Section title={`${child.fullName || `Child ${i + 1}`} — Behavioral`}>
                  <Field label={t("seesTherapist")} value={child.seesTherapist} />
                  <Field label="Details" value={child.behavioralDetails} />
                </Section>
              )}

              {/* Documents */}
              <Section title={`${child.fullName || `Child ${i + 1}`} — Documents`}>
                <Field label={t("childPassport")} value={child.passportUrl ? "Uploaded" : "Not uploaded"} />
                <Field label={t("videoUploadTitle")} value={
                  child.videoSubmittedVia === "whatsapp" ? "Via WhatsApp" :
                  child.videoUrl ? "Uploaded" : "Not uploaded"
                } />
              </Section>
            </div>
          ))}

          {/* Discovery */}
          <Section title={t("discoveryTitle")}>
            {formData.discovery.howFoundUs.length > 0 && (
              <Field label={t("howFoundUs")} value={howFoundLabels(formData.discovery.howFoundUs)} />
            )}
            <Field label={t("whyJoining")} value={formData.discovery.whyJoining} />
            <Field label={t("additionalInfo")} value={formData.discovery.additionalInfo} />
          </Section>

          {/* Permissions */}
          <Section title={t("permissionsTitle")}>
            <Field label={t("photoPermission")} value={photoLabel(formData.permissions.photoPermission)} />
          </Section>
        </div>
      )}
    </div>
  );
}
