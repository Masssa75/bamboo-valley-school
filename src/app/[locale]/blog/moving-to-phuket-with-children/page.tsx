import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/blog/moving-to-phuket-with-children/";
  const t = await getTranslations({
    locale,
    namespace: "blogMovingToPhuket.meta",
  });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "article",
      publishedTime: "2026-03-21",
      url: `${baseUrl}/${locale}${path}`,
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

export default async function MovingToPhuketPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogMovingToPhuket" });
  const tMeta = await getTranslations({
    locale,
    namespace: "blogMovingToPhuket.meta",
  });

  const whyPhuketCards = [
    { key: "safety", icon: "🛡️" },
    { key: "cost", icon: "💰" },
    { key: "lifestyle", icon: "🌴" },
    { key: "nature", icon: "🌿" },
    { key: "community", icon: "👨‍👩‍👧‍👦" },
    { key: "weather", icon: "☀️" },
  ];

  const howItWorksSteps = [
    { num: "1", key: "reach" },
    { num: "2", key: "visit" },
    { num: "3", key: "enroll" },
    { num: "4", key: "start" },
  ];

  const faqItems = [
    "minStay",
    "curriculum",
    "language",
    "ages",
    "costs",
    "visa",
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tMeta("ogTitle"),
    description: tMeta("description"),
    author: {
      "@type": "Person",
      name: "Marc Schwyn",
      jobTitle: "Co-founder, Bamboo Valley School",
    },
    publisher: {
      "@type": "Organization",
      name: "Bamboo Valley",
      url: "https://bamboovalleyphuket.com",
    },
    datePublished: "2026-03-21",
    dateModified: "2026-03-21",
    keywords: tMeta("keywords"),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((key) => ({
      "@type": "Question",
      name: t(`faq.items.${key}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`faq.items.${key}.a`),
      },
    })),
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation locale={locale as Locale} />

      <main>
        {/* Hero */}
        <header className="relative h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="/images/families-gathering-green-lawn-palm-trees.JPG"
            alt={t("hero.imageAlt")}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d5016]/70 via-[#2d5016]/50 to-transparent" />
          <div className="relative z-10 text-center px-5 max-w-[800px]">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-[600px] mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-semibold text-[#2d5016]">
                {t("hero.badges.ages")}
              </span>
              <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-semibold text-[#2d5016]">
                {t("hero.badges.campus")}
              </span>
              <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-semibold text-[#2d5016]">
                {t("hero.badges.flexible")}
              </span>
            </div>
          </div>
        </header>

        {/* Campus Photo Strip */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 bg-[#2d5016] p-1">
          <Image src="/images/outdoor-reading-circle-palm-trees.JPG" alt="Outdoor reading under palm trees" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/children-free-play-running-palm-grove.JPG" alt="Children running on green grass" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/outdoor-music-circle-guitar-palm-trees.JPG" alt="Music circle under palm trees" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/bamboo-adventure-playground-climbing.JPG" alt="Adventure playground" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover hidden md:block" />
          <Image src="/images/boy-sewing-felt-craft-outdoor-grass.JPG" alt="Waldorf handwork outdoors" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover hidden md:block" />
        </div>

        {/* Founders Intro — "We did it too" */}
        <section className="grid md:grid-cols-2 min-h-[400px]">
          <Image
            src="/images/founders-family-bamboo-valley-phuket.jpeg"
            alt={t("founders.imageAlt")}
            width={600}
            height={400}
            className="w-full h-[300px] md:h-full object-cover"
          />
          <div className="bg-[#FAF9F6] p-10 md:p-16 flex flex-col justify-center">
            <h2 className="font-serif text-3xl text-[#2d2d2d] mb-6">
              {t("founders.title")}
            </h2>
            <p className="text-[17px] text-[#555] leading-relaxed mb-4">
              {t("founders.p1")}
            </p>
            <p className="text-[17px] text-[#555] leading-relaxed mb-4">
              {t("founders.p2")}
            </p>
            <p className="italic text-[#7a9a3b] mt-2">
              {t("founders.signature")}
            </p>
          </div>
        </section>

        {/* Why Phuket for Families */}
        <section className="bg-[#DCEBE1] py-20 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="font-serif text-3xl text-[#2d5016] mb-4">
              {t("whyPhuket.title")}
            </h2>
            <p className="text-lg text-[#555] mb-10 max-w-[700px]">
              {t("whyPhuket.intro")}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyPhuketCards.map((card) => (
                <div
                  key={card.key}
                  className="flex gap-4 bg-white p-6 rounded-xl shadow-sm"
                >
                  <div className="text-3xl flex-shrink-0">{card.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#2d5016] mb-2">
                      {t(`whyPhuket.cards.${card.key}.title`)}
                    </h3>
                    <p className="text-sm text-[#666]">
                      {t(`whyPhuket.cards.${card.key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Campus — Big Image Slider */}
        <section className="py-20 px-5 max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl text-[#2d2d2d] mb-4">
            {t("campus.title")}
          </h2>
          <p className="text-[17px] text-[#555] leading-relaxed mb-8 max-w-[700px]">
            {t("campus.intro")}
          </p>

          <ImageSlider
            images={[
              {
                src: "/images/families-gathering-green-lawn-palm-trees.JPG",
                alt: t("campus.slider.panorama.alt"),
                caption: t("campus.slider.panorama.caption"),
              },
              {
                src: "/images/wooden-classrooms-colorful-flags-campus.JPG",
                alt: t("campus.slider.classrooms.alt"),
                caption: t("campus.slider.classrooms.caption"),
              },
              {
                src: "/images/two-classroom-buildings-bunting-palms.JPG",
                alt: t("campus.slider.buildings.alt"),
                caption: t("campus.slider.buildings.caption"),
              },
              {
                src: "/images/campus-building-palm-trees-sunny-day.JPG",
                alt: t("campus.slider.sunny.alt"),
                caption: t("campus.slider.sunny.caption"),
              },
              {
                src: "/images/children-free-play-running-palm-grove.JPG",
                alt: t("campus.slider.freeplay.alt"),
                caption: t("campus.slider.freeplay.caption"),
              },
            ]}
          />

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-[#f9faf7] rounded-xl">
              <div className="text-3xl mb-2">🌴</div>
              <p className="font-bold text-[#2d5016]">{t("campus.stats.palms")}</p>
            </div>
            <div className="text-center p-6 bg-[#f9faf7] rounded-xl">
              <div className="text-3xl mb-2">🏫</div>
              <p className="font-bold text-[#2d5016]">{t("campus.stats.campus")}</p>
            </div>
            <div className="text-center p-6 bg-[#f9faf7] rounded-xl">
              <div className="text-3xl mb-2">🌱</div>
              <p className="font-bold text-[#2d5016]">{t("campus.stats.outdoor")}</p>
            </div>
          </div>
        </section>

        {/* A Day Outdoors — Slider */}
        <section className="bg-[#FAD7AA]/30 py-20 px-5">
          <div className="max-w-[900px] mx-auto">
            <h2 className="font-serif text-3xl text-[#2d2d2d] mb-4">
              {t("dayOutdoors.title")}
            </h2>
            <p className="text-[17px] text-[#555] leading-relaxed mb-8 max-w-[700px]">
              {t("dayOutdoors.intro")}
            </p>

            <ImageSlider
              images={[
                {
                  src: "/images/outdoor-reading-circle-palm-trees.JPG",
                  alt: t("dayOutdoors.slider.reading.alt"),
                  caption: t("dayOutdoors.slider.reading.caption"),
                },
                {
                  src: "/images/outdoor-music-circle-guitar-palm-trees.JPG",
                  alt: t("dayOutdoors.slider.music.alt"),
                  caption: t("dayOutdoors.slider.music.caption"),
                },
                {
                  src: "/images/teacher-child-ukulele-lesson-outdoors.JPG",
                  alt: t("dayOutdoors.slider.ukulele.alt"),
                  caption: t("dayOutdoors.slider.ukulele.caption"),
                },
                {
                  src: "/images/boy-sewing-felt-craft-outdoor-grass.JPG",
                  alt: t("dayOutdoors.slider.sewing.alt"),
                  caption: t("dayOutdoors.slider.sewing.caption"),
                },
                {
                  src: "/images/child-nature-exploration-discovery.JPG",
                  alt: t("dayOutdoors.slider.explore.alt"),
                  caption: t("dayOutdoors.slider.explore.caption"),
                },
                {
                  src: "/images/ring-dance-outdoor-play-green-grass.JPG",
                  alt: t("dayOutdoors.slider.dance.alt"),
                  caption: t("dayOutdoors.slider.dance.caption"),
                },
              ]}
            />
          </div>
        </section>

        {/* Schools in Phuket — Where We Fit */}
        <section className="py-20 px-5 max-w-[1000px] mx-auto">
          <h2 className="font-serif text-3xl text-[#2d2d2d] mb-4">
            {t("schools.title")}
          </h2>
          <p className="text-[17px] text-[#555] leading-relaxed mb-6">
            {t("schools.intro")}
          </p>
          <p className="text-[17px] text-[#555] leading-relaxed mb-8">
            {t("schools.bambooValley")}
          </p>

          <div className="bg-[#f9faf7] border-2 border-[#BED7AF] rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-[#2d5016] mb-4">
              {t("schools.whatMakesUsDifferent.title")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#7a9a3b] font-bold mt-0.5">✓</span>
                <span className="text-[#555]">{t("schools.whatMakesUsDifferent.items.nature")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7a9a3b] font-bold mt-0.5">✓</span>
                <span className="text-[#555]">{t("schools.whatMakesUsDifferent.items.waldorf")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7a9a3b] font-bold mt-0.5">✓</span>
                <span className="text-[#555]">{t("schools.whatMakesUsDifferent.items.flexible")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7a9a3b] font-bold mt-0.5">✓</span>
                <span className="text-[#555]">{t("schools.whatMakesUsDifferent.items.parentBuilt")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#7a9a3b] font-bold mt-0.5">✓</span>
                <span className="text-[#555]">{t("schools.whatMakesUsDifferent.items.small")}</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">{t("schools.otherOptions.bisp.name")}</h4>
              <p className="text-xs text-gray-400 mb-2">{t("schools.otherOptions.bisp.type")}</p>
              <p className="text-sm text-gray-600">{t("schools.otherOptions.bisp.desc")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">{t("schools.otherOptions.uwc.name")}</h4>
              <p className="text-xs text-gray-400 mb-2">{t("schools.otherOptions.uwc.type")}</p>
              <p className="text-sm text-gray-600">{t("schools.otherOptions.uwc.desc")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">{t("schools.otherOptions.headstart.name")}</h4>
              <p className="text-xs text-gray-400 mb-2">{t("schools.otherOptions.headstart.type")}</p>
              <p className="text-sm text-gray-600">{t("schools.otherOptions.headstart.desc")}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-gray-700 mb-2">{t("schools.otherOptions.lighthouse.name")}</h4>
              <p className="text-xs text-gray-400 mb-2">{t("schools.otherOptions.lighthouse.type")}</p>
              <p className="text-sm text-gray-600">{t("schools.otherOptions.lighthouse.desc")}</p>
            </div>
          </div>
        </section>

        {/* What It Costs */}
        <section className="bg-[#C8DCE1]/40 py-20 px-5">
          <div className="max-w-[900px] mx-auto">
            <h2 className="font-serif text-3xl text-[#2d2d2d] mb-4">
              {t("costs.title")}
            </h2>
            <p className="text-[17px] text-[#555] leading-relaxed mb-8">
              {t("costs.intro")}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">{t("costs.cards.school.label")}</p>
                <p className="text-2xl font-bold text-[#2d5016]">{t("costs.cards.school.range")}</p>
                <p className="text-xs text-gray-400 mt-1">{t("costs.cards.school.note")}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">{t("costs.cards.rent.label")}</p>
                <p className="text-2xl font-bold text-[#2d5016]">{t("costs.cards.rent.range")}</p>
                <p className="text-xs text-gray-400 mt-1">{t("costs.cards.rent.note")}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <p className="text-sm text-gray-500 mb-2">{t("costs.cards.living.label")}</p>
                <p className="text-2xl font-bold text-[#2d5016]">{t("costs.cards.living.range")}</p>
                <p className="text-xs text-gray-400 mt-1">{t("costs.cards.living.note")}</p>
              </div>
            </div>

            <p className="text-sm text-[#888] italic">
              {t("costs.comparison")}
            </p>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="py-20 px-5 max-w-[1000px] mx-auto">
          <h2 className="font-serif text-3xl text-[#2d2d2d] mb-6">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-[#555] mb-10">
            {t("howItWorks.intro")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {howItWorksSteps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 bg-[#BED7AF] rounded-full flex items-center justify-center text-2xl font-bold text-[#2d5016] mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-[#2d5016] mb-2">
                  {t(`howItWorks.steps.${step.key}.title`)}
                </h3>
                <p className="text-sm text-[#666]">
                  {t(`howItWorks.steps.${step.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#FAF9F6] py-20 px-5">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-serif text-3xl text-[#2d2d2d] mb-10">
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {faqItems.map((key) => (
                <div key={key} className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-[#2d5016] mb-3">
                    {t(`faq.items.${key}.q`)}
                  </h3>
                  <p className="text-[#555] leading-relaxed">
                    {t(`faq.items.${key}.a`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-[#5a7a2b] to-[#7a9a3b] py-24 px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-[600px] mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-white text-[#5a7a2b] px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg"
            >
              {t("cta.contact")}
            </Link>
            <Link
              href={`/${locale}/short-term-school-phuket`}
              className="inline-block bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-white/10 hover:-translate-y-0.5"
            >
              {t("cta.shortTerm")}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </>
  );
}
