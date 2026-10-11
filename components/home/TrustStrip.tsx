import Image from "next/image";

// TODO: replace these with real certification names and badge images.
const certifications = ["Certification 1", "Certification 2", "Certification 3"];

export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="tone-light border-b border-cloud">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <Image
          src="/brand/microsoft-ai-cloud-partner.png"
          alt="Microsoft AI Cloud Partner"
          width={696}
          height={189}
          sizes="160px"
          className="h-11 w-auto"
        />
        <p className="text-sm font-medium text-navy-900">Microsoft indirect reseller</p>
        <p className="text-sm font-medium text-navy-900">Dubai, UAE</p>
        <ul className="flex flex-wrap gap-3" aria-label="Certifications">
          {certifications.map((c) => (
            <li
              key={c}
              className="border border-dashed border-slate/40 px-3 py-1.5 font-mono text-xs text-slate"
              title="TODO: add certification"
            >
              TODO: {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
