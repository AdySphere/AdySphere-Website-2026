import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Mdx } from "@/components/ui/Mdx";
import { Reveal } from "@/components/ui/Reveal";
import { StageTimeline } from "@/components/case-studies/StageTimeline";
import { stages } from "@/components/case-studies/stages";
import { StatusBadge } from "@/components/case-studies/StatusBadge";
import { getCaseStudies, getCaseStudy } from "@/lib/content";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.meta.title} (${study.meta.industry} case study)`,
    description: study.meta.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const { meta } = study;
  const delivered = meta.status === "Delivered";

  return (
    <>
      <PageHeader eyebrow={meta.industry} title={meta.title} intro={meta.summary}>
        <div className="mt-6">
          <StatusBadge status={meta.status} />
        </div>
        <dl className="mt-12 grid max-w-5xl gap-6 border-t border-ivory/15 pt-8 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-mist">Platforms</dt>
            <dd className="mt-2 text-ivory">{meta.modules.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-mist">AI built on</dt>
            <dd className="mt-2 text-ivory">{meta.aiStack}</dd>
          </div>
          <div>
            <dt className="text-mist">{delivered ? "Outcome" : "Aim"}</dt>
            <dd className="mt-2 text-ivory">{meta.outcome}</dd>
          </div>
        </dl>
      </PageHeader>

      <section className="tone-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">The situation.</h2>
          <div className="max-w-2xl text-lg">
            <Mdx source={study.body} />
          </div>
        </div>
      </section>

      <section className="tone-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            {delivered ? "How we got there." : "How we are getting there."}
          </h2>
          <div className="mt-14">
            <StageTimeline>
              <ol className="grid gap-14 md:gap-20">
                {stages.map((s, i) => {
                  const isAi = s.key === "ai";
                  return (
                    <li key={s.key} className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-8 top-1.5 flex size-[15px] items-center justify-center rounded-full border border-teal/60 bg-navy-900 sm:-left-14 sm:size-[23px]"
                      >
                        <span className="size-[7px] rounded-full bg-teal sm:size-[9px]" />
                      </span>
                      <Reveal className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
                        <div>
                          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">
                            {String(i + 1).padStart(2, "0")} · {s.label}
                          </p>
                          <h3 className="mt-3 font-display text-2xl leading-snug sm:text-3xl">{delivered ? s.title : s.ongoing}</h3>
                          {isAi && (
                            <p className="mt-3 flex items-center gap-2 text-sm text-mist">
                              <Sparkle size={14} weight="fill" className="text-teal" aria-hidden /> {meta.aiStack}
                            </p>
                          )}
                        </div>
                        <ul className={`grid gap-3 p-6 sm:p-8 ${isAi ? "tone-gradient" : "glass"}`}>
                          {meta[s.key].map((item) => (
                            <li key={item} className="flex gap-3 leading-relaxed text-ivory-dim">
                              <Check size={18} className="mt-1 shrink-0 text-teal" aria-hidden />
                              <span className={isAi ? "text-ivory" : undefined}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
            </StageTimeline>
          </div>
        </div>
      </section>

      <section className="tone-space relative overflow-hidden">
        <div aria-hidden className="hero-stars absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <Reveal>
            <p className="eyebrow text-teal">Built for what comes next</p>
            <p className="mt-5 max-w-4xl font-display text-3xl leading-snug tracking-tight sm:text-4xl lg:text-5xl">
              {meta.future}
            </p>
          </Reveal>
        </div>
      </section>

      <NextStep
        title="If you plan ahead, so should your infrastructure."
        body="Start with a Business X-Ray: we find where data and money leak in your business, and what to fix first."
      />
    </>
  );
}
