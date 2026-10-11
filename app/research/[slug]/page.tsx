import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Mdx } from "@/components/ui/Mdx";
import { StatusTag } from "@/components/research/StatusTag";
import { formatDate, getResearch, getResearchProject } from "@/lib/content";

export function generateStaticParams() {
  return getResearch().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getResearchProject((await params).slug);
  if (!project) return {};
  return {
    title: project.meta.title,
    description: project.meta.abstract,
    alternates: { canonical: `/research/${project.slug}` },
    robots: project.meta.draft ? { index: false } : undefined,
  };
}

export default async function ResearchProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getResearchProject((await params).slug);
  if (!project) notFound();
  const { meta } = project;

  return (
    <div className="tone-space">
      <PageHeader tone="space" eyebrow={meta.area} title={meta.title} intro={meta.abstract}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <StatusTag status={meta.status} draft={meta.draft} />
          <span className="font-mono text-xs text-mist">{formatDate(meta.date)}</span>
          <span className="font-mono text-xs text-mist">methods: {meta.methods.join(" / ")}</span>
        </div>
      </PageHeader>
      <section className="tone-dark border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <Mdx source={project.body} />
          <Link href="/research" className="mt-16 inline-block font-mono text-sm text-teal hover:underline">
            Back to the research lab
          </Link>
        </div>
      </section>
    </div>
  );
}
