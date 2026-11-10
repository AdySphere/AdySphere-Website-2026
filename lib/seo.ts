import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Open Graph tags for a page. A page-level openGraph object replaces the layout's, so every page passes its own
 * path here: og:url then matches the canonical URL, and the shared tags (site name, type, locale) stay.
 * Every page uses the one company description, for the meta description and og:description alike.
 */
export function og(path: string): Metadata["openGraph"] {
  return { type: "website", siteName: site.name, locale: "en_GB", url: path, description: site.description };
}
