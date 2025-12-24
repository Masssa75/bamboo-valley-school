import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story | Bamboo Valley - Building Schools for the Life We Want",
  description: "How two parents transformed their frustration with traditional education into a nature-based school in Phuket. The story of Bamboo Valley by Nutthanit and Marc Schwyn.",
};

export default async function OurStoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ourStory");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Navigation locale={locale as Locale} />

      {/* Hero with Background Image */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <Image
          src="/images/founders-family-bamboo-valley-phuket.jpeg"
          alt="Bamboo Valley founders with their children at the outdoor school in Phuket"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-white">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-white/90 mb-2">
            {t("heroSubtitle")}
          </p>
          <p className="text-white/70 italic">{t("byFounders")}</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-[700px] mx-auto prose prose-lg">

          {/* Introduction */}
          <p className="text-[#444] leading-relaxed mb-6">
            {t("intro1")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("intro2")}
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            {t("intro3")}
          </p>

          {/* Moving to Phuket */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">{t("movingTitle")}</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("moving1")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("moving2")}
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            {t("moving3")}
          </p>

          {/* Why Parents Struggle */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">{t("struggleTitle")}</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("struggle1")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("struggle2")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("struggle3")}
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            {t("struggle4")}
          </p>

          {/* Raising Dream Children */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">{t("dreamTitle")}</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("dream1")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("dream2")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("dream3")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("dream4")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("dream5")}
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            {t("dream6")}
          </p>

          {/* Why Nature Matters */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">{t("natureTitle")}</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("nature1")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("nature2")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("nature3")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("nature4")}
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            {t("nature5")}
          </p>

          {/* The Paradise School */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">{t("paradiseTitle")}</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("paradise1")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("paradise2")}
          </p>

          <ul className="text-[#444] leading-relaxed mb-6 list-disc pl-6 space-y-4">
            <li><strong>{t("paradisePoints.environment")}:</strong> {t("paradisePoints.environmentDesc")}</li>
            <li><strong>{t("paradisePoints.timing")}:</strong> {t("paradisePoints.timingDesc")}</li>
            <li><strong>{t("paradisePoints.tool")}:</strong> {t("paradisePoints.toolDesc")}</li>
            <li><strong>{t("paradisePoints.community")}:</strong> {t("paradisePoints.communityDesc")}</li>
          </ul>

          <p className="text-[#444] leading-relaxed mb-12">
            {t("paradise3")}
          </p>

          {/* Separator */}
          <div className="text-center my-16 text-[#ccc] text-2xl tracking-widest">• • •</div>

          {/* Educational Foundation */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">{t("foundationTitle")}</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("foundation1")}
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            {t("foundation2")}
          </p>

          <div className="my-8">
            <Link href={`/${locale}/programs`} className="inline-flex items-center gap-2 text-[#8fb07a] hover:text-[#6d9b5a] font-medium">
              {tCommon("exploreProgramsLink")}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-lg text-center mt-16">
            <h3 className="font-serif text-2xl mb-4 text-[#2d2d2d]">{t("ctaTitle")}</h3>
            <p className="text-[#666] mb-6">
              {t("ctaDescription")}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {tCommon("bookVisit")}
            </Link>
          </div>

        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
