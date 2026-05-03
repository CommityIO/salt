import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getWorkBySlug, getAllWork } from "@/lib/content";
import { CaseStudyJsonLd } from "@/components/JsonLd";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const work = await getAllWork();
  return work.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWorkBySlug(slug);
  if (!entry) return {};
  return {
    title: `${entry.client} — ${entry.title}`,
    description: entry.metaDescription || entry.summary,
    openGraph: {
      title: entry.title,
      description: entry.summary,
      images: entry.heroImage ? [entry.heroImage] : [],
    },
  };
}

export default async function WorkEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getWorkBySlug(slug);
  if (!entry) notFound();

  const allWork = await getAllWork();
  const related = allWork.filter((w) => w.slug !== slug).slice(0, 2);

  return (
    <>
    <CaseStudyJsonLd
      title={entry.title}
      client={entry.client}
      summary={entry.summary}
      url={`https://saltworksinc.com/work/${entry.slug}`}
    />
    <article>
      {/* Hero */}
      <div className="relative w-full bg-charcoal" style={{ minHeight: "50vh" }}>
        {entry.heroImage && (
          <Image
            src={entry.heroImage}
            alt={entry.client}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" aria-hidden="true" />
        <div className="relative z-10 section-inner py-20 flex flex-col justify-end" style={{ minHeight: "50vh" }}>
          <p className="text-olive text-xs uppercase tracking-widest font-normal mb-3">
            {entry.client} &middot; {entry.category}
          </p>
          <h1 className="text-cream text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-3xl">
            {entry.title}
          </h1>
          {entry.result && (
            <p className="text-rust text-sm font-light mt-4 tracking-wide">
              {entry.result}
            </p>
          )}
        </div>
      </div>

      {/* Case study body */}
      <div className="section-inner py-16 md:py-24">
        <div className="max-w-2xl">
          {entry.contentHtml && (
            <div
              className="prose-saltworks"
              dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
            />
          )}
        </div>
      </div>

      {/* Related work */}
      {related.length > 0 && (
        <section className="bg-charcoal py-16">
          <div className="section-inner">
            <p className="section-label mb-8">Related Work</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((w) => (
                <Link key={w.slug} href={`/work/${w.slug}`} className="group block border-t border-olive/20 pt-6">
                  <p className="text-olive text-xs uppercase tracking-widest font-normal mb-2">{w.client}</p>
                  <h3 className="text-cream text-lg font-light group-hover:text-olive transition-colors mb-2">
                    {w.title}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-olive group-hover:text-rust transition-colors font-normal">
                    Read &rsaquo;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back nav */}
      <div className="section-inner py-8">
        <Link
          href="/work"
          className="text-xs uppercase tracking-widest text-olive hover:text-rust transition-colors font-normal"
        >
          &larr; All Work
        </Link>
      </div>
    </article>
    </>
  );
}
