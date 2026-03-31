// src/components/enrollment/ChildTabs.tsx
"use client";

import type { ChildFormState } from "@/lib/enrollment/types";

interface ChildTabsProps {
  children: ChildFormState[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onAdd?: () => void;          // [AUDIT R2 FIX I9] Optional — only provided in Step 2
  showAddButton?: boolean;     // [AUDIT R2 FIX I9] Default true. Set false in Steps 3-5.
  t: (key: string) => string;
}

export default function ChildTabs({ children: childList, activeIndex, onSelect, onAdd, showAddButton = true, t }: ChildTabsProps) {
  if (childList.length <= 1) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
      {childList.map((child, i) => {
        const name = child.preferredName || child.fullName || `${t("child")} ${i + 1}`;
        const isComplete = !!child.fullName && !!child.dateOfBirth;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              i === activeIndex
                ? "bg-[#C8DCE1] text-[#2d2d2d]"
                : "bg-gray-100 text-[#666] hover:bg-gray-200"
            }`}
          >
            {name}
            {isComplete && (
              <svg className="w-3.5 h-3.5 text-[#8fb07a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        );
      })}
      {/* [AUDIT R2 FIX I9] Only show "Add child" when showAddButton is true (Step 2 only) */}
      {showAddButton && onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-[#8fb07a] hover:bg-[#BED7AF]/10 transition-colors"
        >
          + {t("addChild")}
        </button>
      )}
    </div>
  );
}
