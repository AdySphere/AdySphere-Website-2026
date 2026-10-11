import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getCaseStudies } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Proof() {
  const [lead, ...rest] = getCaseStudies().slice(0, 3);
  if (!lead) return null;

  return (
    <section className="tone-dark">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="eyebrow text-teal">Proof</p>
        <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          Delivered in production, across industries.
        </h2>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:grid-rows-2">
          <Reveal className="md:row-span-2">
            <CaseCard study={lead} large />
          </Reveal>
          {rest.map((study, i) => (
            <Reveal key={study.slug} delay={(i + 1) * 0.08}>
              <CaseCard study={study} />
            </Reveal>
          ))}
        </div>

        <Link
          href="/case-studies"
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ivory underline-offset-4 hover:underline"
        >
          All case studies <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}

function CaseCard({ study, large = false }: { study: ReturnType<typeof getCaseStudies>[number]; large?: boolean }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={`group flex h-full flex-col justify-between border border-ivory/10 p-7 transition-colors duration-300 hover:border-teal/60 sm:p-9 ${
        large ? "tone-gradient min-h-[22rem]" : "bg-navy-800"
      }`}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal">{study.meta.industry}</p>
        <h3 className={`mt-4 font-serif leading-snug text-ivory ${large ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {study.meta.title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory-dim">{study.meta.scope}</p>
      </div>
      <p className="mt-8 border-t border-ivory/15 pt-4 text-sm text-ivory">
        <span className="text-mist">Outcome: </span>
        {study.meta.outcome}
      </p>
    </Link>
  );
}
