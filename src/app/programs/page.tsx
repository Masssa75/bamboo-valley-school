import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ProgramsSubNav from "@/components/ProgramsSubNav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Programs | Bamboo Valley Phuket - Nursery, Kindergarten & Primary",
  description: "Explore our nature-based programs for ages 1-9: Nursery, Kindergarten, Primary school, plus after-school enrichment, Saturday workshops, and holiday camps.",
};

export default function ProgramsPage() {
  return (
    <>
      <Navigation variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d]">
            Our Programs
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            From toddlers to primary school, we nurture every stage of your child's journey through nature, play, and purposeful learning.
          </p>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <ProgramsSubNav />

      {/* Main Programs */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal text-center mb-4 text-[#2d2d2d]">
            Full-Day Programs
          </h2>
          <p className="text-[#666] text-center mb-16 max-w-[600px] mx-auto">
            Monday to Friday, 8:45am – 3:00pm
          </p>

          <div className="space-y-16">
            {/* Nursery */}
            <div id="nursery" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center scroll-mt-44">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#BED7AF]/30 text-[#5a7a4a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Ages 2–4
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal mb-4 text-[#2d2d2d]">
                  Nursery
                </h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  The first three years of a child's development are crucial: 80% of brain development occurs during this time, building foundations for language, social behavior, and emotions.
                </p>
                <p className="text-[#444] leading-relaxed mb-6">
                  We strengthen children's innate desire to learn, engage, and experiment while developing their physical, social, emotional, and creative abilities. Our natural campus offers rich sensory and social experiences that help children develop a deep love for learning.
                </p>
                <div className="text-sm text-[#666] space-y-1">
                  <p><span className="font-medium">Daily rhythm:</span> Morning circle, fine motor skills, outdoor play, gardening, crafts, animal care</p>
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
                  Ages 3–6
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal mb-4 text-[#2d2d2d]">
                  Kindergarten
                </h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  In kindergarten, children's ability to learn new things explodes and our rich environment helps them develop in every direction. We begin systematic observation to identify and nurture each child's unique talents and interests.
                </p>
                <p className="text-[#444] leading-relaxed mb-6">
                  We introduce playful phonics, math, and self-initiated project-based learning which teaches children to choose, persist, and succeed at their own path — strengthening their curiosity and love for learning.
                </p>
                <div className="text-sm text-[#666] space-y-1">
                  <p><span className="font-medium">Daily rhythm:</span> Circle time, yoga/meditation, phonics, outdoor play, baking, music, crafts, gardening</p>
                </div>
              </div>
            </div>

            {/* Primary */}
            <div id="primary" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center scroll-mt-44">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-[#BED7AF]/30 text-[#5a7a4a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Ages 6–9
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-normal mb-4 text-[#2d2d2d]">
                  Primary
                </h3>
                <p className="text-[#444] leading-relaxed mb-4">
                  Children who've progressed through our program show exceptional eagerness to learn everything — from academics to sports, music, culture, and art.
                </p>
                <p className="text-[#444] leading-relaxed mb-6">
                  We provide a powerful blend of British curriculum, Waldorf-inspired methods, and our nature-based approach. Teachers work with each child at their appropriate level, carefully observing their unique strengths and collaborating with parents to support every aspect of their growth.
                </p>
                <div className="text-sm text-[#666] space-y-1">
                  <p><span className="font-medium">Daily rhythm:</span> Yoga, mathematics, literacy, phonics, science, art, Thai class, music, animal care</p>
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
            Additional Programs
          </h2>
          <p className="text-[#666] text-center mb-16 max-w-[600px] mx-auto">
            Flexible options for families seeking enrichment, weekend activities, or holiday care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Parent & Toddler */}
            <div id="toddler" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#FAD7AA]/40 text-[#8a6d3b] px-3 py-1 rounded-full text-sm font-medium mb-4">
                Ages 1–3 with parent
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                Parent & Toddler Class
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                A nurturing space for parents and little ones to play, sing, and connect while discovering the joy of rhythm and community.
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">Schedule:</span> Tuesdays & Thursdays, 10:00–11:00am</p>
                <p><span className="font-medium">Duration:</span> 1 hour per session</p>
              </div>
            </div>

            {/* After School */}
            <div id="after-school" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#C8DCE1]/50 text-[#4a6670] px-3 py-1 rounded-full text-sm font-medium mb-4">
                Ages 3–6
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                After School Enrichment
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                Hands-on learning for curious young minds. Children explore creativity and culture through Thai Cooking, Nature Art & Craft, Music, and Phonics.
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">Schedule:</span> Mon, Tue, Wed, Fri — 3:30–4:30pm</p>
                <p><span className="font-medium">Activities:</span> Thai Cooking · Nature Crafts · Music & Sound · Phonics</p>
              </div>
            </div>

            {/* Saturday Workshop */}
            <div id="saturday" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#EBC3C3]/40 text-[#8a5a5a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                Ages 3–6
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                Saturday Workshop
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                Each Saturday offers a new blend of engaging activities — from gardening and animal care to painting, candle making, baking, and sensory play. Half-day and full-day options available.
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">Morning:</span> 10:00am – 12:00pm</p>
                <p><span className="font-medium">Afternoon:</span> 1:00pm – 3:00pm</p>
                <p><span className="font-medium">Full Day:</span> 10:00am – 3:00pm (lunch included)</p>
              </div>
            </div>

            {/* Holiday Camps */}
            <div id="camps" className="bg-white p-8 rounded-lg scroll-mt-44">
              <div className="inline-block bg-[#BED7AF]/30 text-[#5a7a4a] px-3 py-1 rounded-full text-sm font-medium mb-4">
                Ages 3–12
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-normal mb-3 text-[#2d2d2d]">
                Holiday Camps
              </h3>
              <p className="text-[#444] leading-relaxed mb-4">
                Themed seasonal camps filled with discovery, friendship, and exploration. Activities include gardening, animal care, arts and crafts, baking, yoga, Muay Thai, and exciting field trips.
              </p>
              <div className="text-sm text-[#666] space-y-1 border-t border-gray-100 pt-4">
                <p><span className="font-medium">October Camp:</span> Oct 13–17, 2025</p>
                <p><span className="font-medium">Christmas Camp:</span> Dec 15–26, 2025</p>
                <p><span className="font-medium">Winter Camp:</span> Jan 19 – Mar 6, 2026</p>
                <p><span className="font-medium">Songkran Camp:</span> Apr 6–10, 2026</p>
                <p><span className="font-medium">Summer Camp:</span> Jun 29 – Aug 14, 2026</p>
              </div>
              <a
                href="https://phuketcamp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-[#8fb07a] hover:text-[#6d9b5a] font-medium text-sm"
              >
                View camp details →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 bg-[#BED7AF]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-4 text-[#2d2d2d]">
            Find the Right Program
          </h2>
          <p className="text-[#2d2d2d]/80 mb-8">
            Every child is unique. Schedule a visit to discuss which program best fits your child's age, interests, and your family's needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#2d2d2d] text-white px-8 py-3 rounded font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              Book a Visit
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
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
