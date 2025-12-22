import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { type Locale } from "@/i18n/config";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Approach | Bamboo Valley - Collaborative & Proactive Solutions",
  description: "How Bamboo Valley helps children who struggle with behavior. We use Collaborative & Proactive Solutions (CPS) - a research-backed approach that builds skills, not just compliance.",
  keywords: ["CPS", "collaborative proactive solutions", "ross greene", "child behavior", "positive discipline"],
};

export default async function OurApproachPage({
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
            Our Approach
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            Collaborative & Proactive Solutions — a different way of thinking about behavior
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">

          {/* Core Philosophy */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-2xl font-serif text-[#2d2d2d] mb-3">
              "Kids do well if they can."
            </p>
            <p className="text-[#444] text-lg leading-relaxed">
              If a child is struggling, it's not because they <em>won't</em> behave — it's because they <em>can't</em> (yet). Challenging behavior is a signal: "I'm stuck. There's something I can't figure out."
            </p>
          </div>

          {/* Introduction */}
          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Our approach is based on <strong>Collaborative & Proactive Solutions (CPS)</strong>, developed by Dr. Ross Greene at Harvard Medical School. It's been used successfully in families, schools, and even juvenile detention facilities around the world.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            The core insight is simple but powerful: children who struggle with behavior aren't choosing to be difficult. They're lacking skills — skills like flexibility, frustration tolerance, or problem-solving. When we help them build these skills, the behavior improves naturally.
          </p>

          {/* Old Way vs New Way */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">A Different Way of Thinking</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Old Way */}
            <div className="bg-[#ffebee] border-2 border-[#f44336] rounded-lg overflow-hidden">
              <div className="bg-[#f44336] text-white px-4 py-2 font-semibold text-center">
                Traditional Thinking
              </div>
              <div className="p-5">
                <p className="text-[#444] font-medium mb-3">"Kids do well if they want to"</p>
                <ul className="text-[#666] space-y-2 text-[0.95rem]">
                  <li>• Behavior is a choice</li>
                  <li>• Child needs motivation (rewards/punishments)</li>
                  <li>• If consequences are strong enough, behavior will change</li>
                  <li>• Child is being defiant or manipulative</li>
                </ul>
                <p className="text-sm text-[#888] mt-4 italic">
                  Result: Power struggles, temporary compliance, the problem keeps returning
                </p>
              </div>
            </div>

            {/* CPS Way */}
            <div className="bg-[#f0f7ed] border-2 border-[#8fb07a] rounded-lg overflow-hidden">
              <div className="bg-[#8fb07a] text-white px-4 py-2 font-semibold text-center">
                Our Approach
              </div>
              <div className="p-5">
                <p className="text-[#444] font-medium mb-3">"Kids do well if they can"</p>
                <ul className="text-[#666] space-y-2 text-[0.95rem]">
                  <li>• Behavior signals a lagging skill</li>
                  <li>• Child needs help building skills</li>
                  <li>• Understanding the problem leads to lasting solutions</li>
                  <li>• Child is communicating "I'm stuck"</li>
                </ul>
                <p className="text-sm text-[#888] mt-4 italic">
                  Result: Skills built, problems solved, relationship strengthened
                </p>
              </div>
            </div>
          </div>

          {/* Why Consequences Alone Don't Work */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Why Consequences Alone Don't Work</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Think about it this way: if your child could behave well just by being motivated, they would already be behaving well. No child wants to be in trouble. No child wants to disappoint their parents and teachers.
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            When a child struggles repeatedly despite consequences, it tells us something important: <strong>motivation isn't the problem</strong>. The child is lacking a skill — maybe emotional regulation, flexibility when plans change, or the ability to express frustration with words instead of actions.
          </p>

          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
            <p className="text-[#444] leading-relaxed">
              <strong>A helpful analogy:</strong> If a child struggled with reading, we wouldn't punish them for reading poorly. We'd figure out what specific skill they're missing (phonics? comprehension? fluency?) and teach it. Behavior is the same. When a child can't meet an expectation, we need to figure out what's getting in the way and help them build that skill.
            </p>
          </div>

          {/* How It Works */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">How It Works in Practice</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            When we notice a child struggling with a particular situation — maybe transitions, sharing, or sitting still during story time — we don't wait for the next incident to punish. Instead, we have a calm conversation to understand what's making it hard and solve the problem together.
          </p>

          {/* Three Steps */}
          <div className="space-y-6 mb-12">
            {/* Step 1 */}
            <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
              <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">1</span>
                Understand the child's perspective
              </div>
              <div className="p-5 bg-[#f8fbfc]">
                <p className="text-[#444] mb-3">
                  We start by getting curious, not judgmental. What's making this hard for you?
                </p>
                <div className="bg-white border-l-3 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                  "I've noticed it's been hard for you to stay seated during story time. What's going on?"
                </div>
                <p className="text-sm text-[#888] mt-3">
                  We keep asking until we really understand. Often children reveal things we never would have guessed — maybe the chair hurts, or they can't see, or they're worried about something that happened earlier.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
              <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">2</span>
                Share our concern
              </div>
              <div className="p-5 bg-[#f8fbfc]">
                <p className="text-[#444] mb-3">
                  We explain why this matters — not as a lecture, just as information.
                </p>
                <div className="bg-white border-l-3 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                  "The thing is, when you walk around during story time, it makes it hard for other kids to listen."
                </div>
                <p className="text-sm text-[#888] mt-3">
                  Just one simple sentence. Not "because I said so" — a genuine reason the child can understand.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-2 border-[#C8DCE1] rounded-lg overflow-hidden">
              <div className="bg-[#C8DCE1] px-5 py-3 font-semibold text-[#2d2d2d] flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2d2d2d] font-bold">3</span>
                Solve the problem together
              </div>
              <div className="p-5 bg-[#f8fbfc]">
                <p className="text-[#444] mb-3">
                  We brainstorm solutions that work for everyone — the child's concern AND our concern.
                </p>
                <div className="bg-white border-l-3 border-[#C8DCE1] pl-4 py-2 italic text-[#666]">
                  "I wonder if there's a way for you to feel comfortable AND for story time to work for everyone. Do you have any ideas?"
                </div>
                <p className="text-sm text-[#888] mt-3">
                  Children often come up with creative solutions adults never considered. Maybe they need a fidget toy, or a spot near the door, or a special cushion. We test each idea: does it solve both problems?
                </p>
              </div>
            </div>
          </div>

          {/* Why This Works */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Why This Works</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">It builds skills</h3>
              <p className="text-[#666] text-[0.95rem]">
                Through this process, children learn to identify their own feelings, consider others' perspectives, and generate solutions. These are life skills they'll use forever.
              </p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Solutions last</h3>
              <p className="text-[#666] text-[0.95rem]">
                When children help create the solution, they're invested in making it work. It's their idea, not something imposed on them.
              </p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Relationships strengthen</h3>
              <p className="text-[#666] text-[0.95rem]">
                Children feel heard and understood. Adults become helpers rather than adversaries. Trust grows.
              </p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-5">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">It's proactive</h3>
              <p className="text-[#666] text-[0.95rem]">
                We solve problems during calm moments, not in the heat of crisis. Prevention is always better than reaction.
              </p>
            </div>
          </div>

          {/* Common Questions */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Common Questions</h2>

          <div className="space-y-6 mb-12">
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">"Isn't this too soft? Don't kids need consequences?"</h3>
              <p className="text-[#444] leading-relaxed">
                This isn't permissive parenting. Adult concerns are always part of the conversation, and solutions must work for everyone. The difference is we're solving problems collaboratively rather than imposing solutions that often don't work.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">"What if my child can't think of solutions?"</h3>
              <p className="text-[#444] leading-relaxed">
                That's okay! We can suggest ideas: "What if we tried...? Would that work for you?" The key is that both parties agree. Over time, children get better at generating their own solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">"What if the solution doesn't work?"</h3>
              <p className="text-[#444] leading-relaxed">
                We try again! "That solution isn't working well. Let's think of something else." It's an iterative process. Failed solutions give us more information about the real problem.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d2d2d] mb-2">"Doesn't this take too much time?"</h3>
              <p className="text-[#444] leading-relaxed">
                It takes time upfront, but saves enormous time later. Solving a problem durably takes less time than repeatedly dealing with the same behavior over and over.
              </p>
            </div>
          </div>

          {/* Research */}
          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-3">The Research Behind CPS</h3>
            <p className="text-[#444] leading-relaxed mb-4">
              Collaborative & Proactive Solutions was developed by <strong>Dr. Ross Greene</strong>, formerly of Harvard Medical School. His research shows that challenging behavior is best understood as a learning problem — a delay in the development of crucial cognitive skills.
            </p>
            <p className="text-[#444] leading-relaxed">
              CPS has been implemented successfully in hundreds of schools, psychiatric units, and juvenile facilities. Research shows it reduces challenging behavior, improves relationships, and builds lasting skills.
            </p>
            <p className="text-sm text-[#888] mt-4">
              Learn more: <a href="https://livesinthebalance.org" target="_blank" rel="noopener noreferrer" className="text-[#8fb07a] hover:text-[#6d9b5a]">livesinthebalance.org</a> | Books: <em>The Explosive Child</em>, <em>Lost at School</em>, <em>Raising Human Beings</em>
            </p>
          </div>

          {/* Using at Home */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Using This Approach at Home</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            This approach works beautifully at home too. When your child struggles with something repeatedly — bedtime, homework, chores, siblings — try having a calm conversation:
          </p>

          <ol className="text-[#444] text-lg leading-relaxed mb-8 space-y-3 list-decimal list-inside">
            <li><strong>Get curious:</strong> "I've noticed bedtime has been hard lately. What's going on?"</li>
            <li><strong>Share your concern:</strong> "The thing is, you need enough sleep to feel good tomorrow."</li>
            <li><strong>Brainstorm together:</strong> "I wonder if there's a way for you to feel ready for bed AND get enough sleep. Any ideas?"</li>
          </ol>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            You might be surprised what you learn. And solutions you create together tend to stick.
          </p>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">Questions?</h3>
            <p className="text-[#666] mb-6">We're happy to discuss our approach in more detail.</p>
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
