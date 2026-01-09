import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/child-wellbeing/code-of-conduct/";

  return {
    title: "Code of Conduct | Bamboo Valley - Staff & Volunteer Guidelines",
    description:
      "Our code of conduct for all Bamboo Valley team members. Child safety, professional boundaries, and the standards that protect our community.",
    keywords: [
      "code of conduct",
      "child safety",
      "safeguarding",
      "staff guidelines",
      "volunteer guidelines",
      "school policies",
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

export default async function CodeOfConductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("codeOfConduct");
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
      <article className="py-16 px-6 bg-white print:py-8">
        <div className="max-w-[800px] mx-auto">

          {/* Welcome */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#2d2d2d] font-semibold mb-2">{t("welcomeTitle")}</p>
            <p className="text-[#444] leading-relaxed">
              {t("welcomeText")}
            </p>
          </div>

          {/* Section 1: Child Safety */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("section1Title")}</h2>
          <p className="text-[#444] text-lg leading-relaxed mb-6">{t("section1Intro")}</p>

          <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("coreSafetyRules")}</h3>
          <ul className="space-y-3 mb-6">
            {(t.raw("coreSafetyItems") as string[]).map((item: string, i: number) => (
              <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("positiveInteraction")}</h3>
          <ul className="space-y-3 mb-12">
            {(t.raw("positiveItems") as string[]).map((item: string, i: number) => (
              <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                {item}
              </li>
            ))}
          </ul>

          {/* Section 2: Boundaries with Parents */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("section2Title")}</h2>
          <p className="text-[#444] text-lg leading-relaxed mb-6">{t("section2Intro")}</p>

          <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("professionalComm")}</h3>
          <ul className="space-y-3 mb-6">
            {(t.raw("professionalCommItems") as string[]).map((item: string, i: number) => (
              <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                {item}
              </li>
            ))}
          </ul>

          <div className="bg-[#EBC3C3] p-5 rounded-lg mb-12">
            <p className="text-[#444]">
              <span className="font-semibold text-[#8b4545]">{t("exampleScenarioLabel")}</span> {t("exampleScenario")}
            </p>
          </div>

          {/* Section 3: Confidentiality */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("section3Title")}</h2>
          <p className="text-[#444] text-lg leading-relaxed mb-6">{t("section3Intro")}</p>

          <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("keepPrivate")}</h3>
          <ul className="space-y-3 mb-6">
            {(t.raw("keepPrivateItems") as string[]).map((item: string, i: number) => (
              <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("professionalBoundaries")}</h3>
          <ul className="space-y-3 mb-12">
            {(t.raw("professionalBoundariesItems") as string[]).map((item: string, i: number) => (
              <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                {item}
              </li>
            ))}
          </ul>

          {/* Section 4: Communication */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("section4Title")}</h2>
          <p className="text-[#444] text-lg leading-relaxed mb-6">{t("section4Intro")}</p>

          <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("whoToAsk")}</h3>
          <ul className="space-y-3 mb-6">
            {(t.raw("whoToAskItems") as string[]).map((item: string, i: number) => (
              <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-[#2d2d2d] mb-3">{t("whenParentsAsk")}</h3>
          <ul className="space-y-3 mb-12">
            {(t.raw("whenParentsAskItems") as string[]).map((item: string, i: number) => (
              <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                {item}
              </li>
            ))}
          </ul>

          {/* Section 5: Professional Appearance */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">{t("section5Title")}</h2>
          <p className="text-[#444] text-lg leading-relaxed mb-6">{t("section5Intro")}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Do */}
            <div className="bg-[#f0f7ed] border-2 border-[#8fb07a] rounded-lg overflow-hidden">
              <div className="bg-[#8fb07a] text-white px-4 py-2 font-semibold">
                {t("doWear")}
              </div>
              <div className="p-5">
                <ul className="space-y-2">
                  {(t.raw("doWearItems") as string[]).map((item: string, i: number) => (
                    <li key={i} className="text-[#444] text-[0.95rem]">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Don't */}
            <div className="bg-[#ffebee] border-2 border-[#f44336] rounded-lg overflow-hidden">
              <div className="bg-[#f44336] text-white px-4 py-2 font-semibold">
                {t("dontWear")}
              </div>
              <div className="p-5">
                <ul className="space-y-2">
                  {(t.raw("dontWearItems") as string[]).map((item: string, i: number) => (
                    <li key={i} className="text-[#444] text-[0.95rem]">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#EBC3C3] p-5 rounded-lg mb-12">
            <p className="text-[#444]">
              <span className="font-semibold text-[#8b4545]">{t("whyMattersLabel")}</span> {t("whyMatters")}
            </p>
          </div>

          {/* Quick Reference */}
          <div className="bg-[#C8DCE1] p-6 rounded-lg mb-12">
            <h3 className="font-serif text-xl font-semibold text-[#2d2d2d] mb-4 text-center">{t("quickReference")}</h3>
            <ul className="space-y-2">
              {(t.raw("quickReferenceItems") as string[]).map((item: string, i: number) => (
                <li key={i} className="text-[#444] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#2c5f2d] before:font-bold">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Acknowledgment Section */}
          <div className="border-t-2 border-[#BED7AF] pt-8 mb-8">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-4">{t("acknowledgmentTitle")}</h3>
            <p className="text-[#444] leading-relaxed mb-6">{t("acknowledgmentText")}</p>

            <div className="bg-[#FAD7AA] p-5 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 border-2 border-[#333] bg-white flex-shrink-0 mt-0.5"></div>
                <span className="text-[#444]">{t("acknowledgmentCheckbox")}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-[#2c5f2d] mb-2">{t("fullName")}</label>
                <div className="border-b-2 border-[#333] h-8"></div>
              </div>
              <div>
                <label className="block font-semibold text-[#2c5f2d] mb-2">{t("date")}</label>
                <div className="border-b-2 border-[#333] h-8"></div>
              </div>
              <div>
                <label className="block font-semibold text-[#2c5f2d] mb-2">{t("signature")}</label>
                <div className="border-b-2 border-[#333] h-8"></div>
              </div>
            </div>

            <div className="text-center mt-8 print:hidden">
              <PrintButton label={t("printButton")} />
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-sm text-[#666] pt-6 border-t border-[#ddd]">
            <p>Bamboo Valley School | Building Both the Drive and Skills to Succeed</p>
            <p className="mt-1">www.bamboovalleyphuket.com</p>
          </div>

        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
