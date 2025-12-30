import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/child-wellbeing/";

  return {
    title: "Child Wellbeing | Bamboo Valley - How We Support Every Child",
    description:
      "Our approach to child wellbeing at Bamboo Valley. Based on Collaborative & Proactive Solutions by Dr. Ross Greene. Clear support systems, fair processes, and true partnership with families.",
    keywords: [
      "child wellbeing",
      "behavior support",
      "collaborative proactive solutions",
      "Waldorf school Phuket",
      "child psychology",
    ],
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        th: `${baseUrl}/th${path}`,
        ru: `${baseUrl}/ru${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default async function ChildWellbeingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("childWellbeing");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Navigation locale={locale as Locale} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#BED7AF] to-[#a8c99a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d] mb-4">
          {t("heroTitle")}
        </h1>
        <p className="text-lg md:text-xl text-[#444] max-w-[600px] mx-auto">
          {t("heroSubtitle")}
        </p>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto">

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("coreBelief")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("coreBelief1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("coreBelief2")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("coreBelief3")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("coreBelief4")}
          </p>

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("inPractice")}</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">{t("weProvide")}</h3>
              <ul className="space-y-3">
                {t.raw("weProvideItems").map((item: string, i: number) => (
                  <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">{t("weExpect")}</h3>
              <ul className="space-y-3">
                {t.raw("weExpectItems").map((item: string, i: number) => (
                  <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("mostChildrenThrive")}
          </p>

          {/* Separator */}
          <div className="text-center my-12 text-[#ccc] text-2xl tracking-[8px]">• • •</div>

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("learnMore")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            {t("learnMoreIntro")}
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {[
              {
                title: t("ourApproachCard.title"),
                description: t("ourApproachCard.description"),
                href: `/${locale}/child-wellbeing/our-approach`
              },
              {
                title: t("understandingCard.title"),
                description: t("understandingCard.description"),
                href: `/${locale}/child-wellbeing/understanding`
              },
              {
                title: t("behaviorSupportCard.title"),
                description: t("behaviorSupportCard.description"),
                href: `/${locale}/child-wellbeing/behavior-support`
              },
              {
                title: t("separationAnxietyCard.title"),
                description: t("separationAnxietyCard.description"),
                href: `/${locale}/child-wellbeing/separation-anxiety`
              }
            ].map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="bg-white p-7 rounded-lg border-2 border-transparent hover:border-[#BED7AF] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-2 flex items-center justify-between">
                  {card.title}
                  <span className="text-[#8fb07a] group-hover:translate-x-1 transition-transform">→</span>
                </h3>
                <p className="text-[#666] text-[0.95rem] leading-relaxed">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("challengesTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("challenges1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("challenges2")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("challenges3")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("challenges4")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("challenges5")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("challenges6")}
          </p>

          {/* CTA */}
          <div className="bg-white p-10 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">{t("questions")}</h3>
            <p className="text-[#666] mb-6">{t("questionsDescription")}</p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {t("contactUs")}
            </Link>
          </div>

        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
