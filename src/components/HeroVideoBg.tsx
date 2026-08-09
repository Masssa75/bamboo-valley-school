"use client";

import { useEffect, useState } from "react";

export const HERO_VIDEO = "/videos/bamboo-valley-international-school-phuket.mp4";
export const HERO_POSTER = "/images/bamboo-valley-international-school-phuket.webp";

/**
 * Full-bleed muted background video.
 *
 * The poster is frame 0 of the video, so there is no visible cut when playback
 * starts. It is also the LCP element — preloaded here at high priority, since
 * browsers do not preload-scan the `poster` attribute.
 *
 * `src` is attached after mount rather than rendered into the static HTML, so
 * the 37 MB video does not compete with CSS/fonts/poster for the first paint.
 */
export default function HeroVideoBg({ className = "" }: { className?: string }) {
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = requestAnimationFrame(() => setSrc(HERO_VIDEO));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <link rel="preload" as="image" href={HERO_POSTER} fetchPriority="high" />
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover z-[1] ${className}`}
        src={src}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
    </>
  );
}
