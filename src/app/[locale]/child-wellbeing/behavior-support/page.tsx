import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Behavior Support | Bamboo Valley - Our 3-Tier Response System",
  description: "How Bamboo Valley responds to behavioral challenges. A clear, fair, 3-tier system that protects all children while supporting those who struggle.",
  keywords: ["behavior policy", "school discipline", "positive behavior support", "child behavior"],
};

export default async function BehaviorSupportPage({
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
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <Link href={`/${locale}/child-wellbeing`} className="text-sm text-[#8fb07a] hover:text-[#6d9b5a] mb-4 inline-block">
            ← Child Wellbeing
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d]">
            Behavior Support
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            Clear rules. Fair consequences. A system that protects everyone while helping children learn.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">

          {/* Core Principle */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#444] text-lg leading-relaxed">
              <strong>Our approach:</strong> When a child breaks a rule, we respond with calm, consistent consequences — and then we work to understand why it happened so we can prevent it next time. Consequences without understanding doesn't teach. Understanding without consequences doesn't protect.
            </p>
          </div>

          {/* The 4 Rules */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">The 4 Rules</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            These rules apply to all children, all the time, in all settings. We teach them through stories, role-play, and daily practice.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { num: 1, name: "Gentle Hands", desc: "No pushing, hitting, or grabbing" },
              { num: 2, name: "Kind Voice", desc: "No yelling, mean words, or teasing" },
              { num: 3, name: "Share & Wait", desc: "Take turns, practice patience" },
              { num: 4, name: "Everyone Plays", desc: '"You can\'t play" is not allowed' },
            ].map((rule) => (
              <div key={rule.num} className="bg-[#f0f7ed] border-2 border-[#BED7AF] rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-[#8fb07a] text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                  {rule.num}
                </div>
                <div className="font-semibold text-[#2d2d2d] mb-1">{rule.name}</div>
                <div className="text-sm text-[#666]">{rule.desc}</div>
              </div>
            ))}
          </div>

          {/* The 3-Tier System */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">How We Respond</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            Not all incidents are the same. A child grabbing a toy is different from a child hurting someone on purpose. Our response matches the severity — clear, predictable, and fair.
          </p>

          {/* Tier 1 */}
          <div className="mb-8 rounded-lg overflow-hidden border-2 border-[#4caf50]">
            <div className="bg-[#4caf50] text-white px-6 py-3 font-semibold">
              Tier 1 — Minor Incidents
            </div>
            <div className="bg-[#f1f8e9] p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">Examples</h4>
                  <ul className="text-[#444] space-y-1 text-[0.95rem]">
                    <li>• Pushing or shoving (no injury)</li>
                    <li>• Grabbing toys</li>
                    <li>• Mean words or teasing</li>
                    <li>• Not sharing or waiting turn</li>
                    <li>• Excluding others from play</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">What Happens</h4>
                  <p className="text-[#444] text-[0.95rem]">
                    Playtime pauses briefly. The child chooses a calm activity (watering plants, cleaning toys, etc.) until they're ready to rejoin. Then they get a fresh start — no lecture, no lingering consequences.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#4caf50]/20">
                <p className="text-sm text-[#666]">
                  <strong>Parent communication:</strong> Verbal update at pickup if notable. Written note if 3+ incidents in one week.
                </p>
              </div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="mb-8 rounded-lg overflow-hidden border-2 border-[#ff9800]">
            <div className="bg-[#ff9800] text-white px-6 py-3 font-semibold">
              Tier 2 — Moderate Incidents
            </div>
            <div className="bg-[#fff8e1] p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">Examples</h4>
                  <ul className="text-[#444] space-y-1 text-[0.95rem]">
                    <li>• Repeated minor incidents (3+ in a week)</li>
                    <li>• Targeting a specific child</li>
                    <li>• Breaking materials on purpose</li>
                    <li>• Rough play causing minor injury</li>
                    <li>• Refusing to follow safety rules</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">What Happens</h4>
                  <p className="text-[#444] text-[0.95rem]">
                    Free play is done for the day. The child sits with a teacher doing a quiet activity for the rest of the play period. Before rejoining regular activities, they must make repair with the affected child.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#ff9800]/20">
                <p className="text-sm text-[#666]">
                  <strong>Parent communication:</strong> Same-day message or call. If patterns continue, we schedule a meeting.
                </p>
              </div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="mb-12 rounded-lg overflow-hidden border-2 border-[#f44336]">
            <div className="bg-[#f44336] text-white px-6 py-3 font-semibold">
              Tier 3 — Serious Incidents
            </div>
            <div className="bg-[#ffebee] p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">Examples</h4>
                  <ul className="text-[#444] space-y-1 text-[0.95rem]">
                    <li>• Physical aggression causing injury</li>
                    <li>• Using objects to hurt others</li>
                    <li>• Repeated pattern of harm</li>
                    <li>• Threatening behavior</li>
                    <li>• Behavior endangering others</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2d2d2d] mb-2">What Happens</h4>
                  <p className="text-[#444] text-[0.95rem]">
                    The child is removed from group activities immediately and supervised 1-on-1. Management is notified. Parents are called — same-day pickup may be required.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#f44336]/20">
                <p className="text-sm text-[#666]">
                  <strong>Parent communication:</strong> Immediate phone call. Incident report provided. Meeting required before child returns.
                </p>
              </div>
            </div>
          </div>

          {/* Escalation Path */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">If Serious Incidents Continue</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            We believe in giving children chances to learn and grow. But we also have a responsibility to protect all children. Here's what happens when serious incidents continue:
          </p>

          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
            <div className="space-y-4">
              {[
                { incident: "1st serious incident", response: "Parent meeting. Behavior contract introduced." },
                { incident: "2nd serious incident", response: "Behavior contract signed. Formal monitoring begins." },
                { incident: "3rd serious incident", response: "Child sent home for the day. Meeting required before return." },
                { incident: "4th serious incident", response: "Suspension (1-3 days). Enrollment review." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#f44336] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-[#2d2d2d]">{item.incident}</div>
                    <div className="text-[#666]">{item.response}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beyond Consequences */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Beyond Consequences</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Consequences address the moment. But they don't solve the underlying problem. That's why we also work to understand <em>why</em> a child is struggling and help them develop the skills they need.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            When patterns emerge, we use a process called ALSUP (Assessment of Lagging Skills and Unsolved Problems) to identify what's getting in the way. Then we work collaboratively — teachers, parents, and sometimes the child — to find solutions.
          </p>

          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
            <p className="text-[#444] leading-relaxed">
              <strong>Learn more:</strong> Our <Link href={`/${locale}/child-wellbeing/understanding`} className="text-[#8fb07a] hover:text-[#6d9b5a]">Understanding Your Child</Link> page explains how we identify what's really going on when a child struggles. Our <Link href={`/${locale}/child-wellbeing/our-approach`} className="text-[#8fb07a] hover:text-[#6d9b5a]">Our Approach</Link> page covers the philosophy behind working with children collaboratively.
            </p>
          </div>

          {/* What We Ask of Parents */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">What We Ask of Parents</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            This system works best when school and home are aligned. When we reach out about behavioral concerns, we ask that you:
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>Listen with an open mind — we're sharing concerns, not accusations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>Attend meetings when requested</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>Try suggested strategies at home</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>Share information that might help us understand your child better</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>Work with us as partners, not adversaries</span>
            </li>
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            For families who engage with us this way, the results are often remarkable. Children develop new skills. Behaviors improve. Everyone feels supported.
          </p>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">Questions?</h3>
            <p className="text-[#666] mb-6">We're happy to discuss our behavior support approach in more detail.</p>
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
