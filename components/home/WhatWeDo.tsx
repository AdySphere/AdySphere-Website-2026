import { MagnifyingGlass, Robot, Handshake } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const items = [
  {
    icon: MagnifyingGlass,
    title: "Find where the hours go.",
    body: "We sit with your team and map the repetitive work that eats the week.",
  },
  {
    icon: Robot,
    title: "Set up AI agents on your existing tools.",
    body: "Copilot, ChatGPT, Gemini, Microsoft 365, Microsoft Dynamics 365, Power Platform, SAP or whatever you run on. No rip-and-replace.",
  },
  {
    icon: Handshake,
    title: "Make it stick.",
    body: "We work alongside your people and IT so adoption lasts after we leave, and we measure the hours saved.",
  },
];

/** What AI enablement means in practice, on the tools a business already pays for. */
export function WhatWeDo() {
  return (
    <section data-swarm="wave" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="eyebrow text-teal">What we do</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
          AI enablement, done with your team, not to it
        </h2>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="glass spotlight h-full p-7 sm:p-8">
                <span className="flex size-12 items-center justify-center border border-teal/30 bg-teal/10 text-teal">
                  <Icon size={24} aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-2xl leading-snug">{title}</h3>
                <p className="mt-3 leading-relaxed text-ivory-dim">{body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
