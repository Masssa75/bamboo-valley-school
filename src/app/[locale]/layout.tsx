import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { locales, type Locale, localeNames } from "@/i18n/config";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";
import { EngagementTracker } from "@/components/EngagementTracker";
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
    en: "Bamboo Valley International School | Kindergarten in Phuket",
    th: "โรงเรียนนานาชาติแบมบู แวลลีย์ | อนุบาลนานาชาติ ภูเก็ต",
    ru: "Bamboo Valley International School | Детский сад, Пхукет",
    zh: "Bamboo Valley 国际学校 | 普吉岛国际幼儿园",
  };

  const descriptions: Record<string, string> = {
    en: "A nature-based international kindergarten and school in Cherngtalay, Phuket. Waldorf-inspired outdoor learning on a 5,600 m² palm plantation. Ages 2–9.",
    th: "โรงเรียนอนุบาลนานาชาติแนวธรรมชาติ ในเชิงทะเล ภูเก็ต การเรียนรู้กลางแจ้งแนววอลดอร์ฟ บนพื้นที่สวนปาล์ม 5,600 ตร.ม. สำหรับเด็กอายุ 2-9 ปี",
    ru: "Международный детский сад и школа на природе в Чернгталай, Пхукет. Вальдорфское обучение на открытом воздухе на пальмовой плантации 5600 м². Возраст 2–9 лет.",
    zh: "位于普吉岛 Cherngtalay 的自然国际幼儿园与学校。5,600 平方米棕榈园中的华德福户外教学。适合 2–9 岁儿童。",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      "international kindergarten phuket",
      "international school phuket",
      "kindergarten phuket",
      "kindergarten cherngtalay",
      "kindergarten bangtao",
      "preschool phuket",
      "nursery phuket",
      "waldorf school phuket",
      "nature school thailand",
      "bamboo valley international school",
    ],
    other: {
      "facebook-domain-verification": "yffe5lt15l7ibwq223cmarbne6uaru",
    },
    icons: {
      icon: [{ url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
      apple: "/apple-icon.png",
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `https://bamboovalleyphuket.com/${locale}`,
      siteName: "Bamboo Valley",
      locale: locale === "zh" ? "zh_CN" : locale === "th" ? "th_TH" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [
        {
          url: "https://bamboovalleyphuket.com/images/bamboo-valley-international-school-phuket-og.jpg",
          width: 1200,
          height: 630,
          alt: "A teacher and two children working with yarn at Bamboo Valley International School, Phuket",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ["https://bamboovalleyphuket.com/images/bamboo-valley-international-school-phuket-og.jpg"],
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
          <EngagementTracker />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
