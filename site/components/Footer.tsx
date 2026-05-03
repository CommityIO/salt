import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal mt-20">
      <div className="section-inner py-12 flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <p className="text-cream font-light tracking-[0.2em] text-sm uppercase mb-1">Saltworks</p>
          <p className="text-muted text-xs font-light leading-relaxed">
            Enthusiast Branding &amp; Experience Design
          </p>
        </div>

        <address className="not-italic text-xs text-muted font-light leading-loose">
          Seaport Lofts<br />
          437 D Street, Unit 7D<br />
          Boston, MA 02210<br />
          <a href="tel:6175780100" className="text-muted hover:text-cream transition-colors">
            617.578.0100
          </a>
        </address>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          {[
            { href: "/about", label: "About" },
            { href: "/work", label: "Work" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs uppercase tracking-widest text-muted hover:text-cream font-normal transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-black/30">
        <div className="section-inner py-4">
          <p className="text-xs text-muted/60 font-light">
            &copy; {new Date().getFullYear()} Saltworks, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
