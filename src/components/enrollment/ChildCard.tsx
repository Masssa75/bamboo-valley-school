// src/components/enrollment/ChildCard.tsx
"use client";

import type { ChildFormState } from "@/lib/enrollment/types";
import { getAgeDisplay } from "@/lib/enrollment/programs";

interface ChildCardProps {
  child: ChildFormState;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  t: (key: string) => string;
}

export default function ChildCard({ child, index, canRemove, onRemove, t }: ChildCardProps) {
  const name = child.preferredName || child.fullName || `${t("child")} ${index + 1}`;
  const age = child.dateOfBirth ? getAgeDisplay(child.dateOfBirth) : "";

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF9F6] border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#C8DCE1] flex items-center justify-center text-sm font-medium text-[#2d2d2d]">
          {index + 1}
        </div>
        <div>
          <p className="text-sm font-medium text-[#2d2d2d]">{name}</p>
          {age && <p className="text-xs text-[#666]">{age}</p>}
        </div>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-[#999] hover:text-[#EBC3C3] transition-colors"
        >
          {t("remove")}
        </button>
      )}
    </div>
  );
}
