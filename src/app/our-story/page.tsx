import type { Metadata } from "next";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story | Bamboo Valley - Building Schools for the Life We Want",
  description: "How two parents transformed their frustration with traditional education into a nature-based school in Phuket. The story of Bamboo Valley by Nutthanit and Marc Schwyn.",
};

export default function OurStoryPage() {
  return (
    <>
      <Navigation />

      {/* Hero with Background Image */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <Image
          src="/images/founders-family-bamboo-valley-phuket.jpeg"
          alt="Bamboo Valley founders with their children at the outdoor school in Phuket"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-4 text-white">
            Building Schools for the Life We Actually Want
          </h1>
          <p className="text-lg text-white/90 mb-2">
            This is for parents who want nothing less than extraordinary lives for their children.
          </p>
          <p className="text-white/70 italic">By Nutthanit and Marc Schwyn</p>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 px-6 bg-white">
        <div className="max-w-[700px] mx-auto prose prose-lg">

          {/* Introduction */}
          <p className="text-[#444] leading-relaxed mb-6">
            We're parents of three, and like you, we want the absolute best for our children. We see that pure wonder in their eyes, that natural joy, that bright spark that makes them who they are. It's the most beautiful thing in the world.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            So when the time came to choose a school for our first child, we couldn't find a single one that felt right. She was three - an age of pure magic and discovery. But every kindergarten we found was designed for parent convenience, not child development. Even the 'good' schools offered the same formula: sterile indoor rooms, artificial lights, plastic materials, and already the pressure to 'prepare for academic success.'
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            Like so many of you, we couldn't bear the thought of watching the world slowly dim our children's magic and diminish their limitless potential.
          </p>

          {/* Moving to Phuket */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">Moving to Phuket</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            Five years ago, we decided the city wasn't working for us. We couldn't find the right school, children were trapped indoors, traffic and pollution made it hard to go anywhere, and we barely had time together as a family. So we moved to a beach in Phuket, hoping for more space, more nature, and more time with our children.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            What we discovered there was nothing short of magical. We learned that children completely transform when given two simple things: <strong>genuine time with their parents</strong> (we're talking 3-5 hours a day) and <strong>daily access to nature</strong>. That's it. No expensive programs, no complex methods. Just these two ingredients.
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            The transformation is immediate and profound. Difficult children become helpful. Nagging stops. They ask to learn. They want to contribute. It sounds impossible, but any parent can test this - give your child focused time in nature for just a few days and watch the magic unfold.
          </p>

          {/* Why Parents Struggle */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">Why Parents Struggle</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            Let's be honest about something that 95% of parents know but rarely say out loud: parenting in modern society is brutally, exhaustingly difficult.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            It wasn't always this way. Historically, families lived in communities. When you had children, your parents, grandparents, neighbors, and extended family all helped raise them together. It truly took a village.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            Today? You're not a village. You're isolated parents, often both working full-time jobs, with zero help at home. You wash dishes, do laundry, clean house, manage schedules, help with homework, handle bedtime routines - everything. When do you have 3-5 hours to just be present with your children? You barely have time to shower.
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            So you put them in front of screens just to recover. Not because you're a bad parent - because you're drowning.
          </p>

          {/* Raising Dream Children */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">Raising Dream Children</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            Like you, we've always loved our children desperately and wanted the absolute best for them. We tried everything - researching the perfect foods, finding the best learning methods, carefully choosing their environment and friends, modeling the right behaviors. We read every parenting book, implemented every strategy.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            Then difficult times hit. Work demanded more. We were away more. And we watched our daughter transform - but not in a good way. She became difficult, naggy, bossy, rebellious. She absorbed negative influences from other children, from screens. She stopped listening to us. It broke our hearts.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            But here's when the pattern became undeniable: Every time we took a full weekend to just BE with our daughters - no distractions, just presence - they transformed back into the most magical beings. By Sunday night, they were perfect. Not obedient-robot perfect, but joyful, helpful, curious, loving perfect. Dream children.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            So we made a radical decision. When problems arose, we stopped reaching for punishments or explanations or any of the traditional parenting tools. We reached for time. Just time together.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            What happens when you genuinely spend time with your children is almost mystical. Those annoying behaviors they picked up from others? You mention you don't like them - maybe not the first time, maybe not even the fifth - but eventually they simply stop. Not because you punished them. Because they love you and when you're present, they naturally want to please you.
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            But here's the deeper magic: <strong>Children learn by copying.</strong> When you're absent, they copy whoever is there - other children, screens, anyone. When you're present, they copy YOU. They mirror your mannerisms, your interests, your values. They spontaneously say "I love you." They ask to learn what you know. They want to help with whatever you're doing.
          </p>

          {/* Why Nature Matters */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">Why Nature Matters</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            When we moved from our small Bangkok apartment to Phuket, just a minute's walk from the beach, we witnessed something that seemed impossible.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            Picture this: In our Bangkok apartment, our two daughters would fight constantly. Even with 50 toys available, they'd battle over the exact same one every 15 minutes. There's something about indoor spaces, about bought stuff, that creates competition and conflict.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            But take those exact same children at that exact same moment and walk outside into nature - to the woods, to our beach - and the fighting stops. Completely. They run around, play with sticks, dig in sand, splash in waves. Those sticks become toys, but somehow they don't fight over them. The competition vanishes.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            Nature floods children with endless questions: Why do leaves spiral that way? What made these tracks? Why does this mushroom grow on dead wood? Every walk outside presents infinite mysteries - a single tree holds more learning opportunities than a room full of educational posters.
          </p>

          <p className="text-[#444] leading-relaxed mb-12">
            Our 3.5-rai palm plantation isn't just a pretty setting. It's a living laboratory where curiosity explodes naturally. Children discover Fibonacci patterns in real plants, witness life and death cycles, watch storms build and water find its path. They're not memorizing facts about physics - they're building dams and testing them. They're not studying ecosystems from books - they're living in one.
          </p>

          {/* The Paradise School */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">The Paradise School</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            These discoveries changed everything about how we thought about education. If 3-5 hours of time transforms children... if nature eliminates conflict... if children desperately want to learn when we stop forcing them... then why are we sending them to schools designed around the exact opposite principles?
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            So we're building a paradise where parenting becomes easy, not exhausting. Where children naturally want to learn instead of resisting at every turn. Where they develop academic excellence, deep confidence, genuine social skills, physical vitality, emotional intelligence - all through joy instead of struggle. Where your child wakes up excited for each day and comes home energized, not depleted.
          </p>

          <ul className="text-[#444] leading-relaxed mb-6 list-disc pl-6 space-y-4">
            <li><strong>Creating an Environment Children Want to Copy:</strong> Children don't learn by being taught. They learn by copying what surrounds them. Everything in our environment is designed to give the same message - the way teachers move and speak, what older children are doing, the materials available, the rhythm of the day.</li>
            <li><strong>Perfect Timing Multiplies Everything:</strong> There's a window for every skill where children are naturally ready. Force reading at 3 when their bodies want to climb trees, and you create years of struggle. Wait until they're desperately curious at 6, and they learn in weeks what would have taken painful years.</li>
            <li><strong>The Right Tool at the Perfect Moment:</strong> When a child hits a learning block, most schools just drill harder. We've learned that's like trying to break down a door when there's a key available.</li>
            <li><strong>The Community That Multiplies Magic:</strong> We've designed our location with spaces for regular family BBQs, farmers markets, workshops. When families align with what happens at school - not through rules but through genuine understanding - the transformation becomes unstoppable.</li>
          </ul>

          <p className="text-[#444] leading-relaxed mb-12">
            This is what we're building. Not just another school, but a complete ecosystem designed around how children actually thrive. Where excellence isn't forced but emerges naturally. Where childhood isn't sacrificed for achievement but becomes the very source of it. Your children already have everything they need to be extraordinary. We're just creating the conditions where it happens naturally.
          </p>

          {/* Separator */}
          <div className="text-center my-16 text-[#ccc] text-2xl tracking-widest">• • •</div>

          {/* Educational Foundation */}
          <h2 className="font-serif text-3xl font-normal mt-16 mb-6 text-[#2d2d2d]">Our Educational Foundation</h2>

          <p className="text-[#444] leading-relaxed mb-6">
            Our approach is rooted in Waldorf education, outdoor learning, the British curriculum, and the fundamental belief that children have a strong innate drive to learn and excel. We blend these elements differently at each developmental stage to nurture extraordinary human beings.
          </p>

          <p className="text-[#444] leading-relaxed mb-6">
            From our Nursery (ages 2-4) where we strengthen children's innate desire to learn, through Kindergarten (ages 3-6) where we identify and nurture each child's unique talents, to Primary (ages 6-9) where we fully cover the British curriculum while intensifying our focus on individual strengths — every stage is designed to help children reach their full potential.
          </p>

          <div className="my-8">
            <Link href="/programs" className="inline-flex items-center gap-2 text-[#8fb07a] hover:text-[#6d9b5a] font-medium">
              Explore our programs in detail
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* CTA */}
          <div className="bg-[#FAF9F6] p-8 md:p-12 rounded-lg text-center mt-16">
            <h3 className="font-serif text-2xl mb-4 text-[#2d2d2d]">Ready to See It for Yourself?</h3>
            <p className="text-[#666] mb-6">
              The best way to understand Bamboo Valley is to experience it. Join us for a campus tour.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Book a Visit
            </Link>
          </div>

        </div>
      </article>

      <Footer />
    </>
  );
}
