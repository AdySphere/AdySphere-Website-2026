import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatusTag } from "@/components/research/StatusTag";
import { getResearch } from "@/lib/content";
import { site } from "@/lib/site";
import publications from "@/content/research/publications.json";
import tools from "@/content/research/tools.json";

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
  const projects = getResearch();

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

      <section aria-labelledby="projects" className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h2 id="projects" className="font-mono text-sm uppercase tracking-[0.16em] text-teal">
            Projects
          </h2>
          {projects.length === 0 ? (
            <p className="mt-10 text-ivory-dim">Projects will appear here. Add an MDX file to content/research.</p>
          ) : (
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <li key={p.slug} className="spotlight flex flex-col border border-ivory/10 bg-navy-950/60 p-7 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <StatusTag status={p.meta.status} draft={p.meta.draft} />
                    <span className="font-mono text-xs text-mist">{p.meta.area}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-snug text-ivory">
                    <Link href={`/research/${p.slug}`} className="hover:text-teal">
                      {p.meta.title}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-relaxed text-ivory-dim">{p.meta.abstract}</p>
                  <p className="mt-5 font-mono text-xs leading-relaxed text-mist">
                    methods: {p.meta.methods.join(" / ")}
                  </p>
                  <ProjectLinks links={p.meta.links} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-labelledby="publications" className="border-t border-ivory/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.6fr_1.4fr] lg:px-8">
          <h2 id="publications" className="font-mono text-sm uppercase tracking-[0.16em] text-teal">
            Publications & notes
          </h2>
          <ol className="grid gap-6">
            {publications.map((pub, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-4 leading-relaxed">
                <span className="font-mono text-sm text-mist">[{i + 1}]</span>
                <p className="text-ivory-dim">
                  {pub.authors}. <span className="text-ivory">{pub.title}</span>. <em>{pub.venue}</em>, {pub.date}.{" "}
                  {pub.link && (
                    <a href={pub.link} className="font-mono text-sm text-teal hover:underline" target="_blank" rel="noopener">
                      {pub.link.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="tools" className="border-t border-ivory/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.6fr_1.4fr] lg:px-8">
          <h2 id="tools" className="font-mono text-sm uppercase tracking-[0.16em] text-teal">
            Datasets & tools
          </h2>
          <ul className="grid gap-6">
            {tools.map((tool, i) => (
              <li key={i}>
                <p className="font-mono text-ivory">
                  {tool.link ? (
                    <a href={tool.link} target="_blank" rel="noopener" className="inline-flex items-center gap-1 hover:text-teal">
                      {tool.name} <ArrowUpRight size={14} aria-hidden />
                    </a>
                  ) : (
                    tool.name
                  )}
                </p>
                <p className="mt-1 leading-relaxed text-ivory-dim">{tool.description}</p>
              </li>
            ))}
          </ul>
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

function ProjectLinks({ links }: { links?: { paper?: string; code?: string; data?: string } }) {
  const items = Object.entries(links ?? {}).filter(([, href]) => href) as [string, string][];
  if (items.length === 0) return null;
  return (
    <ul className="mt-6 flex flex-wrap gap-4 border-t border-ivory/10 pt-4">
      {items.map(([label, href]) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-mono text-xs text-teal hover:underline">
            {label} <ArrowUpRight size={12} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
