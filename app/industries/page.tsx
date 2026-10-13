import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Reveal } from "@/components/ui/Reveal";
import { NetworkBackground } from "@/components/industries/NetworkBackground";
import { SectionNav } from "@/components/solutions/SectionNav";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industry solutions in the UAE",
  description:
    "Industry solutions on Microsoft Dynamics 365, Power Platform, Zoho and custom applications, with AI Enablement, for trading and manufacturing, real estate, sustainability, space technology and e-commerce and retail businesses in the UAE.",
  alternates: { canonical: "/industries" },
};

const stack = [
  {
    title: "Microsoft Dynamics 365 & Power Platform",
    body: "Our specialism. The core system for businesses that need finance, operations and customers on one platform.",
  },
  { title: "Zoho", body: "A lighter, faster start for teams that do not need an enterprise platform yet." },
  {
    title: "Custom applications",
    body: "Built for the requirement no off-the-shelf product covers, and connected to the systems you already run.",
  },
  {
    title: "AI Enablement",
    body: "Microsoft Dynamics 365 AI where you already run it. Custom AI architecture built on Claude where you do not.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <NetworkBackground />
      <div className="relative z-10">
        <PageHeader
          eyebrow="Industry solutions"
          title="Solutions built for how your industry works."
          intro="Different industries, the same gaps between teams. We pick the right platform for each one, build what it needs and enable AI where it pays back."
        />
        <SectionNav
          items={[...industries.map((i) => ({ id: i.slug, label: i.short })), { id: "platforms", label: "How we choose" }]}
        />

        {industries.map((industry, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={industry.slug}
              id={industry.slug}
              className="relative scroll-mt-32 overflow-hidden border-b border-ivory/10"
            >
              <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-20 lg:px-8">
                <Reveal className={flip ? "lg:order-2" : undefined}>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">
                    {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">{industry.name}</h2>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-ivory-dim">{industry.body}</p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {industry.platforms.map((p) => (
                      <li key={p} className="rounded-full border border-ivory/15 bg-ivory/[0.03] px-3.5 py-1.5 text-xs text-ivory-dim">
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/case-studies/${industry.caseStudy}`}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-ivory underline-offset-4 hover:underline"
                  >
                    Read the case study
                    <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>

                <div className={`grid content-start gap-4 ${flip ? "lg:order-1" : ""}`}>
                  <div className="glass spotlight p-7 sm:p-9">
                    <p className="font-medium">What we build</p>
                    <ul className="mt-4 grid gap-3">
                      {industry.solutions.map((s, j) => (
                        <li key={s}>
                          <Reveal delay={0.06 + j * 0.08} className="flex gap-3 leading-relaxed text-ivory-dim">
                            <Check size={18} className="mt-1 shrink-0 text-teal" aria-hidden />
                            {s}
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Reveal delay={0.3} className="tone-gradient spotlight p-7 sm:p-9">
                    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-teal">
                      <Sparkle size={14} weight="fill" aria-hidden /> Where AI helps
                    </p>
                    <p className="mt-3 text-lg leading-relaxed text-ivory">{industry.ai}</p>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}

        <section id="platforms" className="relative scroll-mt-32 overflow-hidden">
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <Reveal>
              <h2 className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                The right software for you, not the one we sell most.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory-dim">
                A unique business deserves unique attention. We start with how you work, then choose the platform.
              </p>
            </Reveal>
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stack.map((s, i) => (
                <li key={s.title}>
                  <Reveal
                    delay={i * 0.08}
                    className="glass spotlight h-full p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                  >
                    <p className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-4 font-display text-xl leading-snug">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{s.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <Link href="/solutions#implementation" className="btn-secondary mt-10">
                How we choose and build <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>

        <NextStep
          title="Not on the list?"
          body="If work moves between departments in your business, the same approach applies. Start with a Business X-Ray."
        />
      </div>
    </>
  );
}
