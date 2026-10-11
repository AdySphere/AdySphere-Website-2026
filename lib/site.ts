export const site = {
  name: "AdySphere Co.",
  url: "https://adysphere.com",
  email: "mallicka@adysphere.com",
  phone: "+971 58 532 3522",
  phoneHref: "tel:+971585323522",
  location: "Dubai, UAE",
  linkedin: "https://www.linkedin.com/company/adysphere-co",
  instagram: "https://www.instagram.com/adysphere/",
  positioning:
    "We implement Dynamics 365 and Power Platform properly — then build an AI Brain on top, so your departments stop working blind.",
} as const;

export const nav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/ai-brain", label: "AI Brain" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/research", label: "Research" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

/** One label for the booking intent, used everywhere. */
export const bookCta = { href: "/contact", label: "Book a Business X-Ray" } as const;

export const lobes = ["Projects", "Finance", "Sales", "Service", "Supply Chain"] as const;
