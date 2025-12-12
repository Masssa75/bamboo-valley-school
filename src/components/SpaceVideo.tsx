export default function SpaceVideo() {
  return (
    <section className="relative h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/flyover.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-[2]" />

      {/* Content */}
      <div className="relative z-[3] text-center text-white max-w-[800px] px-8">
        <p className="font-serif text-2xl md:text-4xl font-normal leading-relaxed">
          5,600 square meters of palm forest.
          <br />
          Shade to play all day. Space to grow without limits.
        </p>
      </div>
    </section>
  );
}
