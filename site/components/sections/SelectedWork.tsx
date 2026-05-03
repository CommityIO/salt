import Link from "next/link";
import Image from "next/image";
import { getFeaturedWork } from "@/lib/content";

export default function SelectedWork() {
  const work = getFeaturedWork();

  return (
    <section className="py-16 md:py-24 bg-charcoal" id="work" aria-labelledby="work-heading">
      <div className="section-inner">
        <p className="section-label mb-6">Selected Work</p>
        <h2 id="work-heading" className="text-olive text-2xl font-light mb-12">
          Case Studies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {work.map((entry) => (
            <article key={entry.slug} className="group">
              <Link href={`/work/${entry.slug}`} className="block">
                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/9] bg-black/40 overflow-hidden mb-5">
                  {entry.thumbnailImage ? (
                    <Image
                      src={entry.thumbnailImage}
                      alt={entry.client}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-charcoal/60 flex items-end p-6">
                      <span className="text-olive/40 text-xs uppercase tracking-widest">{entry.client}</span>
                    </div>
                  )}
                </div>

                {/* Meta */}
                <p className="text-olive text-xs uppercase tracking-widest font-normal mb-2">
                  {entry.client}
                </p>
                <h3 className="text-cream text-lg font-light leading-snug mb-3 group-hover:text-olive transition-colors">
                  {entry.title}
                </h3>
                <p className="text-muted text-sm font-light leading-loose mb-4">
                  {entry.summary}
                </p>
                <span className="text-xs uppercase tracking-widest text-olive group-hover:text-rust transition-colors font-normal">
                  Read the Case Study &rsaquo;
                </span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-olive/20 pt-8">
          <Link
            href="/work"
            className="text-xs uppercase tracking-widest text-olive hover:text-rust transition-colors font-normal"
          >
            View All Work &rsaquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
