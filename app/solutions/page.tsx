import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs, industries, offers } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SwarmBackground } from "@/components/swarm/Swarm";
import { SectionNav } from "@/components/solutions/SectionNav";
import { ParallaxWord } from "@/components/solutions/ParallaxWord";

export const metadata: Metadata = {
  title: "Solutions: Business X-Ray, Microsoft Dynamics 365 and AI Enablement",
  description:
    "Business X-Ray diagnostics, Microsoft Dynamics 365 and Power Platform implementation, and AI Enablement for UAE businesses, from a Dubai-based Microsoft AI Cloud Partner.",
  alternates: { canonical: "/solutions" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const shapeFor: Record<string, string> = { "business-x-ray": "scatter", implementation: "wave", "ai-enablement": "sphere" };
const navItems = [
  ...offers.map((o) => ({ id: o.slug, label: o.step })),
  { id: "industries", label: "Industries" },
  { id: "faq", label: "FAQ" },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <SwarmBackground />
      <div className="relative z-10">
        <PageHeader
          eyebrow="Solutions"
          title="Diagnose. Implement. Enable AI."
          intro="Three offers, one journey. Each one stands on its own, and each one makes the next one work better."
        />
        <SectionNav items={navItems} />

        {offers.map((offer) => (
          <section
            key={offer.slug}
            id={offer.slug}
            data-swarm={shapeFor[offer.slug]}
            className="relative scroll-mt-32 overflow-hidden border-b border-ivory/10"
          >
            <ParallaxWord word={offer.step} />
            <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">{offer.step}</p>
                <h2 className="mt-3 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">{offer.name}</h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory-dim">{offer.summary}</p>
                {offer.slug === "ai-enablement" && (
                  <Link href="/ai-enablement" className="btn-primary mt-8">
                    How AI Enablement works <ArrowRight size={16} aria-hidden />
                  </Link>
                )}
              </Reveal>
              <dl className="glass grid gap-8 p-7 sm:p-9">
                <Reveal delay={0.05}>
                  <dt className="font-medium">Who it&rsquo;s for</dt>
                  <dd className="mt-2 leading-relaxed text-ivory-dim">{offer.forWho}</dd>
                </Reveal>
                <div>
                  <dt className="font-medium">What&rsquo;s included</dt>
                  <dd className="mt-3">
                    <ul className="grid gap-2.5">
                      {offer.included.map((item, i) => (
                        <li key={item}>
                          <Reveal delay={0.08 + i * 0.07} className="flex gap-3 leading-relaxed text-ivory-dim">
                            <Check size={18} className="mt-1 shrink-0 text-teal" aria-hidden />
                            {item}
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <Reveal delay={0.1}>
                  <dt className="font-medium">How it starts</dt>
                  <dd className="mt-2 leading-relaxed text-ivory-dim">{offer.starts}</dd>
                </Reveal>
              </dl>
            </div>
          </section>
        ))}

        <section id="industries" data-swarm="helix" className="relative scroll-mt-32 overflow-hidden border-b border-ivory/10">
          <ParallaxWord word="Industries" />
          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-40 lg:px-8">
            <Reveal>
              <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                Industry solutions we serve.
              </h2>
              <p className="mt-6 max-w-2xl leading-relaxed text-ivory-dim">
                The same gaps show up in every sector, in a different shape. We bring solutions built for how each industry
                works.
              </p>
            </Reveal>
            <ul className="mt-14 grid gap-4 md:grid-cols-6">
              {industries.map((industry, i) => (
                <li key={industry.name} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
                  <Reveal delay={i * 0.06} className="h-full">
                    <Link
                      href="/industries"
                      className={`spotlight group flex h-full flex-col justify-between p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:p-8 ${
                        i === 0 ? "tone-gradient" : "glass"
                      }`}
                    >
                      <div>
                        <h3 className="font-display text-2xl leading-snug">{industry.name}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{industry.body}</p>
                      </div>
                      <ArrowRight
                        size={18}
                        aria-hidden
                        className="mt-6 text-teal transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" data-swarm="vortex" className="relative scroll-mt-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <Reveal>
              <h2 className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">Questions buyers ask us.</h2>
            </Reveal>
            <div className="glass divide-y divide-ivory/10 px-6 sm:px-8">
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
      </div>
    </>
  );
}
