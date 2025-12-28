"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export default function Insights() {
  const t = useTranslations("insights");
  const tCommon = useTranslations("common");
  const locale = useLocale();

  const insights = [
    {
      key: "homework",
      slug: `/${locale}/blog/homework-myth`,
      image: "/images/child-reading-outdoors-natural-learning.jpeg",
      highlight: true,
    },
    {
      key: "science",
      slug: `/${locale}/science`,
      image: "/images/Mud-Play.jpg",
      highlight: false,
    },
    {
      key: "story",
      slug: `/${locale}/our-story`,
      image: "/images/founders-family-bamboo-valley-phuket.jpeg",
      highlight: false,
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d] mb-4">
            {t("title")}
          </h2>
          <p className="text-[#666] max-w-[500px] mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Featured Article - Homework */}
        <Link
          href={insights[0].slug}
          className="block mb-8 group"
        >
          <div className="relative rounded-xl overflow-hidden bg-[#2d5a3d]">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <span className="text-[#BED7AF] text-sm font-medium uppercase tracking-wide mb-3">
                  {t(`${insights[0].key}.subtitle`)}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-4 group-hover:text-[#BED7AF] transition-colors">
                  {t(`${insights[0].key}.title`)}
                </h3>
                <p className="text-white/80 mb-6">
                  {t(`${insights[0].key}.description`)}
                </p>
                <span className="text-[#BED7AF] font-medium group-hover:underline">
                  {tCommon("readResearch")} →
                </span>
              </div>
              <div className="relative h-64 md:h-auto order-1 md:order-2">
                <Image
                  src={insights[0].image}
                  alt="Child reading outdoors"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Link>

        {/* Two smaller cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {insights.slice(1).map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className="group block bg-[#FAF9F6] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={t(`${item.key}.title`)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <span className="text-[#8fb07a] text-sm font-medium uppercase tracking-wide">
                  {t(`${item.key}.subtitle`)}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-[#2d2d2d] mt-2 mb-3 group-hover:text-[#8fb07a] transition-colors">
                  {t(`${item.key}.title`)}
                </h3>
                <p className="text-[#666] text-sm">
                  {t(`${item.key}.description`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
