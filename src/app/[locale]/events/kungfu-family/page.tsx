import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/events/kungfu-family/";

  return {
    title: "Family Day with Kung Fu Family | Bamboo Valley Phuket",
    description:
      "Saturday May 2, 9:30–11am at Bamboo Valley. Bring the kids — childcare on-site while parents try the Kung Fu Family parenting app. Complete app feedback to unlock a free Monday kids workshop.",
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function KungfuFamilyEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navigation locale={locale as Locale} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-[#DCEBE1]">
        <div className="relative max-w-[800px] mx-auto text-center">
          <p className="text-sm md:text-base uppercase tracking-widest text-[#5a7a2b] mb-4 font-medium">
            Bamboo Valley × Kung Fu Family
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d] leading-tight">
            A Saturday morning for parents — and the kids you&apos;re bringing along
          </h1>
          <p className="text-lg text-[#444] max-w-[600px] mx-auto">
            Saturday, May 2 · 9:30am–11am · at the Bamboo Valley campus
          </p>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-[820px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-normal mb-10 text-[#2d2d2d] text-center">
            What the morning looks like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#BED7AF] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🌳
              </div>
              <h3 className="font-serif text-xl mb-2 text-[#2d2d2d]">Kids run free</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Our teachers are on-site running activities so you can actually focus
                during the session.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-[#FAD7AA] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ☕
              </div>
              <h3 className="font-serif text-xl mb-2 text-[#2d2d2d]">Kung Fu Family demo</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                A short walkthrough of the parenting app, then time to try it
                hands-on with coffee in your hand.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-[#EBC3C3] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🎁
              </div>
              <h3 className="font-serif text-xl mb-2 text-[#2d2d2d]">Free workshop unlock</h3>
              <p className="text-[#666] text-sm leading-relaxed">
                Submit honest feedback on the app and your child gets a free spot
                in Monday&apos;s workshop.
              </p>
            </div>
          </div>

          {/* Monday workshop callout */}
          <div className="bg-[#FAF9F6] border-l-4 border-[#8fb07a] rounded-r-lg p-6 md:p-8 mb-16">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🐰</div>
              <div className="flex-1">
                <h3 className="font-serif text-2xl mb-3 text-[#2d2d2d]">
                  Monday Kids Workshop — free with feedback
                </h3>
                <p className="text-[#444] mb-4 leading-relaxed">
                  <strong>Monday, May 4 · 9am–12pm</strong> at Bamboo Valley.
                  Animal care, baking, and painting — all in one morning.
                  Open to children aged 3 and up.
                </p>
                <p className="text-sm text-[#666]">
                  Free for any parent who attends Saturday and completes proper
                  feedback on the Kung Fu Family app. We&apos;ll send your voucher
                  via WhatsApp once your feedback is in.
                </p>
              </div>
            </div>
          </div>

          {/* Registration form */}
          <div id="register" className="max-w-[600px] mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-3 text-[#2d2d2d] text-center">
              Reserve your spot
            </h2>
            <p className="text-center text-[#666] mb-8">
              So we know how many parents and kids to expect.
            </p>

            <EventRegistrationForm
              eventSlug="kungfu-family"
              showMondayWorkshopQuestion
              mondayWorkshopLabel="I'm interested in the Monday workshop for my child(ren) — I understand it's free if I complete app feedback (kids 3+)"
            />
          </div>
        </div>
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
