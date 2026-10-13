import type { CaseStudyMeta } from "@/lib/content";

/** The path every engagement follows, in order. Stories still in delivery read in the present tense. */
export const stages = [
  { key: "leaks", label: "Identify", title: "Where data and money leaked", ongoing: "Where data and money leak" },
  { key: "optimise", label: "Optimise", title: "What we optimised", ongoing: "What we are optimising" },
  { key: "automate", label: "Automate", title: "What we automated", ongoing: "What we are automating" },
  { key: "ai", label: "Enable AI", title: "Where AI was enabled", ongoing: "Where AI is being enabled" },
] as const satisfies readonly { key: keyof CaseStudyMeta; label: string; title: string; ongoing: string }[];
