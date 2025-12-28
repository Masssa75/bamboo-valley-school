"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      key: "kiran",
      image: "/images/testimonial-kiran.jpg",
    },
    {
      key: "molina",
      image: "/images/testimonial-molina.avif",
    },
    {
      key: "brian",
      image: "/images/testimonial-brian.avif",
    },
    {
      key: "danielle",
      image: "/images/testimonial-danielle.avif",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-[#FAF9F6]">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-normal text-center mb-4 text-[#2d2d2d]">
          {t("title")}
        </h2>
        <p className="text-[#666] text-center mb-12 max-w-[500px] mx-auto">
          {t("subtitle")}
        </p>

        {/* Hero Image with Overlay */}
        <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-8">
          <Image
            src={testimonials[activeIndex].image}
            alt={t(`families.${testimonials[activeIndex].key}.name`)}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Quote Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="font-serif text-lg md:text-xl text-white leading-relaxed mb-6 italic max-w-[800px]">
              &ldquo;{t(`families.${testimonials[activeIndex].key}.quote`)}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-white">
                {t(`families.${testimonials[activeIndex].key}.name`)}
              </p>
              <p className="text-sm text-[#BED7AF]">
                {t(`families.${testimonials[activeIndex].key}.role`)}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-[#8fb07a] scale-110"
                  : "bg-[#ddd] hover:bg-[#ccc]"
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
