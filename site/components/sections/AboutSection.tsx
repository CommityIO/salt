export default function AboutSection() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="about-heading">
      <div className="section-inner">
        <p className="section-label mb-6">About</p>

        <h2 id="about-heading" className="sr-only">About Saltworks</h2>

        <div className="max-w-3xl">
          <p className="text-cream text-2xl md:text-3xl font-light leading-relaxed">
            Saltworks is a branding and experience design firm. We work with companies and organizations
            whose customers face high-consideration, high-emotion decisions — where the choice carries
            personal meaning, risk, and long-term commitment.
          </p>

          <p className="mt-8 text-muted text-base font-light leading-loose">
            Our clients compete in categories where customers don&rsquo;t just buy — they commit.
            Aviation, boating, music, outdoor, education, travel, golf. Industries where brand loyalty
            is earned through trust, not marketing spend.
          </p>

          <p className="mt-4 text-muted text-base font-light leading-loose">
            Since 1995, we&rsquo;ve helped enthusiast brands understand what their most valuable customers
            are actually choosing — and why. That understanding is the foundation of everything we build.
          </p>
        </div>
      </div>
    </section>
  );
}
