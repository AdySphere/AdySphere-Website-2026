import type { Metadata } from "next";
import Link from "next/link";
import { Check, Plus } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs, modules, offers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Solutions: Business X-Ray, Dynamics 365 and AI Enablement",
  description:
    "Business X-Ray diagnostics, Dynamics 365 and Power Platform implementation, and AI Enablement for UAE businesses, from a Dubai-based Microsoft AI Cloud Partner.",
  alternates: { canonical: "/solutions" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHeader
        eyebrow="Solutions"
        title="Diagnose. Implement. Enable AI."
        intro="Three offers, one journey. Each one stands on its own, and each one makes the next one work better."
      />

      {offers.map((offer, i) => {
        const dark = i % 2 === 1;
        return (
          <section key={offer.slug} id={offer.slug} className={`${dark ? "tone-dark" : "tone-ink"} scroll-mt-20`}>
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
              <div>
                <p className={`font-mono text-xs uppercase tracking-[0.16em] ${dark ? "text-teal" : "text-teal"}`}>
                  {offer.step}
                </p>
                <h2 className="mt-3 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">{offer.name}</h2>
                <p className={`mt-6 max-w-lg text-lg leading-relaxed ${dark ? "text-ivory-dim" : "text-ivory-dim"}`}>
                  {offer.summary}
                </p>
                {offer.slug === "ai-enablement" && (
                  <Link href="/ai-enablement" className="btn-primary mt-8">
                    How AI Enablement works
                  </Link>
                )}
              </div>
              <dl className="grid gap-8">
                <div>
                  <dt className="font-medium">Who it&rsquo;s for</dt>
                  <dd className={`mt-2 leading-relaxed ${dark ? "text-ivory-dim" : "text-ivory-dim"}`}>{offer.forWho}</dd>
                </div>
                <div>
                  <dt className="font-medium">What&rsquo;s included</dt>
                  <dd className="mt-3">
                    <ul className="grid gap-2.5">
                      {offer.included.map((item) => (
                        <li key={item} className={`flex gap-3 leading-relaxed ${dark ? "text-ivory-dim" : "text-ivory-dim"}`}>
                          <Check size={18} className={`mt-1 shrink-0 ${dark ? "text-teal" : "text-teal"}`} aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">How it starts</dt>
                  <dd className={`mt-2 leading-relaxed ${dark ? "text-ivory-dim" : "text-ivory-dim"}`}>{offer.starts}</dd>
                </div>
              </dl>
            </div>
          </section>
        );
      })}

      <section className="tone-ink border-t border-ivory/10" id="modules">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            The Dynamics 365 modules we implement.
          </h2>
          <ul className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => (
              <li key={m.name} className={`spotlight flex flex-col p-7 ${i === 0 ? "tone-dark" : "bg-navy-950"}`}>
                <h3 className="font-serif text-xl leading-snug">{m.name}</h3>
                <p className={`mt-3 text-sm ${i === 0 ? "text-teal" : "text-teal"}`}>{m.forWho}</p>
                <p className={`mt-3 text-sm leading-relaxed ${i === 0 ? "text-ivory-dim" : "text-ivory-dim"}`}>{m.included}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ivory-dim">
            Every module starts the same way: a Business X-Ray or a scoping workshop, then a fixed plan.
          </p>
        </div>
      </section>

      <section className="tone-dark" id="faq">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <h2 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">Questions buyers ask us.</h2>
          <div className="divide-y divide-ivory/10 border-y border-ivory/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg [&::-webkit-details-marker]:hidden">
                  <h3 className="font-medium">{f.q}</h3>
                  <Plus
                    size={20}
                    aria-hidden
                    className="mt-1 shrink-0 text-teal transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-ivory-dim">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NextStep />
    </>
  );
}
