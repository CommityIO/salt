import Link from "next/link";

const outcomes = [
  {
    quadrant: "Successful",
    condition: "They chose you for the right reasons.",
    symptom: "You're the category leader — but challenger brands are becoming an increasing threat.",
    offering: "Experience Design & Service Innovation",
    description:
      "Maintain your competitive edge, deepen loyalty, and increase customer lifetime value.",
  },
  {
    quadrant: "Failed",
    condition: "They chose your competition for the wrong reasons.",
    symptom:
      "You aren't getting the consideration you deserve, while dominant brands get unwarranted market share.",
    offering: "Branding & Communications",
    description:
      "Differentiate your brand, communicate your offerings compellingly, and streamline the path to consideration.",
  },
  {
    quadrant: "Risky",
    condition: "They chose you for the wrong reasons.",
    symptom:
      "Customers are abandoning your brand with negative emotions, reviews, and word of mouth.",
    offering: "Customer Expectation & Experience Alignment",
    description:
      "Fix misconceptions, improve retention, and prevent the reputation damage that follows a broken promise.",
  },
  {
    quadrant: "Fair",
    condition: "They chose your competition for the right reasons.",
    symptom:
      "You find yourself wanting to copy your competition, because they offer something different.",
    offering: "Brand Positioning & Target Audience Calibration",
    description:
      "Stop chasing the wrong customers. Focus your efforts on the buyers you can actually win — and keep.",
  },
];

const phases = [
  {
    number: "01",
    name: "Alignment",
    subtitle: "What you know and what's missing",
    description:
      "We consolidate the inside-looking-out perspective. Internal stakeholders are heard. We identify what agreements and disagreements exist, and what unknowns need to be addressed before research begins.",
    output: "You know what questions customer research needs to answer.",
  },
  {
    number: "02",
    name: "Insight",
    subtitle: "What we learned and what it means",
    description:
      "We gather the outside-looking-in perspective. We observe and listen to customers at the moment of decision — finding the answers we need, and the unexpected insights we didn't know to look for.",
    output: "You can make better decisions informed by the actual voice of the customer.",
  },
  {
    number: "03",
    name: "Roadmap",
    subtitle: "What to do and how to do it",
    description:
      "We align the two perspectives to triangulate the truth of the situation. We develop strategies to address it and articulate those strategies as a roadmap of actionable steps.",
    output: "You have a concrete action plan to address your real challenge.",
  },
  {
    number: "04",
    name: "Execution",
    subtitle: "From plan to reality",
    description:
      "We build out the system for differentiation — implementing changes across a customized ecosystem of communications and experiences. We are channel- and technology-agnostic.",
    output: "You have new programs to grow and optimize.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24" id="what-we-do" aria-labelledby="services-heading">
      <div className="section-inner">
        <p className="section-label mb-6">What We Do</p>
        <h2 id="services-heading" className="text-cream text-3xl md:text-4xl font-light leading-snug mb-6 max-w-2xl">
          Difficult buying decisions can end four different ways.
        </h2>
        <p className="text-muted text-base font-light leading-loose mb-16 max-w-2xl">
          We've helped in all of them. Which situation your brand is in determines which kind of
          work will actually move the needle.
        </p>

        {/* 2×2 Outcome Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-olive/10 border border-olive/10 mb-24">
          {outcomes.map((o) => (
            <article
              key={o.quadrant}
              className="bg-black p-8 border border-olive/10"
            >
              <p className="text-rust text-xs uppercase tracking-widest font-normal mb-3">
                {o.quadrant}
              </p>
              <p className="text-muted text-xs font-light italic mb-5 leading-relaxed">
                {o.condition}
              </p>
              <p className="text-cream/50 text-xs font-light leading-loose mb-5">
                {o.symptom}
              </p>
              <h3 className="text-olive text-sm font-normal mb-2">
                {o.offering}
              </h3>
              <p className="text-muted text-xs font-light leading-relaxed">
                {o.description}
              </p>
            </article>
          ))}
        </div>

        {/* 4-Phase Process */}
        <div className="border-t border-olive/20 pt-16">
          <h2 className="text-cream text-2xl font-light mb-4">Our Approach</h2>
          <p className="text-muted text-base font-light leading-loose mb-12 max-w-2xl">
            Each phase yields standalone value. You can engage at any stage — and build from there.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {phases.map((phase) => (
              <article key={phase.number} className="border-t-2 border-olive pt-6">
                <p className="text-olive/40 text-xs font-light mb-1 tracking-widest">
                  Phase {phase.number}
                </p>
                <h3 className="text-cream text-lg font-light mb-1">{phase.name}</h3>
                <p className="text-muted text-xs italic font-light mb-4">{phase.subtitle}</p>
                <p className="text-muted text-xs font-light leading-loose mb-4">
                  {phase.description}
                </p>
                <p className="text-olive/70 text-xs font-light leading-relaxed border-l border-olive/30 pl-3">
                  {phase.output}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Method callout */}
        <div className="mt-16 pt-12 border-t border-olive/20 max-w-2xl">
          <h3 className="text-cream text-xs uppercase tracking-widest font-normal mb-6">
            The Core Question
          </h3>
          <p className="text-cream text-xl font-light leading-relaxed mb-4">
            &ldquo;If we only knew __________, we would be able to __________.&rdquo;
          </p>
          <p className="text-muted text-sm font-light leading-loose mb-6">
            Every engagement begins by filling in that sentence honestly. Gathering the outside-looking-in
            perspective — what your customers actually experience at the moment of decision — is where
            the real work starts.
          </p>
          <div className="flex gap-6 flex-wrap">
            <Link
              href="/work/parker-guitars"
              className="text-xs uppercase tracking-widest text-olive hover:text-rust transition-colors font-normal"
            >
              Parker Guitars &rsaquo;
            </Link>
            <Link
              href="/work/grand-banks-yachts"
              className="text-xs uppercase tracking-widest text-olive hover:text-rust transition-colors font-normal"
            >
              Grand Banks Yachts &rsaquo;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
