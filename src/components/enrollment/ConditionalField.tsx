// src/components/enrollment/ConditionalField.tsx
"use client";

interface ConditionalFieldProps {
  question: string;
  value: boolean;
  onChange: (val: boolean) => void;
  required?: boolean;
  yesLabel?: string;
  noLabel?: string;
  children: React.ReactNode;
}

export default function ConditionalField({
  question,
  value,
  onChange,
  required,
  yesLabel = "Yes",
  noLabel = "No",
  children,
}: ConditionalFieldProps) {
  return (
    <div className="space-y-3">
      <fieldset>
        <legend className="text-sm font-medium text-[#2d2d2d]">
          {question} {required && <span className="text-red-500">*</span>}
        </legend>
        <div className="flex gap-4 mt-2">
          <label
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
              value === true ? "border-[#BED7AF] bg-[#BED7AF]/10" : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              checked={value === true}
              onChange={() => onChange(true)}
              className="sr-only"
            />
            {yesLabel}
          </label>
          <label
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-colors ${
              value === false ? "border-[#BED7AF] bg-[#BED7AF]/10" : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              checked={value === false}
              onChange={() => onChange(false)}
              className="sr-only"
            />
            {noLabel}
          </label>
        </div>
      </fieldset>
      {value === true && (
        <div className="ml-4 pl-4 border-l-2 border-[#C8DCE1] space-y-3 transition-all duration-200">
          {children}
        </div>
      )}
    </div>
  );
}
