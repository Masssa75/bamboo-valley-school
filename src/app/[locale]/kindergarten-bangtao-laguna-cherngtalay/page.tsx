import { setRequestLocale } from "next-intl/server";
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

  return {
    title: "Kindergarten Near Bangtao, Laguna & Cherngtalay | Bamboo Valley Phuket",
    description:
      "Nature-based kindergarten serving Bangtao, Laguna Phuket & Cherngtalay families. Waldorf-inspired education just 5-10 minutes from your home. Ages 2-9.",
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
      title: "Kindergarten Near Bangtao, Laguna & Cherngtalay | Bamboo Valley",
      description:
        "Nature-based kindergarten serving families in Bangtao, Laguna & Cherngtalay. Just 5-10 minutes away.",
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

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // LocalBusiness Schema with all areas served
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ChildCare",
    name: "Bamboo Valley - Kindergarten in Cherngtalay",
    description:
      "Waldorf-inspired kindergarten and primary school serving families in Bangtao, Laguna Phuket, Cherngtalay, and surrounding areas. Nature-based education on a 3.5-rai palm plantation for children ages 2-9.",
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
    areaServed: [
      { "@type": "Place", name: "Bangtao Beach" },
      { "@type": "Place", name: "Bangtao" },
      { "@type": "Place", name: "Laguna Phuket" },
      { "@type": "Place", name: "Cherngtalay" },
      { "@type": "Place", name: "Surin Beach" },
      { "@type": "Place", name: "Thalang" },
      { "@type": "Place", name: "Layan" },
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

  const areas = [
    {
      name: "Bangtao Beach",
      shortName: "Bangtao",
      driveTime: "5 minutes",
      description: "Head east on the 4030 road toward Cherngtalay village. Turn left at the Cherngtalay intersection. We're on the right after 500 meters.",
      highlight: "Closest beach area to our campus",
    },
    {
      name: "Laguna Phuket",
      shortName: "Laguna",
      driveTime: "10 minutes",
      description: "Exit Laguna toward Cherngtalay on the main road. At the Cherngtalay intersection, continue straight. We're on the right, about 2km from the intersection.",
      highlight: "Perfect for resort residents seeking real education",
    },
    {
      name: "Cherngtalay",
      shortName: "Cherngtalay",
      driveTime: "2-5 minutes",
      description: "We're located right in Cherngtalay village on the main road, making us your neighborhood school.",
      highlight: "Your local nature school",
    },
    {
      name: "Surin Beach",
      shortName: "Surin",
      driveTime: "10-12 minutes",
      description: "Take the coastal road north toward Bangtao, then turn inland at Cherngtalay. Easy morning commute with light traffic.",
      highlight: "Quick commute via coastal road",
    },
  ];

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
            Kindergarten Near Bangtao, Laguna & Cherngtalay
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-[700px] mx-auto">
            A nature school serving families across Phuket's northwest coast.
            Just 5-10 minutes from your home.
          </p>
          <a
            href="https://wa.me/66989124218?text=Hi!%20I%27m%20interested%20in%20Bamboo%20Valley.%20I%20live%20near%20"
            className="inline-block bg-[#8fb07a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#7a9a65] transition-colors"
          >
            Schedule a Visit
          </a>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-[#2d2d2d] text-center">
            Areas We Serve
          </h2>
          <p className="text-lg text-[#666] text-center mb-12 max-w-[700px] mx-auto">
            Located in the heart of Cherngtalay, Bamboo Valley is easily accessible
            from Bangtao, Laguna, Surin, and surrounding areas.
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
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            Why Families Choose Bamboo Valley
          </h2>
          <div className="prose prose-lg max-w-none text-[#555]">
            <p>
              Whether you live in <strong>Bangtao</strong>, <strong>Laguna Phuket</strong>,
              or <strong>Cherngtalay</strong>, Bamboo Valley offers something you won't find
              in resort kids clubs or traditional schools: genuine nature-based education
              on a 3.5-rai palm plantation.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-8 not-prose">
              <div>
                <h3 className="font-serif text-xl mb-4 text-[#2d2d2d]">For Bangtao & Laguna Families</h3>
                <ul className="space-y-3 text-[#555]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8fb07a] mt-1">✓</span>
                    <span><strong>Flexible enrollment</strong> — Weekly, monthly, and term options for variable schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8fb07a] mt-1">✓</span>
                    <span><strong>Real education</strong> — Not babysitting. Proper curriculum with dedicated teachers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8fb07a] mt-1">✓</span>
                    <span><strong>Short commute</strong> — Just 5-10 minutes from your door</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl mb-4 text-[#2d2d2d]">For Local Cherngtalay Families</h3>
                <ul className="space-y-3 text-[#555]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8fb07a] mt-1">✓</span>
                    <span><strong>Your neighborhood school</strong> — Part of the community since founding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8fb07a] mt-1">✓</span>
                    <span><strong>Nature immersion</strong> — 3.5 rai with nearly 100 palm trees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8fb07a] mt-1">✓</span>
                    <span><strong>International community</strong> — Families from around the world</span>
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="font-serif text-2xl mt-12 mb-4">Programs for All Ages (2-9)</h3>
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

      {/* Video Section */}
      <SpaceVideo />

      {/* Activities Section */}
      <Activities />

      {/* Testimonials intro */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-lg text-[#666] italic">
            Families from Bangtao, Laguna, Cherngtalay, and Surin have discovered
            a different kind of school...
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Address Section */}
      <section className="py-16 md:py-24 px-6 bg-[#f9f7f4]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-8 text-[#2d2d2d] text-center">
            Visit Us
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
          title="Bamboo Valley Location - Serving Bangtao, Laguna & Cherngtalay"
        />
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
