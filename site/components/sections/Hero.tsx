"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "/images/hero-1.jpg",
    tab: "They Analyze You",
    headline: "Meet Your Enthusiasts",
    subhead: "They Analyze You",
    copy: "They research every option before committing. They read every review, join every forum, and know your product better than some of your own people. Reach them with credibility or not at all.",
  },
  {
    image: "/images/hero-2.jpg",
    tab: "They Identify With You",
    headline: "Meet Your Enthusiasts",
    subhead: "They Identify With You",
    copy: "They don't just buy your brand — they wear it. They define themselves by what they choose. That's an enormous opportunity, and an enormous responsibility.",
  },
  {
    image: "/images/hero-3.jpg",
    tab: "They Keep You Honest",
    headline: "Meet Your Enthusiasts",
    subhead: "They Keep You Honest",
    copy: "They hold you to your highest standard. When you fall short, they're the first to know and the loudest to say so. When you exceed expectations, they become your most credible advocates.",
  },
  {
    image: "/images/hero-4.jpg",
    tab: "They Stand By You",
    headline: "Meet Your Enthusiasts",
    subhead: "They Stand By You",
    copy: "They are your most loyal customers, your most effective salespeople, and your most important source of feedback. Build the relationship right and they'll carry your brand further than any campaign.",
  },
];

const AUTOPLAY_DELAY = 6000;

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused = useRef(false);

  const startProgress = useCallback(() => {
    setProgress(0);
    if (progressTimer.current) clearInterval(progressTimer.current);
    const step = 100 / (AUTOPLAY_DELAY / 50);
    let current = 0;
    progressTimer.current = setInterval(() => {
      if (paused.current) return;
      current += step;
      setProgress(Math.min(current, 100));
    }, 50);
  }, []);

  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    startProgress();
    autoplayTimer.current = setInterval(() => {
      if (!paused.current) emblaApi?.scrollNext();
    }, AUTOPLAY_DELAY);
  }, [emblaApi, startProgress]);

  const goTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setCurrent(emblaApi.selectedScrollSnap());
      startProgress();
    });
    emblaApi.on("pointerDown", () => { paused.current = true; });
    emblaApi.on("pointerUp", () => {
      paused.current = false;
      startAutoplay();
    });
    startAutoplay();
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [emblaApi, startAutoplay, startProgress]);

  return (
    <section
      className="relative w-full bg-black flex flex-col overflow-hidden"
      aria-label="Hero"
      style={{ minHeight: "556px" }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Embla viewport */}
      <div ref={emblaRef} className="flex-1 overflow-hidden" style={{ minHeight: "556px" }}>
        <div className="flex h-full" style={{ minHeight: "556px" }}>
          {slides.map((slide, i) => (
            <div
              key={slide.image}
              className="relative flex-none w-full"
              style={{ minHeight: "556px" }}
              aria-hidden={i !== current}
            >
              {/* Background image */}
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />

              {/* Content */}
              <div
                className="relative z-10 section-inner flex flex-col justify-center h-full"
                style={{ paddingTop: "80px", paddingBottom: "80px" }}
              >
                <h1
                  className="font-bold uppercase leading-tight tracking-tight max-w-3xl"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", color: "#be6021" }}
                >
                  {slide.headline}
                  <strong className="block font-bold" style={{ color: "#fff" }}>
                    {slide.subhead}
                  </strong>
                </h1>

                <p
                  className="mt-6 max-w-xl font-light leading-loose"
                  style={{ fontSize: "15px", letterSpacing: "0.06em", color: "rgba(228,226,219,0.85)" }}
                >
                  {slide.copy}
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/work"
                    className="inline-block border border-olive text-olive hover:bg-olive hover:text-black transition-colors px-8 py-3 text-sm uppercase tracking-widest font-normal"
                  >
                    View Our Work
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-block border border-cream/30 text-cream/70 hover:border-cream hover:text-cream transition-colors px-8 py-3 text-sm uppercase tracking-widest font-normal"
                  >
                    Start a Conversation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab navigation bar */}
      <div
        className="relative z-10 w-full shrink-0"
        style={{ backgroundColor: "#1a1a1a" }}
        role="tablist"
        aria-label="Slide navigation"
      >
        <div className="section-inner">
          <div className="flex">
            {slides.map((slide, i) => (
              <button
                key={slide.tab}
                role="tab"
                aria-selected={i === current}
                onClick={() => { goTo(i); startAutoplay(); }}
                className="relative flex-1 py-4 text-center transition-colors overflow-hidden"
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  color: i === current ? "#be6021" : "#e4e2db",
                  borderTop: `2px solid ${i === current ? "#be6021" : "transparent"}`,
                }}
              >
                {/* Progress bar for active tab */}
                {i === current && (
                  <span
                    className="absolute bottom-0 left-0 h-[2px] bg-rust/30 transition-none"
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                  />
                )}
                <span className="hidden sm:inline relative z-10">{slide.tab}</span>
                <span className="sm:hidden relative z-10">{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
