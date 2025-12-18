"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavigationProps {
  variant?: "dark" | "light"; // dark = white text on transparent (for dark heroes), light = dark text (for light backgrounds)
}

export default function Navigation({ variant = "dark" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use dark text styling if variant is "light" OR if user has scrolled
  const useDarkText = variant === "light" || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-lg" : variant === "light" ? "bg-white/80" : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className={`font-serif text-2xl font-semibold transition-colors ${
          useDarkText ? "text-[#2d2d2d]" : "text-white"
        }`}
      >
        Bamboo Valley
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-10 items-center list-none">
        <li>
          <Link
            href="/our-story"
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            Our Story
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={() => setProgramsOpen(true)}
          onMouseLeave={() => setProgramsOpen(false)}
        >
          <Link
            href="/programs"
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] flex items-center gap-1 ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            Programs
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          {programsOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
              <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-5 min-w-[420px]">
                {/* View All Link */}
                <Link
                  href="/programs"
                  className="block text-sm font-medium text-[#8fb07a] hover:text-[#6d9b5a] mb-4 transition-colors"
                >
                  View All Programs →
                </Link>

                <div className="grid grid-cols-2 gap-6">
                  {/* Full-Day Programs */}
                  <div>
                    <p className="text-xs font-medium text-[#999] uppercase tracking-wider mb-2">Full-Day</p>
                    <div className="space-y-1">
                      <Link href="/programs#nursery" className="block px-2 py-1.5 text-sm text-[#2d2d2d] hover:bg-[#BED7AF]/20 rounded transition-colors">
                        <span className="font-medium">Nursery</span>
                        <span className="text-[#888] ml-1">2–4 yrs</span>
                      </Link>
                      <Link href="/programs#kindergarten" className="block px-2 py-1.5 text-sm text-[#2d2d2d] hover:bg-[#BED7AF]/20 rounded transition-colors">
                        <span className="font-medium">Kindergarten</span>
                        <span className="text-[#888] ml-1">3–6 yrs</span>
                      </Link>
                      <Link href="/programs#primary" className="block px-2 py-1.5 text-sm text-[#2d2d2d] hover:bg-[#BED7AF]/20 rounded transition-colors">
                        <span className="font-medium">Primary</span>
                        <span className="text-[#888] ml-1">6–9 yrs</span>
                      </Link>
                    </div>
                  </div>

                  {/* Additional Programs */}
                  <div>
                    <p className="text-xs font-medium text-[#999] uppercase tracking-wider mb-2">Additional</p>
                    <div className="space-y-1">
                      <Link href="/programs#toddler" className="block px-2 py-1.5 text-sm text-[#2d2d2d] hover:bg-[#BED7AF]/20 rounded transition-colors">
                        <span className="font-medium">Parent & Toddler</span>
                      </Link>
                      <Link href="/programs#after-school" className="block px-2 py-1.5 text-sm text-[#2d2d2d] hover:bg-[#BED7AF]/20 rounded transition-colors">
                        <span className="font-medium">After School</span>
                      </Link>
                      <Link href="/programs#camps" className="block px-2 py-1.5 text-sm text-[#2d2d2d] hover:bg-[#BED7AF]/20 rounded transition-colors">
                        <span className="font-medium">Holiday Camps</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Child Wellbeing */}
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <Link
                    href="/child-wellbeing"
                    className="block px-2 py-1.5 text-sm text-[#2d2d2d] hover:bg-[#BED7AF]/20 rounded transition-colors"
                  >
                    <span className="font-medium">Child Wellbeing</span>
                    <span className="text-[#888] ml-1">— How we support every child</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </li>
        <li>
          <Link
            href="/science"
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            The Science
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            Visit Us
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="bg-[#BED7AF] text-[#2d2d2d] px-6 py-2.5 rounded text-sm font-medium hover:bg-[#8fb07a] transition-colors"
          >
            Enquire
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2"
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
          <div className="flex flex-col py-4">
            <Link href="/our-story" className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
            <Link href="/programs" className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100 font-medium" onClick={() => setMobileMenuOpen(false)}>Programs</Link>
            <Link href="/programs#nursery" className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>Nursery <span className="text-[#999]">2–4 yrs</span></Link>
            <Link href="/programs#kindergarten" className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>Kindergarten <span className="text-[#999]">3–6 yrs</span></Link>
            <Link href="/programs#primary" className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>Primary <span className="text-[#999]">6–9 yrs</span></Link>
            <Link href="/programs#camps" className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>Holiday Camps</Link>
            <Link href="/child-wellbeing" className="px-6 py-3 pl-10 text-[#666] hover:bg-gray-100 text-sm" onClick={() => setMobileMenuOpen(false)}>Child Wellbeing</Link>
            <Link href="/science" className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>The Science</Link>
            <Link href="/contact" className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Visit Us</Link>
            <div className="px-6 py-3">
              <Link href="/contact" className="btn btn-primary w-full text-center" onClick={() => setMobileMenuOpen(false)}>Enquire</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
