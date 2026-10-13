"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NetworkScene = dynamic(() => import("./NetworkScene"), { ssr: false });

/**
 * The Industries page backdrop: one slowly turning network of linked nodes, with pulses moving between them.
 * Like the homepage swarm, WebGL starts on the first interaction and is skipped for reduced motion.
 */
export function NetworkBackground() {
  const [live, setLive] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const events = ["pointermove", "pointerdown", "wheel", "scroll", "keydown", "touchstart"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      try {
        const c = document.createElement("canvas");
        if (!(c.getContext("webgl2") ?? c.getContext("webgl"))) return;
      } catch {
        return;
      }
      setLive(true);
      requestAnimationFrame(() => setShown(true));
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, []);

  return (
    <div aria-hidden className="swarm-backdrop pointer-events-none fixed inset-0 z-0">
      {live && (
        <div className={`absolute inset-0 transition-opacity duration-[1500ms] ${shown ? "opacity-70" : "opacity-0"}`}>
          <NetworkScene />
        </div>
      )}
    </div>
  );
}
