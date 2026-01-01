import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import ProgramsSubNav from "@/components/ProgramsSubNav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs | Bamboo Valley Phuket - Nursery, Kindergarten & Primary",
  description: "Explore our nature-based programs for ages 1-9: Nursery, Kindergarten, Primary school, plus after-school enrichment, Saturday workshops, and holiday camps.",
};

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("programs");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Navigation variant="light" locale={locale as Locale} />

      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d]">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      <section className="px-6 pb-10 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-sm text-[#666]">
            {t("shortTermCtaTitle")}{" "}
            <Link
              href={`/${locale}/short-term-school-phuket`}
              className="text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
            >
              {t("shortTermCtaLink")}
            </Link>
          </p>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <ProgramsSubNav />

      {/* Main Programs */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-center mb-4 text-[#2d2d2d]">
            {t("fullDayTitle")}
          </h2>
          <p className="text-[#666] text-center mb-16 max-w-[600px] mx-auto">
            {t("fullDaySchedule")}
          </p>

          <div className="space-y-16">
            {/* Nursery */}
            <div id="nursery" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center scroll-mt-44">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#BED7AF]/30 text-[#5a7a4a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {t("nursery.ages")}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal mb-4 text-[#2d2d2d]">
                  {t("nursery.title")}
                </h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  {t("nursery.description1")}
                </p>
                <p className="text-[#444] leading-relaxed mb-6">
                  {t("nursery.description2")}
                </p>
                <div className="text-sm text-[#666] space-y-1">
                  <p><span className="font-medium">{t("nursery.dailyRhythm")}</span> {t("nursery.activities")}</p>
                </div>
              </div>
              <div className="order-1 md:order-2 aspect-[4/3] bg-[#e8f0e3] rounded-lg overflow-hidden">
                <img
                  src="/images/nursery.jpg"
                  alt="Nursery children exploring nature"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Kindergarten */}
            <div id="kindergarten" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center scroll-mt-44">
              <div className="aspect-[4/3] bg-[#e8f0e3] rounded-lg overflow-hidden">
                <img
                  src="/images/kindergarten.jpg"
                  alt="Kindergarten children learning through play"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-block bg-[#BED7AF]/30 text-[#5a7a4a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {t("kindergarten.ages")}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal mb-4 text-[#2d2d2d]">
                  {t("kindergarten.title")}
                </h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  {t("kindergarten.description1")}
                </p>
                <p className="text-[#444] leading-relaxed mb-6">
                  {t("kindergarten.description2")}
                </p>
                <div className="text-sm text-[#666] space-y-1">
                  <p><span className="font-medium">{t("kindergarten.dailyRhythm")}</span> {t("kindergarten.activities")}</p>
                </div>
              </div>
            </div>

            {/* Primary */}
            <div id="primary" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center scroll-mt-44">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#BED7AF]/30 text-[#5a7a4a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {t("primary.ages")}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal mb-4 text-[#2d2d2d]">
                  {t("primary.title")}
                </h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  {t("primary.description1")}
                </p>
                <p className="text-[#444] leading-relaxed mb-6">
                  {t("primary.description2")}
                </p>
                <div className="text-sm text-[#666] space-y-1">
                  <p><span className="font-medium">{t("primary.dailyRhythm")}</span> {t("primary.activities")}</p>
                </div>
              </div>
              <div className="order-1 md:order-2 aspect-[4/3] bg-[#e8f0e3] rounded-lg overflow-hidden">
                <img
                  src="/images/primary.jpg"
                  alt="Primary students engaged in learning"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Programs */}
      <section className="py-16 md:py-24 px-6 bg-[#FAF9F6]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-center mb-4 text-[#2d2d2d]">
            {t("additionalTitle")}
          </h2>
          <p className="text-[#666] text-center mb-16 max-w-[600px] mx-auto">
            {t("additionalDescription")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Parent & Toddler */}
            <div id="toddler" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#FAD7AA]/40 text-[#8a6d3b] px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t("toddler.ages")}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                {t("toddler.title")}
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                {t("toddler.description")}
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">{t("toddler.schedule")}</span> {t("toddler.scheduleValue")}</p>
                <p><span className="font-medium">{t("toddler.duration")}</span> {t("toddler.durationValue")}</p>
              </div>
            </div>

            {/* After School */}
            <div id="after-school" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#C8DCE1]/50 text-[#4a6670] px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t("afterSchool.ages")}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                {t("afterSchool.title")}
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                {t("afterSchool.description")}
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">{t("afterSchool.schedule")}</span> {t("afterSchool.scheduleValue")}</p>
                <p><span className="font-medium">{t("afterSchool.activitiesLabel")}</span> {t("afterSchool.activitiesValue")}</p>
              </div>
            </div>

            {/* Saturday Workshop */}
            <div id="saturday" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#EBC3C3]/40 text-[#8a5a5a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t("saturday.ages")}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                {t("saturday.title")}
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                {t("saturday.description")}
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">{t("saturday.morning")}</span> {t("saturday.morningValue")}</p>
                <p><span className="font-medium">{t("saturday.afternoon")}</span> {t("saturday.afternoonValue")}</p>
                <p><span className="font-medium">{t("saturday.fullDay")}</span> {t("saturday.fullDayValue")}</p>
              </div>
            </div>

            {/* Holiday Camps */}
            <div id="camps" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#BED7AF]/30 text-[#5a7a4a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                {t("holidayCamps.ages")}
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                {t("holidayCamps.title")}
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                {t("holidayCamps.description")}
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">{t("holidayCamps.october")}</span> {t("holidayCamps.octoberDates")}</p>
                <p><span className="font-medium">{t("holidayCamps.christmas")}</span> {t("holidayCamps.christmasDates")}</p>
                <p><span className="font-medium">{t("holidayCamps.winter")}</span> {t("holidayCamps.winterDates")}</p>
                <p><span className="font-medium">{t("holidayCamps.songkran")}</span> {t("holidayCamps.songkranDates")}</p>
                <p><span className="font-medium">{t("holidayCamps.summer")}</span> {t("holidayCamps.summerDates")}</p>
              </div>
              <a
                href="https://phuketcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#8fb07a] hover:text-[#6d9b5a] font-medium text-sm"
              >
                {tCommon("viewCampDetails")} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-[#BED7AF]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-[#2d2d2d]">
            {t("ctaTitle")}
          </h2>
          <p className="text-[#2d2d2d]/80 mb-8">
            {t("ctaDescription")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-[#2d2d2d] text-white px-8 py-3 rounded font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              {tCommon("bookVisit")}
            </Link>
            <a
              href="https://wa.me/66989124218?text=Hi!%20I'd%20like%20to%20learn%20more%20about%20your%20programs."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#2d2d2d] px-8 py-3 rounded font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {tCommon("askOnWhatsApp")}
            </a>
          </div>
        </div>
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
