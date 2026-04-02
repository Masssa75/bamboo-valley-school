import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/blog/screens-and-brain-development/";
  const t = await getTranslations({ locale, namespace: "blogScreens.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "article",
      publishedTime: "2026-04-02",
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

export default async function ScreensBrainDevelopmentPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blogScreens" });
  const tMeta = await getTranslations({ locale, namespace: "blogScreens.meta" });
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
    datePublished: "2026-04-02",
    dateModified: "2026-04-02",
  };

  const guidelinesItems = t.raw("guidelines.items") as Array<{ age: string; recommendation: string }>;
  const sourceItems = t.raw("sources.items") as Array<{
    text: string;
    linkText: string;
    linkUrl: string;
  }>;

  const sliderImages = [
    { src: "/images/children-magnifying-glass-nature-explore.JPG", alt: "Children exploring nature with magnifying glasses", caption: t("slider.explore") },
    { src: "/images/outdoor-music-circle-guitar-palm-trees.JPG", alt: "Outdoor music circle with guitar under palm trees", caption: t("slider.music") },
    { src: "/images/boy-sewing-felt-craft-outdoor-grass.JPG", alt: "Boy doing felt craft sitting on grass", caption: t("slider.craft") },
    { src: "/images/children-outdoor-play-grass-palm-trees.JPG", alt: "Children playing with balls on green grass", caption: t("slider.play") },
    { src: "/images/outdoor-reading-circle-palm-trees.JPG", alt: "Teacher reading to children under palm trees", caption: t("slider.reading") },
    { src: "/images/bamboo-adventure-playground-climbing.JPG", alt: "Children climbing bamboo adventure playground", caption: t("slider.climbing") },
  ];

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
          src="/images/children-free-play-running-palm-grove.JPG"
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
          <p className="text-lg text-white/90 mb-4 max-w-[600px]">
            {t("hero.subtitle")}
          </p>
          <div className="text-sm text-white/80">{t("hero.date")}</div>
        </div>
      </header>

      <article className="py-12 md:py-16 px-6">
        <div className="max-w-[720px] mx-auto">
          {/* Featured Snippet */}
          <section className="bg-[#FAF9F6] p-6 md:p-8 rounded-lg mb-12">
            <h2 className="font-serif text-xl md:text-2xl font-medium text-[#2d2d2d] mb-4">
              {t("featured.title")}
            </h2>
            <p className="text-[#444] leading-relaxed">
              {t.rich("featured.body", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </section>

          <div className="prose prose-lg max-w-none">
            {/* Opening */}
            <p className="text-[#444] leading-relaxed mb-6">{t("intro.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("intro.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("intro.p3")}</p>

            {/* BBC Video Embed */}
            <div className="my-12">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-4">
                {t("video.title")}
              </h2>
              <p className="text-[#444] leading-relaxed mb-6">{t("video.intro")}</p>
              <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/yFc4yhZKP5U"
                  title="What screens really do to your child's brain development | BBC News"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-[#888] mt-3 italic">{t("video.caption")}</p>
            </div>

            {/* Section 1: It's Not About Screen Time */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("replace.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("replace.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">
              {t.rich("replace.p2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <blockquote className="border-l-4 border-[#BED7AF] pl-6 my-8 italic text-[#555]">
              {t("replace.quote")}
            </blockquote>

            {/* Image: Nature exploration */}
            <div className="my-10 rounded-lg overflow-hidden">
              <Image
                src="/images/children-magnifying-glass-nature-explore.JPG"
                alt={t("images.exploreAlt")}
                width={720}
                height={480}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 720px"
              />
              <p className="text-sm text-[#888] mt-2 italic">{t("images.exploreCaption")}</p>
            </div>

            {/* Section 2: The Brain Science */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("brain.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("brain.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">
              {t.rich("brain.p2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="text-[#444] leading-relaxed mb-6">{t("brain.p3")}</p>

            {/* Image: Ring dance on grass */}
            <div className="my-10 rounded-lg overflow-hidden">
              <Image
                src="/images/ring-dance-outdoor-play-green-grass.JPG"
                alt={t("images.danceAlt")}
                width={720}
                height={480}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 720px"
              />
              <p className="text-sm text-[#888] mt-2 italic">{t("images.danceCaption")}</p>
            </div>

            {/* Section 3: Language & Sleep */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("language.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("language.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">
              {t.rich("language.p2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>

            {/* Image: Reading circle */}
            <div className="my-10 rounded-lg overflow-hidden">
              <Image
                src="/images/outdoor-reading-circle-palm-trees.JPG"
                alt={t("images.readingAlt")}
                width={720}
                height={480}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 720px"
              />
              <p className="text-sm text-[#888] mt-2 italic">{t("images.readingCaption")}</p>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("sleep.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("sleep.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("sleep.p2")}</p>

            {/* Section 4: Not All Screens Are Equal */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("nuance.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("nuance.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">
              {t.rich("nuance.p2", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>

            {/* Guidelines box */}
            <div className="bg-[#DCEBE1] p-6 md:p-8 rounded-lg my-8">
              <h3 className="font-serif text-lg font-medium text-[#2d2d2d] mb-4">
                {t("guidelines.title")}
              </h3>
              <div className="space-y-3">
                {guidelinesItems.map((item) => (
                  <div key={item.age} className="flex gap-3">
                    <span className="font-semibold text-[#2d5a3d] whitespace-nowrap">{item.age}</span>
                    <span className="text-[#444]">{item.recommendation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: What We See at Bamboo Valley */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("bamboo.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("bamboo.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("bamboo.p2")}</p>
            <blockquote className="border-l-4 border-[#BED7AF] pl-6 my-8 italic text-[#555]">
              {t("bamboo.quote")}
            </blockquote>
            <p className="text-[#444] leading-relaxed mb-6">{t("bamboo.p3")}</p>

            {/* Image slider - outdoor activities */}
            <div className="my-10">
              <ImageSlider images={sliderImages} />
            </div>

            <p className="text-[#444] leading-relaxed mb-6">{t("bamboo.p4")}</p>

            {/* Closing */}
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("closing.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("closing.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("closing.p2")}</p>

            {/* Sources */}
            <hr className="my-12 border-gray-200" />
            <section className="text-sm text-[#666]">
              <h2 className="font-serif text-lg font-normal text-[#2d2d2d] mb-4">
                {t("sources.title")}
              </h2>
              <ul className="list-disc pl-6 mb-6 space-y-1">
                {sourceItems.map((item) => (
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
            </section>

            <hr className="my-12 border-gray-200" />
            <p className="text-[#666] italic">{t("disclaimer")}</p>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-[#BED7AF] rounded-lg text-center">
            <h3 className="font-serif text-2xl text-[#2d2d2d] mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-[#2d2d2d] mb-6">{t("cta.description")}</p>
            <a
              href="https://wa.me/66989124218?text=Hi!%20I%20read%20your%20article%20about%20screens%20and%20brain%20development%20and%20would%20love%20to%20learn%20more%20about%20Bamboo%20Valley."
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
