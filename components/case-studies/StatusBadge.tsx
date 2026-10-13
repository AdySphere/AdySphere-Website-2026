import type { CaseStudyMeta } from "@/lib/content";

export function StatusBadge({ status }: { status: CaseStudyMeta["status"] }) {
  const live = status === "Delivered";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${
        live ? "border-teal/40 text-teal" : "border-ivory/20 text-mist"
      }`}
    >
      <span className={`size-1.5 rounded-full ${live ? "bg-teal" : "animate-pulse bg-mist"}`} aria-hidden />
      {status}
    </span>
  );
}
