import Link from "next/link";
import Script from "next/script";
import { redirect } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

// English-only page (educator recruitment requires English speakers)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en") {
    return {
      title: "Educator Observation Program | Bamboo Valley",
      robots: { index: false },
    };
  }

  const baseUrl = "https://bamboovalleyphuket.com";
  const path = "/educator-program/";

  return {
    title: "Educator Observation Program | Bamboo Valley School, Phuket",
    description:
      "An immersive professional development opportunity for educators to observe and learn our nature-based, precision learning approach to early childhood education in Phuket, Thailand.",
    keywords:
      "educator observation program, teaching in phuket, waldorf teacher training, nature-based education, early childhood education thailand, bamboo valley school",
    openGraph: {
      title: "Educator Observation Program | Bamboo Valley School",
      description:
        "Observe and learn our unique nature-based, Waldorf-enhanced approach to early childhood education on our palm plantation campus in Phuket.",
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/en${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  };
}

export default async function EducatorProgramPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "en") {
    redirect("/en/educator-program");
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale: "en", namespace: "educatorProgram" });
  const localePath = (path: string) => `/en${path}`;

  const weeklySchedule = t.raw("structure.schedule") as Array<{
    component: string;
    hours: string;
    description: string;
  }>;
  const learningObjectives = t.raw("structure.objectives") as string[];
  const applicationSteps = t.raw("apply.steps") as Array<{
    title: string;
    description: string;
  }>;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Bamboo Valley School",
    url: "https://bamboovalleyphuket.com",
    description:
      "Nature-based early childhood education in Phuket, Thailand. Educator Observation Program for professional development.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3/74 Moo 4, Cherngtalay",
      addressLocality: "Thalang",
      addressRegion: "Phuket",
      postalCode: "83110",
      addressCountry: "TH",
    },
  };

  return (
    <>
      <Script
        id="educator-program-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation locale="en" />

      {/* Hero */}
      <header className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 bg-[#2d2d2d]">
        <div className="relative max-w-[720px] mx-auto text-center">
          <div className="inline-block text-xs uppercase tracking-widest text-[#BED7AF] font-medium mb-6">
            {t("hero.badge")}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-lg text-white/80 max-w-[600px] mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex justify-center gap-6 mt-8 text-sm text-white/60">
            <span>{t("hero.location")}</span>
            <span>{t("hero.ages")}</span>
            <span>{t("hero.certificate")}</span>
          </div>
        </div>
      </header>

      <article className="py-12 md:py-16 px-6">
        <div className="max-w-[720px] mx-auto">

          {/* About the Program */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("about.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("about.intro")}</p>

            <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mt-8 mb-4">
              {t("about.uniqueTitle")}
            </h3>
            <ul className="space-y-3">
              {(t.raw("about.unique") as Array<{ title: string; text: string }>).map((item) => (
                <li key={item.title} className="text-[#444] leading-relaxed pl-4 border-l-2 border-[#BED7AF]">
                  <strong>{item.title}</strong> — {item.text}
                </li>
              ))}
            </ul>
          </section>

          {/* Who Should Apply */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("audience.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-4">{t("audience.intro")}</p>
            <ul className="space-y-2 text-[#444]">
              {(t.raw("audience.items") as string[]).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#BED7AF] mt-1">&#x2022;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-5 bg-[#FAF9F6] rounded-lg border border-[#e8e6e1]">
              <h4 className="font-medium text-[#2d2d2d] mb-2">{t("audience.prereqTitle")}</h4>
              <p className="text-[#444] text-sm leading-relaxed">{t("audience.prereqText")}</p>
            </div>
          </section>

          {/* Program Structure */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("structure.title")}
            </h2>

            <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">
              {t("structure.durationTitle")}
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="p-5 bg-[#FAF9F6] rounded-lg text-center border border-[#e8e6e1]">
                <div className="text-xs uppercase tracking-wider text-[#888] mb-1">{t("structure.introductory")}</div>
                <div className="font-serif text-2xl font-medium text-[#2d2d2d]">{t("structure.twoWeeks")}</div>
                <div className="text-sm text-[#666] mt-1">{t("structure.overviewObs")}</div>
              </div>
              <div className="p-5 bg-[#BED7AF]/15 rounded-lg text-center border-2 border-[#BED7AF]">
                <div className="text-xs uppercase tracking-wider text-[#6a9b52] font-medium mb-1">{t("structure.recommended")}</div>
                <div className="font-serif text-2xl font-medium text-[#2d2d2d]">{t("structure.fourWeeks")}</div>
                <div className="text-sm text-[#666] mt-1">{t("structure.comprehensive")}</div>
              </div>
              <div className="p-5 bg-[#FAF9F6] rounded-lg text-center border border-[#e8e6e1]">
                <div className="text-xs uppercase tracking-wider text-[#888] mb-1">{t("structure.extended")}</div>
                <div className="font-serif text-2xl font-medium text-[#2d2d2d]">{t("structure.eightWeeks")}</div>
                <div className="text-sm text-[#666] mt-1">{t("structure.inDepth")}</div>
              </div>
            </div>

            <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">
              {t("structure.scheduleTitle")}
            </h3>
            <div className="overflow-hidden rounded-lg border border-[#e8e6e1] mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#2d2d2d] text-white">
                    <th className="text-left p-3 font-medium">Component</th>
                    <th className="text-left p-3 font-medium">Hours/Week</th>
                    <th className="text-left p-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((row, i) => (
                    <tr key={row.component} className={i % 2 === 0 ? "bg-white" : "bg-[#FAF9F6]"}>
                      <td className="p-3 font-medium text-[#2d2d2d]">{row.component}</td>
                      <td className="p-3 text-[#666]">{row.hours}</td>
                      <td className="p-3 text-[#444]">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">
              {t("structure.objectivesTitle")}
            </h3>
            <ul className="space-y-2 text-[#444]">
              {learningObjectives.map((obj) => (
                <li key={obj} className="flex items-start gap-2">
                  <span className="text-[#BED7AF] mt-1">&#x2022;</span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Certificate */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("certificate.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-6">{t("certificate.description")}</p>
            <div className="p-8 bg-[#FAF9F6] rounded-lg border-2 border-[#BED7AF]/40 text-center">
              <div className="text-xs uppercase tracking-widest text-[#888] mb-3">Certificate of Completion</div>
              <p className="text-[#555] italic leading-relaxed max-w-[500px] mx-auto">
                {t("certificate.preview")}
              </p>
            </div>
          </section>

          {/* How to Apply */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("apply.title")}
            </h2>
            <div className="space-y-4">
              {applicationSteps.map((step, i) => (
                <div key={step.title} className="flex gap-4 p-5 bg-[#FAF9F6] rounded-lg">
                  <div className="w-8 h-8 bg-[#2d2d2d] text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-[#2d2d2d] mb-1">{step.title}</h4>
                    <p className="text-sm text-[#444]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 bg-[#BED7AF]/15 rounded-lg border border-[#BED7AF]/40">
              <h4 className="font-medium text-[#2d2d2d] mb-2">{t("apply.visaTitle")}</h4>
              <p className="text-sm text-[#444] leading-relaxed">{t("apply.visaInfo")}</p>
            </div>
          </section>

          {/* Practical Information */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("practical.title")}
            </h2>

            <div className="space-y-6 text-[#444]">
              <div>
                <h3 className="font-medium text-[#2d2d2d] mb-2">{t("practical.feesTitle")}</h3>
                <p className="leading-relaxed">{t("practical.feesText")}</p>
              </div>
              <div>
                <h3 className="font-medium text-[#2d2d2d] mb-2">{t("practical.accommodationTitle")}</h3>
                <p className="leading-relaxed">{t("practical.accommodationText")}</p>
              </div>
              <div>
                <h3 className="font-medium text-[#2d2d2d] mb-2">{t("practical.datesTitle")}</h3>
                <p className="leading-relaxed">{t("practical.datesText")}</p>
              </div>
            </div>
          </section>

          {/* About the School */}
          <section className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#2d2d2d] mb-6">
              {t("school.title")}
            </h2>
            <p className="text-[#444] leading-relaxed mb-4">{t("school.description")}</p>
            <div className="p-5 bg-[#FAF9F6] rounded-lg border border-[#e8e6e1]">
              <h4 className="font-medium text-[#2d2d2d] mb-2">{t("school.registrationTitle")}</h4>
              <ul className="space-y-1 text-sm text-[#444]">
                {(t.raw("school.registrationItems") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#BED7AF] mt-0.5">&#x2022;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA */}
          <div className="p-8 bg-[#BED7AF] rounded-lg text-center">
            <h3 className="font-serif text-2xl text-[#2d2d2d] mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-[#2d2d2d] mb-6">{t("cta.description")}</p>
            <a
              href="mailto:info@bamboovalleyphuket.com?subject=Educator%20Observation%20Program%20Application&body=Hi!%20I%20am%20interested%20in%20the%20Educator%20Observation%20Program%20and%20would%20like%20to%20learn%20more."
              className="inline-flex items-center gap-2 bg-[#2d2d2d] text-white px-6 py-3 rounded font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              {t("cta.button")}
            </a>
            <p className="text-sm text-[#2d2d2d]/70 mt-4">{t("cta.note")}</p>
          </div>
        </div>
      </article>

      <Footer locale="en" />
    </>
  );
}
