import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Separation Anxiety | Bamboo Valley - Helping Your Child with Goodbyes",
  description: "Research-based guidance for handling separation anxiety. Why tears at drop-off are actually a good sign, and how to help your child feel confident.",
  keywords: ["separation anxiety", "drop-off crying", "child attachment", "preschool transition", "toddler separation"],
};

export default async function SeparationAnxietyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("separationAnxiety");
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

          {/* Good News First */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#444] text-lg leading-relaxed">
              {t("goodNews")}
            </p>
          </div>

          {/* Why This Happens */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whyHappens")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("whyHappens1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("whyHappens2")}
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-2 ml-6">
            {[0, 1, 2].map((i) => (
              <li key={i}>• {t(`trustPoints.${i}`)}</li>
            ))}
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("whyHappens3")}
          </p>

          {/* What Research Tells Us */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("researchTitle")}</h2>

          <div className="space-y-6 mb-12">
            <div className="bg-[#f8fbfc] border-l-4 border-[#C8DCE1] p-5 rounded-r-lg">
              <p className="text-[#444] mb-2">
                <strong>{t("research1Title")}</strong>
              </p>
              <p className="text-[#666] text-[0.95rem]">
                {t("research1Desc")}
              </p>
            </div>

            <div className="bg-[#f8fbfc] border-l-4 border-[#C8DCE1] p-5 rounded-r-lg">
              <p className="text-[#444] mb-2">
                <strong>{t("research2Title")}</strong>
              </p>
              <p className="text-[#666] text-[0.95rem]">
                {t("research2Desc")}
              </p>
            </div>

            <div className="bg-[#f8fbfc] border-l-4 border-[#C8DCE1] p-5 rounded-r-lg">
              <p className="text-[#444] mb-2">
                <strong>{t("research3Title")}</strong>
              </p>
              <p className="text-[#666] text-[0.95rem]">
                {t("research3Desc")}
              </p>
            </div>
          </div>

          {/* The Key Insight */}
          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12 text-center">
            <p className="text-[#444] text-lg">
              {t("bottomLine")}
            </p>
          </div>

          {/* What To Do */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whatHelps")}</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Do */}
            <div className="bg-[#f0f7ed] border-2 border-[#8fb07a] rounded-lg overflow-hidden">
              <div className="bg-[#8fb07a] text-white px-4 py-2 font-semibold">
                {t("whatToDo")}
              </div>
              <div className="p-5">
                <ul className="text-[#444] space-y-3 text-[0.95rem]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#8fb07a] font-bold">✓</span>
                      <span>{t(`doItems.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Don't */}
            <div className="bg-[#ffebee] border-2 border-[#f44336] rounded-lg overflow-hidden">
              <div className="bg-[#f44336] text-white px-4 py-2 font-semibold">
                {t("whatToAvoid")}
              </div>
              <div className="p-5">
                <ul className="text-[#444] space-y-3 text-[0.95rem]">
                  {[0, 1, 2, 3].map((i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#f44336] font-bold">✗</span>
                      <span>{t(`avoidItems.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sample Script */}
          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("sampleScript")}</h3>
            <p className="text-[#444] italic text-lg mb-3">
              {t("scriptText")}
            </p>
            <p className="text-[#666] text-sm">
              {t("scriptNote")}
            </p>
          </div>

          {/* What to Expect */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whatToExpect")}</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: t("week1"), desc: t("week1Desc") },
              { label: t("week2"), desc: t("week2Desc") },
              { label: t("month2"), desc: t("month2Desc") },
              { label: t("month3"), desc: t("month3Desc") },
            ].map((item, i) => (
              <div key={i} className="bg-[#FAF9F6] rounded-lg p-4 text-center">
                <div className="font-semibold text-[#8fb07a] mb-2">{item.label}</div>
                <p className="text-sm text-[#666]">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Gentle Start Option */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("gentleStart")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("gentleStartDesc")}
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-[0.95rem]">
              <thead>
                <tr className="bg-[#8fb07a] text-white">
                  <th className="px-4 py-2 text-left font-semibold">{t("tableDay")}</th>
                  <th className="px-4 py-2 text-left font-semibold">{t("tableReturn")}</th>
                  <th className="px-4 py-2 text-left font-semibold">{t("tableSay")}</th>
                </tr>
              </thead>
              <tbody className="text-[#444]">
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">{t("day12")}</td>
                  <td className="px-4 py-3">{t("day12Return")}</td>
                  <td className="px-4 py-3">{t("day12Say")}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-[#FAF9F6]">
                  <td className="px-4 py-3">{t("day34")}</td>
                  <td className="px-4 py-3">{t("day34Return")}</td>
                  <td className="px-4 py-3">{t("day34Say")}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">{t("day56")}</td>
                  <td className="px-4 py-3">{t("day56Return")}</td>
                  <td className="px-4 py-3">{t("day56Say")}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-[#FAF9F6]">
                  <td className="px-4 py-3">{t("day78")}</td>
                  <td className="px-4 py-3">{t("day78Return")}</td>
                  <td className="px-4 py-3">{t("day78Say")}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">{t("day910")}</td>
                  <td className="px-4 py-3">{t("day910Return")}</td>
                  <td className="px-4 py-3">{t("day910Say")}</td>
                </tr>
                <tr className="bg-[#FAF9F6]">
                  <td className="px-4 py-3">{t("day11")}</td>
                  <td className="px-4 py-3">{t("day11Return")}</td>
                  <td className="px-4 py-3">{t("day11Say")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#666] text-[0.95rem] mb-12 italic">
            {t("tip")}
          </p>

          {/* What Teachers Do */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whatTeachersDo")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("whatTeachersDoDesc")}
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[#8fb07a]">•</span>
                <span>{t(`teacherActions.${i}`)}</span>
              </li>
            ))}
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("teachersAvoid")}
          </p>

          {/* Why This Works */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("whyWorks")}</h3>
            <p className="text-[#444] leading-relaxed">
              {t("whyWorksDesc")}
            </p>
          </div>

          {/* When to Be Concerned */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whenToConcern")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("whenToConcernDesc")}
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-2 ml-6">
            {[0, 1, 2, 3].map((i) => (
              <li key={i}>• {t(`concernItems.${i}`)}</li>
            ))}
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("concernConclusion")}
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
