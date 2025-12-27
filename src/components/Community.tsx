"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Community() {
  const t = useTranslations("community");

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
      {/* Image */}
      <div className="relative h-[350px] md:h-auto">
        <Image
          src="/images/Community.jpeg"
          alt="Bamboo Valley Community"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center px-8 md:px-20 py-12 md:py-16 bg-white">
        <h2 className="font-serif text-3xl md:text-4xl font-normal mb-6 text-[#2d2d2d]">
          {t("title")}
        </h2>
        <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#444]">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
