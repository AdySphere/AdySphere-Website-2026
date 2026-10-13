import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = path.join(process.cwd(), "content");

export type Entry<T> = { slug: string; body: string; meta: T };

function readCollection<T>(collection: string): Entry<T>[] {
  const dir = path.join(root, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return { slug: file.replace(/\.mdx$/, ""), body: content, meta: data as T };
    });
}

const byDateDesc = (a: { meta: { date: string } }, b: { meta: { date: string } }) =>
  new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();

/* Case studies ------------------------------------------------------------ */

export type CaseStudyMeta = {
  title: string;
  industry: string;
  scope: string;
  /** Platforms used. */
  modules: string[];
  /** What the AI layer was built on. */
  aiStack: string;
  /** Qualitative only: no figures until a client approves them. */
  outcome: string;
  summary: string;
  leaks: string[];
  optimise: string[];
  automate: string[];
  ai: string[];
  future: string;
  order: number;
};

export const getCaseStudies = () =>
  readCollection<CaseStudyMeta>("case-studies").sort((a, b) => a.meta.order - b.meta.order);
export const getCaseStudy = (slug: string) => getCaseStudies().find((c) => c.slug === slug);

/* Research (never mixed with insights) ------------------------------------ */

export type ResearchStatus = "Exploring" | "Active" | "Published";

export type ResearchMeta = {
  title: string;
  status: ResearchStatus;
  area: string;
  abstract: string;
  methods: string[];
  links?: { paper?: string; code?: string; data?: string };
  date: string;
  draft?: boolean;
};

export const getResearch = () => readCollection<ResearchMeta>("research").sort(byDateDesc);
export const getResearchProject = (slug: string) => getResearch().find((r) => r.slug === slug);

/* Insights ------------------------------------------------------------------ */

export type InsightMeta = {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  draft?: boolean;
};

export const getInsights = () => readCollection<InsightMeta>("insights").sort(byDateDesc);
export const getInsight = (slug: string) => getInsights().find((p) => p.slug === slug);

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
