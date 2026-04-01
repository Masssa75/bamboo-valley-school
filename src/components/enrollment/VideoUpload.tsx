// src/components/enrollment/VideoUpload.tsx
"use client";

import { useState } from "react";
import FileUploadField from "./FileUploadField";
import type { ChildFormState } from "@/lib/enrollment/types";

interface VideoUploadProps {
  child: ChildFormState;
  childIndex: number;
  resumeToken: string;
  onVideoUploaded: (filePath: string) => void;
  onWhatsAppSelected: () => void;
  t: (key: string) => string;
}

export default function VideoUpload({
  child,
  childIndex,
  resumeToken,
  onVideoUploaded,
  onWhatsAppSelected,
  t,
}: VideoUploadProps) {
  const [mode, setMode] = useState<"upload" | "whatsapp">(
    child.videoSubmittedVia === "whatsapp" ? "whatsapp" : "upload"
  );

  // Age-appropriate prompt
  const ageMonths = child.dateOfBirth ? getAgeInMonths(child.dateOfBirth) : null;
  const prompt = ageMonths !== null && ageMonths < 36
    ? t("videoPromptYoung")
    : t("videoPromptOlder");

  const childName = child.preferredName || child.fullName || `Child ${childIndex + 1}`;
  const resumeRef = resumeToken?.slice(0, 6) || "DRAFT";

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-[#2d2d2d] mb-1">{t("videoTitle")}</p>
        <p className="text-sm text-[#666]">{prompt}</p>
        <p className="text-xs text-[#999] mt-1">{t("videoTip")}</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${
            mode === "upload"
              ? "border-[#BED7AF] bg-[#BED7AF]/10 text-[#2d2d2d]"
              : "border-gray-200 text-[#666]"
          }`}
        >
          {t("uploadVideo")}
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("whatsapp");
            onWhatsAppSelected();
          }}
          className={`flex-1 py-2 px-4 rounded-lg border-2 text-sm font-medium transition-colors ${
            mode === "whatsapp"
              ? "border-[#BED7AF] bg-[#BED7AF]/10 text-[#2d2d2d]"
              : "border-gray-200 text-[#666]"
          }`}
        >
          {t("sendViaWhatsApp")}
        </button>
      </div>

      {mode === "upload" ? (
        <FileUploadField
          label=""
          accept="video/mp4,video/quicktime,video/webm,video/x-msvideo"
          maxSizeMB={1000}
          resumeToken={resumeToken}
          documentScope="child"
          childIndex={childIndex}
          fileType="video"
          currentUrl={child.videoUrl || undefined}
          onUploaded={onVideoUploaded}
        />
      ) : (
        <div className="p-4 rounded-lg bg-[#FAF9F6] border border-gray-200">
          <p className="text-sm text-[#666] mb-3">{t("whatsAppInstructions")}</p>
          <a
            href={`https://wa.me/66989124218?text=${encodeURIComponent(
              `Enrollment video for ${childName} (ref: ${resumeRef})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#128C7E] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("openWhatsApp")}
          </a>
        </div>
      )}
    </div>
  );
}

// Inline helper to avoid circular dependency with programs.ts
function getAgeInMonths(dob: string): number | null {
  if (!dob) return null;
  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  const now = new Date();
  return (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
}
