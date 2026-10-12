"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** A large outlined word that drifts sideways as its section scrolls past. Decorative. */
export function ParallaxWord({ word }: { word: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-22%"]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 top-6 overflow-hidden md:top-10">
      <motion.p
        style={reduce ? undefined : { x }}
        className="whitespace-nowrap font-display text-[22vw] font-semibold uppercase leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgb(52_196_201/0.16)] md:text-[15vw]"
      >
        {word}
      </motion.p>
    </div>
  );
}
