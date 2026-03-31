// src/components/enrollment/ConfirmationScreen.tsx
"use client";

interface ConfirmationScreenProps {
  referenceNumber: string;
  t: (key: string) => string;
}

export default function ConfirmationScreen({ referenceNumber, t }: ConfirmationScreenProps) {
  return (
    <div className="text-center py-12 px-6">
      <div className="w-16 h-16 bg-[#BED7AF] rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-[#2d2d2d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-4">
        {t("confirmationTitle")}
      </h2>

      <p className="text-[#666] mb-6 max-w-md mx-auto">
        {t("confirmationMessage")}
      </p>

      <div className="inline-block bg-[#FAF9F6] rounded-lg px-6 py-4 mb-8">
        <p className="text-sm text-[#999] mb-1">{t("referenceNumber")}</p>
        <p className="text-xl font-medium text-[#2d2d2d] font-mono">{referenceNumber}</p>
      </div>

      <p className="text-sm text-[#999] max-w-md mx-auto">
        {t("confirmationNote")}
      </p>
    </div>
  );
}
