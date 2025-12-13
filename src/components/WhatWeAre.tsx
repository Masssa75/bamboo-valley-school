import Link from "next/link";
import Image from "next/image";

export default function WhatWeAre() {
  return (
    <section id="about" className="py-28 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Text content */}
        <div className="flex-1 text-left">
          <div className="font-serif text-2xl md:text-3xl font-normal leading-relaxed text-[#2d2d2d]">
            <p className="mb-2">Love. Attention. Space to wonder.</p>
            <p className="mb-2">Mud beneath their feet. Sky above their heads.</p>
            <p className="mb-2">A thousand choices, made by them.</p>
          </div>

          <div className="font-serif text-2xl md:text-3xl font-medium mt-8 pt-8 border-t-2 border-[#BED7AF] text-[#2d2d2d]">
            This is how children become extraordinary.
          </div>

          <div className="mt-12">
            <Link
              href="/science"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8fb07a] px-7 py-3.5 border-2 border-[#BED7AF] rounded-full transition-all hover:bg-[#BED7AF] hover:text-[#2d2d2d] group"
            >
              The Science Behind Extraordinary
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-[400px]">
          <Image
            src="/images/free-kids.jpg"
            alt="Children playing freely in nature"
            width={400}
            height={600}
            className="rounded-2xl object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
