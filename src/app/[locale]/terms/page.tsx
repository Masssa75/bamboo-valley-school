import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

// ponytail: English-only and hardcoded, same reasoning as /privacy.

const LAST_UPDATED = "26 July 2026";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/terms/";

  return {
    title: "Terms of Service | Bamboo Valley Phuket",
    description:
      "Terms governing use of the Bamboo Valley website, enquiry forms and WhatsApp business account.",
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        th: `${baseUrl}/th${path}`,
        ru: `${baseUrl}/ru${path}`,
        zh: `${baseUrl}/zh${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#2d2d2d] mt-12 mb-4">
        {title}
      </h2>
      <div className="text-[#444] leading-relaxed space-y-4">{children}</div>
    </>
  );
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navigation variant="light" locale={locale as Locale} />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d]">
            Terms of Service
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            The terms that apply when you use this website or message us.
          </p>
          <p className="text-sm text-[#999] mt-4">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[#444] text-lg leading-relaxed">
            These terms apply to this website, our enquiry and enrolment forms, and our
            WhatsApp business account. They do not replace the enrolment agreement you sign
            when your child joins the school — where the two differ, the enrolment
            agreement governs.
          </p>

          <Section title="1. Who we are">
            <p>
              This website is operated by <strong>BAMBOO VALLEY COMPANY LIMITED</strong>,
              3/75 Moo 4, Cherngtalay, Thalang, Phuket 83110, Thailand.
              <br />
              Email:{" "}
              <a
                href="mailto:info@bamboovalleyphuket.com"
                className="text-[#8fb07a] hover:text-[#6d9b5a]"
              >
                info@bamboovalleyphuket.com
              </a>
            </p>
          </Section>

          <Section title="2. Using this website">
            <p>
              You may read, print and share our pages for your own personal and family use.
              Please do not copy our content for commercial use, attempt to disrupt the
              site, or use it in any way that breaks Thai law.
            </p>
            <p>
              The text, photographs and video on this site belong to us or are used with
              permission. Please ask before reusing them elsewhere.
            </p>
          </Section>

          <Section title="3. Contacting us and WhatsApp">
            <p>
              When you submit a form or message our WhatsApp business number, you are asking
              us to reply to you. We use automated replies to acknowledge messages and answer
              common questions, and a person will follow up during office hours.
            </p>
            <p>
              Please do not send us urgent or emergency information through these channels —
              they are not monitored continuously. In an emergency, call us.
            </p>
            <p>
              How we handle the information you send is described in our{" "}
              <Link href={`/${locale}/privacy`} className="text-[#8fb07a] hover:text-[#6d9b5a]">
                Privacy Policy
              </Link>
              .
            </p>
          </Section>

          <Section title="4. Information on this site">
            <p>
              We work to keep everything here accurate and current, but details such as
              programme dates, fees, availability and camp schedules change. Nothing on this
              website is a binding offer of a place at the school. Places are confirmed only
              through the enrolment process.
            </p>
          </Section>

          <Section title="5. Links to other sites">
            <p>
              Some pages link to other websites — booking tools, maps, social media. We do
              not control those sites and are not responsible for their content or their
              privacy practices.
            </p>
          </Section>

          <Section title="6. Liability">
            <p>
              We provide this website as it is. To the extent the law allows, we are not
              liable for loss arising from your use of the website or from reliance on
              information published here. Nothing in these terms limits any liability that
              cannot be limited under Thai law.
            </p>
          </Section>

          <Section title="7. Governing law">
            <p>
              These terms are governed by the laws of Thailand, and the courts of Thailand
              have jurisdiction over any dispute arising from them.
            </p>
          </Section>

          <Section title="8. Changes">
            <p>
              We may update these terms from time to time. When we do, we will change the
              &ldquo;last updated&rdquo; date at the top of this page.
            </p>
            <p className="text-sm text-[#999]">Last updated: {LAST_UPDATED}</p>
          </Section>
        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
