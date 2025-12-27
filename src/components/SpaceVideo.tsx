"use client";

import { useTranslations } from "next-intl";

export default function SpaceVideo() {
  const t = useTranslations("spaceVideo");

  return (
    <section className="relative h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/flyover.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] text-center text-white max-w-[800px] px-8">
        <p className="font-serif text-2xl md:text-4xl font-normal leading-relaxed">
          {t("line1")}
          <br />
          {t("line2")}
        </p>
      </div>
    </section>
  );
}
