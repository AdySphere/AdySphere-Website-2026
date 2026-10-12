import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries we work with in the UAE",
  description:
    "Microsoft Dynamics 365, Power Platform and AI Enablement for professional services and IT, commodity trading, manufacturing and food, real estate and field service businesses in the UAE.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Different industries. The same gaps between teams."
        intro="We work with mid-size and large UAE businesses where projects, contracts, assets or stock move between departments."
      />
      <section className="tone-ink">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <ul className="divide-y divide-ivory/10">
            {industries.map((industry, i) => (
              <li key={industry.name}>
                <Reveal className="grid gap-4 py-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-14">
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                    <span aria-hidden className="mr-4 font-mono text-sm text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {industry.name}
                  </h2>
                  <p className="max-w-[58ch] text-lg leading-relaxed text-ivory-dim">{industry.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <NextStep
        title="Not on the list?"
        body="If work moves between departments in your business, the same approach applies. Start with a Business X-Ray."
      />
    </>
  );
}
