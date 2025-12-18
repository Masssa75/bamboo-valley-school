"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Molina",
    role: "Mother of Kinder & Primary Students",
    quote:
      "Thank you for the nurture, care and confidence you have offered my children. These memories and life skills they will carry with them forever.",
    image: "/images/testimonial-molina.avif",
  },
  {
    name: "Brian",
    role: "Father of two Primary Students",
    quote:
      "It has been wonderful to watch my two children bloom at this school. The quality of attention given to each individual child is extraordinary.",
    image: "/images/testimonial-brian.avif",
  },
  {
    name: "Danielle",
    role: "Mother of two Kindergarten Students",
    quote:
      "My children have loved spending their time at Bamboo Valley Phuket. They come home with stories of adventures and new skills. The team are very passionate and really take their time to get to know the children on a personal level. It's a wonderful fun and safe place to learn and play.",
    image: "/images/testimonial-danielle.avif",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 md:py-28 px-6 bg-[#FAF9F6]">
      <div className="max-w-[900px] mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-normal text-center mb-4 text-[#2d2d2d]">
          What Parents Say
        </h2>
        <p className="text-[#666] text-center mb-12 max-w-[500px] mx-auto">
          Real stories from families in our community.
        </p>

        {/* Featured Quote */}
        <div className="relative mb-12">
          <div className="text-center px-4 md:px-12">
            <svg
              className="w-10 h-10 mx-auto mb-6 text-[#BED7AF]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="font-serif text-xl md:text-2xl text-[#2d2d2d] leading-relaxed mb-8 italic">
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </p>
            <div className="flex flex-col items-center gap-4">
              {testimonials[activeIndex].image && (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-[#2d2d2d]">
                  {testimonials[activeIndex].name}
                </p>
                <p className="text-sm text-[#8fb07a]">
                  {testimonials[activeIndex].role}
                </p>
              </div>
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
