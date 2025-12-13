"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavigationProps {
  variant?: "dark" | "light"; // dark = white text on transparent (for dark heroes), light = dark text (for light backgrounds)
}

export default function Navigation({ variant = "dark" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <li>
          <Link
            href="/programs"
            className={`text-sm font-medium tracking-wide transition-colors hover:text-[#BED7AF] ${
              useDarkText ? "text-[#2d2d2d]" : "text-white"
            }`}
          >
            Programs
          </Link>
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
            <Link href="/programs" className="px-6 py-3 text-[#2d2d2d] hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>Programs</Link>
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
