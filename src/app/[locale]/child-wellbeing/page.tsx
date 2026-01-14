import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BehaviorSidebar from "@/components/BehaviorSidebar";
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
    title: "Our Philosophy | Bamboo Valley - How We Support Every Child",
    description:
      "Our approach to child wellbeing at Bamboo Valley. Based on Collaborative & Proactive Solutions by Dr. Ross Greene. Children do well if they can.",
    keywords: [
      "child wellbeing",
      "CPS",
      "collaborative proactive solutions",
      "ross greene",
      "Waldorf school Phuket",
      "positive discipline",
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
  const tApproach = await getTranslations("ourApproach");

  return (
    <>
      <Navigation locale={locale as Locale} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/wellbeing-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10">
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-white mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-[600px] mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Content with Sidebar */}
      <div className="bg-[#FAF9F6] py-16 px-6">
        <div className="max-w-[1100px] mx-auto flex gap-12">
          <BehaviorSidebar locale={locale} />

          <article className="flex-1 min-w-0">
            <div className="max-w-[700px]">

              {/* Core Philosophy Callout */}
              <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
                <p className="text-2xl font-serif text-[#2d2d2d] mb-3">
                  {tApproach("corePhilosophy")}
                </p>
                <p className="text-[#444] text-lg leading-relaxed">
                  {tApproach("corePhilosophyDesc")}
                </p>
              </div>

              {/* Our Core Belief */}
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

              {/* Traditional vs Our Approach */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{tApproach("differentWay")}</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {/* Traditional */}
                <div className="bg-[#ffebee] border-2 border-[#f44336] rounded-lg overflow-hidden">
                  <div className="bg-[#f44336] text-white px-4 py-2 font-semibold text-center">
                    {tApproach("traditionalThinking")}
                  </div>
                  <div className="p-5">
                    <p className="text-[#444] font-medium mb-3">{tApproach("traditionalMotto")}</p>
                    <ul className="text-[#666] space-y-2 text-[0.95rem]">
                      <li>• {tApproach("traditionalPoints.0")}</li>
                      <li>• {tApproach("traditionalPoints.1")}</li>
                      <li>• {tApproach("traditionalPoints.2")}</li>
                      <li>• {tApproach("traditionalPoints.3")}</li>
                    </ul>
                    <p className="text-sm text-[#888] mt-4 italic">
                      {tApproach("traditionalResult")}
                    </p>
                  </div>
                </div>

                {/* Our Approach */}
                <div className="bg-[#f0f7ed] border-2 border-[#8fb07a] rounded-lg overflow-hidden">
                  <div className="bg-[#8fb07a] text-white px-4 py-2 font-semibold text-center">
                    {tApproach("ourApproachLabel")}
                  </div>
                  <div className="p-5">
                    <p className="text-[#444] font-medium mb-3">{tApproach("ourApproachMotto")}</p>
                    <ul className="text-[#666] space-y-2 text-[0.95rem]">
                      <li>• {tApproach("ourApproachPoints.0")}</li>
                      <li>• {tApproach("ourApproachPoints.1")}</li>
                      <li>• {tApproach("ourApproachPoints.2")}</li>
                      <li>• {tApproach("ourApproachPoints.3")}</li>
                    </ul>
                    <p className="text-sm text-[#888] mt-4 italic">
                      {tApproach("ourApproachResult")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Consequences Alone Don't Work */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{tApproach("whyConsequencesDontWork")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {tApproach("consequences1")}
              </p>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {tApproach("consequences2")}
              </p>

              <div className="bg-white rounded-lg p-6 mb-12 border border-[#e5e5e5]">
                <p className="text-[#444] leading-relaxed italic">
                  {tApproach("analogy")}
                </p>
              </div>

              {/* The 3-Step Process */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{tApproach("howItWorks")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-8">
                {tApproach("howItWorksDesc")}
              </p>

              <div className="space-y-6 mb-12">
                {/* Step 1 */}
                <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
                  <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                    <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">1</span>
                    {tApproach("step1Title")}
                  </div>
                  <div className="p-5 bg-[#f8fbfc]">
                    <p className="text-[#444] mb-3">
                      {tApproach("step1Desc")}
                    </p>
                    <div className="bg-white border-l-4 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                      {tApproach("step1Example")}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
                  <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                    <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">2</span>
                    {tApproach("step2Title")}
                  </div>
                  <div className="p-5 bg-[#f8fbfc]">
                    <p className="text-[#444] mb-3">
                      {tApproach("step2Desc")}
                    </p>
                    <div className="bg-white border-l-4 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                      {tApproach("step2Example")}
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
                  <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                    <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">3</span>
                    {tApproach("step3Title")}
                  </div>
                  <div className="p-5 bg-[#f8fbfc]">
                    <p className="text-[#444] mb-3">
                      {tApproach("step3Desc")}
                    </p>
                    <div className="bg-white border-l-4 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                      {tApproach("step3Example")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Why This Works */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{tApproach("whyThisWorks")}</h2>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white rounded-lg p-5 border border-[#e5e5e5]">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{tApproach("buildsSkills")}</h3>
                  <p className="text-[#666] text-[0.95rem]">
                    {tApproach("buildsSkillsDesc")}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#e5e5e5]">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{tApproach("solutionsLast")}</h3>
                  <p className="text-[#666] text-[0.95rem]">
                    {tApproach("solutionsLastDesc")}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#e5e5e5]">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{tApproach("relationshipsStrengthen")}</h3>
                  <p className="text-[#666] text-[0.95rem]">
                    {tApproach("relationshipsStrengthenDesc")}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-5 border border-[#e5e5e5]">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{tApproach("proactive")}</h3>
                  <p className="text-[#666] text-[0.95rem]">
                    {tApproach("proactiveDesc")}
                  </p>
                </div>
              </div>

              {/* Research */}
              <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
                <h3 className="font-semibold text-[#2d2d2d] mb-3">{tApproach("researchTitle")}</h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  {tApproach("research1")}
                </p>
                <p className="text-[#444] leading-relaxed">
                  {tApproach("research2")}
                </p>
                <p className="text-sm text-[#888] mt-4">
                  {tApproach("researchLink")}
                </p>
              </div>

              {/* CTA */}
              <div className="bg-white p-10 rounded-xl text-center border border-[#e5e5e5]">
                <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">{t("questions")}</h3>
                <p className="text-[#666] mb-6">{t("questionsDescription")}</p>
                <Link href={`/${locale}/contact`} className="btn btn-primary">
                  {t("contactUs")}
                </Link>
              </div>

            </div>
          </article>
        </div>
      </div>

      <Footer locale={locale as Locale} />
    </>
  );
}
