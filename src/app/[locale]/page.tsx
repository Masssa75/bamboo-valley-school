import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhatWeAre from "@/components/WhatWeAre";
import Activities from "@/components/Activities";
import Camps from "@/components/Camps";
import SpaceVideo from "@/components/SpaceVideo";
import Community from "@/components/Community";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/Insights";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

// LocalBusiness Schema for SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  "@id": "https://bamboovalleyphuket.com/#organization",
  name: "Bamboo Valley Phuket",
  alternateName: "Bamboo Valley School",
  description:
    "Waldorf-inspired kindergarten and primary school in Cherngtalay, Phuket. Nature-based education on a 3.5-rai palm plantation for children ages 2-9. Serving families in Bangtao, Laguna, and surrounding areas.",
  url: "https://bamboovalleyphuket.com",
  telephone: "+66989124218",
  email: "info@bamboovalleyphuket.com",
  foundingDate: "2022",
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
  areaServed: [
    { "@type": "Place", name: "Cherngtalay" },
    { "@type": "Place", name: "Bangtao" },
    { "@type": "Place", name: "Laguna Phuket" },
    { "@type": "Place", name: "Surin Beach" },
    { "@type": "Place", name: "Thalang" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "15:30",
  },
  priceRange: "$$",
  image: "https://bamboovalleyphuket.com/images/hero-bg.jpg",
  sameAs: ["https://www.instagram.com/bamboovalleyphuket/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Educational Programs",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Nursery Program",
          description: "Ages 2-4, gentle introduction to school life",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kindergarten Program",
          description: "Ages 3-6, play-based learning and social development",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Primary Program",
          description: "Ages 6-9, creative hands-on academics",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Holiday Camps",
          description: "Christmas, Easter, and Summer camps for ages 3-12",
        },
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const canonical = `${baseUrl}/${locale}/`;

  return {
    alternates: {
      canonical,
      languages: {
        en: `${baseUrl}/en/`,
        th: `${baseUrl}/th/`,
        ru: `${baseUrl}/ru/`,
        "x-default": `${baseUrl}/en/`,
      },
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navigation locale={locale as Locale} />
      <Hero />
      <WhatWeAre />
      <Activities />
      <Camps locale={locale} />
      <SpaceVideo />
      <Community />
      <Testimonials />
      <Insights />
      <CTA />
      <Footer locale={locale as Locale} />
    </>
  );
}
