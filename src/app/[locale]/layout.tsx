import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { locales, type Locale, localeNames } from "@/i18n/config";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "Bamboo Valley | Natural Learning Community in Phuket",
    th: "Bamboo Valley | ชุมชนการเรียนรู้ธรรมชาติในภูเก็ต",
    ru: "Bamboo Valley | Естественное образование на Пхукете",
    zh: "Bamboo Valley | 普吉岛自然学习社区",
  };

  const descriptions: Record<string, string> = {
    en: "A Waldorf-inspired kindergarten and primary school in Phuket, Thailand. Free-minded, curious, capable children who thrive anywhere. Ages 2-9.",
    th: "โรงเรียนอนุบาลและประถมศึกษาแนววอลดอร์ฟในภูเก็ต ประเทศไทย เด็กมีจิตใจเสรี อยากรู้อยากเห็น มีความสามารถ อายุ 2-9 ปี",
    ru: "Детский сад и начальная школа в стиле Вальдорф на Пхукете, Таиланд. Свободомыслящие, любознательные, способные дети. Возраст 2-9 лет.",
    zh: "泰国普吉岛华德福幼儿园和小学。培养自由思考、好奇、有能力的孩子。适合2-9岁儿童。",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: ["kindergarten phuket", "waldorf school phuket", "international school phuket", "nature school thailand", "bamboo valley"],
    icons: {
      icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
      apple: "/apple-icon.png",
    },
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `https://bamboovalleyphuket.com/${locale}`,
      siteName: "Bamboo Valley",
      locale: locale === "zh" ? "zh_CN" : locale === "th" ? "th_TH" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Hreflang tags for SEO */}
        {locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`https://bamboovalleyphuket.com/${l}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://bamboovalleyphuket.com/en"
        />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
