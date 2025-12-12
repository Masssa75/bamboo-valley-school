import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Science Behind Extraordinary | Bamboo Valley",
  description: "Four decades of research on child-led learning and nature-based education. 213,000 students studied. 200+ nature studies. The evidence is overwhelming.",
};

const stats = [
  {
    number: "213K",
    label: "students studied",
    description: "153 studies show self-driven children outperform on every measure.",
  },
  {
    number: "200+",
    label: "nature studies",
    description: "83% show nature improves science, math, reading, writing, attention, memory, and grades.",
  },
  {
    number: "1 mo",
    label: "to transform immunity",
    description: "Forest soil protects against allergies, autoimmune disorders, immune dysfunction.",
  },
];

const researchSections = [
  {
    category: "The Core Principle",
    title: "When children choose, they soar",
    subtitle: "Four decades of research on what makes children thrive.",
    findings: [
      {
        text: "Curiosity predicts academic success as strongly as IQ.",
        detail: "A meta-analysis of 200 studies with 50,000 students found that a \"hungry mind\" matters as much as intelligence.",
        source: "Perspectives in Psychological Science, von Stumm et al.",
        url: "https://www.psychologicalscience.org/news/releases/curiosity-doesnt-kill-the-student.html",
      },
      {
        text: "Children in autonomy-supportive environments show lower anxiety",
        detail: ", enjoy learning more, and perform better than those with controlling teachers.",
        source: "Meta-analysis, 153 studies, N=213,612",
        url: "https://www.sciencedirect.com/science/article/abs/pii/S0361476X23000899",
      },
      {
        text: "Rewards kill creativity.",
        detail: " When 72 poets were given extrinsic reasons to write, the quality of their work dropped significantly compared to those writing for the love of it.",
        source: "Amabile, Brandeis University, 1985",
        url: "https://www.gnu.org/philosophy/motivation.html",
      },
    ],
    highlight: "When intrinsically motivated, a child is attentive and focused on the task and can perform it in the best possible manner. Negative emotions such as anxiety and pressure dissipate.",
  },
  {
    category: "The Method",
    title: "Play isn't the opposite of learning",
    subtitle: "It's how learning works best.",
    findings: [
      {
        text: "Guided play outperforms direct instruction",
        detail: " on early maths, shape knowledge, and task switching - according to a Cambridge meta-analysis of 39 studies.",
        source: "University of Cambridge, 2022",
        url: "https://www.cam.ac.uk/research/news/learning-through-guided-play-can-be-as-effective-as-adult-led-instruction",
      },
      {
        text: "Children in free-play discovered more.",
        detail: " When given toys, children in exploration groups found additional uses that direct-instruction children never discovered.",
        source: "Edutopia Research Review",
        url: "https://www.edutopia.org/article/young-kids-power-play-based-learning/",
      },
      {
        text: "Long-term benefits:",
        detail: " Play-based learning develops problem-solving, creativity, and social-emotional skills that impact success later in life.",
        source: "American Academy of Pediatrics",
        url: "https://theconversation.com/play-based-learning-can-set-your-child-up-for-success-at-school-and-beyond-91393",
      },
    ],
  },
  {
    category: "The Environment",
    title: "Nature isn't a nice-to-have",
    subtitle: "It's essential infrastructure for learning.",
    findings: [
      {
        text: "Over 200 studies show positive academic outcomes",
        detail: " from nature-based instruction. The more nature, the bigger the gains.",
        source: "Frontiers in Psychology, Converging Evidence",
        url: "https://ncbi.nlm.nih.gov/pmc/articles/PMC6401598",
      },
      {
        text: "Randomized controlled trial with 3,000+ students:",
        detail: " Garden-based instruction produced greater knowledge gains than traditional classes.",
        source: "PMC Research Review",
        url: "https://ncbi.nlm.nih.gov/pmc/articles/PMC6401598",
      },
      {
        text: "Forest school children (N=1,560)",
        detail: " showed higher benefits in cognitive function, motor coordination, and nature connectedness vs indoor school.",
        source: "Educational Psychology Review, 2023",
        url: "https://link.springer.com/article/10.1007/s10648-023-09750-4",
      },
    ],
    highlight: "Nature may promote learning by improving learners' attention, levels of stress, self-discipline, interest and enjoyment in learning, and physical activity.",
  },
  {
    category: "The Immunity Builder",
    title: "Mud is medicine",
    subtitle: "One gram of soil contains up to 10 billion microorganisms. That's not a problem - it's an opportunity.",
    findings: [
      {
        text: "The Finland Study:",
        detail: " Within one month, children who played in forest soil had more diverse bacteria on their skin and improved immune-regulatory responses.",
        source: "The Conversation, 2024",
        url: "https://theconversation.com/playing-in-mud-and-dirt-can-boost-your-childs-immune-system-heres-how-241532",
      },
      {
        text: "Mood and stress:",
        detail: " Mycobacterium vaccae, common in soil, reduces inflammation and improves mood by influencing serotonin release.",
        source: "Children & Nature Network",
        url: "https://www.childrenandnature.org/resources/fnn-mud-mess-and-microbes-why-kids-need-to-play-in-the-dirt/",
      },
      {
        text: "The cost of avoidance:",
        detail: " Children without microbial exposure develop hyper-sensitized immune systems that overreact - triggering asthma, eczema, and allergies.",
        source: "NPR, \"Dirt Is Good\"",
        url: "https://www.npr.org/sections/health-shots/2017/07/16/537075018/dirt-is-good-why-kids-need-exposure-to-germs",
      },
    ],
  },
  {
    category: "Empathy & Responsibility",
    title: "Caring for animals, becoming human",
    subtitle: "When children care for another living being, something fundamental shifts.",
    findings: [
      {
        text: "Empathy transfers:",
        detail: " Animal-directed empathy generalizes to human-directed empathy. Children who learn to care for animals show more compassion for people.",
        source: "PMC Systematic Review",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5369070/",
      },
      {
        text: "Moral development:",
        detail: " Pet care helps children \"reason about issues of justice, kindness, fairness, and what is morally right.\"",
        source: "PMC, Childhood Attachment to Pets",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5451941/",
      },
      {
        text: "Quality over quantity:",
        detail: " Having their own animal to care for shows more impact than just having pets around. Responsibility matters.",
        source: "PMC Research",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5451941/",
      },
    ],
  },
  {
    category: "Hands-On Learning",
    title: "What grows in the garden",
    subtitle: "More than vegetables.",
    findings: [
      {
        text: "Meta-analysis of 50 studies:",
        detail: " Garden-based learning produces increased academic outcomes across subjects - with notable gains in math.",
        source: "Cornell University",
        url: "https://gardening.cals.cornell.edu/lessons/program-tools/benefits-and-research/key-findings/",
      },
      {
        text: "12 quantitative studies reviewed:",
        detail: " 9 reported significant positive impacts on test measures. Students also showed improved attitudes, teamwork, and pride.",
        source: "Children & Nature Network",
        url: "https://research.childrenandnature.org/research/school-gardens-positively-impact-childrens-learning-and-behavior-2/",
      },
      {
        text: "Montessori identified in 1909:",
        detail: " Gardens enhance moral education, increase responsibility, develop patience, and build relationship skills.",
        source: "Rutgers University",
        url: "https://njaes.rutgers.edu/fs1211/",
      },
    ],
  },
  {
    category: "The Teaching Method",
    title: "Stories stick",
    subtitle: "The brain is wired for narrative.",
    findings: [
      {
        text: "The memory advantage:",
        detail: " When content connects with emotion through story, it's stored in more brain locations - making it more likely to be retained.",
        source: "Edutopia, Neuroscience of Narrative",
        url: "https://www.edutopia.org/article/neuroscience-narrative-and-memory/",
      },
      {
        text: "Transfer to real life:",
        detail: " Narrative environments help students transfer learning to practical, everyday contexts - not just tests.",
        source: "SpringerLink, Story-Based Learning",
        url: "https://link.springer.com/chapter/10.1007/978-3-540-69132-7_56",
      },
      {
        text: "Language and cognition:",
        detail: " Storytelling captivates attention, develops memory and critical thinking - foundational for all learning.",
        source: "International Journal of Child Care and Education Policy",
        url: "https://ijccep.springeropen.com/articles/10.1186/s40723-021-00081-x",
      },
    ],
  },
  {
    category: "The Philosophy",
    title: "Whole-child education works",
    subtitle: "Head, heart, and hands - together.",
    findings: [
      {
        text: "Motivation advantage:",
        detail: " Waldorf students consistently show higher motivation and interest in learning than mainstream students.",
        source: "Studies of Waldorf Education",
        url: "https://en.wikipedia.org/wiki/Studies_of_Waldorf_education",
      },
      {
        text: "Alumni outcomes:",
        detail: " 80%+ rate their Waldorf education as most important in developing responsibility for others, environmental sense, and empathy.",
        source: "ScienceDirect, International Comparison",
        url: "https://www.sciencedirect.com/science/article/pii/S2590291124003395",
      },
      {
        text: "High-risk youth transformation:",
        detail: " A school for juvenile offenders that adopted Waldorf methods saw improved attitudes, better social interaction, and significant gains in reading and math.",
        source: "Thomas E. Mathews Community School Study",
        url: "https://en.wikipedia.org/wiki/Studies_of_Waldorf_education",
      },
    ],
    highlight: "\"Receive the children in reverence, educate them in love, and send them forth in freedom.\" — Rudolf Steiner",
  },
];

export default function SciencePage() {
  return (
    <>
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#BED7AF] to-[#d4e5c9] py-24 md:py-32 px-6 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <div className="text-xs font-semibold tracking-[3px] uppercase text-[#4a4a4a] mb-8">
          The Research
        </div>
        <h1 className="font-serif text-3xl md:text-[44px] font-medium max-w-[900px] leading-tight mb-8 text-[#2d2d2d]">
          The overwhelming science behind child-led learning and nature-based education.
        </h1>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-[#FFFDF9]">
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <h2 className="font-serif text-4xl font-medium mb-4">The Numbers</h2>
          <p className="text-[#4a4a4a]">Decades of research. Hundreds of studies. One consistent finding.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-10 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="font-serif text-6xl font-semibold text-[#BED7AF] mb-4">{stat.number}</div>
              <div className="text-base font-medium text-[#2d2d2d] mb-2">{stat.label}</div>
              <div className="text-sm text-[#4a4a4a]">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Sections */}
      {researchSections.map((section, i) => (
        <section
          key={i}
          className={`py-20 px-6 ${i % 2 === 1 ? 'bg-[#FFFDF9]' : 'bg-[#FAF9F6]'}`}
        >
          <div className="max-w-[900px] mx-auto">
            <div className="mb-10">
              <span className="inline-block text-xs font-semibold tracking-[2px] uppercase text-[#8fb07a] bg-[#BED7AF]/20 px-3 py-1 rounded-full mb-4">
                {section.category}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight mb-4">{section.title}</h2>
              <p className="text-lg text-[#4a4a4a]">{section.subtitle}</p>
            </div>

            <ul className="list-none">
              {section.findings.map((finding, j) => (
                <li key={j} className="py-6 border-b border-black/[0.08] last:border-b-0">
                  <p className="text-[17px] leading-relaxed mb-2">
                    <strong className="text-[#2d2d2d] font-semibold">{finding.text}</strong>
                    {finding.detail}
                  </p>
                  <p className="text-sm text-[#4a4a4a]">
                    Source: <a href={finding.url} target="_blank" rel="noopener noreferrer" className="text-[#8fb07a] font-medium hover:underline">{finding.source}</a>
                  </p>
                </li>
              ))}
            </ul>

            {section.highlight && (
              <div className="bg-gradient-to-br from-[#BED7AF] to-[#d4e5c9] rounded-xl p-10 mt-10">
                <p className="font-serif text-xl md:text-2xl font-medium leading-relaxed text-[#2d2d2d]">
                  {section.highlight}
                </p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#2d2d2d] text-white py-24 px-6 text-center">
        <h2 className="font-serif text-3xl md:text-[44px] font-medium mb-5">See it for yourself</h2>
        <p className="text-lg text-white/70 max-w-[600px] mx-auto mb-10">
          The research points one direction. Come see what it looks like in practice.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#BED7AF] text-[#2d2d2d] px-10 py-5 rounded-full font-semibold text-base hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          Book a Visit
        </Link>
      </section>

      <Footer />
    </>
  );
}
