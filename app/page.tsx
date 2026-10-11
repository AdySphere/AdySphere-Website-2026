import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Problem } from "@/components/home/Problem";
import { Journey } from "@/components/home/Journey";
import { CitySection } from "@/components/city/CitySection";
import { AiEnablement } from "@/components/home/AiEnablement";
import { Proof } from "@/components/home/Proof";
import { Founder } from "@/components/home/Founder";
import { ResearchTeaser } from "@/components/home/ResearchTeaser";
import { FinalCta } from "@/components/home/FinalCta";
import { SwarmBackground } from "@/components/swarm/Swarm";

/**
 * Homepage. One particle swarm sits behind the page and reshapes itself per section (data-swarm on each section):
 * face, scattered data, a wave, the shared AI layer, a helix, a galaxy, a vortex.
 */
export default function HomePage() {
  return (
    <>
      <SwarmBackground />
      <div className="relative z-10">
        <Hero />
        <TrustStrip />
        <Problem />
        <Journey />
        <CitySection />
        <AiEnablement />
        <Proof />
        <Founder />
        <ResearchTeaser />
        <FinalCta />
      </div>
    </>
  );
}
