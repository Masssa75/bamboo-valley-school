import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/blog/day-at-bamboo-valley/";
  const t = await getTranslations({ locale, namespace: "blogDayAtBamboo.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "article",
      publishedTime: "2025-01-02",
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

// Timeline section component for visual consistency
function TimelineSection({
  time,
  title,
  children,
  isLast = false,
}: {
  time: string;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div className="relative pl-8 md:pl-12 pb-12">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-[2px] bg-[#BED7AF]" />
      )}
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1 top-1 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#BED7AF] flex items-center justify-center">
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white" />
      </div>
      {/* Time badge */}
      <div className="inline-block bg-[#FAF9F6] px-3 py-1 rounded-full text-sm font-medium text-[#666] mb-2">
        {time}
      </div>
      <h2 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mb-4">
        {title}
      </h2>
      <div className="text-[#444] leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

// Quote callout component
function QuoteCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FAF9F6] border-l-4 border-[#BED7AF] p-4 my-6 text-sm text-[#555] italic">
      {children}
    </div>
  );
}

export default async function DayAtBambooValleyPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogDayAtBamboo" });
  const tMeta = await getTranslations({ locale, namespace: "blogDayAtBamboo.meta" });
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
    datePublished: "2025-01-02",
    dateModified: "2025-01-02",
    keywords: tMeta("keywords"),
  };

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
          src="/images/Free-Play.jpeg"
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
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-2">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            {t("hero.subtitle")}
          </p>
          <div className="text-sm text-white/80">{t("hero.date")}</div>
        </div>
      </header>

      <article className="py-12 md:py-16 px-6">
        <div className="max-w-[720px] mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-[#444] leading-relaxed mb-4">
              {t("intro.p1")}
            </p>
            <p className="text-[#444] leading-relaxed mb-4">{t("intro.p2")}</p>
            <p className="text-[#444] leading-relaxed">{t("intro.p3")}</p>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            {/* 8:30am - Arrival */}
            <TimelineSection
              time={t("timeline.arrival.time")}
              title={t("timeline.arrival.title")}
            >
              <p>{t("timeline.arrival.p1")}</p>
              <p className="font-medium text-[#2d2d2d]">
                {t("timeline.arrival.p2")}
              </p>
              <p>{t("timeline.arrival.p3")}</p>
              <p className="italic text-[#555]">{t("timeline.arrival.p4")}</p>
            </TimelineSection>

            {/* 9:00am - Circle */}
            <TimelineSection
              time={t("timeline.circle.time")}
              title={t("timeline.circle.title")}
            >
              <p>{t("timeline.circle.p1")}</p>
              <p>{t("timeline.circle.p2")}</p>
              <p>{t("timeline.circle.p3")}</p>
            </TimelineSection>

            {/* 9:30am - Free Play */}
            <TimelineSection
              time={t("timeline.freePlay.time")}
              title={t("timeline.freePlay.title")}
            >
              <p>{t("timeline.freePlay.p1")}</p>
              <p>{t("timeline.freePlay.p2")}</p>
              <p>{t("timeline.freePlay.p3")}</p>
              <p>{t("timeline.freePlay.p4")}</p>
              <QuoteCallout>{t("timeline.freePlay.quote")}</QuoteCallout>
            </TimelineSection>

            {/* 10:30am - Snack */}
            <TimelineSection
              time={t("timeline.snack.time")}
              title={t("timeline.snack.title")}
            >
              <p>{t("timeline.snack.p1")}</p>
              <p>{t("timeline.snack.p2")}</p>
              <p className="italic text-[#555]">{t("timeline.snack.p3")}</p>
              <p>{t("timeline.snack.p4")}</p>
            </TimelineSection>

            {/* 11:00am - Learning */}
            <TimelineSection
              time={t("timeline.learning.time")}
              title={t("timeline.learning.title")}
            >
              <p>{t("timeline.learning.p1")}</p>
              <p>{t("timeline.learning.p2")}</p>
              <QuoteCallout>{t("timeline.learning.bakingQuote")}</QuoteCallout>
              <p>{t("timeline.learning.p3")}</p>
              <QuoteCallout>{t("timeline.learning.gardenQuote")}</QuoteCallout>
              <p>{t("timeline.learning.p4")}</p>
            </TimelineSection>

            {/* 12:00pm - Lunch */}
            <TimelineSection
              time={t("timeline.lunch.time")}
              title={t("timeline.lunch.title")}
            >
              <p>{t("timeline.lunch.p1")}</p>
              <p>{t("timeline.lunch.p2")}</p>
              <p>{t("timeline.lunch.p3")}</p>
            </TimelineSection>

            {/* 12:30pm - Quiet */}
            <TimelineSection
              time={t("timeline.quiet.time")}
              title={t("timeline.quiet.title")}
            >
              <p>{t("timeline.quiet.p1")}</p>
              <p>{t("timeline.quiet.p2")}</p>
              <p>{t("timeline.quiet.p3")}</p>
              <QuoteCallout>{t("timeline.quiet.quote")}</QuoteCallout>
            </TimelineSection>

            {/* 1:30pm - Afternoon */}
            <TimelineSection
              time={t("timeline.afternoon.time")}
              title={t("timeline.afternoon.title")}
            >
              <p>{t("timeline.afternoon.p1")}</p>
              <p>{t("timeline.afternoon.p2")}</p>
              <QuoteCallout>{t("timeline.afternoon.mudQuote")}</QuoteCallout>
              <p>{t("timeline.afternoon.p3")}</p>
              <QuoteCallout>{t("timeline.afternoon.artQuote")}</QuoteCallout>
              <p>{t("timeline.afternoon.p4")}</p>
            </TimelineSection>

            {/* 2:30pm - Yoga */}
            <TimelineSection
              time={t("timeline.yoga.time")}
              title={t("timeline.yoga.title")}
            >
              <p>{t("timeline.yoga.p1")}</p>
              <p>{t("timeline.yoga.p2")}</p>
              <p>{t("timeline.yoga.p3")}</p>
              <p className="italic text-[#555]">{t("timeline.yoga.p4")}</p>
              <p>{t("timeline.yoga.p5")}</p>
              <QuoteCallout>{t("timeline.yoga.quote")}</QuoteCallout>
            </TimelineSection>

            {/* 3:00pm - Pickup */}
            <TimelineSection
              time={t("timeline.pickup.time")}
              title={t("timeline.pickup.title")}
              isLast={true}
            >
              <p>{t("timeline.pickup.p1")}</p>
              <p className="italic text-[#555]">{t("timeline.pickup.p2")}</p>
              <p>{t("timeline.pickup.p3")}</p>
              <p className="font-medium text-[#2d2d2d]">
                {t("timeline.pickup.p4")}
              </p>
              <p>{t("timeline.pickup.p5")}</p>
            </TimelineSection>
          </div>

          {/* Why This Matters */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("why.title")}
            </h2>
            <p className="text-lg text-[#444] leading-relaxed mb-4">
              {t("why.p1")}
            </p>
            <p className="text-[#444] leading-relaxed mb-4">{t("why.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-4">{t("why.p3")}</p>
            <p className="text-[#444] leading-relaxed mb-4">{t("why.p4")}</p>
            <p className="text-[#444] leading-relaxed font-medium">
              {t("why.p5")}
            </p>
          </div>

          {/* Closing */}
          <hr className="my-12 border-gray-200" />
          <p className="text-[#666] italic">{t("closing")}</p>

          {/* CTA */}
          <div className="mt-16 p-8 bg-[#BED7AF] rounded-lg text-center">
            <h3 className="font-serif text-2xl text-[#2d2d2d] mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-[#2d2d2d] mb-2">{t("cta.p1")}</p>
            <p className="text-[#2d2d2d] mb-6">{t("cta.p2")}</p>
            <a
              href="https://wa.me/66989124218?text=Hi!%20I%20just%20read%20your%20article%20about%20a%20day%20at%20Bamboo%20Valley%20and%20would%20love%20to%20schedule%20a%20visit."
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
