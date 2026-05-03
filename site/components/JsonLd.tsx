export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Saltworks",
    url: "https://saltworksinc.com",
    logo: "https://saltworksinc.com/images/saltworks-logo.png",
    description:
      "Saltworks is an enthusiast branding and experience design firm. We help brands compete in high-consideration, high-emotion categories.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "437 D Street, Unit 7D",
      addressLocality: "Boston",
      addressRegion: "MA",
      postalCode: "02210",
      addressCountry: "US",
    },
    telephone: "+16175780100",
    foundingDate: "1995",
    areaServed: "US",
    serviceType: [
      "Brand Strategy",
      "Experience Design",
      "Customer Research",
      "Marketing Communications",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CaseStudyJsonLd({
  title,
  client,
  summary,
  url,
}: {
  title: string;
  client: string;
  summary: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: summary,
    author: {
      "@type": "Organization",
      name: "Saltworks",
    },
    publisher: {
      "@type": "Organization",
      name: "Saltworks",
      url: "https://saltworksinc.com",
    },
    about: {
      "@type": "Organization",
      name: client,
    },
    url,
    isPartOf: {
      "@type": "WebSite",
      url: "https://saltworksinc.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
