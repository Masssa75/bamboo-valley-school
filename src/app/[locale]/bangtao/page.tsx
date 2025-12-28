import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kindergarten Near Bangtao Beach | Bamboo Valley Phuket",
  description:
    "Looking for a kindergarten near Bangtao Beach? Bamboo Valley is a nature-based school just 5 minutes from Bangtao, offering Waldorf-inspired education for children ages 2-9.",
  keywords: [
    "kindergarten bangtao",
    "school near bangtao beach",
    "preschool bangtao phuket",
    "nursery bangtao",
    "daycare bangtao beach",
    "international school bangtao",
  ],
  openGraph: {
    title: "Kindergarten Near Bangtao Beach | Bamboo Valley Phuket",
    description:
      "Nature-based kindergarten just 5 minutes from Bangtao Beach. Waldorf-inspired education for ages 2-9.",
    url: "https://bamboovalleyphuket.com/bangtao",
  },
};

export default async function BangtaoPage({
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
    name: "Bamboo Valley - Kindergarten Near Bangtao",
    description:
      "Waldorf-inspired kindergarten and primary school located in Cherngtalay, just 5 minutes from Bangtao Beach. Nature-based education for children ages 2-9.",
    url: "https://bamboovalleyphuket.com/bangtao",
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
      {
        "@type": "Place",
        name: "Bangtao Beach",
      },
      {
        "@type": "Place",
        name: "Cherngtalay",
      },
      {
        "@type": "Place",
        name: "Laguna Phuket",
      },
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
            Kindergarten Near Bangtao Beach
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-[700px] mx-auto">
            Nature-based learning just 5 minutes from Bangtao. Where children
            grow free-minded, curious, and capable.
          </p>
          <a
            href="https://wa.me/66989124218?text=Hi!%20I%20live%20near%20Bangtao%20and%20I%27m%20interested%20in%20Bamboo%20Valley."
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
            Your Neighborhood Nature School
          </h2>
          <div className="prose prose-lg max-w-none text-[#555]">
            <p>
              If you&apos;re looking for a <strong>kindergarten near Bangtao Beach</strong>,
              Bamboo Valley offers something special: a 3.5-rai palm plantation
              campus where children learn through nature, play, and wonder.
            </p>
            <p>
              Located in <strong>Cherngtalay</strong>, we&apos;re just a 5-minute
              drive from Bangtao Beach and easily accessible from Surin, Laguna,
              and the entire northwest coast of Phuket.
            </p>

            <h3 className="font-serif text-2xl mt-12 mb-4">Why Families Near Bangtao Choose Us</h3>
            <ul>
              <li>
                <strong>Convenient location</strong> — 5 minutes from Bangtao,
                10 minutes from Laguna and Surin
              </li>
              <li>
                <strong>Nature-based curriculum</strong> — Children learn
                outdoors under palm trees, not in concrete classrooms
              </li>
              <li>
                <strong>Small class sizes</strong> — Personal attention with low
                teacher-to-child ratios
              </li>
              <li>
                <strong>Flexible enrollment</strong> — Weekly, monthly, and
                term-by-term options for traveling families
              </li>
              <li>
                <strong>Waldorf-inspired approach</strong> — Focus on creativity,
                play, and developmentally appropriate learning
              </li>
            </ul>

            <h3 className="font-serif text-2xl mt-12 mb-4">Programs for Bangtao Families</h3>
            <p>We offer programs for children ages 2-9:</p>
            <ul>
              <li><strong>Nursery</strong> (Ages 2-4) — Gentle introduction to school life</li>
              <li><strong>Kindergarten</strong> (Ages 3-6) — Play-based learning and social development</li>
              <li><strong>Primary</strong> (Ages 6-9) — Creative, hands-on academics</li>
              <li><strong>Holiday Camps</strong> — Christmas, Easter, and Summer camps</li>
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

      {/* Directions Section */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            Getting Here from Bangtao
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Directions</h3>
              <p className="text-[#555] mb-4">
                From Bangtao Beach, head east on the 4030 road toward
                Cherngtalay village. Turn left at the Cherngtalay intersection.
                Bamboo Valley is on the right after 500 meters.
              </p>
              <p className="text-[#555]">
                <strong>Drive time:</strong> ~5 minutes from Bangtao Beach
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
          title="Bamboo Valley Location - Near Bangtao Beach"
        />
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
