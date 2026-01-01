import { setRequestLocale } from "next-intl/server";
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
      <Navigation />

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
              Short-Term Education & Holiday Camps in Phuket
            </h1>
            <p className="text-xl text-[#3a6020] max-w-[650px] mx-auto mb-8">
              Flexible enrollment for traveling families. Stay a week, a month, or longer
              - your children will thrive in our nature-based learning environment.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                Weekly Enrollment
              </span>
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                No Long-Term Commitment
              </span>
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                Ages 2-9
              </span>
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-semibold text-[#5a7a2b] shadow-md">
                9am-3pm (until 4:30pm with after-program)
              </span>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-[#5a7a2b] text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-[#4a6a1b] hover:-translate-y-0.5 shadow-lg"
            >
              Enquire About Availability
            </Link>
          </div>
        </section>

        {/* Photo Strip */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 bg-[#2d5016] p-1">
          <Image src="/images/Free-Play.jpeg" alt="Children playing outdoors at nature school Phuket" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/Gardening.jpeg" alt="Kids gardening at kindergarten Phuket" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/Painting.jpeg" alt="Art activities at Waldorf school Phuket" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover" />
          <Image src="/images/Animal-Care.jpg" alt="Animal care at nature kindergarten" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover hidden md:block" />
          <Image src="/images/Mud-Play.jpg" alt="Outdoor play at forest school Phuket" width={400} height={200} className="w-full h-[150px] md:h-[200px] object-cover hidden md:block" />
        </div>

        {/* Flexible Options */}
        <section className="py-20 px-5 max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold text-[#2d5016] mb-6">Flexible Enrollment Options</h2>
          <p className="text-lg text-gray-600 mb-10">
            Unlike most education programs in Phuket that require year-long commitments, Bamboo
            Valley welcomes short-term children. Whether you&apos;re here for a two-week holiday or a
            three-month stay, your children can join our program.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Weekly */}
            <div className="bg-[#f9faf7] border-2 border-[#BED7AF] rounded-2xl overflow-hidden">
              <Image src="/images/camp-little-kids.jpg" alt="Young children at short-term school in Phuket" width={400} height={180} className="w-full h-[180px] object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5a7a2b] mb-2">Weekly Enrollment</h3>
                <p className="text-sm text-gray-500 mb-3">Minimum 1 week</p>
                <p className="text-gray-600 mb-4">
                  Perfect for families on holiday who want more than a kids club. Full curriculum experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Join any Monday</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> 9am-3pm (4:30pm with after-program)</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> All activities included</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Lunch & snacks provided</li>
                </ul>
              </div>
            </div>

            {/* Monthly */}
            <div className="bg-[#f9faf7] border-2 border-[#BED7AF] rounded-2xl overflow-hidden">
              <Image src="/images/Storytelling.jpeg" alt="Storytelling at Waldorf kindergarten Phuket" width={400} height={180} className="w-full h-[180px] object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5a7a2b] mb-2">Monthly Enrollment</h3>
                <p className="text-sm text-gray-500 mb-3">1-3 months</p>
                <p className="text-gray-600 mb-4">
                  Ideal for digital nomad families or extended stays. Your child becomes part of the community.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Better value per week</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Progress tracking</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Parent-teacher updates</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Field trips included</li>
                </ul>
              </div>
            </div>

            {/* Long-Term */}
            <div className="bg-[#f9faf7] border-2 border-[#BED7AF] rounded-2xl overflow-hidden">
              <Image src="/images/Playful-Phonics.JPG" alt="Children learning at Bamboo Valley kindergarten Phuket" width={400} height={180} className="w-full h-[180px] object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#5a7a2b] mb-2">Long-Term Enrollment</h3>
                <p className="text-sm text-gray-500 mb-3">3-4 months or more</p>
                <p className="text-gray-600 mb-4">
                  For families staying a full season. Complete immersion in our Waldorf-inspired program.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Best value</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Full curriculum progression</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Community events</li>
                  <li className="flex items-start gap-2"><span className="text-[#7a9a3b] font-bold">✓</span> Detailed progress reports</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Full Width Image */}
        <section className="relative h-[400px] overflow-hidden">
          <Image src="/images/kindergarten.jpg" alt="Bamboo Valley outdoor kindergarten campus Phuket" fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-10 pt-16">
            <h3 className="text-3xl font-bold mb-2">Learning Happens Outdoors</h3>
            <p className="text-lg opacity-90 max-w-[600px]">
              Our 3.5-rai palm plantation campus gives children space to explore, discover, and grow naturally.
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="bg-[#DCEBE1] py-20 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-3xl font-bold text-[#2d5016] mb-6">Who This Is For</h2>
            <p className="text-lg text-gray-600 mb-10">
              We&apos;ve welcomed families from all over the world with different travel styles and needs.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                <Image src="/images/Community.jpeg" alt="International community at Bamboo Valley school" width={300} height={160} className="w-full h-[160px] object-cover" />
                <div className="p-6">
                  <div className="text-3xl mb-3">🌍</div>
                  <h3 className="text-lg font-bold text-[#2d5016] mb-2">Digital Nomads</h3>
                  <p className="text-sm text-gray-600">
                    Working remotely from Phuket? Your kids get a proper education program while you focus on work.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                <Image src="/images/child-reading-outdoors-natural-learning.jpeg" alt="Child reading outdoors worldschooling Phuket" width={300} height={160} className="w-full h-[160px] object-cover" />
                <div className="p-6">
                  <div className="text-3xl mb-3">🎒</div>
                  <h3 className="text-lg font-bold text-[#2d5016] mb-2">Worldschooling Families</h3>
                  <p className="text-sm text-gray-600">
                    Supplement your travel education with structured learning, socialization, and local experiences.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                <Image src="/images/Baking.jpeg" alt="Baking activities at holiday camp Phuket" width={300} height={160} className="w-full h-[160px] object-cover" />
                <div className="p-6">
                  <div className="text-3xl mb-3">🏖️</div>
                  <h3 className="text-lg font-bold text-[#2d5016] mb-2">Extended Holiday Families</h3>
                  <p className="text-sm text-gray-600">
                    Here for 2-6 weeks? Your children can join a real learning community instead of a hotel kids club.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                <Image src="/images/Sound-Healing.jpg" alt="Mindfulness activities at nature school" width={300} height={160} className="w-full h-[160px] object-cover" />
                <div className="p-6">
                  <div className="text-3xl mb-3">🏠</div>
                  <h3 className="text-lg font-bold text-[#2d5016] mb-2">Relocating Families</h3>
                  <p className="text-sm text-gray-600">
                    Testing out Phuket before committing? Start with a short enrollment to see if we&apos;re the right fit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Holiday Camps */}
        <section className="bg-[#FAD7AA] py-20 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-3xl font-bold text-[#8b5a2b] mb-6">Holiday Camps</h2>
            <p className="text-lg text-[#8b5a2b]/80 mb-10">
              During holidays, we run special camp programs. Same great outdoor environment, with extra activities and adventures.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <Image src="/images/Animal-Care.jpg" alt="Winter camp Phuket children with animals" width={250} height={140} className="w-full h-[140px] object-cover" />
                <div className="p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Jan 19 - Mar 6, 2026</p>
                  <p className="font-semibold text-[#8b5a2b]">Winter Camp</p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <Image src="/images/Free-Play.jpeg" alt="Water play activities Phuket kids camp Songkran" width={250} height={140} className="w-full h-[140px] object-cover" />
                <div className="p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Apr 6-10, 2026</p>
                  <p className="font-semibold text-[#8b5a2b]">Easter/Songkran Camp</p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <Image src="/images/Gardening.jpeg" alt="Summer camp activities Phuket" width={250} height={140} className="w-full h-[140px] object-cover" />
                <div className="p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Jun 29 - Aug 14, 2026</p>
                  <p className="font-semibold text-[#8b5a2b]">Summer Camp</p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <Image src="/images/camp-elephants.jpg" alt="Christmas camp Phuket children nature" width={250} height={140} className="w-full h-[140px] object-cover" />
                <div className="p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Dec 2026</p>
                  <p className="font-semibold text-[#8b5a2b]">Christmas Camp</p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-[#8b5a2b]/80">
              Camp programs run 9am-3pm daily (extended to 4:30pm available) and include all activities, meals, and field trips.
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section className="bg-[#2d5016] py-20 px-5">
          <div className="max-w-[1000px] mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">See Our Campus</h2>
            <p className="text-white/80 mb-8">Take a flyover tour of our 3.5-rai palm plantation campus</p>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <video controls poster="/images/hero-bg.jpg" className="w-full">
                <source src="/videos/flyover.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-5 max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold text-[#2d5016] mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 mb-10">
            Getting started is simple. We&apos;ve designed our enrollment process for busy traveling families.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Enquire", desc: "Tell us your dates and your children's ages. We'll confirm availability within 24 hours." },
              { num: "2", title: "Quick Registration", desc: "Simple online form. No lengthy applications or waiting periods." },
              { num: "3", title: "Visit (Optional)", desc: "Come see our campus and meet the teachers before your child's first day." },
              { num: "4", title: "Start Any Monday", desc: "Your child joins the group. We handle the transition smoothly." },
            ].map((step) => (
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
          <Image src="/images/founders-family-bamboo-valley-phuket.jpeg" alt="Marc and Nutthanit Schwyn founders of Bamboo Valley school Phuket" width={600} height={500} className="w-full h-[300px] md:h-full object-cover" />
          <div className="bg-[#f9faf7] p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#2d5016] mb-6">Built by Parents, For Parents</h2>
            <p className="text-gray-600 text-lg mb-4">
              We&apos;re Marc and Nutthanit Schwyn, and our own children attend Bamboo Valley every day. We built this program because we couldn&apos;t find what we were looking for - a place where kids could learn naturally, play freely, and develop at their own pace.
            </p>
            <p className="text-gray-600 text-lg mb-4">
              We understand what traveling families need because we&apos;ve lived it. Flexibility, quality, and a genuine community where your children feel at home from day one.
            </p>
            <p className="italic text-[#7a9a3b] mt-4">- Marc & Nutthanit</p>
          </div>
        </section>

        {/* Why Bamboo Valley */}
        <section className="bg-[#C8DCE1] py-20 px-5">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-3xl font-bold text-[#2d5a6b] mb-10">Why Families Choose Bamboo Valley</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "🌴", title: "3.5-Rai Palm Plantation Campus", desc: "100+ palm trees, farm animals, gardens. Learning happens outdoors in nature." },
                { icon: "🎨", title: "Waldorf-Inspired Education", desc: "Play-based learning, arts, crafts, music, movement. No screens, no worksheets, no homework." },
                { icon: "👨‍👩‍👧", title: "Built by Parents, For Parents", desc: "Founded by parents who couldn't find what they wanted. Our own kids are here every day." },
                { icon: "🌏", title: "International Community", desc: "Children from 15+ countries. Your kids make friends from around the world." },
                { icon: "⏰", title: "9am-3pm (up to 4:30pm)", desc: "Drop off in the morning, pick up in the afternoon. Extended hours available." },
                { icon: "📍", title: "Bangtao/Laguna Location", desc: "Central location near hotels, villas, and condos popular with traveling families." },
              ].map((feature) => (
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
            <h2 className="text-2xl font-bold text-gray-500 mb-4">Other Short-Term Options in Phuket</h2>
            <p className="text-gray-500 mb-8">
              We believe in helping families find the right fit. Here are other programs in Phuket that accept short-term enrollment:
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-1">Lighthouse International</h4>
                <p className="text-xs text-gray-400 mb-3">Chalong/Rawai</p>
                <p className="text-sm text-gray-600">British curriculum, accepts short-term children. Good option for families in the south.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-1">MHP Montessori</h4>
                <p className="text-xs text-gray-400 mb-3">Chalong</p>
                <p className="text-sm text-gray-600">Montessori method, welcomes short stays. A true Montessori program in Phuket.</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-700 mb-1">ABC Nursery</h4>
                <p className="text-xs text-gray-400 mb-3">Rawai</p>
                <p className="text-sm text-gray-600">For younger children (0-4). Flexible enrollment, popular with expat families.</p>
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Note: Most education programs in Phuket require year-long commitments. If you need true flexibility, your options are limited - which is exactly why we designed Bamboo Valley this way.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-br from-[#5a7a2b] to-[#7a9a3b] py-24 px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Learn More?</h2>
          <p className="text-xl text-white/90 mb-10">
            Tell us your dates and we&apos;ll confirm availability. No commitment required.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-white text-[#5a7a2b] px-10 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg"
          >
            Contact Us
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
