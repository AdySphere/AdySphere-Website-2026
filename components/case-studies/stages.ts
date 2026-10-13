import type { CaseStudyMeta } from "@/lib/content";

/** The path every engagement follows, in order. */
export const stages = [
  { key: "leaks", label: "Identify", title: "Where data and money leaked" },
  { key: "optimise", label: "Optimise", title: "What we optimised" },
  { key: "automate", label: "Automate", title: "What we automated" },
  { key: "ai", label: "Enable AI", title: "Where AI was enabled" },
] as const satisfies readonly { key: keyof CaseStudyMeta; label: string; title: string }[];
