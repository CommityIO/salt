export default function AboutSection() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="about-heading">
      <div className="section-inner">
        <p className="section-label mb-6">About</p>
        <h2 id="about-heading" className="sr-only">About Saltworks</h2>

        <div className="max-w-3xl">
          <p className="text-cream text-2xl md:text-3xl font-light leading-relaxed">
            Saltworks is a strategic branding and experience design consultancy.
            Our expertise is in both the science and art of building relationships
            with&nbsp;<em className="not-italic text-rust">enthusiast customers</em>.
          </p>

          <p className="mt-8 text-muted text-base font-light leading-loose">
            An enthusiast customer is looking to make a commitment to a brand in a category they
            care about. These decisions involve high levels of both consideration and emotion —
            functionality, longevity, and value on one side; trust, identity, pride, and fear on
            the other. Navigating that combination is what we do.
          </p>

          <p className="mt-4 text-muted text-base font-light leading-loose">
            Since 1995, we&rsquo;ve helped brands in aviation, boating, outdoor, music, education,
            travel, and finance understand what their most valuable customers are actually choosing
            — and why. That understanding is the foundation of everything we build.
          </p>
        </div>
      </div>
    </section>
  );
}
