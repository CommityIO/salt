import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Saltworks case studies — how we help enthusiast brands find and keep the customers who matter most.",
};

export default async function WorkPage() {
  const work = await getAllWork();

  return (
    <div className="py-16 md:py-24">
      <div className="section-inner">
        <p className="section-label mb-6">Selected Work</p>
        <h1 className="text-cream text-4xl md:text-5xl font-light mb-4">
          Case Studies
        </h1>
        <p className="text-muted text-base font-light leading-loose mb-16 max-w-xl">
          Every engagement begins with the same question: what are your customers actually deciding — and why?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {work.map((entry) => (
            <article key={entry.slug} className="group border-t border-olive/20 pt-8">
              <Link href={`/work/${entry.slug}`} className="block">
                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/9] bg-charcoal overflow-hidden mb-5">
                  {entry.thumbnailImage && (
                    <Image
                      src={entry.thumbnailImage}
                      alt={entry.client}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <p className="text-olive text-xs uppercase tracking-widest font-normal mb-2">
                  {entry.client} &middot; {entry.category}
                </p>
                <h2 className="text-cream text-xl font-light leading-snug mb-3 group-hover:text-olive transition-colors">
                  {entry.title}
                </h2>
                <p className="text-muted text-sm font-light leading-loose mb-4">
                  {entry.summary}
                </p>
                {entry.result && (
                  <p className="text-rust text-xs font-light tracking-wide mb-4">
                    {entry.result}
                  </p>
                )}
                <span className="text-xs uppercase tracking-widest text-olive group-hover:text-rust transition-colors font-normal">
                  Read the Case Study &rsaquo;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
