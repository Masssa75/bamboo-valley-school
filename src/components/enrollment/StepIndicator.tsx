// src/components/enrollment/StepIndicator.tsx
"use client";

const STEPS = [
  { num: 1, key: "gettingStarted" },
  { num: 2, key: "yourChildren" },
  { num: 3, key: "familyProfile" },
  { num: 4, key: "healthLearning" },
  { num: 5, key: "finalize" },
];

interface StepIndicatorProps {
  currentStep: number;
  t: (key: string) => string;
}

export default function StepIndicator({ currentStep, t }: StepIndicatorProps) {
  return (
    <div data-step-indicator>
      {/* Mobile: text only */}
      <div className="md:hidden text-center mb-6">
        <p className="text-sm text-[#666]">
          {t("stepOf").replace("{current}", String(currentStep)).replace("{total}", "5")}
        </p>
        <p className="text-base font-medium text-[#2d2d2d]">
          {t(`step${currentStep}Title`)}
        </p>
      </div>

      {/* Desktop: horizontal stepper */}
      <div className="hidden md:flex items-center justify-between mb-10 max-w-[600px] mx-auto">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step.num < currentStep
                    ? "bg-[#BED7AF] text-[#2d2d2d]"
                    : step.num === currentStep
                    ? "bg-[#C8DCE1] text-[#2d2d2d]"
                    : "bg-gray-100 text-[#999]"
                }`}
              >
                {step.num < currentStep ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span className="text-xs mt-1 text-[#666] whitespace-nowrap">
                {t(`step${step.num}Short`)}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-1 ${
                  step.num < currentStep ? "bg-[#BED7AF]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
