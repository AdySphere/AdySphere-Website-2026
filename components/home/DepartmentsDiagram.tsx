"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { departmentExamples, departments } from "@/lib/site";

type Dept = (typeof departments)[number];

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 130;

const positions = departments.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / departments.length;
  return { x: CENTER + Math.cos(a) * RADIUS, y: CENTER + Math.sin(a) * RADIUS };
});

/**
 * A shared AI layer with five departments around it. Hover, focus or tap a department to see one concrete
 * thing AI does there. Buttons are real buttons so it works with a keyboard and screen readers.
 */
export function DepartmentsDiagram() {
  const [active, setActive] = useState<Dept>("Finance");
  const reduce = useReducedMotion();
  const example = departmentExamples[active];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
      <div className="relative mx-auto aspect-square w-full max-w-[460px] bg-navy-900">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#34c4c9" strokeOpacity={0.18} />
          {positions.map((p, i) => (
            <line
              key={departments[i]}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="#34c4c9"
              strokeOpacity={departments[i] === active ? 0.9 : 0.25}
              strokeWidth={departments[i] === active ? 1.5 : 1}
              className="transition-[stroke-opacity] duration-300"
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 flex size-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-teal/50 bg-navy-950 text-center">
          <span className="font-serif text-lg leading-tight text-ivory sm:text-xl">Shared AI layer</span>
          <span className="mt-1 px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-mist">in your tenant</span>
        </div>

        <ul>
          {departments.map((dept, i) => {
            const p = positions[i];
            const selected = dept === active;
            return (
              <li
                key={dept}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(p.x / SIZE) * 100}%`, top: `${(p.y / SIZE) * 100}%` }}
              >
                <button
                  type="button"
                  aria-pressed={selected}
                  aria-controls="department-example"
                  onClick={() => setActive(dept)}
                  onMouseEnter={() => setActive(dept)}
                  onFocus={() => setActive(dept)}
                  className={`whitespace-nowrap border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 sm:text-xs ${
                    selected
                      ? "border-teal bg-teal text-navy-950"
                      : "border-teal/40 bg-navy-950 text-ivory hover:border-teal"
                  }`}
                >
                  {dept}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div id="department-example" aria-live="polite" className="flex flex-col justify-between glass p-8 sm:p-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow text-teal">{active}</p>
            <p className="mt-5 font-serif text-2xl leading-snug text-ivory sm:text-3xl">&ldquo;{example.question}&rdquo;</p>
            <p className="mt-5 leading-relaxed text-ivory-dim">{example.action}</p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-10 border-t border-ivory/10 pt-5 text-sm leading-relaxed text-ivory-dim">
          Every department plugs into the same layer, so each one sees across the business. A person approves the actions
          that matter.
        </p>
      </div>
    </div>
  );
}
