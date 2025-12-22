import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Separation Anxiety | Bamboo Valley - Helping Your Child with Goodbyes",
  description: "Research-based guidance for handling separation anxiety. Why tears at drop-off are actually a good sign, and how to help your child feel confident.",
  keywords: ["separation anxiety", "drop-off crying", "child attachment", "preschool transition", "toddler separation"],
};

export default async function SeparationAnxietyPage({
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
            Separation Anxiety
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            Why tears at drop-off are actually a good sign — and how to help
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">

          {/* Good News First */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#444] text-lg leading-relaxed">
              <strong>First, the good news:</strong> Separation anxiety is a sign of <em>healthy attachment</em>. It means your child loves deeply and trusts completely. Children who don't protest at all when caregivers leave can actually be a concern. Your child's tears show the bond is strong — now we just help them learn that goodbyes aren't forever.
            </p>
          </div>

          {/* Why This Happens */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Why This Happens</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            When a young child cries at separation, their brain is doing exactly what it evolved to do: keeping the people they love close. This is the foundation of healthy human connection.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            The challenge isn't to eliminate this instinct — it's to help your child build <strong>trust</strong> that:
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-2 ml-6">
            <li>• You always come back</li>
            <li>• They are safe when you're away</li>
            <li>• The teachers can be trusted too</li>
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            Research shows children with strong separation responses often develop into securely attached, emotionally healthy adults — <em>when handled correctly</em>.
          </p>

          {/* What Research Tells Us */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">What the Research Tells Us</h2>

          <div className="space-y-6 mb-12">
            <div className="bg-[#f8fbfc] border-l-4 border-[#C8DCE1] p-5 rounded-r-lg">
              <p className="text-[#444] mb-2">
                <strong>Stress peaks during anticipation, not after you leave.</strong>
              </p>
              <p className="text-[#666] text-[0.95rem]">
                Studies measuring cortisol (the stress hormone) found that levels spike while waiting for the parent to leave — and stay elevated during prolonged goodbyes. The uncertainty is harder than the separation itself.
              </p>
            </div>

            <div className="bg-[#f8fbfc] border-l-4 border-[#C8DCE1] p-5 rounded-r-lg">
              <p className="text-[#444] mb-2">
                <strong>Children read your emotions.</strong>
              </p>
              <p className="text-[#666] text-[0.95rem]">
                Research shows that parents can either "buffer" or "amplify" their child's stress response. When you appear anxious or sad, your child's stress rises. When you appear calm and confident, it helps regulate theirs.
              </p>
            </div>

            <div className="bg-[#f8fbfc] border-l-4 border-[#C8DCE1] p-5 rounded-r-lg">
              <p className="text-[#444] mb-2">
                <strong>Adjustment takes about 3 months.</strong>
              </p>
              <p className="text-[#666] text-[0.95rem]">
                Studies show that children's stress hormone levels normalize after approximately 3 months of consistent childcare — but only with predictable routines and confident goodbyes.
              </p>
            </div>
          </div>

          {/* The Key Insight */}
          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12 text-center">
            <p className="text-[#444] text-lg">
              <strong>The bottom line:</strong> Quick, confident goodbyes aren't "cold" — they're kinder. They reduce the anticipation phase (where stress is highest) and show your child there's nothing to worry about.
            </p>
          </div>

          {/* What To Do */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">What Helps at Drop-off</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Do */}
            <div className="bg-[#f0f7ed] border-2 border-[#8fb07a] rounded-lg overflow-hidden">
              <div className="bg-[#8fb07a] text-white px-4 py-2 font-semibold">
                What to Do
              </div>
              <div className="p-5">
                <ul className="text-[#444] space-y-3 text-[0.95rem]">
                  <li className="flex gap-2">
                    <span className="text-[#8fb07a] font-bold">✓</span>
                    <span><strong>Keep goodbyes under 1 minute</strong> — reduces anticipation stress</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8fb07a] font-bold">✓</span>
                    <span><strong>Sound confident and calm</strong> — your calm regulates their calm</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8fb07a] font-bold">✓</span>
                    <span><strong>Hand them to a teacher</strong> — physical transfer to a trusted adult</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8fb07a] font-bold">✓</span>
                    <span><strong>Walk away without looking back</strong> — hesitation signals danger</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#8fb07a] font-bold">✓</span>
                    <span><strong>Trust the process</strong> — most children calm within 5-10 minutes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Don't */}
            <div className="bg-[#ffebee] border-2 border-[#f44336] rounded-lg overflow-hidden">
              <div className="bg-[#f44336] text-white px-4 py-2 font-semibold">
                What to Avoid
              </div>
              <div className="p-5">
                <ul className="text-[#444] space-y-3 text-[0.95rem]">
                  <li className="flex gap-2">
                    <span className="text-[#f44336] font-bold">✗</span>
                    <span><strong>Sneaking away</strong> — breaks trust, increases vigilance next time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#f44336] font-bold">✗</span>
                    <span><strong>Multiple "one more hug"</strong> — prolongs the stressful anticipation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#f44336] font-bold">✗</span>
                    <span><strong>Coming back when you hear crying</strong> — teaches that crying brings you back</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#f44336] font-bold">✗</span>
                    <span><strong>Looking worried or sad</strong> — amplifies their stress response</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sample Script */}
          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-3">A Simple Script</h3>
            <p className="text-[#444] italic text-lg mb-3">
              "I love you! Teacher [name] will take care of you. I'll be back after [lunch/nap/outside play]. Bye bye!"
            </p>
            <p className="text-[#666] text-sm">
              → Hug, hand to teacher, walk out confidently.
            </p>
          </div>

          {/* What to Expect */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">What to Expect</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-[#FAF9F6] rounded-lg p-4 text-center">
              <div className="font-semibold text-[#8fb07a] mb-2">Week 1</div>
              <p className="text-sm text-[#666]">Crying at drop-off. This is normal.</p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-4 text-center">
              <div className="font-semibold text-[#8fb07a] mb-2">Week 2-3</div>
              <p className="text-sm text-[#666]">Crying decreases. Calms faster. Engages sooner.</p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-4 text-center">
              <div className="font-semibold text-[#8fb07a] mb-2">Month 2</div>
              <p className="text-sm text-[#666]">Brief fussing. Quick recovery. Happy during day.</p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-4 text-center">
              <div className="font-semibold text-[#8fb07a] mb-2">Month 3</div>
              <p className="text-sm text-[#666]">Waves goodbye. Fully adjusted.</p>
            </div>
          </div>

          {/* Gentle Start Option */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">A Gentle Start (Optional)</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            If jumping straight to full days feels too hard, you can gradually increase the separation time. The key: <strong>still do quick, confident goodbyes</strong> — just come back sooner at first.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-[0.95rem]">
              <thead>
                <tr className="bg-[#8fb07a] text-white">
                  <th className="px-4 py-2 text-left font-semibold">Day</th>
                  <th className="px-4 py-2 text-left font-semibold">Return After</th>
                  <th className="px-4 py-2 text-left font-semibold">Say This</th>
                </tr>
              </thead>
              <tbody className="text-[#444]">
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">1-2</td>
                  <td className="px-4 py-3">30 minutes</td>
                  <td className="px-4 py-3">"I'll be back after circle time!"</td>
                </tr>
                <tr className="border-b border-gray-200 bg-[#FAF9F6]">
                  <td className="px-4 py-3">3-4</td>
                  <td className="px-4 py-3">45 minutes</td>
                  <td className="px-4 py-3">"I'll be back after snack!"</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">5-6</td>
                  <td className="px-4 py-3">1.5 hours</td>
                  <td className="px-4 py-3">"I'll be back after outside play!"</td>
                </tr>
                <tr className="border-b border-gray-200 bg-[#FAF9F6]">
                  <td className="px-4 py-3">7-8</td>
                  <td className="px-4 py-3">2.5 hours</td>
                  <td className="px-4 py-3">"I'll be back after lunch!"</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">9-10</td>
                  <td className="px-4 py-3">Half day</td>
                  <td className="px-4 py-3">"I'll be back after nap!"</td>
                </tr>
                <tr className="bg-[#FAF9F6]">
                  <td className="px-4 py-3">11+</td>
                  <td className="px-4 py-3">Full day</td>
                  <td className="px-4 py-3">"I'll be back after school!"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[#666] text-[0.95rem] mb-12 italic">
            <strong>Tip:</strong> Use concrete markers ("after snack") not abstract time ("in 1 hour"). Young children understand routines — clocks don't mean much yet.
          </p>

          {/* What Teachers Do */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">What We Do After You Leave</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Our teachers are trained to support children through this transition:
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">•</span>
              <span><strong>Warm, calm reception</strong> — we become the "borrowed calm"</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">•</span>
              <span><strong>Immediate redirection</strong> — engaging activities shift focus</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">•</span>
              <span><strong>Brief acknowledgment</strong> — "I know. Mommy always comes back."</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">•</span>
              <span><strong>Moving on</strong> — we don't dwell on the sadness</span>
            </li>
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            We never make a fuss over crying (which reinforces it), repeatedly discuss the absent parent (which keeps focus on the absence), or call you back (which teaches that crying brings you back).
          </p>

          {/* Why This Works */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-2">Why This Works</h3>
            <p className="text-[#444] leading-relaxed">
              Every successful goodbye teaches your child's brain: "Parent leaves, parent comes back, I survive, I'm okay." This builds the neural pathways for secure attachment — the foundation for confidence throughout life. It feels hard now, but you're giving them a gift that lasts forever.
            </p>
          </div>

          {/* When to Be Concerned */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">When to Talk to Us</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Most separation anxiety resolves within a few weeks to a couple months. Please reach out if:
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-2 ml-6">
            <li>• Anxiety doesn't improve after 2-3 months</li>
            <li>• Your child seems anxious throughout the entire day (not just drop-off)</li>
            <li>• There's been a recent significant change (new sibling, move, family stress)</li>
            <li>• You're struggling with the drop-off process yourself</li>
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            We can work together to create a tailored plan. Sometimes small adjustments make a big difference.
          </p>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">Questions?</h3>
            <p className="text-[#666] mb-6">We're happy to discuss your child's transition and create a plan together.</p>
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
