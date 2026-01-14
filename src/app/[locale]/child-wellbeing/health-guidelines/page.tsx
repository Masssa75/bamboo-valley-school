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
  const path = "/child-wellbeing/health-guidelines/";

  return {
    title: "Health Guidelines | Bamboo Valley - Keeping Our Community Healthy",
    description:
      "Our approach to common health matters like head lice. A collaborative, non-shaming approach that protects the whole community while respecting family preferences.",
    keywords: [
      "school health policy",
      "head lice policy",
      "child health",
      "school wellness",
      "Waldorf school Phuket",
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

export default async function HealthGuidelinesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("healthGuidelines");
  const tCommon = await getTranslations("childWellbeing");

  return (
    <>
      <Navigation variant="light" locale={locale as Locale} />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <Link href={`/${locale}/child-wellbeing`} className="text-sm text-[#8fb07a] hover:text-[#6d9b5a] mb-4 inline-block">
            {tCommon("backToChildWellbeing")}
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d]">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">

          {/* Core Philosophy */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#444] text-lg leading-relaxed">
              {t("corePhilosophy")}
            </p>
          </div>

          {/* Our Approach */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("approachTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("approach1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            {t("approach2")}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border-2 border-[#BED7AF] p-6 rounded-lg">
              <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">{t("weUnderstand")}</h3>
              <ul className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                    {t(`weUnderstandItems.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border-2 border-[#BED7AF] p-6 rounded-lg">
              <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">{t("weAsk")}</h3>
              <ul className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                    {t(`weAskItems.${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Head Lice Section */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("liceTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("lice1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            {t("lice2")}
          </p>

          {/* Why Treatment Matters */}
          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-8">
            <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">{t("whyTreatmentMatters")}</h3>
            <ul className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="text-[#444] flex gap-3">
                  <span className="text-[#8fb07a] flex-shrink-0">•</span>
                  <span>{t(`whyTreatmentItems.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment Options */}
          <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-4">{t("treatmentOptions")}</h3>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("treatmentIntro")}
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: "🏥", title: t("option1Title"), desc: t("option1Desc") },
              { icon: "🧴", title: t("option2Title"), desc: t("option2Desc") },
              { icon: "🌿", title: t("option3Title"), desc: t("option3Desc") },
            ].map((option, i) => (
              <div key={i} className="bg-white border-2 border-[#BED7AF] rounded-lg p-5 text-center">
                <div className="text-3xl mb-3">{option.icon}</div>
                <div className="font-semibold text-[#2d2d2d] mb-2">{option.title}</div>
                <div className="text-sm text-[#666]">{option.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#444] leading-relaxed">
              <strong>{t("alternativeNote")}</strong> {t("alternativeNoteText")}
            </p>
          </div>

          {/* The Process */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("processTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("processIntro")}
          </p>

          <div className="space-y-4 mb-12">
            {[
              { step: "1", title: t("step1Title"), desc: t("step1Desc") },
              { step: "2", title: t("step2Title"), desc: t("step2Desc") },
              { step: "3", title: t("step3Title"), desc: t("step3Desc") },
              { step: "4", title: t("step4Title"), desc: t("step4Desc") },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-[#FAF9F6] p-5 rounded-lg">
                <div className="w-8 h-8 bg-[#8fb07a] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold text-[#2d2d2d]">{item.title}</div>
                  <div className="text-[#666]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Health Matters */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("otherHealthTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("otherHealth1")}
          </p>

          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
            <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">{t("whenToKeepHome")}</h3>
            <ul className="space-y-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <li key={i} className="text-[#444] flex gap-3">
                  <span className="text-[#8fb07a]">✓</span>
                  <span>{t(`keepHomeItems.${i}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Focus */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("communityTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("community1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("community2")}
          </p>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">{tCommon("questions")}</h3>
            <p className="text-[#666] mb-6">{t("questionsDesc")}</p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {tCommon("contactUs")}
            </Link>
          </div>

        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
