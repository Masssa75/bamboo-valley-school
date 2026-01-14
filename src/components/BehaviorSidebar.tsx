"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

interface BehaviorSidebarProps {
  locale: string;
}

export default function BehaviorSidebar({ locale }: BehaviorSidebarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const links = [
    {
      href: `/${locale}/child-wellbeing`,
      label: t("ourPhilosophy"),
      subtitle: t("cpsApproach"),
    },
    {
      href: `/${locale}/child-wellbeing/our-system`,
      label: t("classroomRules"),
      subtitle: t("fourRulesSubtitle"),
    },
    {
      href: `/${locale}/child-wellbeing/understanding`,
      label: t("whenChildrenStruggle"),
      subtitle: t("alsupAssessment"),
    },
  ];

  const isActive = (href: string) => {
    // Handle trailing slashes and exact matches
    const normalizedPath = pathname.replace(/\/$/, "");
    const normalizedHref = href.replace(/\/$/, "");
    return normalizedPath === normalizedHref;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-28">
          <nav className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-serif text-sm font-semibold text-[#666] uppercase tracking-wide mb-4 px-3">
              {t("childWellbeing")}
            </h3>
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-lg transition-all ${
                      isActive(link.href)
                        ? "bg-[#BED7AF]/30 border-l-3 border-[#8fb07a]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        isActive(link.href) ? "text-[#2d2d2d]" : "text-[#444]"
                      }`}
                    >
                      {link.label}
                    </div>
                    <div className="text-xs text-[#888] mt-0.5">{link.subtitle}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#8fb07a] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#7a9d68] transition-colors"
        aria-label="Open section navigation"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-lg font-semibold text-[#2d2d2d]">
              {t("childWellbeing")}
            </h3>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all ${
                      isActive(link.href)
                        ? "bg-[#BED7AF]/30 border-l-4 border-[#8fb07a]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`text-base font-medium ${
                        isActive(link.href) ? "text-[#2d2d2d]" : "text-[#444]"
                      }`}
                    >
                      {link.label}
                    </div>
                    <div className="text-sm text-[#888] mt-0.5">{link.subtitle}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
