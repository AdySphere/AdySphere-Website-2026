import type { ResearchStatus } from "@/lib/content";

const styles: Record<ResearchStatus, string> = {
  Exploring: "border-mist/40 text-mist",
  Active: "border-teal/60 text-teal",
  Published: "border-ivory/60 text-ivory",
};

export function StatusTag({ status, draft }: { status: ResearchStatus; draft?: boolean }) {
  return (
    <span className="flex flex-wrap gap-2">
      <span className={`border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] ${styles[status]}`}>
        {status}
      </span>
      {draft && (
        <span className="border border-dashed border-mist/50 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-mist">
          Draft
        </span>
      )}
    </span>
  );
}
