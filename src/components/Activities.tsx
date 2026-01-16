"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const activityKeys = [
  { key: "freePlay", image: "/images/Free-Play.jpeg" },
  { key: "animalCare", image: "/images/Animal-Care.jpg" },
  { key: "mudPlay", image: "/images/Mud-Play.jpg" },
  { key: "baking", image: "/images/Baking.jpeg" },
  { key: "yoga", image: "/images/Sound-Healing.jpg" },
  { key: "storytelling", image: "/images/Storytelling.jpeg" },
  { key: "gardening", image: "/images/Gardening.jpeg" },
  { key: "phonics", image: "/images/Playful-Phonics.JPG" },
  { key: "art", image: "/images/Painting.jpeg" },
];

export default function Activities() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const t = useTranslations("activities");
  const locale = useLocale();

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section id="programs" data-track-section="activities" className="py-28 md:py-32 px-6 md:px-12 bg-[#FAF9F6]">
      <div className="text-center max-w-[600px] mx-auto mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d] mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-[#5a5a5a] mb-4">
          {t("subtitle")}
        </p>
        <Link
          href={`/${locale}/blog/day-at-bamboo-valley`}
          className="inline-flex items-center gap-2 text-[#5a7a5a] hover:text-[#4a6a4a] font-medium transition-colors"
        >
          {t("readMore")}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
        {activityKeys.map((activity, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`activity-card relative aspect-square rounded-lg overflow-hidden cursor-pointer group ${
              activeCard === index ? "is-active" : ""
            }`}
          >
            {/* Image */}
            <div className={`card-image absolute inset-0 transition-transform duration-400 ${
              activeCard === index ? "scale-105" : ""
            }`}>
              <Image
                src={activity.image}
                alt={t(`${activity.key}.title`)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Base Content (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-[2]">
              <h3 className="font-serif text-2xl md:text-3xl font-medium mb-1">
                {t(`${activity.key}.title`)}
              </h3>
              <p className="text-sm opacity-80">{t(`${activity.key}.subtitle`)}</p>
            </div>

            {/* Detail Content - shown on hover (desktop) or tap (mobile) */}
            <div className={`hover-content absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-[#BED7AF] text-[#2d2d2d] z-[3] ${
              activeCard === index ? "!translate-y-0" : ""
            }`}>
              <h3 className="font-serif text-2xl font-medium mb-3 text-[#2d2d2d]">
                {t(`${activity.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed">{t(`${activity.key}.science`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
