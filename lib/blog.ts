import { getPosts, slugify } from "@/lib/content";

export const getCategories = () => [...new Set(getPosts().map((p) => p.meta.category))].sort();
export const getTags = () => [...new Set(getPosts().flatMap((p) => p.meta.tags))].sort();
export const categoryFromSlug = (slug: string) => getCategories().find((c) => slugify(c) === slug);
export const tagFromSlug = (slug: string) => getTags().find((t) => slugify(t) === slug);
