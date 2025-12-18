import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Bamboo Valley | Natural Learning Community in Phuket",
  description: "A Waldorf-inspired kindergarten and primary school in Phuket, Thailand. Free-minded, curious, capable children who thrive anywhere. Ages 2-9.",
  keywords: ["kindergarten phuket", "waldorf school phuket", "international school phuket", "nature school thailand", "bamboo valley"],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Bamboo Valley | Natural Learning Community",
    description: "Where children become free-minded, curious, and capable. A nature-based school in Phuket, Thailand.",
    url: "https://bamboovalleyphuket.com",
    siteName: "Bamboo Valley",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
