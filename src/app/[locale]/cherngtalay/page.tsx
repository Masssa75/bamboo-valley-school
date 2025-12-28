import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kindergarten in Cherngtalay | Bamboo Valley Phuket",
  description:
    "Bamboo Valley is a Waldorf-inspired kindergarten located in Cherngtalay, Phuket. Nature-based education on a 3.5-rai palm plantation for children ages 2-9.",
  keywords: [
    "kindergarten cherngtalay",
    "school in cherngtalay",
    "preschool cherngtalay phuket",
    "nursery cherngtalay",
    "waldorf school cherngtalay",
    "international school cherngtalay",
  ],
  openGraph: {
    title: "Kindergarten in Cherngtalay | Bamboo Valley Phuket",
    description:
      "Waldorf-inspired kindergarten in the heart of Cherngtalay. Nature-based education for ages 2-9.",
    url: "https://bamboovalleyphuket.com/cherngtalay",
  },
};

export default async function CherngtalayPage({
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
    name: "Bamboo Valley - Kindergarten in Cherngtalay",
    description:
      "Waldorf-inspired kindergarten and primary school located in the heart of Cherngtalay, Phuket. Nature-based education on a 3.5-rai palm plantation for children ages 2-9.",
    url: "https://bamboovalleyphuket.com/cherngtalay",
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
        name: "Cherngtalay",
      },
      {
        "@type": "Place",
        name: "Bangtao",
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
            Kindergarten in Cherngtalay
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-[700px] mx-auto">
            A nature school in the heart of Cherngtalay. Where children discover
            the joy of learning through play, nature, and wonder.
          </p>
          <a
            href="https://wa.me/66989124218?text=Hi!%20I%20live%20in%20Cherngtalay%20and%20I%27m%20interested%20in%20Bamboo%20Valley."
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
            Cherngtalay&apos;s Nature School
          </h2>
          <div className="prose prose-lg max-w-none text-[#555]">
            <p>
              Bamboo Valley is a <strong>kindergarten in Cherngtalay</strong> offering
              something rare: a 3.5-rai palm plantation where children spend their
              days learning outdoors, caring for animals, and developing naturally.
            </p>
            <p>
              Centrally located in <strong>Cherngtalay village</strong>, we serve
              families from Bangtao, Laguna, Surin, and the surrounding areas.
              Our campus is a 5-minute drive from Bangtao Beach and 10 minutes from
              Laguna Phuket.
            </p>

            <h3 className="font-serif text-2xl mt-12 mb-4">What Makes Us Different</h3>
            <ul>
              <li>
                <strong>Real outdoor campus</strong> — 3.5 rai with nearly 100 palm
                trees, gardens, and animals
              </li>
              <li>
                <strong>Waldorf-inspired</strong> — Focus on creativity, imagination,
                and age-appropriate development
              </li>
              <li>
                <strong>Nature-based learning</strong> — Children learn through
                gardening, animal care, mud play, and exploration
              </li>
              <li>
                <strong>Parent partnership</strong> — Monthly BBQs and workshops,
                not just end-of-term meetings
              </li>
              <li>
                <strong>Technology-free</strong> — Screens stay out; imagination
                and human connection stay in
              </li>
            </ul>

            <h3 className="font-serif text-2xl mt-12 mb-4">Programs Available</h3>
            <p>We welcome children ages 2-9:</p>
            <ul>
              <li><strong>Nursery</strong> (Ages 2-4) — Gentle, nurturing environment for the youngest learners</li>
              <li><strong>Kindergarten</strong> (Ages 3-6) — Play-based curriculum that builds curiosity</li>
              <li><strong>Primary</strong> (Ages 6-9) — Creative academics in a natural setting</li>
              <li><strong>After School</strong> — Extended care until 5pm</li>
              <li><strong>Holiday Camps</strong> — Fun-filled camps during school breaks</li>
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

      {/* Community Section */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            Part of the Cherngtalay Community
          </h2>
          <div className="prose prose-lg max-w-none text-[#555]">
            <p>
              Bamboo Valley has been part of the Cherngtalay community since our
              founding. We&apos;re not just a school — we&apos;re neighbors. Our families
              live nearby, shop at the local markets, and are invested in this
              community.
            </p>
            <p>
              Founded by parents who couldn&apos;t find the right school for their
              own children, Bamboo Valley represents what education can be when
              you start from what children actually need.
            </p>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/our-story"
              className="text-[#8fb07a] hover:text-[#6d9b5a] font-medium text-lg"
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            Visit Us in Cherngtalay
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Address</h3>
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
                Open in Google Maps →
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <p className="text-[#555]">
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
              <p className="text-[#555] mt-4">
                <strong>School Hours:</strong><br />
                Monday - Friday: 8:00am - 3:30pm
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
          title="Bamboo Valley Location - Cherngtalay"
        />
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
