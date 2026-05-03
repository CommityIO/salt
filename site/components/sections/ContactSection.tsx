"use client";

import { useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Formspree endpoint — replace YOUR_FORM_ID with the actual ID from formspree.io
    const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError(true);
    }
  }

  return (
    <section className="py-16 md:py-24 bg-charcoal" id="contact" aria-labelledby="contact-heading">
      <div className="section-inner">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="section-label mb-6">Contact</p>
            <h2 id="contact-heading" className="text-cream text-3xl font-light leading-snug mb-6">
              Start a Conversation
            </h2>
            <p className="text-muted text-sm font-light leading-loose mb-8">
              If you&rsquo;re building a brand for customers who choose with care, we&rsquo;d like to hear about it.
            </p>

            <address className="not-italic text-muted text-xs font-light leading-loose">
              Seaport Lofts<br />
              437 D Street, Unit 7D<br />
              Boston, MA 02210<br />
              <a href="tel:6175780100" className="text-olive hover:text-rust transition-colors">
                617.578.0100
              </a>
            </address>
          </div>

          <div>
            {submitted ? (
              <div className="py-12">
                <p className="text-olive text-sm font-light">
                  Thank you. We&rsquo;ll be in touch.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div>
                  <label htmlFor="name" className="section-label block mb-2">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-black/40 border border-olive/20 text-cream text-sm font-light px-4 py-3 focus:outline-none focus:border-olive transition-colors placeholder:text-muted/40"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="section-label block mb-2">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-black/40 border border-olive/20 text-cream text-sm font-light px-4 py-3 focus:outline-none focus:border-olive transition-colors placeholder:text-muted/40"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="section-label block mb-2">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full bg-black/40 border border-olive/20 text-cream text-sm font-light px-4 py-3 focus:outline-none focus:border-olive transition-colors placeholder:text-muted/40"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="section-label block mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-black/40 border border-olive/20 text-cream text-sm font-light px-4 py-3 focus:outline-none focus:border-olive transition-colors placeholder:text-muted/40 resize-none"
                    placeholder="Tell us about your brand"
                  />
                </div>

                {error && (
                  <p className="text-rust text-xs font-light">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  className="self-start border border-olive text-olive hover:bg-olive hover:text-black transition-colors px-8 py-3 text-xs uppercase tracking-widest font-normal"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
