// src/components/enrollment/SaveIndicator.tsx
"use client";

interface SaveIndicatorProps {
  status: "idle" | "saving" | "saved" | "error";
  t: (key: string) => string;
}

export default function SaveIndicator({ status, t }: SaveIndicatorProps) {
  if (status === "idle") return null;

  return (
    <div className="flex items-center gap-2 text-xs">
      {status === "saving" && (
        <>
          <div className="w-2 h-2 rounded-full bg-[#FAD7AA] animate-pulse" />
          <span className="text-[#999]">{t("saving")}</span>
        </>
      )}
      {status === "saved" && (
        <>
          <div className="w-2 h-2 rounded-full bg-[#BED7AF]" />
          <span className="text-[#8fb07a]">{t("draftSaved")}</span>
        </>
      )}
      {status === "error" && (
        <>
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span className="text-red-400">{t("saveError")}</span>
        </>
      )}
    </div>
  );
}
