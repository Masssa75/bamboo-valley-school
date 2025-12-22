import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Child Wellbeing | Bamboo Valley - How We Support Every Child",
  description: "Our approach to child wellbeing at Bamboo Valley. Based on Collaborative & Proactive Solutions by Dr. Ross Greene. Clear support systems, fair processes, and true partnership with families.",
  keywords: ["child wellbeing", "behavior support", "collaborative proactive solutions", "Waldorf school Phuket", "child psychology"],
};

export default async function ChildWellbeingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navigation locale={locale as Locale} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#BED7AF] to-[#a8c99a] pt-32 pb-20 md:pt-40 md:pb-24 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d] mb-4">
          Child Wellbeing
        </h1>
        <p className="text-lg md:text-xl text-[#444] max-w-[600px] mx-auto">
          How we support every child to thrive — and protect the community we've built together
        </p>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto">

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Our Core Belief</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Children <em>want</em> to do well. They want to follow the rules. They want to be kind. They want to succeed.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            When a child breaks a rule or lashes out, it's not because they don't want to behave — it's because something is getting in the way. Maybe they haven't been taught the rules clearly. Maybe they're missing a skill, like self-regulation. Maybe they have too much energy built up inside.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Our job isn't to force rules onto children. It's to work <em>with</em> them to understand what's wrong and help them succeed. The difference sounds small. The results are transformative.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            This approach — known as Collaborative & Proactive Solutions — was developed by Dr. Ross Greene at Harvard Medical School and is now used in thousands of schools, hospitals, and treatment centers worldwide.
          </p>

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">What This Means in Practice</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">We Provide</h3>
              <ul className="space-y-3">
                {[
                  "A calm, predictable environment",
                  "Clear, consistent expectations",
                  "Adults who listen before reacting",
                  "Time and space to learn from mistakes",
                  "Individual support when needed",
                  "Close partnership with parents"
                ].map((item, i) => (
                  <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-4">We Expect</h3>
              <ul className="space-y-3">
                {[
                  "Gentle hands with others",
                  "Kind words, even when upset",
                  "Willingness to share and take turns",
                  "Including everyone in play",
                  "Parents who work with us, not against us",
                  "Honesty when problems arise"
                ].map((item, i) => (
                  <li key={i} className="text-[#444] pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-[#8fb07a]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            Most children thrive naturally in our environment. The combination of nature, small class sizes, calm adults, and meaningful activities gives them exactly what they need. For the few who need extra support, we have clear processes — developed with input from child psychologists and educational specialists.
          </p>

          {/* Separator */}
          <div className="text-center my-12 text-[#ccc] text-2xl tracking-[8px]">• • •</div>

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Learn More</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            We believe in transparency. The guides below explain exactly how we approach different challenges. We share these openly so you know what to expect — whether your child needs extra support or you simply want peace of mind that we take these things seriously.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {[
              {
                title: "Our Approach",
                description: "The philosophy behind how we see and respond to challenging behavior. Working with children, not against them.",
                href: `/${locale}/child-wellbeing/our-approach`
              },
              {
                title: "Understanding Your Child",
                description: "How we identify what's really going on when a child struggles — looking at lagging skills, not \"bad behavior.\"",
                href: `/${locale}/child-wellbeing/understanding`
              },
              {
                title: "Behavior Support",
                description: "Our clear, fair, 3-tier response system. What happens when issues arise, and how we work toward solutions.",
                href: `/${locale}/child-wellbeing/behavior-support`
              },
              {
                title: "Separation Anxiety",
                description: "A common challenge with clear solutions. What we do at school and what you can do at home.",
                href: `/${locale}/child-wellbeing/separation-anxiety`
              }
            ].map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="bg-white p-7 rounded-lg border-2 border-transparent hover:border-[#BED7AF] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="font-serif text-xl font-medium text-[#2d2d2d] mb-2 flex items-center justify-between">
                  {card.title}
                  <span className="text-[#8fb07a] group-hover:translate-x-1 transition-transform">→</span>
                </h3>
                <p className="text-[#666] text-[0.95rem] leading-relaxed">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>

          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">When Challenges Arise</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Some children need more support than others. This is completely normal and nothing to be ashamed of. What matters is how families respond when we reach out.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            We're building something special at Bamboo Valley — a community where children genuinely thrive. This requires partnership between school and home. When we identify concerns, we'll share them honestly with you. We'll suggest approaches that work. We'll give you resources and support.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            What we ask in return is openness. Work with us. Try what we suggest at home. Come to meetings when we request them. Trust that we want the same thing you do: for your child to be happy and successful.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            For families who engage with us as partners, the results are remarkable. Children overcome challenges. Parents feel supported. The whole community benefits.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            For families who resist — who deny problems exist, who blame other children, who refuse to implement strategies at home — we will always be honest: Bamboo Valley may not be the right fit. We cannot help children whose parents aren't willing to be part of the solution. And we will not let one family's resistance harm the experience of others.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            This isn't about excluding anyone. It's about protecting everyone. The peaceful, nurturing environment we've created depends on all families being committed to the same values.
          </p>

          {/* CTA */}
          <div className="bg-white p-10 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">Questions?</h3>
            <p className="text-[#666] mb-6">We're always happy to discuss our approach. Reach out anytime.</p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              Contact Us
            </Link>
          </div>

        </div>
      </article>

      <Footer locale={locale as Locale} />
    </>
  );
}
