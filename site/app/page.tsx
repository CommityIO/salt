import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/AboutSection";
import SelectedWork from "@/components/sections/SelectedWork";
import Clients from "@/components/sections/Clients";
import WhatWeDo from "@/components/sections/WhatWeDo";
import TheTeam from "@/components/sections/TheTeam";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <SelectedWork />
      <Clients />
      <WhatWeDo />
      <TheTeam />
      <ContactSection />
    </>
  );
}
