import { Hero } from "@/components/hero/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Problem } from "@/components/home/Problem";
import { Journey } from "@/components/home/Journey";
import { AiEnablement } from "@/components/home/AiEnablement";
import { Proof } from "@/components/home/Proof";
import { Founder } from "@/components/home/Founder";
import { ResearchTeaser } from "@/components/home/ResearchTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Problem />
      <Journey />
      <AiEnablement />
      <Proof />
      <Founder />
      <ResearchTeaser />
      <FinalCta />
    </>
  );
}
