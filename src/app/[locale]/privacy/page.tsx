import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// ponytail: English-only, hardcoded rather than threaded through messages/*.json.
// This is a legal document — a stale or loosely-worded translation is worse than
// no translation, and Meta only reads the English version.

const LAST_UPDATED = "26 July 2026";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/privacy/";

  return {
    title: "Privacy Policy | Bamboo Valley Phuket",
    description:
      "How Bamboo Valley Company Limited collects, uses and protects personal data submitted through our website, enrolment forms and WhatsApp business account.",
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

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function PrivacyPage({
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
            Privacy Policy
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            How we collect, use and protect your personal information.
          </p>
          <p className="text-sm text-[#999] mt-4">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[#444] text-lg leading-relaxed">
            This policy explains what personal information Bamboo Valley collects, why we
            collect it, and what you can ask us to do with it. We have written it in plain
            language rather than legal jargon, because a policy nobody can read protects
            nobody.
          </p>

          <Section title="1. Who we are">
            <p>
              This website and our school are operated by{" "}
              <strong>BAMBOO VALLEY COMPANY LIMITED</strong>, a school registered in
              Thailand.
            </p>
            <p>
              3/75 Moo 4, Cherngtalay, Thalang, Phuket 83110, Thailand
              <br />
              Email:{" "}
              <a
                href="mailto:info@bamboovalleyphuket.com"
                className="text-[#8fb07a] hover:text-[#6d9b5a]"
              >
                info@bamboovalleyphuket.com
              </a>
            </p>
            <p>
              We are the data controller for the information described in this policy. If
              you have any question about it, write to the address above and a person will
              answer you.
            </p>
          </Section>

          <Section title="2. What we collect">
            <Bullets
              items={[
                "Contact and enquiry details you submit through our website forms — your name, phone number, email address, and whatever you tell us in your message.",
                "Enrolment information supplied by parents and guardians, including details about your child such as name, date of birth, and any health, dietary or developmental information you choose to share with us so we can care for your child properly.",
                "WhatsApp messages sent to our business number, including your phone number, your WhatsApp profile name, and the content of your messages.",
                "Basic usage data about how people find and move through our website, collected through analytics.",
              ]}
            />
            <p>
              We ask only for what we actually need. You are never required to give us
              information that is not relevant to your enquiry or your child&apos;s
              enrolment.
            </p>
          </Section>

          <Section title="3. WhatsApp">
            <p>
              We operate a <strong>WhatsApp Business account</strong>. When you send us a
              message on WhatsApp, we receive and store your phone number, your WhatsApp
              profile name, and the content of your messages, so that we can reply to you
              and provide support.
            </p>
            <p>
              Messages sent over WhatsApp are transmitted and processed by Meta under
              WhatsApp&apos;s own terms and privacy policy, and by the service providers who
              host the messaging system we use to receive and answer your messages.
            </p>
            <p>
              We use <strong>automated replies</strong> to answer common questions and to
              acknowledge your message outside office hours. You can ask to speak to a
              person at any time, and you can stop messaging us at any time.
            </p>
          </Section>

          <Section title="4. How we use your information">
            <Bullets
              items={[
                "Responding to your enquiries and questions.",
                "Enrolment and day-to-day school administration.",
                "Providing educational guidance and support for your child.",
                "Improving our services, our website and the information we give to families.",
              ]}
            />
          </Section>

          <Section title="5. Who we share it with">
            <p>
              <strong>We do not sell your personal information.</strong> We never have and
              we do not intend to.
            </p>
            <p>We share it only with:</p>
            <Bullets
              items={[
                "Service providers who operate the systems we rely on — website hosting, messaging, email and analytics — and only so far as they need it to provide that service to us.",
                "Authorities or other parties where we are required to do so by law.",
              ]}
            />
          </Section>

          <Section title="6. How long we keep it">
            <p>
              We keep personal information only as long as we need it for the purposes
              described above — for example, for as long as your child is enrolled with us
              and for the period afterwards that school and tax records must be kept. When
              we no longer need it, we delete it.
            </p>
          </Section>

          <Section title="7. Your rights">
            <p>
              Under Thailand&apos;s <strong>Personal Data Protection Act (PDPA)</strong>, you
              have the right to:
            </p>
            <Bullets
              items={[
                "Ask what personal information we hold about you and request a copy of it.",
                "Ask us to correct information that is wrong or incomplete.",
                "Ask us to delete your information, where we are not required to keep it.",
                "Withdraw your consent at any time, where we rely on your consent.",
                "Object to how we use your information, or ask us to restrict that use.",
              ]}
            />
            <p>
              To exercise any of these rights, email{" "}
              <a
                href="mailto:info@bamboovalleyphuket.com"
                className="text-[#8fb07a] hover:text-[#6d9b5a]"
              >
                info@bamboovalleyphuket.com
              </a>
              . There is no charge, and we will respond within a reasonable time.
            </p>
          </Section>

          <Section title="8. Children's information">
            <p>
              We collect information about children from their parents or guardians, not
              from the children themselves. We use it only for school purposes — caring for
              and educating your child, keeping them safe, and communicating with you about
              them.
            </p>
            <p>
              Our campus is deliberately technology-free for children. We do not ask
              children to create accounts, and our website is not directed at children.
            </p>
          </Section>

          <Section title="9. Cookies and analytics">
            <p>
              We use Google Analytics to understand how people find and use our website —
              which pages are read, how long people stay, and roughly where visitors come
              from. This sets cookies in your browser. It tells us about patterns across
              visitors, not about you personally.
            </p>
            <p>
              You can block or delete cookies in your browser settings at any time. The
              website will still work.
            </p>
          </Section>

          <Section title="10. Changes to this policy">
            <p>
              We may update this policy from time to time — for example if we start using a
              new service or the law changes. When we do, we will change the &ldquo;last
              updated&rdquo; date at the top of this page. If a change materially affects how
              we handle your information, we will tell you directly.
            </p>
            <p className="text-sm text-[#999]">Last updated: {LAST_UPDATED}</p>
          </Section>
        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
