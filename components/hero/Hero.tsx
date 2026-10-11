"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { HeroStage } from "./HeroStage";
import { bookCta, site } from "@/lib/site";

/**
 * Scroll story: the copy fades first, then the orbit widens and splits into the five Brain lobes,
 * then the whole stage fades into the next section. Reduced motion gets a single static screen.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const copyOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.2], [0, -48]);
  const stageOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className={reduce ? "relative" : "relative h-[260vh]"}>
      <div className="sticky top-0 h-[100dvh] min-h-[560px] overflow-hidden">
        <motion.div style={reduce ? undefined : { opacity: stageOpacity }} className="absolute inset-0">
          <HeroStage progress={scrollYProgress} />
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 lg:items-center lg:px-8 lg:pb-0">
          <motion.div style={reduce ? undefined : { opacity: copyOpacity, y: copyY }} className="max-w-xl lg:max-w-[34rem]">
            <h1
              id="hero-title"
              className="hero-rise font-serif text-[2.6rem] leading-[1.05] tracking-tight text-ivory sm:text-6xl lg:text-[4.25rem]"
            >
              Your Microsoft stack, <em className="italic text-teal">with a brain.</em>
            </h1>
            <p className="hero-rise mt-6 max-w-[46ch] text-base leading-relaxed text-ivory-dim sm:text-lg [animation-delay:120ms]">
              {site.positioning}
            </p>
            <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:240ms]">
              <Link href={bookCta.href} className="btn-primary">
                {bookCta.label}
              </Link>
              <Link href="/ai-brain" className="btn-secondary">
                See the AI Brain
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
