import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Saltworks. We work with enthusiast brands in Boston and nationally.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 bg-charcoal">
      <ContactSection />
    </div>
  );
}
