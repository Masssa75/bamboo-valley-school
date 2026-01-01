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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
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
