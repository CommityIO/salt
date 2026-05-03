"use client";

import { useState } from "react";
import Image from "next/image";

const team = [
  {
    name: "Paul Caldera",
    title: "Brand Integration · Cofounder",
    image: "/images/team/paul-caldera.jpg",
    bio: "For the past two decades, Paul has helped leading companies in a wide range of enthusiast industries develop strategic design and integrated brand communication programs. In all cases, his work has had a positive and measurable impact on his clients' business performance.",
    enthusiast: "Tennis, running, Red Sox enthusiast",
    email: "paul@saltworksinc.com",
  },
  {
    name: "Doreen Caldera",
    title: "Brand Design · Cofounder",
    image: "/images/team/doreen-caldera.jpg",
    bio: "As creative director and enthusiast-branding expert, Doreen works in close collaboration with brand partners to develop targeted branding and identity solutions that motivate enthusiasts to take action. Her work has been consistently recognized in national and international design publications including Graphis, Communication Arts, Print and HOW.",
    enthusiast: "Dark chocolate, urban dwelling + dog enthusiast",
    email: "doreen@saltworksinc.com",
  },
  {
    name: "Christine Bailey",
    title: "Brand Build",
    image: "/images/team/christine-bailey.jpg",
    bio: "Christine brings a unique blend of design, production and client service skills and expertise to her role at Saltworks. Her brand-building portfolio spans a broad range of enthusiast organizations that include the Phoenix Coyotes Hockey Club, Backroads Active Travel, Boyd Gaming and Ballet Arizona.",
    enthusiast: "Running, yoga, Charity Miles enthusiast",
    email: "christine@saltworksinc.com",
  },
  {
    name: "Carlos Alcala",
    title: "Brand Interactive",
    image: "/images/team/carlos-alcala.jpg",
    bio: "Carlos has more than 25 years of experience developing integrated branding, interactive, and social programs for enthusiast audiences. He works closely with project teams throughout the different phases of each engagement to ensure that design, content and technical development align with both client and user goals.",
    enthusiast: "Wine, music, travel enthusiast",
    email: "carlos@saltworksinc.com",
  },
  {
    name: "Drake Pusey",
    title: "Brand Ecosystems",
    image: "/images/team/drake-pusey.jpg",
    bio: "Drake enables brands to achieve sustainable differentiation by proactively empowering customers. By developing strategic alignment between brand, customer experience, and product development, he can turn what is often a zero-sum game into a win-win situation.",
    enthusiast: "Bushido, exploration, and wildlife enthusiast",
    email: "drake@saltworksinc.com",
  },
  {
    name: "Katie Karatzas",
    title: "Brand Experience",
    image: "/images/team/katie-karatzas.jpg",
    bio: "Katie has a strong foundation anchored in ethnographic research and product innovation. Her superpowers include the ability to translate data from qualitative research into effective tools for design and sift through complex information to quickly present a clear and concise point of view.",
    enthusiast: "Gardening, cooking and painting enthusiast",
    email: "katie@saltworksinc.com",
  },
];

export default function TheTeam() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24" id="team" aria-labelledby="team-heading">
      <div className="section-inner">
        <p className="section-label mb-6">The Team</p>
        <h2 id="team-heading" className="text-olive text-2xl font-light mb-12">
          Leadership
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {team.map((member) => (
            <div key={member.name}>
              <button
                onClick={() =>
                  setExpanded(expanded === member.name ? null : member.name)
                }
                className="w-full text-left group"
                aria-expanded={expanded === member.name}
              >
                {/* Photo */}
                <div className="relative w-full aspect-square bg-charcoal mb-3 overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-charcoal" />
                  )}
                </div>

                <p className="text-cream text-xs font-normal group-hover:text-olive transition-colors">
                  {member.name}
                </p>
                <p className="text-muted text-xs font-light mt-0.5">{member.title}</p>
              </button>

              {/* Bio — expands on click/tap */}
              {expanded === member.name && (
                <div className="mt-4 col-span-full">
                  <p className="text-muted text-sm font-light leading-loose">{member.bio}</p>
                  <p className="text-olive/60 text-xs font-light mt-2 italic">{member.enthusiast}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-olive hover:text-rust transition-colors mt-2 block font-normal"
                  >
                    {member.email}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
