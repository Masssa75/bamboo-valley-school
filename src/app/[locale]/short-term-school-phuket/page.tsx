import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/short-term-school-phuket/";
  const canonical = `${baseUrl}/${locale}${path}`;

  return {
    title: "Short-Term School & Holiday Camps in Phuket | Bamboo Valley",
    description:
      "Flexible school enrollment and holiday camps for traveling families in Phuket. Weekly, monthly, or long-term options. Perfect for digital nomads, worldschoolers, and families on extended holidays.",
    keywords: [
      "short term school phuket",
      "flexible enrollment kindergarten phuket",
      "weekly enrollment kindergarten phuket",
      "chinese new year camp phuket",
      "winter camp phuket",
      "worldschooling phuket",
      "digital nomad kids phuket",
      "holiday camp phuket",
      "temporary school enrollment phuket",
      "short term kindergarten phuket",
    ],
    openGraph: {
      title: "Short-Term School & Holiday Camps in Phuket",
      description:
        "Flexible enrollment for traveling families. Weekly, monthly, or long-term options for children ages 2-9.",
      url: canonical,
    },
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en${path}`,
        th: `${baseUrl}/th${path}`,
        ru: `${baseUrl}/ru${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default async function ShortTermSchoolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("shortTermSchool");

  const whoForCards = [
    {
      key: "digitalNomads",
      icon: "🌍",
      image: "/images/Community.jpeg",
    },
    {
      key: "worldschooling",
      icon: "🎒",
      image: "/images/child-reading-outdoors-natural-learning.jpeg",
    },
    {
      key: "extendedHoliday",
      icon: "🏖️",
      image: "/images/Baking.jpeg",
    },
    {
      key: "relocatingFamilies",
      icon: "🏠",
      image: "/images/Sound-Healing.jpg",
    },
  ];

  const holidayCamps = [
    {
      key: "winter",
      image: "/images/Animal-Care.jpg",
    },
    {
      key: "songkran",
      image: "/images/Free-Play.jpeg",
    },
    {
      key: "summer",
      image: "/images/Gardening.jpeg",
    },
    {
      key: "christmas",
      image: "/images/camp-elephants.jpg",
    },
  ];

  const howItWorksSteps = [
    {
      num: "1",
      title: t("howItWorks.steps.step1.title"),
      desc: t("howItWorks.steps.step1.desc"),
    },
    {
      num: "2",
      title: t("howItWorks.steps.step2.title"),
      desc: t("howItWorks.steps.step2.desc"),
    },
    {
      num: "3",
      title: t("howItWorks.steps.step3.title"),
      desc: t("howItWorks.steps.step3.desc"),
    },
    {
      num: "4",
      title: t("howItWorks.steps.step4.title"),
      desc: t("howItWorks.steps.step4.desc"),
    },
  ];

  const whyFeatures = [
    {
      icon: "🌴",
      title: t("why.features.campus.title"),
      desc: t("why.features.campus.desc"),
    },
    {
      icon: "🎨",
      title: t("why.features.waldorf.title"),
      desc: t("why.features.waldorf.desc"),
    },
    {
      icon: "👨‍👩‍👧",
      title: t("why.features.parents.title"),
      desc: t("why.features.parents.desc"),
    },
    {
      icon: "🌏",
      title: t("why.features.community.title"),
      desc: t("why.features.community.desc"),
    },
    {
      icon: "⏰",
      title: t("why.features.hours.title"),
      desc: t("why.features.hours.desc"),
    },
    {
      icon: "📍",
      title: t("why.features.location.title"),
      desc: t("why.features.location.desc"),
    },
  ];

  const otherOptions = [
    {
      key: "lighthouse",
    },
    {
      key: "mhp",
    },
    {
      key: "abc",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Bamboo Valley School",
    alternateName: "Bamboo Valley Kindergarten",
    description:
      "Short-term school and kindergarten in Phuket, Thailand offering flexible enrollment for traveling families, digital nomads, and worldschoolers. Weekly, monthly, or long-term school enrollment available.",
    url: "https://bamboovalleyphuket.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3/74 Moo 4, Cherngtalay",
      addressLocality: "Thalang",
      addressRegion: "Phuket",
      postalCode: "83110",
      addressCountry: "TH",
    },
    areaServed: ["Bangtao", "Laguna", "Cherngtalay", "Phuket"],
    serviceType: [
      "Short-term school enrollment",
      "Holiday camps",
      "Kindergarten",
      "Waldorf education",
      "Nature school",
    ],
    audience: {
      "@type": "Audience",
      audienceType: [
        "Digital nomad families",
        "Worldschooling families",
        "Traveling families",
        "Expat families",
      ],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Enrollment Options",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Weekly School Enrollment",
          description: "Minimum 1 week school enrollment for traveling families",
        },
        {
          "@type": "Offer",
          name: "Monthly School Enrollment",
          description: "1-3 month school enrollment for digital nomads",
        },
        {
          "@type": "Offer",
          name: "Long-Term School Enrollment",
          description: "3-4 month or longer school enrollment",
        },
        {
          "@type": "Offer",
          name: "Winter Camp",
          description: "Holiday camp during winter school break",
        },
        {
          "@type": "Offer",
          name: "Summer Camp",
          description: "Summer school holiday camp program",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navigation locale={locale as Locale} />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/flyover.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-[#BED7AF]/85 via-[#DCEBE1]/80 to-[#C8DCE1]/85 z-[1]" />
          <div className="relative z-[2] text-center px-5 py-10 max-w-[900px]">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-[#3a6020] max-w-[650px] mx-auto mb-8">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                {t("hero.badges.weekly")}
              </span>
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                {t("hero.badges.noCommitment")}
              </span>
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                {t("hero.badges.ages")}
              </span>
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                {t("hero.badges.hours")}
              </span>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-[#5a7a2b] text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-[#4a6a1b] hover:-translate-y-0.5 shadow-lg"
            >
              {t("hero.cta")}
            </Link>
          </div>
        </section>

        {/* Photo Strip */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 bg-[#2d5016] p-1">
          <Image src="/images/Free-Play.jpeg" alt={t("photoStrip.alt1")} width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/Gardening.jpeg" alt={t("photoStrip.alt2")} width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/Painting.jpeg" alt={t("photoStrip.alt3")} width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/Animal-Care.jpg" alt={t("photoStrip.alt4")} width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover hidden md:block" />
          <Image src="/images/Mud-Play.jpg" alt={t("photoStrip.alt5")} width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover hidden md:block" />
        </div>

        {/* Flexible Options */}
        <section className="py-20 px-5 max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold text-[#2d5016] mb-6">{t("flexible.title")}</h2>
          <p className="text-lg text-gray-600 mb-10">
            {t("flexible.description")}
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Weekly */}
            <div className="bg-[#f9faf7] border-2 border-[#BED7AF] rounded-2xl overflow-hidden">
              <Image src="/images/camp-little-kids.jpg" alt={t("options.weekly.alt")} width={400} height={180} className="w-full h-[180px] object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5a7a2b] mb-2">{t("options.weekly.title")}</h3>
                <p className="text-sm text-gray-500 mb-3">{t("options.weekly.subtitle")}</p>
                <p className="text-gray-600 mb-4">
                  {t("options.weekly.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.weekly.bullets.one")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.weekly.bullets.two")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.weekly.bullets.three")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.weekly.bullets.four")}</li>
                </ul>
              </div>
            </div>

            {/* Monthly */}
            <div className="bg-[#f9faf7] border-2 border-[#BED7AF] rounded-2xl overflow-hidden">
              <Image src="/images/Storytelling.jpeg" alt={t("options.monthly.alt")} width={400} height={180} className="w-full h-[180px] object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5a7a2b] mb-2">{t("options.monthly.title")}</h3>
                <p className="text-sm text-gray-500 mb-3">{t("options.monthly.subtitle")}</p>
                <p className="text-gray-600 mb-4">
                  {t("options.monthly.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.monthly.bullets.one")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.monthly.bullets.two")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.monthly.bullets.three")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.monthly.bullets.four")}</li>
                </ul>
              </div>
            </div>

            {/* Long-Term */}
            <div className="bg-[#f9faf7] border-2 border-[#BED7AF] rounded-2xl overflow-hidden">
              <Image src="/images/Playful-Phonics.JPG" alt={t("options.longTerm.alt")} width={400} height={180} className="w-full h-[180px] object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5a7a2b] mb-2">{t("options.longTerm.title")}</h3>
                <p className="text-sm text-gray-500 mb-3">{t("options.longTerm.subtitle")}</p>
                <p className="text-gray-600 mb-4">
                  {t("options.longTerm.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.longTerm.bullets.one")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.longTerm.bullets.two")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.longTerm.bullets.three")}</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> {t("options.longTerm.bullets.four")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Full Width Image */}
        <section className="relative h-[400px] overflow-hidden">
          <Image src="/images/kindergarten.jpg" alt={t("fullWidth.alt")} fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-10 pt-16">
            <h3 className="text-3xl font-bold mb-2">{t("fullWidth.title")}</h3>
            <p className="text-lg opacity-90 max-w-[600px]">
              {t("fullWidth.description")}
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="bg-[#DCEBE1] py-20 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-3xl font-bold text-[#2d5016] mb-6">{t("whoFor.title")}</h2>
            <p className="text-lg text-gray-600 mb-10">
              {t("whoFor.description")}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoForCards.map((card) => (
                <div key={card.key} className="bg-white rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={card.image}
                    alt={t(`whoFor.cards.${card.key}.alt`)}
                    width={300}
                    height={160}
                    className="w-full h-[160px] object-cover"
                  />
                  <div className="p-6">
                    <div className="text-3xl mb-3">{card.icon}</div>
                    <h3 className="text-lg font-bold text-[#2d5016] mb-2">{t(`whoFor.cards.${card.key}.title`)}</h3>
                    <p className="text-sm text-gray-600">
                      {t(`whoFor.cards.${card.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Holiday Camps */}
        <section className="bg-[#FAD7AA] py-20 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-3xl font-bold text-[#8b5a2b] mb-6">{t("holidayCamps.title")}</h2>
            <p className="text-lg text-[#8b5a2b]/80 mb-10">
              {t("holidayCamps.description")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {holidayCamps.map((camp) => (
                <div key={camp.key} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <Image src={camp.image} alt={t(`holidayCamps.camps.${camp.key}.alt`)} width={250} height={140} className="w-full h-[140px] object-cover" />
                  <div className="p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">{t(`holidayCamps.camps.${camp.key}.dates`)}</p>
                    <p className="font-semibold text-[#8b5a2b]">{t(`holidayCamps.camps.${camp.key}.title`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[#8b5a2b]/80">
              {t("holidayCamps.note")}
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section className="bg-[#2d5016] py-20 px-5">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t("video.title")}</h2>
            <p className="text-white/80 mb-8">{t("video.description")}</p>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <video controls poster="/images/hero-bg.jpg" className="w-full">
                <source src="/videos/flyover.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-5 max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold text-[#2d5016] mb-6">{t("howItWorks.title")}</h2>
          <p className="text-lg text-gray-600 mb-10">
            {t("howItWorks.description")}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {howItWorksSteps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 bg-[#BED7AF] rounded-full flex items-center justify-center text-2xl font-bold text-[#2d5016] mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-bold text-[#2d5016] mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founders Section */}
        <section className="grid md:grid-cols-2 min-h-[500px]">
          <Image src="/images/founders-family-bamboo-valley-phuket.jpeg" alt={t("founders.alt")} width={600} height={500} className="w-full h-[300px] md:h-full object-cover" />
          <div className="bg-[#f9faf7] p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#2d5016] mb-6">{t("founders.title")}</h2>
            <p className="text-gray-600 text-lg mb-4">
              {t("founders.description1")}
            </p>
            <p className="text-gray-600 text-lg mb-4">
              {t("founders.description2")}
            </p>
            <p className="italic text-[#7a9a3b] mt-4">{t("founders.signature")}</p>
          </div>
        </section>

        {/* Why Bamboo Valley */}
        <section className="bg-[#C8DCE1] py-20 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-3xl font-bold text-[#2d5a6b] mb-10">{t("why.title")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {whyFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-5 bg-white p-6 rounded-xl shadow-md">
                  <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-[#2d5a6b] mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Options */}
        <section className="bg-gray-100 py-16 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-2xl font-bold text-gray-500 mb-4">{t("otherOptions.title")}</h2>
            <p className="text-gray-500 mb-8">
              {t("otherOptions.description")}
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {otherOptions.map((option) => (
                <div key={option.key} className="bg-white p-5 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-700 mb-1">{t(`otherOptions.items.${option.key}.name`)}</h4>
                  <p className="text-xs text-gray-400 mb-3">{t(`otherOptions.items.${option.key}.location`)}</p>
                  <p className="text-sm text-gray-600">{t(`otherOptions.items.${option.key}.description`)}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-gray-500">
              {t("otherOptions.note")}
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-[#5a7a2b] to-[#7a9a3b] py-24 px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("finalCta.title")}</h2>
          <p className="text-xl text-white/90 mb-10">
            {t("finalCta.description")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-[#5a7a2b] px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg"
          >
            {t("finalCta.button")}
          </Link>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </>
  );
}
