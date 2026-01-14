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
  const path = "/child-wellbeing/understanding/";

  return {
    title: "Understanding Your Child | Bamboo Valley - ALSUP Assessment",
    description:
      "How Bamboo Valley identifies what's really going on when a child struggles. We look for lagging skills and unsolved problems, not labels or blame.",
    keywords: [
      "ALSUP",
      "lagging skills",
      "unsolved problems",
      "child assessment",
      "behavior understanding",
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

export default async function UnderstandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("understanding");
  const tCommon = await getTranslations("childWellbeing");

  return (
    <>
      <Navigation variant="light" locale={locale as Locale} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/when-children-struggle-hero.jpg)" }}
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
      <div className="bg-white py-16 px-6">
        <div className="max-w-[1100px] mx-auto flex gap-12">
          <BehaviorSidebar locale={locale} />

          <article className="flex-1 min-w-0">
            <div className="max-w-[700px]">

              {/* Introduction */}
              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {t("intro1")}
              </p>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {t("intro2")}
              </p>

              <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
                <p className="text-[#444] text-lg leading-relaxed">
                  {t("differentApproach")}
                </p>
              </div>

              {/* The ALSUP */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("alsupTitle")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {t("alsupDesc")}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-[#FAF9F6] rounded-lg p-6">
                  <h3 className="font-semibold text-[#2d2d2d] mb-3 text-lg">{t("laggingSkillsTitle")}</h3>
                  <p className="text-[#666] leading-relaxed">
                    {t("laggingSkillsDesc")}
                  </p>
                </div>
                <div className="bg-[#FAF9F6] rounded-lg p-6">
                  <h3 className="font-semibold text-[#2d2d2d] mb-3 text-lg">{t("unsolvedProblemsTitle")}</h3>
                  <p className="text-[#666] leading-relaxed">
                    {t("unsolvedProblemsDesc")}
                  </p>
                </div>
              </div>

              {/* Categories of Skills */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("skillsTitle")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-8">
                {t("skillsIntro")}
              </p>

              <div className="space-y-6 mb-12">
                {/* Flexibility */}
                <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("flexibility")}</h3>
                  <p className="text-[#666] text-[0.95rem] mb-2">
                    {t("flexibilityDesc")}
                  </p>
                  <p className="text-sm text-[#888] italic">
                    {t("flexibilityExample")}
                  </p>
                </div>

                {/* Frustration Tolerance */}
                <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("frustration")}</h3>
                  <p className="text-[#666] text-[0.95rem] mb-2">
                    {t("frustrationDesc")}
                  </p>
                  <p className="text-sm text-[#888] italic">
                    {t("frustrationExample")}
                  </p>
                </div>

                {/* Problem-Solving */}
                <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("problemSolving")}</h3>
                  <p className="text-[#666] text-[0.95rem] mb-2">
                    {t("problemSolvingDesc")}
                  </p>
                  <p className="text-sm text-[#888] italic">
                    {t("problemSolvingExample")}
                  </p>
                </div>

                {/* Emotional Regulation */}
                <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("emotionalReg")}</h3>
                  <p className="text-[#666] text-[0.95rem] mb-2">
                    {t("emotionalRegDesc")}
                  </p>
                  <p className="text-sm text-[#888] italic">
                    {t("emotionalRegExample")}
                  </p>
                </div>

                {/* Social Skills */}
                <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("socialSkills")}</h3>
                  <p className="text-[#666] text-[0.95rem] mb-2">
                    {t("socialSkillsDesc")}
                  </p>
                  <p className="text-sm text-[#888] italic">
                    {t("socialSkillsExample")}
                  </p>
                </div>

                {/* Executive Function */}
                <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("executiveFunction")}</h3>
                  <p className="text-[#666] text-[0.95rem] mb-2">
                    {t("executiveFunctionDesc")}
                  </p>
                  <p className="text-sm text-[#888] italic">
                    {t("executiveFunctionExample")}
                  </p>
                </div>
              </div>

              {/* How We Identify Problems */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("gettingSpecific")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {t("gettingSpecificDesc")}
              </p>

              <div className="bg-[#FAF9F6] rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-[#2d2d2d] mb-4">{t("unsolvedExamplesTitle")}</h3>
                <ul className="space-y-3 text-[#444]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#8fb07a]">•</span>
                      <span>{t(`unsolvedExamples.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[#444] text-lg leading-relaxed mb-12">
                {t("noJudgment")}
              </p>

              {/* What We Look For */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("patternsTitle")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {t("patternsIntro")}
              </p>

              <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
                <li className="flex gap-3">
                  <span className="text-[#8fb07a] font-bold">→</span>
                  <span>{t("pattern1")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8fb07a] font-bold">→</span>
                  <span>{t("pattern2")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8fb07a] font-bold">→</span>
                  <span>{t("pattern3")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#8fb07a] font-bold">→</span>
                  <span>{t("pattern4")}</span>
                </li>
              </ul>

              <p className="text-[#444] text-lg leading-relaxed mb-12">
                {t("patternsConclusion")}
              </p>

              {/* What Happens Next */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("solutionsTitle")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {t("solutionsDesc")}
              </p>

              <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
                <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("realExample")}</h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  {t("realExample1")}
                </p>
                <p className="text-[#444] leading-relaxed mb-4">
                  {t("realExample2")}
                </p>
                <p className="text-[#444] leading-relaxed">
                  {t("realExample3")}
                </p>
              </div>

              {/* Parents' Role */}
              <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("parentsRole")}</h2>

              <p className="text-[#444] text-lg leading-relaxed mb-6">
                {t("parentsRoleDesc")}
              </p>

              <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[#8fb07a]">✓</span>
                    <span>{t(`parentQuestions.${i}`)}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[#444] text-lg leading-relaxed mb-12">
                {t("parentsConclusion")}
              </p>

              {/* Not About Labels */}
              <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
                <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("notAboutLabeling")}</h3>
                <p className="text-[#444] leading-relaxed">
                  {t("notAboutLabelingDesc")}
                </p>
              </div>

              {/* Learn More */}
              <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
                <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("learnMoreTitle")}</h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  {t("learnMoreDesc")}
                </p>
                <p className="text-[#888]">
                  <a href="https://livesinthebalance.org" target="_blank" rel="noopener noreferrer" className="text-[#8fb07a] hover:text-[#6d9b5a]">livesinthebalance.org</a>
                </p>
              </div>

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
        </div>
      </div>

      <Footer locale={locale as Locale} />
    </>
  );
}
