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
    title: "Family Day · Saturday May 2 | Bamboo Valley Phuket",
    description: "Reserve your spot for Family Day at Bamboo Valley.",
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

      <section className="min-h-[80vh] py-32 md:py-40 px-6 bg-white flex items-center">
        <div className="max-w-[500px] mx-auto w-full">
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-center mb-3 text-[#2d2d2d]">
            Family Day · Saturday, May 2
          </h1>
          <p className="text-center text-[#666] mb-12">
            Reserve your spot below.
          </p>

          <EventRegistrationForm
            eventSlug="kungfu-family"
            showMondayWorkshopQuestion
            mondayWorkshopLabel="Interested in Monday workshop"
          />
        </div>
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
