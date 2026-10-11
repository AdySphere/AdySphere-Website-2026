import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Mdx } from "@/components/ui/Mdx";
import { getCaseStudies, getCaseStudy } from "@/lib/content";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  if (!study) return {};
  return {
    title: `${study.meta.title} (case study)`,
    description: study.meta.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <>
      <PageHeader eyebrow={study.meta.industry} title={study.meta.title} intro={study.meta.summary}>
        <dl className="mt-12 grid max-w-4xl gap-6 border-t border-ivory/15 pt-8 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-mist">Scope</dt>
            <dd className="mt-2 text-ivory">{study.meta.scope}</dd>
          </div>
          <div>
            <dt className="text-mist">Modules</dt>
            <dd className="mt-2 text-ivory">{study.meta.modules.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-mist">Outcome</dt>
            <dd className="mt-2 text-ivory">{study.meta.outcome}</dd>
          </div>
        </dl>
      </PageHeader>
      <section className="tone-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Mdx source={study.body} />
        </div>
      </section>
      <NextStep title="Facing something similar?" />
    </>
  );
}
