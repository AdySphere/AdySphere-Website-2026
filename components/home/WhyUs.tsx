import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/** Why AdySphere Co.: Microsoft depth without being tied to one vendor. */
export function WhyUs() {
  return (
    <section data-swarm="helix" className="relative border-y border-ivory/10 bg-black/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-8">
        <Reveal>
          <p className="eyebrow text-teal">Why AdySphere Co.</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
            Microsoft depth, tool-agnostic thinking
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory-dim">
            We&rsquo;re an authorised member of the Microsoft AI Cloud Partner Program, with hands-on experience
            implementing Microsoft Dynamics 365, Business Central and the Power Platform for businesses across the UAE.
            But we start with your work, not a product, and we use whatever tools fit.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex justify-start lg:justify-end">
          <span className="bg-white px-4 py-3">
            <Image
              src="/brand/microsoft-ai-cloud-partner.png"
              alt="Microsoft AI Cloud Partner"
              width={696}
              height={189}
              sizes="260px"
              className="h-14 w-auto"
            />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
