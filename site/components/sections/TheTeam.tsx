"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

const team = [
  {
    name: "Paul Caldera",
    title: "Brand Integration · Cofounder",
    image: "/images/team/paul-caldera.png",
    bio: "For the past two decades, Paul has helped leading companies in a wide range of enthusiast industries develop strategic design and integrated brand communication programs. In all cases, his work has had a positive and measurable impact on his clients' business performance.",
    enthusiast: "Tennis, running, Red Sox enthusiast",
    email: "paul@saltworksinc.com",
  },
  {
    name: "Doreen Caldera",
    title: "Brand Design · Cofounder",
    image: "/images/team/doreen-caldera.png",
    bio: "As creative director and enthusiast-branding expert, Doreen works in close collaboration with brand partners to develop targeted branding and identity solutions that motivate enthusiasts to take action. Her work has been consistently recognized in national and international design publications including Graphis, Communication Arts, Print and HOW.",
    enthusiast: "Dark chocolate, urban dwelling + dog enthusiast",
    email: "doreen@saltworksinc.com",
  },
  {
    name: "Christine Bailey",
    title: "Brand Build",
    image: "/images/team/christine-bailey.png",
    bio: "Christine brings a unique blend of design, production and client service skills and expertise to her role at Saltworks. Her brand-building portfolio spans a broad range of enthusiast organizations that include the Phoenix Coyotes Hockey Club, Backroads Active Travel, Boyd Gaming and Ballet Arizona.",
    enthusiast: "Running, yoga, Charity Miles enthusiast",
    email: "christine@saltworksinc.com",
  },
  {
    name: "Carlos Alcala",
    title: "Brand Interactive",
    image: "/images/team/carlos-alcala.png",
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
  const [active, setActive] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback((name: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(name);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActive(null), 150);
  }, []);

  const handlePanelEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
  }, []);

  const activeMember = team.find((m) => m.name === active) ?? null;

  return (
    <section className="py-16 md:py-24" id="team" aria-labelledby="team-heading">
      <div className="section-inner">
        <p className="section-label mb-6">The Team</p>
        <h2 id="team-heading" className="text-olive text-2xl font-light mb-12">
          Leadership
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              onMouseEnter={() => handleEnter(member.name)}
              onMouseLeave={handleLeave}
              className="cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-expanded={active === member.name}
              onFocus={() => handleEnter(member.name)}
              onBlur={handleLeave}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(active === member.name ? null : member.name);
                }
              }}
            >
              {/* Photo */}
              <div
                className="relative w-full aspect-square mb-3 overflow-hidden"
                style={{ backgroundColor: "#1a1a1a" }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-300"
                  style={{
                    filter: active === member.name ? "grayscale(0%)" : "grayscale(100%)",
                    opacity: active === member.name ? 1 : 0.75,
                  }}
                />
              </div>

              <p
                className="text-sm font-normal transition-colors"
                style={{ color: active === member.name ? "#919655" : "#e4e2db" }}
              >
                {member.name}
              </p>
              <p className="text-muted text-xs font-light mt-0.5">{member.title}</p>
            </div>
          ))}
        </div>

        {/* Full-width bio panel */}
        <div
          onMouseEnter={handlePanelEnter}
          onMouseLeave={handleLeave}
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: activeMember ? "300px" : "0px",
            opacity: activeMember ? 1 : 0,
            marginTop: activeMember ? "2rem" : "0",
          }}
          aria-live="polite"
        >
          {activeMember && (
            <div className="border-t border-olive/20 pt-8 pb-4">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <p className="text-cream text-sm font-normal mb-1">{activeMember.name}</p>
                  <p className="text-muted text-xs font-light mb-4">{activeMember.title}</p>
                  <p className="text-muted text-base font-light leading-loose">{activeMember.bio}</p>
                </div>
                <div className="md:w-64 shrink-0">
                  <p className="text-olive/70 text-sm font-light italic mb-3">{activeMember.enthusiast}</p>
                  <a
                    href={`mailto:${activeMember.email}`}
                    className="text-sm text-olive hover:text-rust transition-colors font-normal"
                  >
                    {activeMember.email}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
