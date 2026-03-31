// src/components/enrollment/ChecklistField.tsx
"use client";

interface ChecklistFieldProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
  // [AUDIT R1 FIX C1+I5] Optional display labels for options.
  // When provided, options are used as values (stored in state/DB)
  // and labels are used for rendering. Keys must match option values.
  labels?: Record<string, string>;
}

export default function ChecklistField({
  label,
  options,
  selected,
  onChange,
  required,
  labels,
}: ChecklistFieldProps) {
  const toggle = (option: string) => {
    if (option === "None") {
      // "None" deselects everything else
      onChange(selected.includes("None") ? [] : ["None"]);
      return;
    }
    // Selecting anything else removes "None"
    const withoutNone = selected.filter((s) => s !== "None");
    if (withoutNone.includes(option)) {
      onChange(withoutNone.filter((s) => s !== option));
    } else {
      onChange([...withoutNone, option]);
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-[#2d2d2d] mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border cursor-pointer transition-colors ${
              selected.includes(option)
                ? "border-[#BED7AF] bg-[#BED7AF]/10 text-[#2d2d2d]"
                : "border-gray-200 text-[#666] hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => toggle(option)}
              className="sr-only"
            />
            {labels ? labels[option] || option : option}
          </label>
        ))}
      </div>
    </div>
  );
}
