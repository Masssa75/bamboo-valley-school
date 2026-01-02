import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SpaceVideo from "@/components/SpaceVideo";
import Activities from "@/components/Activities";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/kindergarten-bangtao-laguna-cherngtalay/";
  const canonical = `${baseUrl}/${locale}${path}`;
  const t = await getTranslations({ locale, namespace: "kindergartenLocation.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "kindergarten bangtao",
      "kindergarten cherngtalay",
      "preschool laguna phuket",
      "school near laguna phuket",
      "nursery bangtao",
      "daycare cherngtalay",
      "international school bangtao",
      "kindergarten near laguna",
      "waldorf school phuket",
      "nature school phuket",
    ],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonical,
    },
    alternates: {
      canonical,
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

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "kindergartenLocation" });

  // LocalBusiness Schema with all areas served
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: t("schema.name"),
    description: t("schema.description"),
    url: "https://bamboovalleyphuket.com/kindergarten-bangtao-laguna-cherngtalay",
    telephone: "+66989124218",
    email: "info@bamboovalleyphuket.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3/74 Moo 4",
      addressLocality: "Cherngtalay",
      addressRegion: "Thalang, Phuket",
      postalCode: "83110",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "8.0042192",
      longitude: "98.3179683",
    },
    areaServed: (t.raw("schema.areaServed") as string[]).map((name) => ({
      "@type": "Place",
      name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "15:30",
    },
    priceRange: "$$",
    image: "https://bamboovalleyphuket.com/images/hero-bg.jpg",
  };

  const areas = t.raw("areas.items") as Array<{
    name: string;
    shortName: string;
    driveTime: string;
    description: string;
    highlight: string;
  }>;
  const bangtaoBullets = t.raw("why.bangtaoBullets") as Array<{ title: string; text: string }>;
  const cherngtalayBullets = t.raw("why.cherngtalayBullets") as Array<{
    title: string;
    text: string;
  }>;
  const programs = t.raw("programs.items") as Array<{ title: string; text: string }>;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navigation locale={locale as Locale} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-bg.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50 z-[2]" />
        <div className="relative z-[3] max-w-[900px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-white">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-[700px] mx-auto">
            {t("hero.description")}
          </p>
          <a
            href="https://wa.me/66989124218?text=Hi!%20I%27m%20interested%20in%20Bamboo%20Valley.%20I%20live%20near%20"
            className="inline-block bg-[#8fb07a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#7a9a65] transition-colors"
          >
            {t("hero.cta")}
          </a>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-[#2d2d2d] text-center">
            {t("areas.title")}
          </h2>
          <p className="text-lg text-[#666] text-center mb-12 max-w-[700px] mx-auto">
            {t("areas.description")}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area) => (
              <div
                key={area.shortName}
                className="bg-[#f9f7f4] rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-2xl text-[#2d2d2d]">{area.name}</h3>
                  <span className="bg-[#8fb07a] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {area.driveTime}
                  </span>
                </div>
                <p className="text-[#666] text-sm mb-3 italic">{area.highlight}</p>
                <p className="text-[#555]">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://maps.app.goo.gl/BSgZ5mBeAZqQnZEN6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
            >
              {t("areas.mapCta")} →
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            {t("why.title")}
          </h2>
          <div className="prose prose-lg max-w-none text-[#555]">
            <p>
              {t("why.intro")}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
              <div>
                <h3 className="font-serif text-xl mb-4 text-[#2d2d2d]">{t("why.bangtaoTitle")}</h3>
                <ul className="space-y-3 text-[#555]">
                  {bangtaoBullets.map((bullet) => (
                    <li key={bullet.title} className="flex items-start gap-2">
                      <span className="text-[#8fb07a] mt-1">✓</span>
                      <span>
                        <strong>{bullet.title}</strong> — {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-4 text-[#2d2d2d]">
                  {t("why.cherngtalayTitle")}
                </h3>
                <ul className="space-y-3 text-[#555]">
                  {cherngtalayBullets.map((bullet) => (
                    <li key={bullet.title} className="flex items-start gap-2">
                      <span className="text-[#8fb07a] mt-1">✓</span>
                      <span>
                        <strong>{bullet.title}</strong> — {bullet.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="font-serif text-2xl mt-12 mb-4">{t("programs.title")}</h3>
            <ul>
              {programs.map((program) => (
                <li key={program.title}>
                  <strong>{program.title}</strong> — {program.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/programs"
              className="inline-block bg-[#8fb07a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#7a9a65] transition-colors mr-4"
            >
              {t("cta.viewPrograms")}
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-[#8fb07a] text-[#8fb07a] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#8fb07a] hover:text-white transition-colors"
            >
              {t("cta.contact")}
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <SpaceVideo />

      {/* Activities Section */}
      <Activities />

      {/* Testimonials intro */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-lg text-[#666] italic">
            {t("testimonialsIntro")}
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Address Section */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            {t("visit.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("visit.addressTitle")}</h3>
              <p className="text-[#555]">
                Bamboo Valley<br />
                3/74 Moo 4, Cherngtalay<br />
                Thalang, Phuket 83110<br />
                Thailand
              </p>
              <a
                href="https://maps.app.goo.gl/BSgZ5mBeAZqQnZEN6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
              >
                {t("visit.mapCta")} →
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("visit.contactTitle")}</h3>
              <p className="text-[#555]">
                <strong>{t("visit.phoneLabel")}</strong>{" "}
                <a href="tel:+66989124218" className="text-[#8fb07a]">
                  +66 98 912 4218
                </a>
              </p>
              <p className="text-[#555] mt-2">
                <strong>{t("visit.emailLabel")}</strong>{" "}
                <a href="mailto:info@bamboovalleyphuket.com" className="text-[#8fb07a]">
                  info@bamboovalleyphuket.com
                </a>
              </p>
              <p className="text-[#555] mt-4">
                <strong>{t("visit.hoursLabel")}</strong>
                <br />
                {t("visit.hoursValue")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.8!2d98.3179683!3d8.0042192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305037d692c8e82b%3A0x9d66d629c16cb3c6!2sBamboo%20Valley%20Phuket!5e0!3m2!1sen!2sth!4v1702468800000!5m2!1sen!2sth"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t("mapTitle")}
        />
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
