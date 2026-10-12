import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { offers } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

const lines: Record<string, string> = {
  "business-x-ray": "See how the business really runs, department by department, before anyone buys software.",
  implementation: "Put Microsoft Dynamics 365 and Power Platform in properly, with the integrations and reporting people use.",
  "ai-enablement": "Enable AI inside those systems, so it takes work off your teams instead of adding to it.",
};

export function Journey() {
  return (
    <section data-swarm="wave" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-48 pt-20 sm:px-6 md:pb-64 md:pt-28 lg:px-8">
        <h2 className="max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          One journey, in the right order.
        </h2>

        <div className="relative mt-16">
          <div aria-hidden className="accent-rule absolute left-0 right-0 top-[7px] hidden md:block" />
          <div aria-hidden className="rule-travel absolute left-0 right-0 top-[7px] hidden h-px md:block" />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {offers.map((offer, i) => (
            <li key={offer.slug} className="relative">
              <Reveal delay={i * 0.1}>
                <span aria-hidden className="block size-[15px] border-2 border-teal bg-navy-900" />
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-teal">{offer.step}</p>
                <h3 className="mt-2 font-display text-2xl">{offer.name}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-ivory-dim">{lines[offer.slug]}</p>
                <Link
                  href={offer.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ivory underline-offset-4 hover:underline"
                >
                  {offer.slug === "business-x-ray" ? "What the X-Ray covers" : offer.slug === "implementation" ? "How we choose and build" : "How AI Enablement works"}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
