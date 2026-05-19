import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";

const roboto = Roboto({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saltworksinc.com"),
  title: {
    default: "Saltworks — Enthusiast Branding & Experience Design",
    template: "%s — Saltworks",
  },
  description:
    "Saltworks helps enthusiast brands build durable relationships with customers making high-consideration, high-emotion choices. Based in Boston.",
  openGraph: {
    siteName: "Saltworks",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <OrganizationJsonLd />
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
