import type { Metadata } from "next";
import WhatWeDo from "@/components/sections/WhatWeDo";
import TheTeam from "@/components/sections/TheTeam";

export const metadata: Metadata = {
  title: "About",
  description:
    "Saltworks is a branding and experience design firm, working with enthusiast brands since 1995. Based in Boston.",
};

export default function AboutPage() {
  return (
    <>
      <div className="py-16 md:py-24">
        <div className="section-inner">
          <p className="section-label mb-6">About</p>
          <h1 className="text-cream text-4xl md:text-5xl font-light leading-tight mb-8 max-w-2xl">
            We Work With Brands People Choose With Care
          </h1>

          <div className="max-w-3xl space-y-6 text-muted text-base font-light leading-loose">
            <p>
              Saltworks is a strategic branding and experience design consultancy, founded in 1995.
              Our expertise is in both the science and art of building relationships with enthusiast
              customers — people who are looking to make a commitment to a brand in a category they
              genuinely care about.
            </p>
            <p>
              These decisions involve high levels of both consideration and emotion. Functionality,
              longevity, value, and track record on the rational side. Trust, identity, pride, and
              sometimes fear on the emotional side. Brands that understand how those two forces
              interact at the moment of decision have a significant advantage over those that don&rsquo;t.
            </p>
            <p>
              Our clients come to us when they have a problem they&rsquo;ve been diagnosing from
              the inside. We look at it from the outside — through the eyes of the customers who
              are choosing, or not choosing, their brand right now. The alignment between those two
              perspectives is where the real strategy lives.
            </p>
            <p>
              That process — inside looking out, outside looking in — is the foundation of
              everything we build.
            </p>
          </div>
        </div>
      </div>

      <WhatWeDo />
      <TheTeam />
    </>
  );
}
