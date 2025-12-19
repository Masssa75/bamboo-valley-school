import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Understanding Your Child | Bamboo Valley - ALSUP Assessment",
  description: "How Bamboo Valley identifies what's really going on when a child struggles. We look for lagging skills and unsolved problems, not labels or blame.",
  keywords: ["ALSUP", "lagging skills", "unsolved problems", "child assessment", "behavior understanding"],
};

export default function UnderstandingPage() {
  return (
    <>
      <Navigation variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <Link href="/child-wellbeing" className="text-sm text-[#8fb07a] hover:text-[#6d9b5a] mb-4 inline-block">
            ← Child Wellbeing
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d]">
            Understanding Your Child
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            When behavior is a puzzle, we look for the missing pieces — not labels
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">

          {/* Introduction */}
          <p className="text-[#444] text-lg leading-relaxed mb-6">
            When a child struggles repeatedly with behavior, it's tempting to look for a simple explanation: "He's defiant." "She's attention-seeking." "He just doesn't care."
          </p>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            These labels feel like answers, but they don't help us solve anything. They describe the problem from the outside without explaining what's happening on the inside.
          </p>

          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <p className="text-[#444] text-lg leading-relaxed">
              <strong>Our approach is different.</strong> Instead of asking "What's wrong with this child?", we ask: "What skills is this child struggling to develop?" and "What specific situations is this child having difficulty with?"
            </p>
          </div>

          {/* The ALSUP */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Lagging Skills & Unsolved Problems</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            We use a tool called <strong>ALSUP</strong> (Assessment of Lagging Skills and Unsolved Problems) to understand what's really going on. It's not a test or a diagnosis — it's a way of looking at a child that leads to real solutions.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-[#FAF9F6] rounded-lg p-6">
              <h3 className="font-semibold text-[#2d2d2d] mb-3 text-lg">Lagging Skills</h3>
              <p className="text-[#666] leading-relaxed">
                Skills the child hasn't fully developed yet — like flexibility, frustration tolerance, or reading social cues. These explain <em>why</em> certain situations are hard.
              </p>
            </div>
            <div className="bg-[#FAF9F6] rounded-lg p-6">
              <h3 className="font-semibold text-[#2d2d2d] mb-3 text-lg">Unsolved Problems</h3>
              <p className="text-[#666] leading-relaxed">
                Specific situations where the child struggles — like "staying seated during story time" or "transitioning from play to class." These are what we actually solve.
              </p>
            </div>
          </div>

          {/* Categories of Skills */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Skills Children Are Still Learning</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-8">
            All children are learning these skills. Some children develop certain skills more slowly than others — and when expectations exceed their current abilities, they struggle. Here are the main areas we look at:
          </p>

          <div className="space-y-6 mb-12">
            {/* Flexibility */}
            <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Flexibility & Adaptability</h3>
              <p className="text-[#666] text-[0.95rem] mb-2">
                The ability to handle changes, shift plans, and cope with things not going as expected.
              </p>
              <p className="text-sm text-[#888] italic">
                A child lagging here might: get upset when the schedule changes, struggle with transitions, or have trouble when their first idea doesn't work.
              </p>
            </div>

            {/* Frustration Tolerance */}
            <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Frustration Tolerance</h3>
              <p className="text-[#666] text-[0.95rem] mb-2">
                The ability to stay calm when things are difficult, boring, or not going your way.
              </p>
              <p className="text-sm text-[#888] italic">
                A child lagging here might: get overwhelmed quickly, give up on hard tasks, or have intense reactions to minor setbacks.
              </p>
            </div>

            {/* Problem-Solving */}
            <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Problem-Solving</h3>
              <p className="text-[#666] text-[0.95rem] mb-2">
                The ability to think of different solutions, express needs in words, and anticipate consequences.
              </p>
              <p className="text-sm text-[#888] italic">
                A child lagging here might: get stuck on one approach, act without thinking, or struggle to explain what they need.
              </p>
            </div>

            {/* Emotional Regulation */}
            <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Emotional Regulation</h3>
              <p className="text-[#666] text-[0.95rem] mb-2">
                The ability to manage big feelings — excitement, anxiety, frustration — without being overwhelmed by them.
              </p>
              <p className="text-sm text-[#888] italic">
                A child lagging here might: "go from 0 to 100" quickly, take a long time to calm down, or seem to act on every feeling.
              </p>
            </div>

            {/* Social Skills */}
            <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Social & Relational Skills</h3>
              <p className="text-[#666] text-[0.95rem] mb-2">
                The ability to read social cues, understand others' perspectives, and navigate relationships.
              </p>
              <p className="text-sm text-[#888] italic">
                A child lagging here might: miss body language signals, not realize how their actions affect others, or struggle with taking turns.
              </p>
            </div>

            {/* Executive Function */}
            <div className="border-l-4 border-[#C8DCE1] pl-5 py-2">
              <h3 className="font-semibold text-[#2d2d2d] mb-2">Executive Function & Attention</h3>
              <p className="text-[#666] text-[0.95rem] mb-2">
                The ability to focus, control impulses, and organize thoughts and actions.
              </p>
              <p className="text-sm text-[#888] italic">
                A child lagging here might: act before thinking, struggle to follow multi-step instructions, or be easily distracted.
              </p>
            </div>
          </div>

          {/* How We Identify Problems */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Getting Specific</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            General labels don't help us solve problems. "He has trouble with behavior" is too vague. We need to identify the exact situations where the child struggles.
          </p>

          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-[#2d2d2d] mb-4">Examples of Unsolved Problems</h3>
            <ul className="space-y-3 text-[#444]">
              <li className="flex gap-2">
                <span className="text-[#8fb07a]">•</span>
                <span>"Difficulty staying seated during story time"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8fb07a]">•</span>
                <span>"Difficulty transitioning from free play to class time"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8fb07a]">•</span>
                <span>"Difficulty sharing materials during art activities"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8fb07a]">•</span>
                <span>"Difficulty waiting for a turn to speak during circle time"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#8fb07a]">•</span>
                <span>"Difficulty when activities don't go as expected"</span>
              </li>
            </ul>
          </div>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            Notice what's <em>not</em> in these statements: judgment, blame, or theories about motivation. Just specific situations we can work on solving.
          </p>

          {/* What We Look For */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Looking for Patterns</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Once we've identified specific problems, we look for patterns:
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
            <li className="flex gap-3">
              <span className="text-[#8fb07a] font-bold">→</span>
              <span><strong>When does the child struggle most?</strong> Morning? After free play? During certain activities?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a] font-bold">→</span>
              <span><strong>When do they do well?</strong> What's different about those situations?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a] font-bold">→</span>
              <span><strong>What happens right before?</strong> What triggers the difficulty?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a] font-bold">→</span>
              <span><strong>What has been tried?</strong> What helped? What made things worse?</span>
            </li>
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            These patterns give us clues about which lagging skills are involved and what kind of support the child needs.
          </p>

          {/* What Happens Next */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">From Understanding to Solutions</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            Once we understand which skills a child is lagging in and which specific situations are problematic, we can solve the problems collaboratively using the approach described in <Link href="/child-wellbeing/our-approach" className="text-[#8fb07a] hover:text-[#6d9b5a]">Our Approach</Link>.
          </p>

          <div className="bg-white border-2 border-[#BED7AF] rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-3">A Real Example</h3>
            <p className="text-[#444] leading-relaxed mb-4">
              A child was constantly getting up during story time, disrupting others. Traditional approach: consequences for getting up. Result: didn't work — child kept doing it.
            </p>
            <p className="text-[#444] leading-relaxed mb-4">
              <strong>Assessment revealed:</strong> The child had high energy in the morning (after arriving) and couldn't sit still. It wasn't defiance — it was a regulation issue.
            </p>
            <p className="text-[#444] leading-relaxed">
              <strong>Collaborative solution:</strong> The child helped design an "energy challenge" — a quick circuit around the playground when they needed to move. They raise their hand, do the circuit, and return ready to focus. Problem solved, skill being built, relationship intact.
            </p>
          </div>

          {/* Parents' Role */}
          <h2 className="font-serif text-3xl font-normal text-[#2d2d2d] mb-6">Your Role in This Process</h2>

          <p className="text-[#444] text-lg leading-relaxed mb-6">
            You know your child better than anyone. When we're trying to understand what's going on, your insights are invaluable:
          </p>

          <ul className="text-[#444] text-lg leading-relaxed mb-8 space-y-3">
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>What situations are hard at home?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>When do they do well?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>What strategies have worked for you?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>What do you notice about their energy, mood, or triggers?</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#8fb07a]">✓</span>
              <span>What are they really good at?</span>
            </li>
          </ul>

          <p className="text-[#444] text-lg leading-relaxed mb-12">
            When school and home work together to understand a child, we get a complete picture. And complete pictures lead to better solutions.
          </p>

          {/* Not About Labels */}
          <div className="bg-[#f0f7ed] border-l-4 border-[#8fb07a] p-6 rounded-r-lg mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-2">This Isn't About Labeling</h3>
            <p className="text-[#444] leading-relaxed">
              Identifying lagging skills isn't about diagnosing or labeling your child. It's about understanding what they need to learn and how we can help them learn it. Every child has areas where they're still developing. Our job is to support that development with patience and skill.
            </p>
          </div>

          {/* Learn More */}
          <div className="bg-[#FAF9F6] rounded-lg p-6 mb-12">
            <h3 className="font-semibold text-[#2d2d2d] mb-3">Learn More</h3>
            <p className="text-[#444] leading-relaxed mb-4">
              The ALSUP assessment is part of Dr. Ross Greene's Collaborative & Proactive Solutions approach. You can find free resources, including a printable ALSUP form, at:
            </p>
            <p className="text-[#888]">
              <a href="https://livesinthebalance.org" target="_blank" rel="noopener noreferrer" className="text-[#8fb07a] hover:text-[#6d9b5a]">livesinthebalance.org</a>
            </p>
          </div>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 rounded-xl text-center">
            <h3 className="font-serif text-2xl font-normal text-[#2d2d2d] mb-3">Questions?</h3>
            <p className="text-[#666] mb-6">We're happy to discuss how we understand and support children.</p>
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </div>

        </div>
      </article>

      <Footer />
    </>
  );
}
