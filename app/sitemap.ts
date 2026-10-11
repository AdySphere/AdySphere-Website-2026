export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getCaseStudies, getInsights, getResearch, slugify } from "@/lib/content";
import { getCategories } from "@/lib/insights";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/solutions", "/ai-enablement", "/industries", "/case-studies", "/about", "/research", "/insights", "/contact"];

  return [
    ...pages.map((path) => ({ url: `${site.url}${path}`, lastModified: now, priority: path === "" ? 1 : 0.8 })),
    ...getCaseStudies().map((c) => ({ url: `${site.url}/case-studies/${c.slug}`, lastModified: now, priority: 0.6 })),
    ...getResearch()
      .filter((r) => !r.meta.draft)
      .map((r) => ({ url: `${site.url}/research/${r.slug}`, lastModified: new Date(r.meta.date), priority: 0.5 })),
    ...getInsights()
      .filter((p) => !p.meta.draft)
      .map((p) => ({ url: `${site.url}/insights/${p.slug}`, lastModified: new Date(p.meta.date), priority: 0.6 })),
    ...getCategories().map((c) => ({ url: `${site.url}/insights/category/${slugify(c)}`, lastModified: now, priority: 0.4 })),
  ];
}
