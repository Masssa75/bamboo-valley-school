import Link from "next/link";

export default function Camps() {
  return (
    <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d] mb-6">
          Holiday Camps
        </h2>

        <p className="text-lg text-[#666] max-w-[650px] mx-auto mb-8 leading-relaxed">
          Experience Bamboo Valley during school holidays. Our camps offer the same
          nature-immersed, child-led learning—perfect for families wanting to try
          our approach before enrolling, or simply give their children an extraordinary break.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm text-[#666]">
          <span className="px-4 py-2 bg-[#FAF9F6] rounded-full">Christmas Camp</span>
          <span className="px-4 py-2 bg-[#FAF9F6] rounded-full">Winter Camp</span>
          <span className="px-4 py-2 bg-[#FAF9F6] rounded-full">Songkran Camp</span>
          <span className="px-4 py-2 bg-[#FAF9F6] rounded-full">Summer Camp</span>
        </div>

        <a
          href="https://phuketcamp.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Explore Camps
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
    </section>
  );
}
