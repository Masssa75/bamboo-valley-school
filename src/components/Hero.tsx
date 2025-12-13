"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const wordDescriptions = {
  free: "Mastery over their body, their mind, their world. A path that belongs to them.",
  curious: "What Einstein called his only real talent. The drive to inquire, wonder, discover, create.",
  capable: "The freedom to try. The permission to fail. The drive to grow. Becoming capable of anything.",
};

type WordKey = keyof typeof wordDescriptions;

export default function Hero() {
  const [activeWord, setActiveWord] = useState<WordKey>("free");

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-bg.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full z-[2]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.55) 100%)"
        }}
      />

      {/* Content */}
      <div className="relative z-[3] text-center text-white max-w-[1100px] px-8 w-full">
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Bamboo Valley"
          width={220}
          height={220}
          className="mx-auto mb-6 h-[180px] md:h-[220px] w-auto"
          priority
        />

        {/* Tagline */}
        <div className="font-serif text-lg font-medium tracking-[3px] uppercase mb-8 opacity-95">
          natural learning community
        </div>

        {/* Three Interactive Words */}
        <div className="flex justify-center items-center gap-0 mb-6 flex-wrap md:flex-nowrap">
          <span
            className={`font-serif text-4xl md:text-5xl font-semibold cursor-pointer transition-all px-4 md:px-6 py-2 whitespace-nowrap ${
              activeWord === "free" ? "text-[#c9e4b8]" : "text-white hover:text-[#c9e4b8]"
            }`}
            onMouseEnter={() => setActiveWord("free")}
          >
            Free-minded
          </span>
          <span className="text-5xl opacity-25 font-light hidden md:inline">|</span>
          <span
            className={`font-serif text-4xl md:text-5xl font-semibold cursor-pointer transition-all px-4 md:px-6 py-2 whitespace-nowrap ${
              activeWord === "curious" ? "text-[#c9e4b8]" : "text-white hover:text-[#c9e4b8]"
            }`}
            onMouseEnter={() => setActiveWord("curious")}
          >
            Curious
          </span>
          <span className="text-5xl opacity-25 font-light hidden md:inline">|</span>
          <span
            className={`font-serif text-4xl md:text-5xl font-semibold cursor-pointer transition-all px-4 md:px-6 py-2 whitespace-nowrap ${
              activeWord === "capable" ? "text-[#c9e4b8]" : "text-white hover:text-[#c9e4b8]"
            }`}
            onMouseEnter={() => setActiveWord("capable")}
          >
            Capable
          </span>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl font-normal italic opacity-85 max-w-[650px] mx-auto mb-9 min-h-[50px] leading-relaxed transition-opacity duration-150">
          {wordDescriptions[activeWord]}
        </p>

        {/* CTAs */}
        <div className="flex gap-5 justify-center flex-wrap">
          <Link href="/contact" className="btn btn-primary">
            Book a Visit
          </Link>
          <Link href="#programs" className="btn btn-secondary">
            Programs
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] text-white opacity-70 scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
