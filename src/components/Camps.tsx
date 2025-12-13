import Image from "next/image";

export default function Camps() {
  return (
    <section className="py-28 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-[900px] mx-auto">
        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="text-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/camp-little-kids.jpg"
                alt="Young children at camp"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-serif text-xl text-[#2d2d2d]">Ages 3–6</h3>
            <p className="text-sm text-[#666]">Play, creativity & gentle adventures</p>
          </div>
          <div className="text-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/camp-elephants.jpg"
                alt="Children on field trip with elephants"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-serif text-xl text-[#2d2d2d]">Ages 7–12</h3>
            <p className="text-sm text-[#666]">Field trips, beach days & exploration</p>
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-[700px] mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#2d2d2d] mb-6">
            Holiday Camps
          </h2>

          <p className="text-lg text-[#666] max-w-[650px] mx-auto mb-10 leading-relaxed">
            Experience Bamboo Valley during school holidays. Our camps offer the same
            nature-immersed, child-led learning—perfect for families wanting to try
            our approach before enrolling, or simply give their children an extraordinary break.
          </p>

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
      </div>
    </section>
  );
}
