import { setRequestLocale, getTranslations } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/contact/";

  return {
    title: "Contact Us | Bamboo Valley Phuket",
    description:
      "Visit Bamboo Valley, a natural learning community in Phuket. Book a tour, ask questions, or schedule enrollment for your child.",
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tCommon = await getTranslations("common");

  return (
    <>
      <Navigation locale={locale as Locale} />

      {/* Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-white">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-white/90 max-w-[600px] mx-auto">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-3xl font-normal mb-8 text-[#2d2d2d]">
                {t("getInTouch")}
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("address")}</h3>
                  <p className="text-[#666]">
                    {t("addressLine1")}<br />
                    {t("addressLine2")}<br />
                    {t("addressLine3")}
                  </p>
                  <a
                    href="https://maps.app.goo.gl/BSgZ5mBeAZqQnZEN6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-[#8fb07a] hover:text-[#6d9b5a] font-medium text-sm"
                  >
                    {tCommon("openInGoogleMaps")} →
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("phoneWhatsApp")}</h3>
                  <a
                    href="https://wa.me/66989124218"
                    className="text-[#666] hover:text-[#8fb07a] transition-colors"
                  >
                    +66 98 912 4218
                  </a>
                  <p className="text-sm text-[#999] mt-1">
                    {t("whatsAppNote")}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("email")}</h3>
                  <a
                    href="mailto:info@bamboovalleyphuket.com"
                    className="text-[#666] hover:text-[#8fb07a] transition-colors"
                  >
                    info@bamboovalleyphuket.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-[#2d2d2d] mb-2">{t("followUs")}</h3>
                  <a
                    href="https://www.instagram.com/bamboovalleyphuket/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#666] hover:text-[#8fb07a] transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    @bamboovalleyphuket
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl font-normal mb-8 text-[#2d2d2d]">
                {t("sendMessage")}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.8!2d98.3179683!3d8.0042192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305037d692c8e82b%3A0x9d66d629c16cb3c6!2sBamboo%20Valley%20Phuket!5e0!3m2!1sen!2sth!4v1702468800000!5m2!1sen!2sth"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bamboo Valley Location"
        />
      </section>

      <Footer locale={locale as Locale} />
    </>
  );
}
