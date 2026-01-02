import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import {
  FinlandComparison,
  WhatWorksChart,
  DinnerTableWords,
  ThirdGraderCallout,
} from "@/components/blog/HomeworkVisualizations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/blog/homework-myth/";
  const t = await getTranslations({ locale, namespace: "blogHomeworkMyth.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "article",
      publishedTime: "2024-12-16",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        th: `${baseUrl}/th${path}`,
        ru: `${baseUrl}/ru${path}`,
        zh: `${baseUrl}/zh${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default async function HomeworkMythPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogHomeworkMyth" });
  const tMeta = await getTranslations({ locale, namespace: "blogHomeworkMyth.meta" });
  const localePath = (path: string) => `/${locale}${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tMeta("ogTitle"),
    description: tMeta("description"),
    author: {
      "@type": "Organization",
      name: "Bamboo Valley",
      url: "https://bamboovalleyphuket.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Bamboo Valley",
      url: "https://bamboovalleyphuket.com",
    },
    datePublished: "2024-12-16",
    dateModified: "2024-12-16",
  };

  const whyItems = t.raw("why.items") as Array<{ title: string; text: string }>;
  const finlandParagraphs = t.raw("finland.paragraphs") as string[];
  const costItems = t.raw("cost.items") as Array<{ title: string; text: string }>;
  const step1Questions = t.raw("parents.step1.questions") as string[];
  const step3Items = t.raw("parents.step3.items") as Array<{ title: string; text: string }>;
  const sourceHomework = t.raw("sources.homeworkItems") as Array<{
    text: string;
    linkText: string;
    linkUrl: string;
  }>;
  const sourceParent = t.raw("sources.parentItems") as Array<{
    text: string;
    linkText: string;
    linkUrl: string;
  }>;
  const sourceFinland = t.raw("sources.finlandItems") as string[];

  const whatWorksLabels = t.raw("visuals.whatWorks.items") as string[];
  const whatWorksItems = [
    { months: 8, color: "#2d5a3d" },
    { months: 8, color: "#3d7a4d" },
    { months: 6, color: "#8fb07a" },
    { months: 0, color: "#ccc" },
  ].map((item, index) => ({
    ...item,
    label: whatWorksLabels[index] || "",
  }));

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation locale={locale as Locale} />

      {/* Hero with Background Image */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <Image
          src="/images/child-reading-outdoors-natural-learning.jpeg"
          alt={t("hero.imageAlt")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-[720px] mx-auto">
          <Link
            href={localePath("/blog")}
            className="text-sm text-white/80 hover:text-white mb-6 inline-block"
          >
            {t("hero.backLink")}
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
            {t("hero.title")}
          </h1>
          <div className="text-sm text-white/80">{t("hero.date")}</div>
        </div>
      </header>

      <article className="py-12 md:py-16 px-6">
        <div className="max-w-[720px] mx-auto">
          {/* Featured Snippet Section */}
          <section className="bg-[#FAF9F6] p-6 md:p-8 rounded-lg mb-12">
            <h2 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mb-4">
              {t("featured.title")}
            </h2>
            <p className="text-[#444] leading-relaxed">
              {t.rich("featured.body", {
                strong: (chunks) => <strong>{chunks}</strong>,
                em: (chunks) => <em>{chunks}</em>,
              })}
            </p>
          </section>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-[#444] leading-relaxed mb-6">{t("intro.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("intro.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">
              {t.rich("intro.p3", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="text-[#444] leading-relaxed mb-12">{t("intro.p4")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("studies.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("studies.p1")}</p>
            <blockquote className="border-l-4 border-[#BED7AF] pl-6 my-8 italic text-[#555]">
              {t("studies.quote")}
            </blockquote>
            <p className="text-[#444] leading-relaxed mb-6">{t("studies.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">
              {t.rich("studies.p3", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="text-[#444] leading-relaxed mb-6">{t("studies.p4")}</p>

            <ThirdGraderCallout
              title={t("thirdGrade.title")}
              main={t("thirdGrade.main")}
              subPrefix={t("thirdGrade.subPrefix")}
              subEmphasis={t("thirdGrade.subEmphasis")}
              subSuffix={t("thirdGrade.subSuffix")}
            />

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("why.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("why.intro")}</p>
            {whyItems.map((item) => (
              <p key={item.title} className="text-[#444] leading-relaxed mb-6">
                <strong>{item.title}</strong> {item.text}
              </p>
            ))}

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("finland.title")}
            </h2>
            {finlandParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-[#444] leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}

            <FinlandComparison
              finlandLabel={t("visuals.finland.finlandLabel")}
              usaLabel={t("visuals.finland.usaLabel")}
              minutesLabel={t("visuals.finland.minutesLabel")}
              hoursLabel={t("visuals.finland.hoursLabel")}
              caption={t("visuals.finland.caption")}
            />

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("whatHelps.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("whatHelps.intro")}</p>

            <WhatWorksChart
              title={t("visuals.whatWorks.title")}
              items={whatWorksItems}
              source={t("visuals.whatWorks.source")}
              monthSuffix={t("visuals.whatWorks.monthSuffix")}
            />

            <p className="text-[#444] leading-relaxed mb-12">
              {t.rich("whatHelps.pattern", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("cost.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("cost.intro")}</p>
            <ul className="list-disc pl-6 mb-12 space-y-3 text-[#444]">
              {costItems.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong> {item.text}
                </li>
              ))}
            </ul>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("parents.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("parents.intro")}</p>

            <h3 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mt-10 mb-4">
              {t("parents.step1.title")}
            </h3>
            <p className="text-[#444] leading-relaxed mb-6">{t("parents.step1.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">
              {t.rich("parents.step1.p2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <blockquote className="border-l-4 border-[#BED7AF] pl-6 my-8 italic text-[#555]">
              {t("parents.step1.quote")}
            </blockquote>
            <p className="text-[#444] leading-relaxed mb-6">{t("parents.step1.questionsIntro")}</p>
            <ul className="list-disc pl-6 mb-8 space-y-2 text-[#444]">
              {step1Questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
            <p className="text-[#444] leading-relaxed mb-12">{t("parents.step1.p3")}</p>

            <h3 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mt-10 mb-4">
              {t("parents.step2.title")}
            </h3>
            <p className="text-[#444] leading-relaxed mb-6">
              {t.rich("parents.step2.p1", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="text-[#444] leading-relaxed mb-12">{t("parents.step2.p2")}</p>

            <h3 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mt-10 mb-4">
              {t("parents.step3.title")}
            </h3>
            <p className="text-[#444] leading-relaxed mb-6">
              {t.rich("parents.step3.p1", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="text-[#444] leading-relaxed mb-6">{t("parents.step3.p2")}</p>

            <DinnerTableWords
              title={t("visuals.dinner.title")}
              leftLabel={t("visuals.dinner.leftLabel")}
              rightLabel={t("visuals.dinner.rightLabel")}
              caption={t("visuals.dinner.caption")}
              source={t("visuals.dinner.source")}
            />

            {step3Items.map((item) => (
              <p key={item.title} className="text-[#444] leading-relaxed mb-6">
                <strong>{item.title}</strong> {item.text}
              </p>
            ))}

            <h3 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mt-10 mb-4">
              {t("parents.step4.title")}
            </h3>
            <p className="text-[#444] leading-relaxed mb-6">{t("parents.step4.p1")}</p>
            <blockquote className="border-l-4 border-[#BED7AF] pl-6 my-8 italic text-[#555]">
              {t("parents.step4.quote")}
            </blockquote>
            <p className="text-[#444] leading-relaxed mb-12">{t("parents.step4.p2")}</p>

            <h3 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mt-10 mb-4">
              {t("parents.step5.title")}
            </h3>
            <p className="text-[#444] leading-relaxed mb-12">{t("parents.step5.p1")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("approach.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("approach.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("approach.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("approach.p3")}</p>

            {/* Sources */}
            <hr className="my-12 border-gray-200" />
            <section className="text-sm text-[#666]">
              <h2 className="font-serif text-lg font-normal text-[#2d2d2d] mb-4">
                {t("sources.title")}
              </h2>

              <p className="mb-4"><strong>{t("sources.homeworkTitle")}</strong></p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                {sourceHomework.map((item) => (
                  <li key={item.linkUrl}>
                    {item.text}{" "}
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8fb07a] hover:underline"
                    >
                      {item.linkText}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mb-4"><strong>{t("sources.parentTitle")}</strong></p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                {sourceParent.map((item) => (
                  <li key={item.linkUrl}>
                    {item.text}{" "}
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8fb07a] hover:underline"
                    >
                      {item.linkText}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mb-4"><strong>{t("sources.finlandTitle")}</strong></p>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                {sourceFinland.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <hr className="my-12 border-gray-200" />
            <p className="text-[#666] italic">{t("closing")}</p>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-[#BED7AF] rounded-lg text-center">
            <h3 className="font-serif text-2xl text-[#2d2d2d] mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-[#2d2d2d] mb-6">{t("cta.description")}</p>
            <a
              href="https://wa.me/66989124218?text=Hi!%20I%20just%20read%20your%20article%20about%20homework%20and%20would%20love%20to%20learn%20more."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#2d2d2d] text-white px-6 py-3 rounded font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              {t("cta.button")}
            </a>
          </div>
        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
