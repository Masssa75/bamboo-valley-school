import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog | Bamboo Valley - Parenting & Education Insights",
  description: "Research-backed insights on child development, nature-based education, and parenting strategies from Bamboo Valley's educators.",
};

// Placeholder for future blog posts - will be replaced with MDX/content layer
const posts = [
  {
    slug: "forest-play-immunity",
    title: "How Forest Play Builds Immunity",
    excerpt: "Research shows children who play in natural environments develop stronger immune systems. Here's the science behind mud play.",
    date: "Coming Soon",
    category: "Health",
  },
  {
    slug: "curiosity-vs-rewards",
    title: "Why Rewards Kill Curiosity",
    excerpt: "The surprising research on how external rewards actually decrease children's intrinsic motivation and creativity.",
    date: "Coming Soon",
    category: "Learning",
  },
  {
    slug: "screen-time-alternatives",
    title: "Screen-Free Activities That Actually Work",
    excerpt: "Practical alternatives to screens that engage children's natural curiosity and creativity.",
    date: "Coming Soon",
    category: "Parenting",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navigation variant="light" />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 bg-[#FAF9F6]">
        <div className="max-w-[800px] mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-normal mb-6 text-[#2d2d2d]">
            Insights
          </h1>
          <p className="text-lg text-[#666] max-w-[600px] mx-auto">
            Research-backed articles on child development, education, and raising
            free-minded, curious, capable children.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-[#FAF9F6] rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Placeholder image */}
                <div className="h-48 bg-gradient-to-br from-[#BED7AF] to-[#8fb07a]" />

                <div className="p-6">
                  <span className="text-xs font-semibold text-[#8fb07a] uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h2 className="font-serif text-xl font-medium mt-2 mb-3 text-[#2d2d2d]">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#666] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-[#999]">{post.date}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Message */}
          <div className="mt-16 text-center py-12 bg-[#FAF9F6] rounded-lg">
            <h3 className="font-serif text-2xl text-[#2d2d2d] mb-4">
              More content coming soon
            </h3>
            <p className="text-[#666] mb-6">
              Follow us on Instagram for daily insights and updates.
            </p>
            <a
              href="https://www.instagram.com/bamboovalleyphuket/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#8fb07a] hover:text-[#6d9b5a] font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @bamboovalleyphuket
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
