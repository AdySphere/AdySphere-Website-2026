import Link from "next/link";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { bookCta } from "@/lib/site";

const outcomes = [
  "Less time on manual reporting and admin",
  "Faster, better-informed decisions",
  "AI your people actually use",
  "A business that's ready for whatever comes next",
];

export function WhatYouGet() {
  return (
    <section data-swarm="hold" className="relative">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-8">
        <div>
          <p className="eyebrow text-teal">What you get</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            What changes for your business
          </h2>
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
    </section>
  );
}
