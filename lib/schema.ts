import { founder, site } from "@/lib/site";

const orgId = `${site.url}/#organization`;
const founderId = `${site.url}/#founder`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": orgId,
  name: site.name,
  alternateName: "AdySphere Co",
  url: site.url,
  logo: `${site.url}/brand/wordmark-light.png`,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  email: site.email,
  telephone: [site.phone, site.phoneUk, site.phoneIn].map((p) => p.replace(/\s/g, "")),
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "GCC" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "India" },
  ],
  founder: {
    "@type": "Person",
    "@id": founderId,
    name: founder.name,
    jobTitle: founder.title,
    sameAs: [founder.linkedin],
  },
  sameAs: [site.linkedin, site.instagram],
  knowsAbout: [
    "AI enablement",
    "AI agents",
    "Microsoft Copilot",
    "Copilot Studio",
    "ChatGPT for business",
    "Google Gemini for business",
    "Microsoft Dynamics 365",
    "Microsoft Dynamics 365 Project Operations",
    "Microsoft Dynamics 365 Finance and Operations",
    "Microsoft Dynamics 365 Business Central",
    "Microsoft Power Platform",
    "Power BI",
    "Process automation",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "AI enablement",
      description:
        "Setting up AI agents on a company's existing tools (Copilot, ChatGPT, Gemini, Microsoft 365, Microsoft Dynamics 365, SAP) so teams save time and make faster decisions. Most teams are running in two to three weeks.",
      provider: { "@id": orgId },
      areaServed: "AE",
    },
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": orgId },
};

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": founderId,
  name: founder.name,
  jobTitle: founder.title,
  worksFor: { "@id": orgId },
  ...(founder.linkedin ? { sameAs: [founder.linkedin] } : {}),
};

export function articleSchema(post: { title: string; description: string; date: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: post.url,
    author: { "@id": founderId, "@type": "Person", name: founder.name },
    publisher: { "@id": orgId, "@type": "Organization", name: site.name },
  };
}
