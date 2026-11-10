import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  return (
    <section data-swarm="scatter" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-teal">The problem</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            The licences are there. The results aren&rsquo;t.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ivory-dim">
            Most leadership teams in the UAE already pay for Copilot, ChatGPT or Gemini. Yet reports are still built by
            hand, numbers are still copied between spreadsheets, and decisions still wait for someone to pull the data
            together. The gap isn&rsquo;t the technology. It&rsquo;s that nobody set it up around the work your people
            actually do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
