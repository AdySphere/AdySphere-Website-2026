import Image from "next/image";

// TODO: replace these with real certification names and badge images.
const certifications = ["Certification 1", "Certification 2", "Certification 3"];

const stack = [
  "Dynamics 365",
  "Power Platform",
  "Copilot Studio",
  "Dataverse",
  "Power Automate",
  "Power BI",
  "Microsoft Fabric",
  "Azure",
  "Claude",
];

export function TrustStrip() {
  return (
    <section data-swarm="hold" aria-label="Credentials" className="border-y border-ivory/10 bg-black">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-5 px-4 py-7 sm:px-6 lg:px-8">
        <span className="bg-white px-2 py-1">
          <Image
            src="/brand/microsoft-ai-cloud-partner.png"
            alt="Microsoft AI Cloud Partner"
            width={696}
            height={189}
            sizes="150px"
            className="h-9 w-auto"
          />
        </span>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ivory-dim">Microsoft indirect reseller</p>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ivory-dim">Dubai, UAE &amp; United Kingdom</p>
        <ul className="flex flex-wrap gap-2" aria-label="Certifications">
          {certifications.map((c) => (
            <li key={c} className="border border-dashed border-ivory/25 px-2.5 py-1 font-mono text-[11px] text-mist" title="TODO: add certification">
              TODO: {c}
            </li>
          ))}
        </ul>
      </div>
      {/* The stack we build on. The one marquee on the site. */}
      <div className="relative overflow-hidden border-t border-ivory/10 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <ul className="marquee-track flex w-max gap-12 pr-12" aria-label="Technology we build on">
          {[...stack, ...stack].map((item, i) => (
            <li
              key={i}
              aria-hidden={i >= stack.length}
              className="whitespace-nowrap font-display text-2xl text-ivory/40 sm:text-3xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
