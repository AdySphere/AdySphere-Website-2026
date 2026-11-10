import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    name: "30-minute AI check-in",
    body: "We look at the AI tools you already pay for and where your team loses the most time.",
  },
  {
    name: "Working session",
    body: "We set up AI agents with your team on one or two high-impact tasks.",
  },
  {
    name: "Rollout and measure",
    body: "Agents go live on real work, and we track the time they give back.",
  },
];

/** The short path: from first call to working agents. The hero's "See how it works" link lands here. */
export function HowItWorks() {
  return (
    <section id="how-it-works" data-swarm="sphere" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="eyebrow text-teal">How it works</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          From first call to working agents in two to three weeks
        </h2>
        <ol className="mt-14 grid gap-px bg-ivory/10 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.name} className="bg-black/80">
              <Reveal delay={i * 0.1} className="spotlight h-full p-7 sm:p-8">
                <p className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-2xl leading-snug">{step.name}</h3>
                <p className="mt-3 leading-relaxed text-ivory-dim">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
