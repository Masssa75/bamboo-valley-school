import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/expat-school-phuket-enroll/";
  const t = await getTranslations({ locale, namespace: "expatSchool.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        th: `${baseUrl}/th${path}`,
        ru: `${baseUrl}/ru${path}`,
        zh: `${baseUrl}/zh${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default async function ExpatSchoolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "expatSchool" });
  const tMeta = await getTranslations({ locale, namespace: "expatSchool.meta" });
  const localePath = (path: string) => `/${locale}${path}`;

  const schoolSchema = {
    "@context": "https://schema.org",
    "@type": "School",
    name: "Bamboo Valley",
    description: tMeta("ogDescription"),
    url: "https://bamboovalleyphuket.com",
    telephone: "+66989124218",
    foundingDate: "2022",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3/74 Moo 4, Cherngtalay",
      addressLocality: "Thalang",
      addressRegion: "Phuket",
      postalCode: "83110",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 7.9867,
      longitude: 98.3046,
    },
  };

  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const steps = t.raw("process.steps") as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  const differentiators = t.raw("why.items") as Array<{
    icon: string;
    title: string;
    text: string;
  }>;

  const sliderImages = [
    { src: "/images/children-free-play-running-palm-grove.JPG", alt: "Children running freely on green grass among palm trees at expat school in Phuket", caption: t("slider.freePlay") },
    { src: "/images/children-magnifying-glass-nature-explore.JPG", alt: "Children exploring nature with magnifying glasses at outdoor school Phuket", caption: t("slider.explore") },
    { src: "/images/outdoor-music-circle-guitar-palm-trees.JPG", alt: "Music circle under palm trees at Bamboo Valley nature school", caption: t("slider.music") },
    { src: "/images/ring-dance-outdoor-play-green-grass.JPG", alt: "Children doing ring dance on green grass at Waldorf school Phuket", caption: t("slider.dance") },
    { src: "/images/outdoor-reading-circle-palm-trees.JPG", alt: "Outdoor reading with teacher under palm trees in Phuket", caption: t("slider.reading") },
    { src: "/images/children-outdoor-art-craft-bamboo-table.JPG", alt: "Children doing art outdoors at nature school campus", caption: t("slider.art") },
  ];

  return (
    <>
      <Script
        id="school-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation locale={locale as Locale} />

      {/* Hero */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <Image
          src="/images/families-gathering-green-lawn-palm-trees.JPG"
          alt={t("hero.imageAlt")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-[600px] mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/66989124218?text=Hi!%20We're%20an%20expat%20family%20in%20Phuket%20interested%20in%20enrolling%20at%20Bamboo%20Valley.%20Can%20we%20schedule%20a%20visit?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#BED7AF] text-[#2d2d2d] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a8c898] transition-colors"
            >
              {t("hero.ctaPrimary")}
            </a>
            <a
              href="#how-to-enroll"
              className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </header>

      {/* Quick Facts Bar */}
      <section className="bg-[#2d2d2d] text-white py-6 px-6">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-semibold text-[#BED7AF]">{t("facts.ages")}</div>
            <div className="text-sm text-white/70 mt-1">{t("facts.agesLabel")}</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-[#BED7AF]">{t("facts.classSize")}</div>
            <div className="text-sm text-white/70 mt-1">{t("facts.classSizeLabel")}</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-[#BED7AF]">{t("facts.campus")}</div>
            <div className="text-sm text-white/70 mt-1">{t("facts.campusLabel")}</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-[#BED7AF]">{t("facts.location")}</div>
            <div className="text-sm text-white/70 mt-1">{t("facts.locationLabel")}</div>
          </div>
        </div>
      </section>

      <article className="py-12 md:py-16 px-6">
        <div className="max-w-[800px] mx-auto">

          {/* Intro — primary keyword in first 100 words */}
          <p className="text-lg text-[#444] leading-relaxed mb-12">
            {t.rich("intro", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>

          {/* Why Families Choose Us */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-8 text-center">
              {t("why.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {differentiators.map((item) => (
                <div key={item.title} className="bg-[#FAF9F6] p-6 rounded-lg">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-serif text-lg font-medium text-[#2d2d2d] mb-2">{item.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Campus slider */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6 text-center">
              {t("campus.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-8 text-center max-w-[600px] mx-auto">
              {t("campus.subtitle")}
            </p>
            <ImageSlider images={sliderImages} />
          </section>

          {/* Tuition & Fees */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("fees.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("fees.intro")}</p>

            <div className="bg-[#FAF9F6] rounded-lg overflow-hidden mb-6">
              <table className="w-full text-left">
                <thead className="bg-[#2d2d2d] text-white">
                  <tr>
                    <th className="px-6 py-3 font-medium">{t("fees.typeHeader")}</th>
                    <th className="px-6 py-3 font-medium">{t("fees.feeHeader")}</th>
                  </tr>
                </thead>
                <tbody className="text-[#444]">
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">{t("fees.longTerm")}</td>
                    <td className="px-6 py-4">{t("fees.longTermFee")}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">{t("fees.shortTerm")}</td>
                    <td className="px-6 py-4">{t("fees.shortTermFee")}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium">{t("fees.signup")}</td>
                    <td className="px-6 py-4">{t("fees.signupFee")}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">{t("fees.camps")}</td>
                    <td className="px-6 py-4">{t("fees.campsFee")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-[#DCEBE1] p-5 rounded-lg text-sm text-[#2d5a3d]">
              <strong>{t("fees.includesTitle")}</strong> {t("fees.includesText")}
            </div>

            <p className="text-sm text-[#666] mt-4 italic">{t("fees.note")}</p>
          </section>

          {/* How to Enroll */}
          <section id="how-to-enroll" className="mb-16 scroll-mt-24">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-8">
              {t("process.title")}
            </h2>
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#BED7AF] flex items-center justify-center text-[#2d2d2d] font-bold text-lg">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-2">{step.title}</h3>
                    <p className="text-[#555] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/66989124218?text=Hi!%20We'd%20like%20to%20book%20a%20campus%20visit%20at%20Bamboo%20Valley."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#BED7AF] text-[#2d2d2d] px-8 py-4 rounded-lg font-semibold hover:bg-[#a8c898] transition-colors"
              >
                {t("process.ctaVisit")}
              </a>
              <Link
                href={localePath("/enroll")}
                className="inline-flex items-center justify-center gap-2 bg-[#2d2d2d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a1a1a] transition-colors"
              >
                {t("process.ctaApply")}
              </Link>
            </div>
          </section>

          {/* Location */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("location.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-4">{t("location.p1")}</p>
            <p className="text-[#444] leading-relaxed mb-6">{t("location.p2")}</p>

            <div className="bg-[#FAF9F6] p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className="text-[#2d2d2d]">{t("location.addressLabel")}</strong>
                  <p className="text-[#555] mt-1">{t("location.address")}</p>
                </div>
                <div>
                  <strong className="text-[#2d2d2d]">{t("location.hoursLabel")}</strong>
                  <p className="text-[#555] mt-1">{t("location.hours")}</p>
                </div>
                <div>
                  <strong className="text-[#2d2d2d]">{t("location.nearbyLabel")}</strong>
                  <p className="text-[#555] mt-1">{t("location.nearby")}</p>
                </div>
                <div>
                  <strong className="text-[#2d2d2d]">{t("location.commuteLabel")}</strong>
                  <p className="text-[#555] mt-1">{t("location.commute")}</p>
                </div>
              </div>
            </div>

            {/* Image: campus overview */}
            <div className="rounded-lg overflow-hidden">
              <Image
                src="/images/campus-building-palm-trees-sunny-day.JPG"
                alt="Bamboo Valley campus in Cherngtalay, Phuket — nature school for expat families"
                width={800}
                height={450}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </section>

          {/* Visa Guide */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("visa.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("visa.intro")}</p>

            <div className="space-y-4">
              <div className="bg-[#FAF9F6] p-5 rounded-lg">
                <h3 className="font-medium text-[#2d2d2d] mb-2">{t("visa.edTitle")}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{t("visa.edText")}</p>
              </div>
              <div className="bg-[#FAF9F6] p-5 rounded-lg">
                <h3 className="font-medium text-[#2d2d2d] mb-2">{t("visa.guardianTitle")}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{t("visa.guardianText")}</p>
              </div>
              <div className="bg-[#FAF9F6] p-5 rounded-lg">
                <h3 className="font-medium text-[#2d2d2d] mb-2">{t("visa.otherTitle")}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{t("visa.otherText")}</p>
              </div>
            </div>

            <p className="text-sm text-[#666] mt-4 italic">{t("visa.note")}</p>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-8">
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item) => (
                <div key={item.q} className="border-b border-gray-200 pb-6">
                  <h3 className="font-medium text-[#2d2d2d] text-lg mb-2">{item.q}</h3>
                  <p className="text-[#555] leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-[#BED7AF] rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-[#2d2d2d] mb-4">
              {t("finalCta.title")}
            </h2>
            <p className="text-[#2d2d2d] mb-8 max-w-[500px] mx-auto">
              {t("finalCta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/66989124218?text=Hi!%20We're%20an%20expat%20family%20interested%20in%20Bamboo%20Valley.%20Can%20we%20schedule%20a%20campus%20visit?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#2d2d2d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a1a1a] transition-colors"
              >
                {t("finalCta.whatsapp")}
              </a>
              <a
                href="tel:+66989124218"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2d2d2d] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t("finalCta.call")}
              </a>
            </div>
            <p className="text-sm text-[#2d2d2d]/70 mt-6">{t("finalCta.response")}</p>
          </section>

        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
