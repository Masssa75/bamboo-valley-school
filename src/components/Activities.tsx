"use client";

import Image from "next/image";

const activities = [
  {
    title: "Free Play",
    subtitle: "Where creativity leads",
    image: "/images/Free-Play.jpeg",
    science: "Children in autonomy-supportive environments show higher creativity, deeper learning, and stronger intrinsic motivation than those in reward-based settings.",
  },
  {
    title: "Animal Care",
    subtitle: "Where kindness grows",
    image: "/images/Animal-Care.jpg",
    science: "Children who care for animals develop stronger empathy that transfers to humans. Having responsibility for another living being builds moral reasoning.",
  },
  {
    title: "Mud Play",
    subtitle: "Where immunity is built",
    image: "/images/Mud-Play.jpg",
    science: "Within one month, children playing in forest soil show improved immune responses. One gram of soil contains 10 billion microorganisms that train the immune system.",
  },
  {
    title: "Baking",
    subtitle: "Where math becomes delicious",
    image: "/images/Baking.jpeg",
    science: "Baking naturally teaches math concepts like measuring, fractions, and sequencing. Children develop patience, follow multi-step instructions, and experience the reward of creating something tangible.",
  },
  {
    title: "Yoga, Meditation & Sound Healing",
    subtitle: "Where stillness speaks",
    image: "/images/Sound-Healing.jpg",
    science: "Mindfulness practices in children improve attention, emotional regulation, and reduce anxiety. Even brief meditation sessions enhance focus and self-awareness.",
  },
  {
    title: "Storytelling",
    subtitle: "Where memories stick",
    image: "/images/Storytelling.jpeg",
    science: "Stories connect content with emotion, storing memories in more brain locations. Children retain learning better and transfer it to real-life contexts.",
  },
  {
    title: "Gardening",
    subtitle: "Where patience takes root",
    image: "/images/Gardening.jpeg",
    science: "A meta-analysis of 50 studies shows garden-based learning increases academic outcomes, particularly in math. Children also develop responsibility and teamwork.",
  },
  {
    title: "Playful Phonics",
    subtitle: "Where reading begins",
    image: "/images/Playful-Phonics.JPG",
    science: "Play-based phonics instruction builds stronger foundations than drill-based methods. Children develop phonemic awareness naturally through songs, games, and storytelling.",
  },
  {
    title: "Art",
    subtitle: "Where expression flows",
    image: "/images/Painting.jpeg",
    science: "Art activities develop fine motor skills, emotional expression, and creative thinking. Process-focused art builds confidence and self-expression without judgment.",
  },
];

export default function Activities() {
  return (
    <section id="programs" className="py-28 md:py-32 px-6 md:px-12 bg-[#FAF9F6]">
      <div className="text-center max-w-[600px] mx-auto mb-16">
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d]">
          A Day at Bamboo Valley
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="activity-card relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
          >
            {/* Image */}
            <div className="card-image absolute inset-0 transition-transform duration-400">
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Base Content (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white z-[2]">
              <h3 className="font-serif text-2xl md:text-3xl font-medium mb-1">
                {activity.title}
              </h3>
              <p className="text-sm opacity-80">{activity.subtitle}</p>
            </div>

            {/* Hover Content */}
            <div className="hover-content absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-[#BED7AF] text-[#2d2d2d] z-[3]">
              <h3 className="font-serif text-2xl font-medium mb-3 text-[#2d2d2d]">
                {activity.title}
              </h3>
              <p className="text-sm leading-relaxed">{activity.science}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
