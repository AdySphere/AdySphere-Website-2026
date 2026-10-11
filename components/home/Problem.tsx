import { Database, EyeSlash, Flask } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const problems = [
  {
    icon: Database,
    title: "Data scattered across systems",
    body: "The same customer lives in Dynamics, three spreadsheets and someone's inbox. Every report starts with reconciling them.",
  },
  {
    icon: EyeSlash,
    title: "Departments that can't see each other",
    body: "Sales promises what delivery can't staff. Finance finds out at month-end. Each team is right on its own data.",
  },
  {
    icon: Flask,
    title: "AI pilots that never reach production",
    body: "Pilots sit outside your systems, so someone copies data in and answers out. That is more work, not less.",
  },
];

export function Problem() {
  return (
    <section data-swarm="scatter" className="relative">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-teal">The problem</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            The work gets lost between systems.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-ivory-dim">
            Most UAE businesses we meet already own good software. The cost sits in the gaps between it.
          </p>
        </div>
        <ol className="divide-y divide-ivory/10 border-y border-ivory/10">
          {problems.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="spotlight grid grid-cols-[auto_1fr] gap-6 px-4 py-9 sm:px-6">
                <span className="flex size-12 items-center justify-center border border-teal/30 bg-teal/10 text-teal">
                  <Icon size={24} weight="regular" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-2xl leading-snug">{title}</h3>
                  <p className="mt-3 max-w-[52ch] leading-relaxed text-ivory-dim">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
