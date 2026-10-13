import Link from "next/link";
import { bookCta } from "@/lib/site";

/** Keeps "X-Ray" on one line; browsers otherwise break at the hyphen. */
function keepXRay(text: string) {
  return text.split(/(X-Ray\S*)/).map((part, i) =>
    part.startsWith("X-Ray") ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** The closing band every page ends with: one clear next step. */
export function NextStep({
  title = "Start with a Business X-Ray.",
  body = "An affordable, department-by-department diagnostic of how your business runs today, with a written report and a prioritised roadmap.",
  href = bookCta.href,
  label = bookCta.label,
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="tone-gradient">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:py-24 lg:px-8">
        <div>
          <h2 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">{keepXRay(title)}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-ivory-dim">{body}</p>
        </div>
        <Link href={href} className="btn-primary self-start md:self-end">
          {label}
        </Link>
      </div>
    </section>
  );
}
