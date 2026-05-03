import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      aria-label="Hero"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* Background image — add your hero image to /public/images/hero.jpg */}
      <div
        className="absolute inset-0 bg-charcoal/40"
        aria-hidden="true"
        style={{
          backgroundImage: "url(/images/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 section-inner flex flex-col justify-center py-32 min-h-[inherit]"
        style={{ minHeight: "calc(100vh - 80px)" }}>
        <h1 className="text-rust text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-tight tracking-tight max-w-3xl">
          Where Enthusiast Brands
          <strong className="text-cream block font-bold">Find Their Following</strong>
        </h1>

        <p className="mt-6 text-cream/80 text-sm tracking-widest max-w-xl font-light leading-loose">
          Branding and experience design for brands people choose with care — and commit to for the long term.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/work"
            className="inline-block border border-olive text-olive hover:bg-olive hover:text-black transition-colors px-8 py-3 text-xs uppercase tracking-widest font-normal"
          >
            View Our Work
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-cream/30 text-cream/70 hover:border-cream hover:text-cream transition-colors px-8 py-3 text-xs uppercase tracking-widest font-normal"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
