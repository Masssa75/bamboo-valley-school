import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Behavior Support | Bamboo Valley - Our 3-Tier Response System",
  description: "How Bamboo Valley responds to behavioral challenges. A clear, fair, 3-tier system that protects all children while supporting those who struggle.",
  keywords: ["behavior policy", "school discipline", "positive behavior support", "child behavior"],
};

export default async function BehaviorSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("behaviorSupport");
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

          {/* Core Principle */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#444] text-lg leading-relaxed">
              {t("corePrinciple")}
            </p>
          </div>

          {/* The 4 Rules */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("fourRulesTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("fourRulesDesc")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { num: 1, name: t("rule1"), desc: t("rule1Desc") },
              { num: 2, name: t("rule2"), desc: t("rule2Desc") },
              { num: 3, name: t("rule3"), desc: t("rule3Desc") },
              { num: 4, name: t("rule4"), desc: t("rule4Desc") },
            ].map((rule) => (
              <div key={rule.num} className="bg-[#f0f7ed] border-2 border-[#BED7AF] rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-[#8fb07a] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  {rule.num}
                </div>
                <div className="font-semibold text-[#2d2d2d] mb-1">{rule.name}</div>
                <div className="text-sm text-[#666]">{rule.desc}</div>
              </div>
            ))}
          </div>

          {/* The 3-Tier System */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("howWeRespond")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            {t("howWeRespondDesc")}
          </p>

          {/* Tier 1 */}
          <div className="mb-8 rounded-lg overflow-hidden border-2 border-[#4caf50]">
            <div className="bg-[#4caf50] text-white px-6 py-3 font-semibold">
              {t("tier1Title")}
            </div>
            <div className="bg-[#f1f8e9] p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">{t("tier1Examples")}</h4>
                  <ul className="text-[#444] space-y-1 text-[0.95rem]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <li key={i}>• {t(`tier1ExamplesList.${i}`)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">{t("tier1WhatHappens")}</h4>
                  <p className="text-[#444] text-[0.95rem]">
                    {t("tier1Response")}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#4caf50]/20">
                <p className="text-sm text-[#666]">
                  {t("tier1Communication")}
                </p>
              </div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-8 rounded-lg overflow-hidden border-2 border-[#ff9800]">
            <div className="bg-[#ff9800] text-white px-6 py-3 font-semibold">
              {t("tier2Title")}
            </div>
            <div className="bg-[#fff8e1] p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">{t("tier1Examples")}</h4>
                  <ul className="text-[#444] space-y-1 text-[0.95rem]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <li key={i}>• {t(`tier2ExamplesList.${i}`)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">{t("tier1WhatHappens")}</h4>
                  <p className="text-[#444] text-[0.95rem]">
                    {t("tier2Response")}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#ff9800]/20">
                <p className="text-sm text-[#666]">
                  {t("tier2Communication")}
                </p>
              </div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="mb-12 rounded-lg overflow-hidden border-2 border-[#f44336]">
            <div className="bg-[#f44336] text-white px-6 py-3 font-semibold">
              {t("tier3Title")}
            </div>
            <div className="bg-[#ffebee] p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">{t("tier1Examples")}</h4>
                  <ul className="text-[#444] space-y-1 text-[0.95rem]">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <li key={i}>• {t(`tier3ExamplesList.${i}`)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">{t("tier1WhatHappens")}</h4>
                  <p className="text-[#444] text-[0.95rem]">
                    {t("tier3Response")}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#f44336]/20">
                <p className="text-sm text-[#666]">
                  {t("tier3Communication")}
                </p>
              </div>
            </div>
          </div>

          {/* Escalation Path */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("escalationTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("escalationDesc")}
          </p>

          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
            <div className="space-y-4">
              {[
                { incident: t("incident1"), response: t("incident1Response") },
                { incident: t("incident2"), response: t("incident2Response") },
                { incident: t("incident3"), response: t("incident3Response") },
                { incident: t("incident4"), response: t("incident4Response") },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#f44336] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-[#2d2d2d]">{item.incident}</div>
                    <div className="text-[#666]">{item.response}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beyond Consequences */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("beyondConsequences")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("beyondConsequences1")}
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("beyondConsequences2")}
          </p>

          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
            <p className="text-[#444] leading-relaxed">
              {t("learnMoreLinks")}
            </p>
          </div>

          {/* What We Ask of Parents */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("whatWeAskTitle")}</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            {t("whatWeAskDesc")}
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <li key={i} className="flex gap-3">
                <span className="text-[#8fb07a]">✓</span>
                <span>{t(`whatWeAskItems.${i}`)}</span>
              </li>
            ))}
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            {t("whatWeAskConclusion")}
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
