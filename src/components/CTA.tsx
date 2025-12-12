import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 md:py-28 px-6 bg-[#BED7AF] text-center">
      <h2 className="font-serif text-4xl md:text-5xl font-normal mb-5 text-[#2d2d2d]">
        See it for yourself
      </h2>
      <p className="text-lg text-[#2d2d2d] opacity-80 mb-10">
        Book a visit and watch what happens when children are free.
      </p>
      <Link
        href="/contact"
        className="btn bg-[#2d2d2d] text-white hover:bg-[#1a1a1a]"
      >
        Schedule a Visit
      </Link>
    </section>
  );
}
