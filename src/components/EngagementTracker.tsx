"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth, trackSectionView, trackSectionEngagement } from "@/lib/gtag";

// Tracks scroll depth and section visibility for GA4
export function EngagementTracker() {
  const pathname = usePathname();
  const scrollMilestonesReached = useRef<Set<number>>(new Set());
  const sectionsViewed = useRef<Set<string>>(new Set());
  const sectionEntryTimes = useRef<Map<string, number>>(new Map());

  // Reset tracking on page change
  useEffect(() => {
    scrollMilestonesReached.current.clear();
    sectionsViewed.current.clear();
    sectionEntryTimes.current.clear();
  }, [pathname]);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !scrollMilestonesReached.current.has(milestone)) {
          scrollMilestonesReached.current.add(milestone);
          trackScrollDepth(milestone, pathname);
        }
      }
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [pathname]);

  // Section visibility tracking with Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll("[data-track-section]");

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionName = entry.target.getAttribute("data-track-section");
          if (!sectionName) return;

          if (entry.isIntersecting) {
            // Section came into view
            if (!sectionsViewed.current.has(sectionName)) {
              sectionsViewed.current.add(sectionName);
              trackSectionView(sectionName, pathname);
            }
            // Track entry time for engagement
            sectionEntryTimes.current.set(sectionName, Date.now());
          } else {
            // Section left view - calculate engagement time
            const entryTime = sectionEntryTimes.current.get(sectionName);
            if (entryTime) {
              const timeSpent = Math.round((Date.now() - entryTime) / 1000);
              if (timeSpent >= 2) { // Only track if viewed for at least 2 seconds
                trackSectionEngagement(sectionName, pathname, timeSpent);
              }
              sectionEntryTimes.current.delete(sectionName);
            }
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: "0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return null; // This component doesn't render anything
}

// Hook for tracking CTA clicks in components
export function useTrackClick() {
  const pathname = usePathname();

  const trackClick = useCallback((buttonText: string, section: string, destination?: string) => {
    // Import dynamically to avoid SSR issues
    import("@/lib/gtag").then(({ trackCTAClick, trackRegisterClick }) => {
      trackCTAClick(buttonText, pathname, section);

      // If this is a register/enquire click, also track the conversion
      if (destination && (buttonText.toLowerCase().includes("register") ||
          buttonText.toLowerCase().includes("enquire") ||
          buttonText.toLowerCase().includes("contact"))) {
        trackRegisterClick(pathname, destination);
      }
    });
  }, [pathname]);

  return trackClick;
}
