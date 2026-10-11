import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { NextStep } from "@/components/ui/NextStep";
import { JsonLd } from "@/components/seo/JsonLd";
import { founderSchema } from "@/lib/schema";
import { founder, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About AdySphere Co.",
  description:
    "AdySphere Co. is a founder-led Microsoft AI Cloud Partner and indirect reseller, registered in Ajman NuVentures Centre Freezone and operating from Dubai, UAE.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Diagnose before we prescribe", body: "We learn how your business runs before we recommend software. Sometimes the fix is a process, not a licence." },
  { title: "One lead, end to end", body: "The person who designs the solution is the person who delivers it. No handoff from sales to a separate delivery team." },
  { title: "AI that earns its place", body: "We enable AI where it removes work, and we measure it. If it adds steps, it does not ship." },
  { title: "Plain language", body: "No jargon to hide behind. You should understand every recommendation and every line of a proposal." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={founderSchema} />
      <PageHeader
        eyebrow="About"
        title="A founder-led Microsoft partner, built in Dubai."
        intro="AdySphere Co. implements Dynamics 365 and Power Platform properly, then enables AI that removes work across your departments."
      />

      <section className="tone-light">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <h2 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">Why we exist.</h2>
          <div className="grid max-w-2xl gap-5 text-lg leading-relaxed text-slate">
            <p>
              Too many Dynamics 365 projects are sold on licences and delivered without understanding how the business
              actually runs. The system goes live, and the spreadsheets stay.
            </p>
            <p>
              AdySphere Co. was established in September 2025 and launched in January 2026 to do it the other way round:
              start with the business, implement properly, then enable AI where it pays back.
            </p>
          </div>
        </div>
      </section>

      <section className="tone-dark">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16 md:py-28 lg:px-8">
          <div className="relative aspect-[4/5] w-full max-w-[320px] overflow-hidden bg-navy-800">
            {founder.photo ? (
              <Image src={founder.photo} alt={founder.name} fill sizes="320px" className="object-cover" />
            ) : (
              <span className="absolute bottom-5 left-5 font-mono text-xs text-mist">TODO: founder photo</span>
            )}
          </div>
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">{founder.name}</h2>
            <p className="mt-2 text-teal">{founder.title}</p>
            <div className="mt-8 grid max-w-2xl gap-5 leading-relaxed text-ivory-dim">
              <p>
                Adyasha is a techno-functional Dynamics 365 consultant who designs the solution, configures it and stays
                with it through go-live. Clients work directly with Adyasha from the first workshop.
              </p>
              <p>
                Adyasha holds a BE in Computer Science from BITS Pilani, graduating First Division with Distinction, and a
                PGCert in Data Intensive Astrophysics from Cardiff University. That research background shapes how
                AdySphere Co. treats data: as evidence, handled carefully.
              </p>
            </div>
            <a href={founder.linkedin || site.linkedin} target="_blank" rel="noopener" className="btn-secondary mt-8">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="tone-light">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <div>
            <h2 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">Microsoft partnership.</h2>
            <Image
              src="/brand/microsoft-ai-cloud-partner.png"
              alt="Microsoft AI Cloud Partner"
              width={696}
              height={189}
              sizes="220px"
              className="mt-8 h-14 w-auto"
            />
          </div>
          <dl className="grid gap-8">
            <div>
              <dt className="font-medium">Verified Microsoft AI Cloud Partner</dt>
              <dd className="mt-2 leading-relaxed text-slate">Partner Launch benefits.</dd>
            </div>
            <div>
              <dt className="font-medium">Microsoft indirect reseller</dt>
              <dd className="mt-2 leading-relaxed text-slate">
                Licensing, implementation and AI can sit under one roof, with one point of contact.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Registration</dt>
              <dd className="mt-2 leading-relaxed text-slate">{site.legalNote}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="tone-dark">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <h2 className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">How we work.</h2>
          <ul className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2">
            {values.map((v) => (
              <li key={v.title} className="bg-navy-900 p-8">
                <h3 className="font-serif text-2xl">{v.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-ivory-dim">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <NextStep />
    </>
  );
}
