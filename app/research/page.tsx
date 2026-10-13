import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research: space, astrophysics, quantum computing and data-intensive science",
  description:
    "The AdySphere Co. research lab: computational astrophysics, space technology and mission data, quantum computing, data-intensive science methods, and AI for scientific discovery.",
  alternates: { canonical: "/research" },
};

const areas = [
  { name: "Computational astrophysics", body: "Simulation and analysis of astrophysical systems, from star formation to compact objects." },
  { name: "Space technology & mission data", body: "Orbit determination, tracking and the data pipelines behind space missions." },
  { name: "Data-intensive science methods", body: "Handling survey-scale data: pipelines, provenance and reproducible analysis." },
  {
    name: "Quantum computing",
    body: "Quantum algorithms and hybrid quantum-classical methods for optimisation and simulation problems.",
  },
  { name: "AI for scientific discovery", body: "Machine learning that finds candidates in noisy data, with uncertainty that scientists can trust." },
  {
    name: "Applied crossovers",
    body: "How methods from astrophysics data pipelines inform enterprise AI: filtering signal from noise, at scale, with an audit trail.",
  },
];

export default function ResearchPage() {
  return (
    <div className="tone-space">
      <PageHeader
        tone="space"
        eyebrow="Research lab"
        title="Research in space, astrophysics, quantum computing and data-intensive science."
        intro="This is where AdySphere Co. does its scientific work. It is separate from our client work, and it shapes how we think about data."
      />

      <section aria-labelledby="areas" className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h2 id="areas" className="font-mono text-sm uppercase tracking-[0.16em] text-teal">
            Research areas
          </h2>
          <dl className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <div key={a.name} className="border-l border-teal/40 pl-5">
                <dt className="font-display text-2xl text-ivory">{a.name}</dt>
                <dd className="mt-3 leading-relaxed text-ivory-dim">{a.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="collaborate" className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <h2 id="collaborate" className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight text-ivory sm:text-5xl">
            Collaborate with us.
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-ivory-dim">
            We welcome universities, space companies and independent researchers working on astrophysics, mission data
            or AI for science. Write to us with a short note on your project.
          </p>
          <p className="mt-8 font-mono text-teal">{site.email}</p>
        </div>
      </section>

      <p className="border-t border-ivory/10 px-4 py-8 text-center text-sm text-mist">
        AdySphere Co. also helps enterprises with Microsoft Dynamics 365 and AI.{" "}
        <Link href="/solutions" className="text-ivory-dim underline-offset-4 hover:underline">
          See our solutions
        </Link>
      </p>
    </div>
  );
}
