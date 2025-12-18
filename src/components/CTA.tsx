import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 md:py-28 px-6 bg-[#BED7AF] text-center">
      <h2 className="font-serif text-4xl md:text-5xl font-normal mb-5 text-[#2d2d2d]">
        Questions? Just ask.
      </h2>
      <p className="text-lg text-[#2d2d2d] opacity-80 mb-10">
        We love chatting with parents. No pressure, just honest answers.
      </p>
      <a
        href="https://wa.me/66989124218?text=Hi!%20I'd%20like%20to%20learn%20more%20about%20Bamboo%20Valley."
        target="_blank"
        rel="noopener noreferrer"
        className="btn bg-[#2d2d2d] text-white hover:bg-[#1a1a1a]"
      >
        Chat on WhatsApp
      </a>
      <p className="mt-6 text-sm text-[#2d2d2d] opacity-60">
        or <Link href="/contact" className="underline hover:opacity-100">schedule a visit</Link>
      </p>
    </section>
  );
}
