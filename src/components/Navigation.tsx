"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { type Locale } from "@/i18n/config";

interface NavigationProps {
  variant?: "dark" | "light";
  locale?: Locale;
}

export default function Navigation({ variant = "dark", locale = "en" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [wellbeingOpen, setWellbeingOpen] = useState(false);
  const t = useTranslations("nav");
  const currentLocale = locale;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const useDarkText = variant === "light" || scrolled;

  // Helper to create locale-aware links
  const localePath = (path: string) => `/${currentLocale}${path}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-lg" : variant === "light" ? "bg-white/80" : "bg-transparent"
      }`}
    >
      <Link
        href={localePath("/")}
        className={`font-serif text-2xl font-semibold transition-colors ${
          useDarkText ? "text-[#2d2d2d]" : "text-white"
        }`}
      >
        Bamboo Valley
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-8 items-center list-none">
        <li>
          <Link
            href={localePath("/our-story")}
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            {t("ourStory")}
          </Link>
        </li>
        {/* Programs Dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setProgramsOpen(true)}
          onMouseLeave={() => setProgramsOpen(false)}
        >
          <button
            onClick={() => setProgramsOpen(!programsOpen)}
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] flex items-center gap-1 ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            {t("programs")}
            <svg className={`w-3 h-3 transition-transform ${programsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {programsOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4 min-w-[280px]">
                <Link
                  href={localePath("/programs")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors"
                >
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">📋</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("allPrograms")}</div>
                    <div className="text-xs text-[#888]">{t("overviewDetails")}</div>
                  </div>
                </Link>

                <div className="border-t border-gray-100 my-2"></div>

                <Link href={localePath("/programs#nursery")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🌱</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("nursery")}</div>
                    <div className="text-xs text-[#888]">{t("nurseryAges")}</div>
                  </div>
                </Link>

                <Link href={localePath("/programs#kindergarten")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🎨</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("kindergarten")}</div>
                    <div className="text-xs text-[#888]">{t("kindergartenAges")}</div>
                  </div>
                </Link>

                <Link href={localePath("/programs#primary")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">📚</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("primary")}</div>
                    <div className="text-xs text-[#888]">{t("primaryAges")}</div>
                  </div>
                </Link>

                <div className="border-t border-gray-100 my-2"></div>

                <Link href={localePath("/programs#toddler")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">👶</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("parentToddler")}</div>
                    <div className="text-xs text-[#888]">{t("parentToddlerAges")}</div>
                  </div>
                </Link>

                <Link href={localePath("/programs#after-school")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🎭</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("afterSchool")}</div>
                    <div className="text-xs text-[#888]">{t("afterSchoolAges")}</div>
                  </div>
                </Link>

                <Link href={localePath("/programs#saturday")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🪴</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("saturdayWorkshop")}</div>
                    <div className="text-xs text-[#888]">{t("saturdayWorkshopAges")}</div>
                  </div>
                </Link>

                <Link href={localePath("/programs#camps")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🏕️</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("holidayCamps")}</div>
                    <div className="text-xs text-[#888]">{t("holidayCampsAges")}</div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </li>
        {/* Child Wellbeing Dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setWellbeingOpen(true)}
          onMouseLeave={() => setWellbeingOpen(false)}
        >
          <button
            onClick={() => setWellbeingOpen(!wellbeingOpen)}
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] flex items-center gap-1 ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            {t("childWellbeing")}
            <svg className={`w-3 h-3 transition-transform ${wellbeingOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {wellbeingOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4 min-w-[280px]">
                <Link href={localePath("/child-wellbeing")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">💚</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("overview")}</div>
                    <div className="text-xs text-[#888]">{t("howWeSupport")}</div>
                  </div>
                </Link>

                <div className="border-t border-gray-100 my-2"></div>

                <Link href={localePath("/child-wellbeing/our-approach")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🤝</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("ourApproach")}</div>
                    <div className="text-xs text-[#888]">{t("collaborativeProblemSolving")}</div>
                  </div>
                </Link>

                <Link href={localePath("/child-wellbeing/understanding")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🔍</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("understandingYourChild")}</div>
                    <div className="text-xs text-[#888]">{t("findingRootCause")}</div>
                  </div>
                </Link>

                <Link href={localePath("/child-wellbeing/behavior-support")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">📋</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("behaviorSupport")}</div>
                    <div className="text-xs text-[#888]">{t("tierResponse")}</div>
                  </div>
                </Link>

                <Link href={localePath("/child-wellbeing/separation-anxiety")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🫂</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("separationAnxiety")}</div>
                    <div className="text-xs text-[#888]">{t("helpingWithGoodbyes")}</div>
                  </div>
                </Link>

                <Link href={localePath("/child-wellbeing/code-of-conduct")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">📜</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("codeOfConduct")}</div>
                    <div className="text-xs text-[#888]">{t("staffVolunteerGuidelines")}</div>
                  </div>
                </Link>

                <div className="border-t border-gray-100 my-2"></div>

                <Link href={localePath("/science")} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#BED7AF]/20 transition-colors">
                  <span className="w-9 h-9 bg-[#BED7AF] rounded-lg flex items-center justify-center text-base">🔬</span>
                  <div>
                    <div className="text-sm font-medium text-[#2d2d2d]">{t("theResearch")}</div>
                    <div className="text-xs text-[#888]">{t("scienceBehindApproach")}</div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </li>
        <li>
          <Link
            href={localePath("/contact")}
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            {t("visitUs")}
          </Link>
        </li>
        <li>
          <LanguageSwitcher currentLocale={currentLocale} variant={scrolled ? "light" : variant} />
        </li>
        <li>
          <Link
            href={localePath("/contact")}
            className="bg-[#BED7AF] text-[#2d2d2d] px-6 py-2.5 rounded text-sm font-medium hover:bg-[#8fb07a] transition-colors"
          >
            Enquire
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <LanguageSwitcher currentLocale={currentLocale} variant={scrolled ? "light" : variant} />
        <button
          className="p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className={`w-6 h-6 ${useDarkText ? "text-[#2d2d2d]" : "text-white"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="flex flex-col py-4">
            <Link href={localePath("/our-story")} className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t("ourStory")}</Link>
            <Link href={localePath("/programs")} className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100 font-medium" onClick={() => setMobileMenuOpen(false)}>{t("programs")}</Link>
            <Link href={localePath("/programs#nursery")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("nursery")} <span className="text-[#999]">2–4</span></Link>
            <Link href={localePath("/programs#kindergarten")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("kindergarten")} <span className="text-[#999]">3–6</span></Link>
            <Link href={localePath("/programs#primary")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("primary")} <span className="text-[#999]">6–9</span></Link>
            <Link href={localePath("/programs#camps")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("holidayCamps")}</Link>
            <Link href={localePath("/child-wellbeing")} className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100 font-medium" onClick={() => setMobileMenuOpen(false)}>{t("childWellbeing")}</Link>
            <Link href={localePath("/child-wellbeing/our-approach")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("ourApproach")}</Link>
            <Link href={localePath("/child-wellbeing/understanding")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("understandingYourChild")}</Link>
            <Link href={localePath("/child-wellbeing/behavior-support")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("behaviorSupport")}</Link>
            <Link href={localePath("/child-wellbeing/separation-anxiety")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("separationAnxiety")}</Link>
            <Link href={localePath("/child-wellbeing/code-of-conduct")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("codeOfConduct")}</Link>
            <Link href={localePath("/science")} className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>{t("theResearch")}</Link>
            <Link href={localePath("/contact")} className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>{t("visitUs")}</Link>
            <div className="px-6 py-3">
              <Link href={localePath("/contact")} className="btn btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>Enquire</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
