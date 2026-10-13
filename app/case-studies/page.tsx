import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Reveal } from "@/components/ui/Reveal";
import { JourneyLine } from "@/components/case-studies/JourneyLine";
import { stages } from "@/components/case-studies/stages";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies: find the leaks, automate, enable AI",
  description:
    "How businesses in trading and manufacturing, real estate, sustainability, space technology and e-commerce found where data and money leaked, automated their processes and enabled AI.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const studies = getCaseStudies();
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Find the leaks. Fix the flow. Enable AI."
        intro="Every engagement follows the same path, shaped to the industry. Client names and specifics are withheld."
      />

      <section className="tone-ink border-b border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <JourneyLine />
        </div>
      </section>

      <section className="tone-ink">
        <ul className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          {studies.map((study, i) => {
            const lead = i === 0;
            return (
              <li key={study.slug} className={lead ? "md:col-span-2" : undefined}>
                <Reveal delay={lead ? 0 : (i % 2) * 0.08} className="h-full">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className={`spotlight group grid h-full gap-8 border border-ivory/10 p-8 transition-colors duration-300 hover:border-teal/60 sm:p-10 ${
                      lead ? "tone-gradient lg:grid-cols-[1.2fr_0.8fr] lg:gap-16" : "glass"
                    }`}
                  >
                    <div className="flex flex-col">
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal">{study.meta.industry}</p>
                      <h2 className={`mt-4 font-display leading-snug ${lead ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>
                        {study.meta.title}
                      </h2>
                      <p className="mt-4 max-w-xl leading-relaxed text-ivory-dim">{study.meta.summary}</p>
                      <p className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium text-ivory">
                        Read the story
                        <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                    {lead ? (
                      <ol className="grid content-center gap-4 border-t border-ivory/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                        {stages.map((s) => (
                          <li key={s.key}>
                            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal">{s.label}</p>
                            <p className="mt-1 text-sm leading-relaxed text-ivory">{study.meta[s.key][0]}</p>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <p className="border-t border-ivory/10 pt-4 text-sm text-ivory">
                        <span className="text-mist">Outcome: </span>
                        {study.meta.outcome}
                      </p>
                    )}
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </section>

      <NextStep
        title="If you plan ahead, so should your infrastructure."
        body="Start with a Business X-Ray: we find where data and money leak in your business, and what to fix first."
      />
    </>
  );
}
