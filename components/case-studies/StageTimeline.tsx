"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";

/** A vertical rail that fills as the reader scrolls through the stages beside it. */
export function StageTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-14">
      <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-ivory/10 sm:left-[11px]" />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scaleY: scrollYProgress }}
        className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-gradient-to-b from-teal to-[#2b5cff] sm:left-[11px]"
      />
      {children}
    </div>
  );
}
