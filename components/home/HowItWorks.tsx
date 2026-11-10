import Link from "next/link";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { bookCta } from "@/lib/site";

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
    body: "Agents go live on real work, and we measure what they change.",
  },
];

const outcomes = [
  "Less time on manual reporting and admin",
  "Faster, better-informed decisions",
  "AI your people actually use",
  "A business that's ready for whatever comes next",
];

/** The short path: from first call to working agents. The hero's "See how it works" link lands here. */
export function HowItWorks() {
  return (
    <section id="how-it-works" data-swarm="hold" className="relative scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="eyebrow text-teal">How it works</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          From first call to working agents in two to three weeks.
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

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <h3 className="font-display text-3xl leading-tight sm:text-4xl">What changes for your business</h3>
            <Link href={bookCta.href} className="btn-primary group mt-8 !pr-2">
              {bookCta.label}
              <span className="ml-1 inline-flex size-7 items-center justify-center rounded-full bg-ink text-ivory transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={14} aria-hidden />
              </span>
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((o, i) => (
              <li key={o}>
                <Reveal delay={i * 0.06} className="tone-gradient flex h-full items-start gap-3 p-6">
                  <Check size={18} className="mt-1 shrink-0 text-teal" aria-hidden />
                  <span className="leading-relaxed text-ivory">{o}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
