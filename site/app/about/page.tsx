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
              Saltworks is a branding and experience design firm. Since 1995, we&rsquo;ve helped
              companies and organizations whose customers face high-consideration, high-emotion
              decisions — where the choice carries personal meaning, risk, and long-term commitment.
            </p>
            <p>
              Our clients compete in categories where customers don&rsquo;t just buy — they commit.
              Aviation, boating, music, outdoor gear, education, travel, golf. Industries where brand
              loyalty is earned through trust, and lost through inattention to the moment of decision.
            </p>
            <p>
              Most growth problems are diagnosed at the wrong altitude. Companies assume they need
              more visibility — more advertising, more features — when the real barrier is closer
              to the moment of decision. We go inside the purchase experience to understand what
              actually drives choice. Not assumptions. Evidence.
            </p>
            <p>
              That process — looking at your brand from the inside out, and your customer from the
              outside in — is the foundation of everything we do.
            </p>
          </div>
        </div>
      </div>

      <WhatWeDo />
      <TheTeam />
    </>
  );
}
