"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth, trackSectionView, trackSectionEngagement, trackWhatsAppClick } from "@/lib/gtag";
import { captureAttribution } from "@/lib/attribution";
import { metaTrack, metaTrackCustom, isKeyPage } from "@/lib/meta-pixel";

const QUALIFIED_KEY = "bv_qualified_visit";

// Tracks scroll depth and section visibility for GA4
export function EngagementTracker() {
  const pathname = usePathname();
  const scrollMilestonesReached = useRef<Set<number>>(new Set());
  const sectionsViewed = useRef<Set<string>>(new Set());
  const sectionEntryTimes = useRef<Map<string, number>>(new Map());
  const viewContentSent = useRef(false);

  // Reset tracking on page change
  useEffect(() => {
    scrollMilestonesReached.current.clear();
    sectionsViewed.current.clear();
    sectionEntryTimes.current.clear();
    viewContentSent.current = false;
  }, [pathname]);

  // Record where this visit came from, on every page (the module decides
  // whether there is anything new worth writing).
  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  // WhatsApp is the primary conversion on most pages and there are 13 wa.me
  // links spread across the site. One delegated listener catches all of them,
  // including any added later — better than 13 onClick props to keep in sync.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.('a[href*="wa.me"]');
      if (!link) return;
      const number = link.getAttribute("href")?.match(/wa\.me\/(\d+)/)?.[1] ?? "unknown";
      trackWhatsAppClick(`${pathname} | ${number}`);
      metaTrack("Contact", { content_name: pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  // Meta's optimisable event. 60 seconds AND half the page — a bar that
  // accidental clicks and bots don't clear. Once per session, not per page,
  // so a browsing parent counts once rather than five times.
  //
  // This is the event ad sets should optimise against: the deep events
  // (Lead, CompleteRegistration) are far below Meta's ~50/week learning
  // threshold and always will be at this school's volume.
  useEffect(() => {
    const startedAt = Date.now();
    let maxScroll = 0;

    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        maxScroll = Math.max(maxScroll, Math.round((window.scrollY / docHeight) * 100));
      } else {
        maxScroll = 100; // page fits the viewport — nothing to scroll past
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = setInterval(() => {
      const seconds = Math.round((Date.now() - startedAt) / 1000);

      if (seconds >= 30 && isKeyPage(pathname) && !viewContentSent.current) {
        viewContentSent.current = true;
        metaTrack("ViewContent", { content_name: pathname });
      }

      if (seconds >= 60 && maxScroll >= 50 && !sessionStorage.getItem(QUALIFIED_KEY)) {
        try {
          sessionStorage.setItem(QUALIFIED_KEY, "1");
        } catch {
          /* private mode — fire anyway, worst case it counts twice */
        }
        metaTrackCustom("QualifiedVisit", { content_name: pathname, scroll_depth: maxScroll });
        clearInterval(tick);
      }
    }, 5000);

    return () => {
      clearInterval(tick);
      window.removeEventListener("scroll", onScroll);
    };
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
