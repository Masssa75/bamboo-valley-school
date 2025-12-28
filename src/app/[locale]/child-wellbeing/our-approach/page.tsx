import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Approach | Bamboo Valley - Collaborative & Proactive Solutions",
  description: "How Bamboo Valley helps children who struggle with behavior. We use Collaborative & Proactive Solutions (CPS) - a research-backed approach that builds skills, not just compliance.",
  keywords: ["CPS", "collaborative proactive solutions", "ross greene", "child behavior", "positive discipline"],
};

export default async function OurApproachPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ourApproach");
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
            <p className="text-2xl font-serif text-[#2d2d2d] mb-3">
              {t("corePhilosophy")}
            </p>
            <p className="text-[#444] text-lg leading-relaxed">
              {t("corePhilosophyDesc")}
            </p>
          </div>

          {/* Introduction */}
          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("intro1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("intro2")}
          </p>

          {/* Old Way vs New Way */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("differentWay")}</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Old Way */}
            <div className="bg-[#ffebee] border-2 border-[#f44336] rounded-lg overflow-hidden">
              <div className="bg-[#f44336] text-white px-4 py-2 font-semibold text-center">
                {t("traditionalThinking")}
              </div>
              <div className="p-5">
                <p className="text-[#444] font-medium mb-3">{t("traditionalMotto")}</p>
                <ul className="text-[#666] space-y-2 text-[0.95rem]">
                  <li>• {t("traditionalPoints.0")}</li>
                  <li>• {t("traditionalPoints.1")}</li>
                  <li>• {t("traditionalPoints.2")}</li>
                  <li>• {t("traditionalPoints.3")}</li>
                </ul>
                <p className="text-sm text-[#888] mt-4 italic">
                  {t("traditionalResult")}
                </p>
              </div>
            </div>

            {/* CPS Way */}
            <div className="bg-[#f0f7ed] border-2 border-[#8fb07a] rounded-lg overflow-hidden">
              <div className="bg-[#8fb07a] text-white px-4 py-2 font-semibold text-center">
                {t("ourApproachLabel")}
              </div>
              <div className="p-5">
                <p className="text-[#444] font-medium mb-3">{t("ourApproachMotto")}</p>
                <ul className="text-[#666] space-y-2 text-[0.95rem]">
                  <li>• {t("ourApproachPoints.0")}</li>
                  <li>• {t("ourApproachPoints.1")}</li>
                  <li>• {t("ourApproachPoints.2")}</li>
                  <li>• {t("ourApproachPoints.3")}</li>
                </ul>
                <p className="text-sm text-[#888] mt-4 italic">
                  {t("ourApproachResult")}
                </p>
              </div>
            </div>
          </div>

          {/* Why Consequences Alone Don't Work */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whyConsequencesDontWork")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("consequences1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("consequences2")}
          </p>

          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
            <p className="text-[#444] leading-relaxed">
              {t("analogy")}
            </p>
          </div>

          {/* How It Works */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("howItWorks")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            {t("howItWorksDesc")}
          </p>

          {/* Three Steps */}
          <div className="space-y-6 mb-12">
            {/* Step 1 */}
            <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
              <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">1</span>
                {t("step1Title")}
              </div>
              <div className="p-5 bg-[#f8fbfc]">
                <p className="text-[#444] mb-3">
                  {t("step1Desc")}
                </p>
                <div className="bg-white border-l-3 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                  {t("step1Example")}
                </div>
                <p className="text-sm text-[#888] mt-3">
                  {t("step1Note")}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
              <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">2</span>
                {t("step2Title")}
              </div>
              <div className="p-5 bg-[#f8fbfc]">
                <p className="text-[#444] mb-3">
                  {t("step2Desc")}
                </p>
                <div className="bg-white border-l-3 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                  {t("step2Example")}
                </div>
                <p className="text-sm text-[#888] mt-3">
                  {t("step2Note")}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
              <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">3</span>
                {t("step3Title")}
              </div>
              <div className="p-5 bg-[#f8fbfc]">
                <p className="text-[#444] mb-3">
                  {t("step3Desc")}
                </p>
                <div className="bg-white border-l-3 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                  {t("step3Example")}
                </div>
                <p className="text-sm text-[#888] mt-3">
                  {t("step3Note")}
                </p>
              </div>
            </div>
          </div>

          {/* Why This Works */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whyThisWorks")}</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("buildsSkills")}</h3>
              <p className="text-[#666] text-[0.95rem]">
                {t("buildsSkillsDesc")}
              </p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("solutionsLast")}</h3>
              <p className="text-[#666] text-[0.95rem]">
                {t("solutionsLastDesc")}
              </p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("relationshipsStrengthen")}</h3>
              <p className="text-[#666] text-[0.95rem]">
                {t("relationshipsStrengthenDesc")}
              </p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("proactive")}</h3>
              <p className="text-[#666] text-[0.95rem]">
                {t("proactiveDesc")}
              </p>
            </div>
          </div>

          {/* Common Questions */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("commonQuestions")}</h2>

          <div className="space-y-6 mb-12">
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("q1")}</h3>
              <p className="text-[#444] leading-relaxed">
                {t("a1")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("q2")}</h3>
              <p className="text-[#444] leading-relaxed">
                {t("a2")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("q3")}</h3>
              <p className="text-[#444] leading-relaxed">
                {t("a3")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("q4")}</h3>
              <p className="text-[#444] leading-relaxed">
                {t("a4")}
              </p>
            </div>
          </div>

          {/* Research */}
          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("researchTitle")}</h3>
            <p className="text-[#444] leading-relaxed mb-4">
              {t("research1")}
            </p>
            <p className="text-[#444] leading-relaxed">
              {t("research2")}
            </p>
            <p className="text-sm text-[#888] mt-4">
              {t("researchLink")}
            </p>
          </div>

          {/* Using at Home */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("usingAtHome")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("usingAtHomeDesc")}
          </p>

          <ol className="text-[#444] text-lg leading-relaxed mb-8 space-y-3 list-decimal list-inside">
            <li>{t("homeStep1")}</li>
            <li>{t("homeStep2")}</li>
            <li>{t("homeStep3")}</li>
          </ol>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("usingAtHomeConclusion")}
          </p>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">{tCommon("questions")}</h3>
            <p className="text-[#666] mb-6">{tCommon("questionsDescription")}</p>
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
