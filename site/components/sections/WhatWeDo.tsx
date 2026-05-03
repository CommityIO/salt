import Link from "next/link";

const services = [
  {
    title: "Customer Empathy",
    description:
      "Enthusiast customers are searching for brands they can believe in. We go inside the moment of decision — showrooms, stores, trial points — to understand what actually drives choice. Not assumptions. Evidence.",
    items: ["Ethnographic Research", "Segmentation", "Personas", "Journey Mapping"],
  },
  {
    title: "Brand Strategy",
    description:
      "Your brand must reveal and articulate the spine of your enthusiast story. We help you identify what your brand stands for in the minds of the customers who matter — and what's standing between them and a confident choice.",
    items: ["Brand Positioning", "Messaging", "Visual Expression", "Identity Design"],
  },
  {
    title: "Offer Development",
    description:
      "Enthusiast customers have deeper emotional needs and more complicated rational needs that you need to meet. We help you design offerings that align what you do with what your customers are actually choosing to commit to.",
    items: ["Value Proposition", "Product Development", "Service Design", "Go-to-Market Strategy"],
  },
  {
    title: "Experience Design",
    description:
      "Enthusiast customers are looking for an experience that makes a strong first impression and rewards lifelong loyalty. We design the touchpoints where belief is formed — and where commitment becomes habit.",
    items: ["Website Design", "App Design", "Marketing Communications", "Customer Experiences"],
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-16 md:py-24 bg-olive/10" id="what-we-do" aria-labelledby="services-heading">
      <div className="section-inner">
        <p className="section-label mb-6">What We Do</p>
        <h2 id="services-heading" className="text-olive text-2xl font-light mb-12">
          Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((svc) => (
            <article key={svc.title} className="border-t border-olive/30 pt-6">
              <h3 className="text-cream text-xs uppercase tracking-widest font-normal mb-4">
                {svc.title}
              </h3>
              <p className="text-muted text-sm font-light leading-loose mb-4">
                {svc.description}
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {svc.items.map((item) => (
                  <li key={item} className="text-xs text-olive/70 font-light">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Our Method subsection */}
        <div className="mt-16 pt-12 border-t border-olive/20 max-w-2xl">
          <h3 className="text-cream text-xs uppercase tracking-widest font-normal mb-6">
            Our Method
          </h3>
          <p className="text-muted text-base font-light leading-loose mb-4">
            Most growth problems are diagnosed at the wrong altitude. Companies assume they need
            more visibility — more advertising, more features — when the real barrier is closer
            to the moment of decision.
          </p>
          <p className="text-muted text-base font-light leading-loose mb-6">
            We go inside the purchase experience: talk to buyers mid-consideration, observe what
            happens at retail, understand what creates or destroys confidence at the critical moment.
            Then we fix the right thing.
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
