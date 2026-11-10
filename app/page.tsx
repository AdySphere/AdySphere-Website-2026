import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteSchema } from "@/lib/schema";
import { og } from "@/lib/seo";
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

export const metadata: Metadata = {
  description:
    "Get real value from Copilot, ChatGPT and Gemini. AdySphere Co. sets up AI agents on the tools you already use. Dubai-based, running in 2–3 weeks.",
  alternates: { canonical: "/" },
  openGraph: og("/"),
};

/**
 * Homepage. One particle swarm sits behind the page and reshapes itself per section (data-swarm on each section):
 * face, scattered data, a wave, the shared AI layer, a helix, a galaxy, a vortex.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <SwarmBackground />
      <div className="relative z-10">
        <Hero />
        <TrustStrip />
        <Problem />
        <WhatWeDo />
        <Journey />
        <CitySection />
        <AiEnablement />
        <HowItWorks />
        <Proof />
        <WhyUs />
        <Founder />
        <ResearchTeaser />
        <FinalCta />
      </div>
    </>
  );
}
