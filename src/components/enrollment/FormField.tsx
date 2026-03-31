// src/components/enrollment/FormField.tsx
"use client";

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  helper?: string;
  children: React.ReactNode;
}

export default function FormField({ label, id, required, error, helper, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#2d2d2d] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {helper && !error && (
        <p className="text-xs text-[#999] mt-1">{helper}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}

// Shared input className for consistency (matches ContactForm.tsx pattern)
export const inputClassName =
  "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#BED7AF] focus:ring-2 focus:ring-[#BED7AF]/20 outline-none transition-colors";

export const textareaClassName =
  "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#BED7AF] focus:ring-2 focus:ring-[#BED7AF]/20 outline-none transition-colors resize-none";

export const selectClassName =
  "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#BED7AF] focus:ring-2 focus:ring-[#BED7AF]/20 outline-none transition-colors bg-white";
