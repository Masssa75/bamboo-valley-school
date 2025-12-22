"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "The Kiran Family",
    role: "Parents of three students",
    quote:
      "Bamboo Valley has been such a wonderful and soulful experience for our family. All three of our girls thrived and genuinely loved going to school. It is a truly nurturing space—calm, intentional, and deeply respectful of each child's individuality.",
    image: "/images/testimonial-kiran.jpg",
  },
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
      "My children have loved spending their time at Bamboo Valley Phuket. They come home with stories of adventures and new skills. The team are very passionate and really take their time to get to know the children on a personal level.",
    image: "/images/testimonial-danielle.avif",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 md:py-28 px-6 bg-[#FAF9F6]">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-normal text-center mb-4 text-[#2d2d2d]">
          What Parents Say
        </h2>
        <p className="text-[#666] text-center mb-12 max-w-[500px] mx-auto">
          Real stories from families in our community.
        </p>

        {/* Hero Image with Overlay */}
        <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-8">
          <Image
            src={testimonials[activeIndex].image}
            alt={testimonials[activeIndex].name}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Quote Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <p className="font-serif text-lg md:text-xl text-white leading-relaxed mb-6 italic max-w-[800px]">
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </p>
            <div>
              <p className="font-semibold text-white">
                {testimonials[activeIndex].name}
              </p>
              <p className="text-sm text-[#BED7AF]">
                {testimonials[activeIndex].role}
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
