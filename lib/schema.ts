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
  telephone: [site.phone, site.phoneUk],
  foundingDate: "2025-09",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "India" },
  ],
  founder: { "@id": founderId },
  sameAs: [site.linkedin, site.instagram],
  knowsAbout: [
    "Microsoft Dynamics 365",
    "Dynamics 365 Project Operations",
    "Dynamics 365 Field Service",
    "Dynamics 365 Customer Service",
    "Dynamics 365 Finance and Operations",
    "Dynamics 365 Business Central",
    "Microsoft Power Platform",
    "Power BI",
    "Copilot Studio",
    "AI enablement",
  ],
};

export const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": founderId,
  name: founder.name,
  jobTitle: founder.title,
  worksFor: { "@id": orgId },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "BITS Pilani" },
    { "@type": "CollegeOrUniversity", name: "Cardiff University" },
  ],
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
