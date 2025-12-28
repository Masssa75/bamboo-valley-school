import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SpaceVideo from "@/components/SpaceVideo";
import Activities from "@/components/Activities";
import Testimonials from "@/components/Testimonials";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preschool Near Laguna Phuket | Bamboo Valley",
  description:
    "Looking for a preschool near Laguna Phuket? Bamboo Valley is a nature-based school just 10 minutes from Laguna, offering Waldorf-inspired education for children ages 2-9.",
  keywords: [
    "preschool laguna phuket",
    "kindergarten near laguna",
    "school near laguna phuket",
    "nursery laguna area",
    "daycare laguna phuket",
    "international school laguna",
  ],
  openGraph: {
    title: "Preschool Near Laguna Phuket | Bamboo Valley",
    description:
      "Nature-based preschool just 10 minutes from Laguna Phuket. Waldorf-inspired education for ages 2-9.",
    url: "https://bamboovalleyphuket.com/laguna",
  },
};

export default async function LagunaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: "Bamboo Valley - Preschool Near Laguna Phuket",
    description:
      "Waldorf-inspired preschool and kindergarten located in Cherngtalay, just 10 minutes from Laguna Phuket. Nature-based education for children ages 2-9.",
    url: "https://bamboovalleyphuket.com/laguna",
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
    areaServed: [
      { "@type": "Place", name: "Laguna Phuket" },
      { "@type": "Place", name: "Bangtao" },
      { "@type": "Place", name: "Cherngtalay" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "15:30",
    },
    priceRange: "$$",
    image: "https://bamboovalleyphuket.com/images/hero-bg.jpg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navigation locale={locale as Locale} />

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-[900px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-white">
            Preschool Near Laguna Phuket
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-[700px] mx-auto">
            A peaceful alternative to resort childcare. Nature-based learning
            just 10 minutes from Laguna.
          </p>
          <a
            href="https://wa.me/66989124218?text=Hi!%20I%20live%20near%20Laguna%20and%20I%27m%20interested%20in%20Bamboo%20Valley."
            className="inline-block bg-[#8fb07a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#7a9a65] transition-colors"
          >
            Schedule a Visit
          </a>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            An Alternative for Laguna Families
          </h2>
          <div className="prose prose-lg max-w-none text-[#555]">
            <p>
              If you&apos;re searching for a <strong>preschool near Laguna Phuket</strong>,
              Bamboo Valley offers something you won&apos;t find in resort kids clubs:
              genuine nature-based education on a 3.5-rai palm plantation.
            </p>
            <p>
              Located in nearby <strong>Cherngtalay</strong>, we&apos;re just 10 minutes
              from Laguna Phuket — close enough for convenience, far enough from
              the resort bubble for children to experience real Thai nature.
            </p>

            <h3 className="font-serif text-2xl mt-12 mb-4">Perfect for Laguna Residents</h3>
            <ul>
              <li>
                <strong>Short commute</strong> — 10 minutes from Laguna, easy
                drop-off and pickup
              </li>
              <li>
                <strong>Flexible enrollment</strong> — Weekly, monthly, and
                term options for families with variable schedules
              </li>
              <li>
                <strong>Real education</strong> — Not babysitting. A proper
                curriculum with small class sizes and dedicated teachers
              </li>
              <li>
                <strong>Nature immersion</strong> — Children spend days under
                palm trees, not in air-conditioned playrooms
              </li>
              <li>
                <strong>International community</strong> — Families from around
                the world, with instruction in English
              </li>
            </ul>

            <h3 className="font-serif text-2xl mt-12 mb-4">Programs for All Ages</h3>
            <p>We serve children ages 2-9 with programs designed for different stages:</p>
            <ul>
              <li><strong>Nursery</strong> (Ages 2-4) — Warm, gentle introduction to learning</li>
              <li><strong>Kindergarten</strong> (Ages 3-6) — Play-based discovery and social skills</li>
              <li><strong>Primary</strong> (Ages 6-9) — Hands-on academics in nature</li>
              <li><strong>Holiday Camps</strong> — Perfect for visiting families or school breaks</li>
            </ul>

            <h3 className="font-serif text-2xl mt-12 mb-4">Short-Term Options Available</h3>
            <p>
              We understand that many Laguna families have flexible schedules.
              Unlike traditional schools with year-long commitments, we offer
              weekly and monthly enrollment — ideal for:
            </p>
            <ul>
              <li>Families on extended holidays</li>
              <li>Digital nomads staying for a few months</li>
              <li>Expats with variable travel schedules</li>
              <li>Seasonal residents</li>
            </ul>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/programs"
              className="inline-block bg-[#8fb07a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#7a9a65] transition-colors mr-4"
            >
              View Programs
            </Link>
            <Link
              href="/contact"
              className="inline-block border-2 border-[#8fb07a] text-[#8fb07a] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#8fb07a] hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section - Shows the real campus */}
      <SpaceVideo />

      {/* Activities Section - Shows what children do */}
      <Activities />

      {/* Location-specific testimonials intro */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-lg text-[#666] italic">
            Families from Laguna, Bangtao, and the surrounding resort areas have discovered a different kind of school...
          </p>
        </div>
      </section>

      {/* Testimonials - Social proof */}
      <Testimonials />

      {/* Getting Here */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            Getting Here from Laguna
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Directions</h3>
              <p className="text-[#555] mb-4">
                From Laguna Phuket, exit toward Cherngtalay on the main road.
                At the Cherngtalay intersection, continue straight. Bamboo Valley
                is on the right, about 2km from the intersection.
              </p>
              <p className="text-[#555]">
                <strong>Drive time:</strong> ~10 minutes from Laguna entrance
              </p>
              <a
                href="https://maps.app.goo.gl/BSgZ5mBeAZqQnZEN6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
              >
                Open in Google Maps →
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Address</h3>
              <p className="text-[#555]">
                Bamboo Valley<br />
                3/74 Moo 4, Cherngtalay<br />
                Thalang, Phuket 83110<br />
                Thailand
              </p>
              <p className="text-[#555] mt-4">
                <strong>Phone/WhatsApp:</strong>{" "}
                <a href="tel:+66989124218" className="text-[#8fb07a]">
                  +66 98 912 4218
                </a>
              </p>
              <p className="text-[#555] mt-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@bamboovalleyphuket.com" className="text-[#8fb07a]">
                  info@bamboovalleyphuket.com
                </a>
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
          title="Bamboo Valley Location - Near Laguna Phuket"
        />
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
