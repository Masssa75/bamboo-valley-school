import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { redirect } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// This page is English-only (teacher recruitment requires English speakers)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  // For non-English locales, return minimal metadata (page will redirect)
  if (locale !== "en") {
    return {
      title: "Join Our Team | Bamboo Valley",
      robots: { index: false },
    };
  }

  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/blog/join-our-team/";
  const t = await getTranslations({ locale: "en", namespace: "blogJoinTeam.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "article",
      publishedTime: "2025-01-09",
    },
    alternates: {
      canonical: `${baseUrl}/en${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default async function JoinOurTeamPost({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Redirect non-English users to English version (we need English-speaking teachers)
  if (locale !== "en") {
    redirect("/en/blog/join-our-team");
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale: "en", namespace: "blogJoinTeam" });
  const tMeta = await getTranslations({ locale: "en", namespace: "blogJoinTeam.meta" });
  const localePath = (path: string) => `/en${path}`;

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
    datePublished: "2025-01-09",
    dateModified: "2025-01-09",
  };

  const whatWeLookFor = t.raw("whatWeLookFor.items") as Array<{ title: string; text: string }>;
  const whatYouGet = t.raw("whatYouGet.items") as Array<{ title: string; text: string }>;
  const honestTruth = t.raw("honestTruth.items") as Array<{ title: string; text: string }>;

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation locale="en" />

      {/* Hero with Background Image */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <Image
          src="/images/Gardening.jpeg"
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
          <p className="text-lg text-white/90 mb-4">{t("hero.subtitle")}</p>
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
              })}
            </p>
          </section>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-[#444] leading-relaxed mb-6">{t("intro.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("intro.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("intro.p3")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("problem.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("problem.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("problem.p2")}</p>
            <blockquote className="border-l-4 border-[#BED7AF] pl-6 my-8 italic text-[#555]">
              {t("problem.quote")}
            </blockquote>
            <p className="text-[#444] leading-relaxed mb-12">{t("problem.p3")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("different.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("different.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("different.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("different.p3")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("different.p4")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("team.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("team.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("team.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("team.p3")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("future.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("future.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("future.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("future.p3")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("whatWeLookFor.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("whatWeLookFor.intro")}</p>
            {whatWeLookFor.map((item) => (
              <p key={item.title} className="text-[#444] leading-relaxed mb-4">
                <strong>{item.title}</strong> {item.text}
              </p>
            ))}

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("whatYouGet.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("whatYouGet.intro")}</p>
            {whatYouGet.map((item) => (
              <p key={item.title} className="text-[#444] leading-relaxed mb-4">
                <strong>{item.title}</strong> {item.text}
              </p>
            ))}

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("honestTruth.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("honestTruth.intro")}</p>
            {honestTruth.map((item) => (
              <p key={item.title} className="text-[#444] leading-relaxed mb-4">
                <strong>{item.title}</strong> {item.text}
              </p>
            ))}
            <p className="text-[#444] leading-relaxed mb-12">{t("honestTruth.conclusion")}</p>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mt-12 mb-6">
              {t("location.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("location.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("location.p2")}</p>
            <p className="text-[#444] leading-relaxed mb-12">{t("location.p3")}</p>

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
              href="mailto:hello@bamboovalleyphuket.com?subject=Teaching%20at%20Bamboo%20Valley&body=Hi!%20I%20read%20your%20article%20about%20joining%20the%20team%20and%20would%20love%20to%20learn%20more."
              className="inline-flex items-center gap-2 bg-[#2d2d2d] text-white px-6 py-3 rounded font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              {t("cta.button")}
            </a>
            <p className="text-sm text-[#2d2d2d]/70 mt-4">{t("cta.note")}</p>
          </div>
        </div>
      </article>

      <Footer locale="en" />
    </>
  );
}
