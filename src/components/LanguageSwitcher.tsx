"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeNames, localeFlags, type Locale } from "@/i18n/config";

// Only show these locales in the switcher (others are not ready yet)
const enabledLocales: Locale[] = ["en", "th", "ru"];

// Short codes for pill display
const localeCodes: Record<Locale, string> = {
  en: "EN",
  th: "TH",
  ru: "RU",
  zh: "ZH",
};

interface LanguageSwitcherProps {
  currentLocale: Locale;
  variant?: "dark" | "light";
}

export default function LanguageSwitcher({
  currentLocale,
  variant = "dark",
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    // Get the path without the current locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    // Navigate to the new locale path (use window.location for static export compatibility)
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    window.location.href = newPath;
    setIsOpen(false);
  };

  const isDark = variant === "dark";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${
          isDark
            ? "bg-white/15 text-white border border-white/20 hover:bg-white/25"
            : "bg-gray-100 text-[#2d2d2d] border border-gray-200 hover:bg-gray-200"
        }`}
        aria-label="Select language"
      >
        <span className="text-sm">{localeFlags[currentLocale]}</span>
        <span>{localeCodes[currentLocale]}</span>
        <svg
          className={`w-2.5 h-2.5 opacity-60 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 min-w-[140px]">
            {enabledLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm text-left transition-colors ${
                  locale === currentLocale
                    ? "bg-[#BED7AF]/30 text-[#2d2d2d] font-medium"
                    : "text-[#666] hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
                {locale === currentLocale && (
                  <svg
                    className="w-4 h-4 ml-auto text-[#8fb07a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
