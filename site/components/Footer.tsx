import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      <div className="section-inner py-14 flex flex-col md:flex-row justify-between items-start gap-10">
        <div>
          <Image
            src="/images/saltworks-logo.png"
            alt="Saltworks"
            width={480}
            height={65}
            className="w-auto mb-4"
            style={{ height: "clamp(22px, 2.5vw, 32px)", mixBlendMode: "screen", opacity: 0.75 }}
          />
          <p className="text-muted text-sm font-light leading-relaxed">
            Enthusiast Branding &amp; Experience Design
          </p>
        </div>

        <address className="not-italic text-sm text-muted font-light leading-loose">
          Seaport Lofts<br />
          437 D Street, Unit 7D<br />
          Boston, MA 02210<br />
          <a href="tel:6175780100" className="text-muted hover:text-cream transition-colors">
            617.578.0100
          </a>
        </address>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          {[
            { href: "/about", label: "About" },
            { href: "/work", label: "Work" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm uppercase tracking-widest text-muted hover:text-cream font-normal transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-black/30">
        <div className="section-inner py-5">
          <p className="text-sm text-muted/60 font-light">
            &copy; {new Date().getFullYear()} Saltworks, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
