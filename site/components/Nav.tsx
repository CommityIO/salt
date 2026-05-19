"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full px-8 py-4 flex items-center justify-between relative z-50">
      <div className="max-w-[1076px] w-full mx-auto flex items-center justify-between">
        <Link href="/" className="block" aria-label="Saltworks — Home">
          <Image
            src="/images/saltworks-logo.png"
            alt="Saltworks"
            width={480}
            height={65}
            className="w-auto"
            style={{ height: "clamp(36px, 4.5vw, 52px)", mixBlendMode: "screen" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm uppercase tracking-widest font-normal transition-colors ${
                pathname === href || pathname.startsWith(href + "/")
                  ? "text-olive"
                  : "text-cream hover:text-olive"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-cream p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile primary"
          className="absolute top-full left-0 right-0 bg-black border-t border-charcoal py-6 px-8 flex flex-col gap-5 md:hidden"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-base uppercase tracking-widest font-normal ${
                pathname === href ? "text-olive" : "text-cream"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
