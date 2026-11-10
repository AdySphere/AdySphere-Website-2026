import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { JsonLd } from "@/components/seo/JsonLd";
import { answers } from "@/lib/answers";
import { faqSchema } from "@/lib/schema";
import { og } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "AI Enablement Questions, Answered | AdySphere Co." },
  alternates: { canonical: "/answers" },
  openGraph: og("/answers"),
};

export default function AnswersPage() {
  return (
    <>
      <JsonLd data={faqSchema(answers)} />
      <PageHeader
        eyebrow="Answers"
        title="AI enablement questions, answered"
        intro="Short, straight answers to what UAE leadership teams ask us most about Copilot, AI agents, timelines and cost."
      />
      <section className="tone-ink">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-8">
          <nav aria-label="Questions on this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">On this page</p>
            <ol className="mt-5 grid gap-3 text-sm">
              {answers.map((item, i) => (
                <li key={item.slug} className="grid grid-cols-[2rem_1fr]">
                  <span className="font-mono text-mist">{String(i + 1).padStart(2, "0")}</span>
                  <a href={`#${item.slug}`} className="leading-snug text-ivory-dim transition-colors hover:text-ivory">
                    {item.q}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="divide-y divide-ivory/10 border-y border-ivory/10">
            {answers.map((item) => (
              <article key={item.slug} id={item.slug} className="scroll-mt-28 py-10">
                <h2 className="font-display text-2xl leading-snug sm:text-3xl">{item.q}</h2>
                <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-ivory-dim">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <NextStep />
    </>
  );
}
