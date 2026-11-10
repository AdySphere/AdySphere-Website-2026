import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { WhatYouGet } from "@/components/home/WhatYouGet";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteSchema } from "@/lib/schema";
import { og } from "@/lib/seo";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Problem } from "@/components/home/Problem";
import { Proof } from "@/components/home/Proof";
import { FinalCta } from "@/components/home/FinalCta";
import { SwarmBackground } from "@/components/swarm/Swarm";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: og("/"),
};

/**
 * Homepage. One particle swarm sits behind the page and reshapes itself per section (data-swarm on each section):
 * face, scattered data, a wave, a sphere, a helix, a galaxy, a vortex.
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
        <HowItWorks />
        <WhatYouGet />
        <WhyUs />
        <Proof />
        <FinalCta />
      </div>
    </>
  );
}
