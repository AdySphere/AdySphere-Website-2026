"use client";

import { motion, useReducedMotion } from "motion/react";
import { stages } from "./stages";

/** The four stages as a line that draws itself in, with each stage lighting up in turn. */
export function JourneyLine() {
  const reduce = useReducedMotion();
  const steps = [...stages.map((s) => s.label), "Plan ahead"];

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="absolute left-[10%] right-[10%] top-[7px] hidden h-px origin-left bg-gradient-to-r from-teal via-[#2b5cff] to-teal sm:block"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <ol className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-5">
        {steps.map((label, i) => (
          <motion.li
            key={label}
            className="flex flex-col items-center text-center"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ delay: 0.25 + i * 0.28, duration: 0.6 }}
          >
            <span className="relative flex size-[15px] items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-teal/30 [animation-duration:2.8s]" />
              <span className="size-[9px] rounded-full bg-teal shadow-[0_0_18px_rgb(52_196_201/0.8)]" />
            </span>
            <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-1 font-display text-lg text-ivory">{label}</span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
