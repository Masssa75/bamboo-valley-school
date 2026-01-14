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
      publishedTime: "2025-01-14",
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

// Q&A Item component
function QAItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7 pb-7 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
      <h3 className="text-lg md:text-xl font-medium text-[#2d2d2d] mb-3">
        {question}
      </h3>
      <div className="text-[#444] pl-5 border-l-[3px] border-[#BED7AF] space-y-3">
        {children}
      </div>
    </div>
  );
}

// Section component with time badge
function DaySection({
  time,
  title,
  intro,
  image,
  imageAlt,
  imagePosition = "wide",
  children,
}: {
  time: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "wide" | "offset-left" | "offset-right" | "tall";
  children: React.ReactNode;
}) {
  const imageClasses = {
    wide: "w-full h-[350px] object-cover rounded-xl mb-8",
    "offset-left": "w-[90%] mr-[10%] h-[320px] object-cover rounded-xl mb-8",
    "offset-right": "w-[90%] ml-[10%] h-[320px] object-cover rounded-xl mb-8",
    tall: "w-full h-[450px] object-cover rounded-xl mb-8",
  };

  return (
    <section className="mb-20">
      <span className="inline-block bg-[#FAF9F6] px-3 py-1 rounded-full text-sm font-medium text-[#666] mb-3">
        {time}
      </span>
      <h2 className="font-serif text-2xl md:text-[32px] font-medium text-[#2d2d2d] mb-6">
        {title}
      </h2>
      <p className="text-[17px] text-[#555] mb-6 leading-relaxed">{intro}</p>
      {image && imageAlt && (
        <div className={imagePosition === "offset-left" ? "pr-[10%]" : imagePosition === "offset-right" ? "pl-[10%]" : ""}>
          <Image
            src={image}
            alt={imageAlt}
            width={800}
            height={imagePosition === "tall" ? 450 : imagePosition === "wide" ? 350 : 320}
            className={imageClasses[imagePosition]}
          />
        </div>
      )}
      {children}
    </section>
  );
}

// Activity card for mid-morning section
function ActivityCard({
  day,
  title,
  description,
}: {
  day: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#FAF9F6] p-5 rounded-xl">
      <span className="text-xs font-semibold uppercase tracking-wide text-[#8fb07a] mb-1 block">
        {day}
      </span>
      <h4 className="text-lg mb-2 text-[#2d2d2d] font-medium">{title}</h4>
      <p className="text-sm text-[#666]">{description}</p>
    </div>
  );
}

// Image slider component (client-side interactivity handled via CSS)
function ImageSlider({
  images,
}: {
  images: Array<{ src: string; alt: string; caption: string }>;
}) {
  return (
    <div className="mb-8">
      <div className="relative rounded-xl overflow-hidden">
        <Image
          src={images[0].src}
          alt={images[0].alt}
          width={800}
          height={420}
          className="w-full h-[420px] object-cover"
        />
      </div>
      <p className="text-center mt-3 text-[15px] text-[#666] italic">
        {images[0].caption}
      </p>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {images.map((_, i) => (
            <span
              key={i}
              className={`w-2.5 h-2.5 rounded-full ${
                i === 0 ? "bg-[#BED7AF] scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
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
  const tMeta = await getTranslations({
    locale,
    namespace: "blogDayAtBamboo.meta",
  });
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
    datePublished: "2025-01-14",
    dateModified: "2025-01-14",
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
      <header className="relative h-[70vh] min-h-[500px] flex items-end px-6 pb-16 md:pb-20">
        <Image
          src="/images/blog-hero-1.jpeg"
          alt={t("hero.imageAlt")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50" />
        <div className="relative max-w-[800px] mx-auto w-full">
          <Link
            href={localePath("/blog")}
            className="text-sm text-white/80 hover:text-white mb-4 inline-block"
          >
            {t("hero.backLink")}
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-2">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            {t("hero.subtitle")}
          </p>
        </div>
      </header>

      <article className="max-w-[800px] mx-auto px-6 py-16">
        {/* Intro */}
        <section className="mb-16">
          <p className="text-xl text-[#555] leading-relaxed border-l-[3px] border-[#BED7AF] pl-6">
            {t("intro.lead")}
          </p>
        </section>

        {/* Arrival & Free Play */}
        <DaySection
          time={t("arrival.time")}
          title={t("arrival.title")}
          intro={t("arrival.intro")}
          image="/images/classroom-nature-shelf.jpg"
          imageAlt={t("arrival.imageAlt")}
          imagePosition="wide"
        >
          <QAItem question={t("arrival.q1.question")}>
            <p>{t("arrival.q1.answer1")}</p>
            <p>{t("arrival.q1.answer2")}</p>
          </QAItem>
          <QAItem question={t("arrival.q2.question")}>
            <p>{t("arrival.q2.answer1")}</p>
            <p>{t("arrival.q2.answer2")}</p>
          </QAItem>
          <QAItem question={t("arrival.q3.question")}>
            <p>{t("arrival.q3.answer1")}</p>
            <p>{t("arrival.q3.answer2")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Circle Time */}
        <DaySection
          time={t("circleTime.time")}
          title={t("circleTime.title")}
          intro={t("circleTime.intro")}
          image="/images/teacher-storytelling.jpg"
          imageAlt={t("circleTime.imageAlt")}
          imagePosition="offset-left"
        >
          <QAItem question={t("circleTime.q1.question")}>
            <p>{t("circleTime.q1.answer1")}</p>
            <p>{t("circleTime.q1.answer2")}</p>
          </QAItem>
          <QAItem question={t("circleTime.q2.question")}>
            <p>{t("circleTime.q2.answer1")}</p>
            <p>{t("circleTime.q2.answer2")}</p>
          </QAItem>
          <QAItem question={t("circleTime.q3.question")}>
            <p>{t("circleTime.q3.answer1")}</p>
            <p>{t("circleTime.q3.answer2")}</p>
          </QAItem>
          <QAItem question={t("circleTime.q4.question")}>
            <p>{t("circleTime.q4.answer1")}</p>
            <p>{t("circleTime.q4.answer2")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Snack Time */}
        <DaySection
          time={t("snackTime.time")}
          title={t("snackTime.title")}
          intro={t("snackTime.intro")}
          image="/images/lunch-social-dining.jpeg"
          imageAlt={t("snackTime.imageAlt")}
          imagePosition="offset-right"
        >
          <QAItem question={t("snackTime.q1.question")}>
            <p>{t("snackTime.q1.answer1")}</p>
            <p>{t("snackTime.q1.answer2")}</p>
          </QAItem>
          <QAItem question={t("snackTime.q2.question")}>
            <p>{t("snackTime.q2.answer")}</p>
          </QAItem>
          <QAItem question={t("snackTime.q3.question")}>
            <p>{t("snackTime.q3.answer1")}</p>
            <p>{t("snackTime.q3.answer2")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Mid-Morning Activities */}
        <section className="mb-20">
          <span className="inline-block bg-[#FAF9F6] px-3 py-1 rounded-full text-sm font-medium text-[#666] mb-3">
            {t("midMorning.time")}
          </span>
          <h2 className="font-serif text-2xl md:text-[32px] font-medium text-[#2d2d2d] mb-6">
            {t("midMorning.title")}
          </h2>
          <p className="text-[17px] text-[#555] mb-6 leading-relaxed">
            {t("midMorning.intro")}
          </p>

          {/* Activity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <ActivityCard
              day={t("midMorning.activities.tuesday.day")}
              title={t("midMorning.activities.tuesday.title")}
              description={t("midMorning.activities.tuesday.description")}
            />
            <ActivityCard
              day={t("midMorning.activities.thursday.day")}
              title={t("midMorning.activities.thursday.title")}
              description={t("midMorning.activities.thursday.description")}
            />
            <ActivityCard
              day={t("midMorning.activities.friday.day")}
              title={t("midMorning.activities.friday.title")}
              description={t("midMorning.activities.friday.description")}
            />
            <ActivityCard
              day={t("midMorning.activities.other.day")}
              title={t("midMorning.activities.other.title")}
              description={t("midMorning.activities.other.description")}
            />
          </div>

          {/* Slider */}
          <ImageSlider
            images={[
              {
                src: "/images/cooking-practical-life.jpeg",
                alt: t("midMorning.slider.baking.alt"),
                caption: t("midMorning.slider.baking.caption"),
              },
              {
                src: "/images/waldorf-art.jpeg",
                alt: t("midMorning.slider.painting.alt"),
                caption: t("midMorning.slider.painting.caption"),
              },
              {
                src: "/images/music-corner.jpg",
                alt: t("midMorning.slider.music.alt"),
                caption: t("midMorning.slider.music.caption"),
              },
            ]}
          />

          <QAItem question={t("midMorning.q1.question")}>
            <p>{t("midMorning.q1.answer1")}</p>
            <p>{t("midMorning.q1.answer2")}</p>
          </QAItem>
          <QAItem question={t("midMorning.q2.question")}>
            <p>{t("midMorning.q2.answer1")}</p>
            <p>{t("midMorning.q2.answer2")}</p>
          </QAItem>
          <QAItem question={t("midMorning.q3.question")}>
            <p>{t("midMorning.q3.answer1")}</p>
            <p>{t("midMorning.q3.answer2")}</p>
          </QAItem>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Outdoor Free Play */}
        <section className="mb-20">
          <span className="inline-block bg-[#FAF9F6] px-3 py-1 rounded-full text-sm font-medium text-[#666] mb-3">
            {t("outdoorPlay.time")}
          </span>
          <h2 className="font-serif text-2xl md:text-[32px] font-medium text-[#2d2d2d] mb-6">
            {t("outdoorPlay.title")}
          </h2>
          <p className="text-[17px] text-[#555] mb-6 leading-relaxed">
            {t("outdoorPlay.intro")}
          </p>

          {/* Slider */}
          <ImageSlider
            images={[
              {
                src: "/images/Free-Play.jpeg",
                alt: t("outdoorPlay.slider.climbing.alt"),
                caption: t("outdoorPlay.slider.climbing.caption"),
              },
              {
                src: "/images/digging-garden.jpeg",
                alt: t("outdoorPlay.slider.digging.alt"),
                caption: t("outdoorPlay.slider.digging.caption"),
              },
              {
                src: "/images/Mud-Play.png",
                alt: t("outdoorPlay.slider.mud.alt"),
                caption: t("outdoorPlay.slider.mud.caption"),
              },
            ]}
          />

          <QAItem question={t("outdoorPlay.q1.question")}>
            <p>{t("outdoorPlay.q1.answer1")}</p>
            <p>{t("outdoorPlay.q1.answer2")}</p>
          </QAItem>
          <QAItem question={t("outdoorPlay.q2.question")}>
            <p>{t("outdoorPlay.q2.answer1")}</p>
            <p>{t("outdoorPlay.q2.answer2")}</p>
          </QAItem>
          <QAItem question={t("outdoorPlay.q3.question")}>
            <p>{t("outdoorPlay.q3.answer1")}</p>
            <p>{t("outdoorPlay.q3.answer2")}</p>
          </QAItem>
          <QAItem question={t("outdoorPlay.q4.question")}>
            <p>{t("outdoorPlay.q4.answer1")}</p>
            <p>{t("outdoorPlay.q4.answer2")}</p>
          </QAItem>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Cleanup & Story Time */}
        <DaySection
          time={t("cleanupStoryTime.time")}
          title={t("cleanupStoryTime.title")}
          intro={t("cleanupStoryTime.intro")}
          image="/images/story-time-circle.jpg"
          imageAlt={t("cleanupStoryTime.imageAlt")}
          imagePosition="tall"
        >
          <QAItem question={t("cleanupStoryTime.q1.question")}>
            <p>{t("cleanupStoryTime.q1.answer1")}</p>
            <p>{t("cleanupStoryTime.q1.answer2")}</p>
          </QAItem>
          <QAItem question={t("cleanupStoryTime.q2.question")}>
            <p>{t("cleanupStoryTime.q2.answer1")}</p>
            <p>{t("cleanupStoryTime.q2.answer2")}</p>
          </QAItem>
          <QAItem question={t("cleanupStoryTime.q3.question")}>
            <p>{t("cleanupStoryTime.q3.answer")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Lunch */}
        <DaySection
          time={t("lunch.time")}
          title={t("lunch.title")}
          intro={t("lunch.intro")}
          image="/images/healthy-snacks.jpeg"
          imageAlt={t("lunch.imageAlt")}
          imagePosition="wide"
        >
          <QAItem question={t("lunch.q1.question")}>
            <p>{t("lunch.q1.answer")}</p>
          </QAItem>
          <QAItem question={t("lunch.q2.question")}>
            <p>{t("lunch.q2.answer1")}</p>
            <p>{t("lunch.q2.answer2")}</p>
          </QAItem>
          <QAItem question={t("lunch.q3.question")}>
            <p>{t("lunch.q3.answer")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Quiet Time */}
        <DaySection
          time={t("quietTime.time")}
          title={t("quietTime.title")}
          intro={t("quietTime.intro")}
          image="/images/quiet-time.jpg"
          imageAlt={t("quietTime.imageAlt")}
          imagePosition="offset-left"
        >
          <QAItem question={t("quietTime.q1.question")}>
            <p>{t("quietTime.q1.answer1")}</p>
            <p>{t("quietTime.q1.answer2")}</p>
          </QAItem>
          <QAItem question={t("quietTime.q2.question")}>
            <p>{t("quietTime.q2.answer1")}</p>
            <p>{t("quietTime.q2.answer2")}</p>
          </QAItem>
          <QAItem question={t("quietTime.q3.question")}>
            <p>{t("quietTime.q3.answer")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Afternoon Activities */}
        <DaySection
          time={t("afternoonActivities.time")}
          title={t("afternoonActivities.title")}
          intro={t("afternoonActivities.intro")}
          image="/images/Animal-Care.png"
          imageAlt={t("afternoonActivities.imageAlt")}
          imagePosition="wide"
        >
          <QAItem question={t("afternoonActivities.q1.question")}>
            <p>{t("afternoonActivities.q1.answer")}</p>
          </QAItem>
          <QAItem question={t("afternoonActivities.q2.question")}>
            <p>{t("afternoonActivities.q2.answer")}</p>
          </QAItem>
          <QAItem question={t("afternoonActivities.q3.question")}>
            <p>{t("afternoonActivities.q3.answer")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Pickup */}
        <DaySection
          time={t("pickup.time")}
          title={t("pickup.title")}
          intro={t("pickup.intro")}
          image="/images/parent-community.jpeg"
          imageAlt={t("pickup.imageAlt")}
          imagePosition="offset-right"
        >
          <QAItem question={t("pickup.q1.question")}>
            <p>{t("pickup.q1.answer1")}</p>
            <p>{t("pickup.q1.answer2")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* After-School Program */}
        <DaySection
          time={t("afterSchool.time")}
          title={t("afterSchool.title")}
          intro={t("afterSchool.intro")}
          image="/images/nature-art-leaf.jpeg"
          imageAlt={t("afterSchool.imageAlt")}
          imagePosition="offset-left"
        >
          <QAItem question={t("afterSchool.q1.question")}>
            <p>{t("afterSchool.q1.answer")}</p>
          </QAItem>
          <QAItem question={t("afterSchool.q2.question")}>
            <p>{t("afterSchool.q2.answer")}</p>
          </QAItem>
          <QAItem question={t("afterSchool.q3.question")}>
            <p>{t("afterSchool.q3.answer")}</p>
          </QAItem>
        </DaySection>

        <div className="h-px bg-gradient-to-r from-transparent via-[#BED7AF] to-transparent my-16" />

        {/* Closing */}
        <section className="mb-8">
          <h2 className="font-serif text-2xl md:text-[32px] font-medium text-[#2d2d2d] mb-6">
            {t("closing.title")}
          </h2>
          <p className="text-[17px] text-[#555] mb-5 leading-relaxed">
            {t("closing.p1")}
          </p>
          <p className="text-[17px] text-[#555] mb-8 leading-relaxed">
            {t("closing.p2")}
          </p>
          <Image
            src="/images/evening-gathering.jpg"
            alt={t("closing.imageAlt")}
            width={800}
            height={350}
            className="w-full h-[350px] object-cover rounded-xl mb-8"
          />

          {/* CTA Box */}
          <div className="bg-[#FAF9F6] p-8 rounded-xl text-center">
            <h3 className="font-serif text-xl md:text-2xl text-[#2d2d2d] mb-3">
              {t("cta.title")}
            </h3>
            <p className="text-[#555] mb-5">{t("cta.description")}</p>
            <Link
              href={localePath("/contact")}
              className="inline-block bg-[#BED7AF] text-[#2d2d2d] px-8 py-3.5 rounded-lg font-medium hover:bg-[#a5c494] transition-colors"
            >
              {t("cta.button")}
            </Link>
          </div>
        </section>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
