// src/app/[locale]/enroll/page.tsx
import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EnrollmentForm from "@/components/enrollment/EnrollmentForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/enroll/";

  return {
    title: "Apply Now | Bamboo Valley Phuket",
    description:
      "Enroll your child at Bamboo Valley, a Waldorf-inspired natural learning community in Phuket. Ages 2-9. Simple 5-step application.",
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        th: `${baseUrl}/th${path}`,
        ru: `${baseUrl}/ru${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default async function EnrollPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("enrollment");

  return (
    <>
      <Navigation locale={locale as Locale} variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#DCEBE1]">
        <div className="max-w-[720px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-[#2d2d2d]">
            {t("pageTitle")}
          </h1>
          <p className="text-lg text-[#666] max-w-[500px] mx-auto">
            {t("pageSubtitle")}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#BED7AF] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <EnrollmentForm />
        </Suspense>
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
