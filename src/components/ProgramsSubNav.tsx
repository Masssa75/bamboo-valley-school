"use client";

import { useState, useEffect } from "react";

const programs = [
  { id: "nursery", label: "Nursery", ages: "2-4" },
  { id: "kindergarten", label: "Kindergarten", ages: "3-6" },
  { id: "primary", label: "Primary", ages: "6-9" },
  { id: "toddler", label: "Toddler Class", ages: "1-3" },
  { id: "after-school", label: "After School", ages: "3-6" },
  { id: "saturday", label: "Saturday", ages: "3-6" },
  { id: "camps", label: "Camps", ages: "3-12" },
];

export default function ProgramsSubNav() {
  const [activeSection, setActiveSection] = useState("nursery");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if sub-nav should be sticky (after scrolling past hero)
      setIsSticky(window.scrollY > 200);

      // Find which section is currently in view
      const sections = programs.map((p) => document.getElementById(p.id));
      const scrollPosition = window.scrollY + 150; // Offset for nav height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(programs[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for fixed nav heights
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`${
        isSticky ? "fixed top-[72px] left-0 right-0 shadow-md z-40" : ""
      } bg-white border-b border-gray-100 transition-shadow`}
    >
      <div className="max-w-[1100px] mx-auto px-4">
        <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => scrollToSection(program.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeSection === program.id
                  ? "bg-[#BED7AF] text-[#2d2d2d]"
                  : "text-[#666] hover:bg-gray-100"
              }`}
            >
              {program.label}
              <span className="ml-1 text-xs opacity-60">({program.ages})</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
