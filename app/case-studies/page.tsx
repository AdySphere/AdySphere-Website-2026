import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Reveal } from "@/components/ui/Reveal";
import { getCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies: Dynamics 365 delivered in the UAE",
  description:
    "Anonymised case studies of Dynamics 365 Project Operations, Field Service, Customer Service, Finance & Operations and Customer Engagement implementations.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  const studies = getCaseStudies();
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Work delivered, described plainly."
        intro="Client names are withheld. Industries, scope and outcomes are real, and we only publish results our clients have confirmed."
      />
      <section className="tone-ink">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          {studies.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/case-studies/${study.slug}`}
                className={`spotlight group flex h-full flex-col justify-between p-8 transition-colors sm:p-10 ${
                  i % 3 === 0 ? "tone-dark hover:bg-navy-800" : "glass hover:bg-navy-800"
                }`}
              >
                <div>
                  <p className={`font-mono text-xs uppercase tracking-[0.14em] ${i % 3 === 0 ? "text-teal" : "text-teal"}`}>
                    {study.meta.industry}
                  </p>
                  <h2 className="mt-4 font-display text-3xl leading-snug">{study.meta.title}</h2>
                  <p className={`mt-4 leading-relaxed ${i % 3 === 0 ? "text-ivory-dim" : "text-ivory-dim"}`}>{study.meta.summary}</p>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <ul className="flex flex-wrap gap-2">
                    {study.meta.modules.map((m) => (
                      <li
                        key={m}
                        className={`border px-2.5 py-1 text-xs ${i % 3 === 0 ? "border-ivory/20 text-ivory-dim" : "border-ivory/10 text-ivory-dim"}`}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                  <ArrowRight size={20} aria-hidden className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <NextStep />
    </>
  );
}
