import Link from "next/link";
import Image from "next/image";

const insights = [
  {
    slug: "/blog/homework-myth",
    title: "Homework Doesn't Help Children Under 10",
    subtitle: "35 years of research",
    description: "A meta-analysis found zero benefit from homework for elementary students. For third graders, more homework meant worse grades.",
    image: "/images/child-reading-outdoors-natural-learning.jpeg",
    highlight: true,
  },
  {
    slug: "/science",
    title: "The Science Behind Our Approach",
    subtitle: "Research-backed learning",
    description: "Every activity at Bamboo Valley is grounded in educational research. Discover why play, nature, and connection outperform worksheets.",
    image: "/images/Mud-Play.jpg",
    highlight: false,
  },
  {
    slug: "/our-story",
    title: "Built by Parents, for Parents",
    subtitle: "Our story",
    description: "We couldn't find the school we wanted for our children. So we built it. Here's why we believe childhood deserves better.",
    image: "/images/founders-family-bamboo-valley-phuket.jpeg",
    highlight: false,
  },
];

export default function Insights() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d] mb-4">
            Insights
          </h2>
          <p className="text-[#666] max-w-[500px] mx-auto">
            Research and reflections on raising curious, capable children
          </p>
        </div>

        {/* Featured Article - Homework */}
        <Link
          href={insights[0].slug}
          className="block mb-8 group"
        >
          <div className="relative rounded-xl overflow-hidden bg-[#2d5a3d]">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                <span className="text-[#BED7AF] text-sm font-medium uppercase tracking-wide mb-3">
                  {insights[0].subtitle}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-4 group-hover:text-[#BED7AF] transition-colors">
                  {insights[0].title}
                </h3>
                <p className="text-white/80 mb-6">
                  {insights[0].description}
                </p>
                <span className="text-[#BED7AF] font-medium group-hover:underline">
                  Read the research →
                </span>
              </div>
              <div className="relative h-64 md:h-auto order-1 md:order-2">
                <Image
                  src={insights[0].image}
                  alt="Child reading outdoors"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Link>

        {/* Two smaller cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {insights.slice(1).map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className="group block bg-[#FAF9F6] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <span className="text-[#8fb07a] text-sm font-medium uppercase tracking-wide">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-[#2d2d2d] mt-2 mb-3 group-hover:text-[#8fb07a] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[#666] text-sm">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
