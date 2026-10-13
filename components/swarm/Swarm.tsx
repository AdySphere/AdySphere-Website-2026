"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { heroArt } from "@/lib/site";

const SwarmScene = dynamic(() => import("./SwarmScene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The homepage particle swarm: one fixed canvas behind the page that reshapes itself as each section scrolls past
 * (sections opt in with data-swarm). Before it starts, the hero shows the artwork as a still image.
 * WebGL starts on the visitor's first interaction, so it never competes with page load.
 * Reduced-motion visitors and browsers without WebGL keep the still version.
 */
export function SwarmBackground() {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const events = ["pointermove", "pointerdown", "wheel", "scroll", "keydown", "touchstart"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      // Creating a WebGL context is not free, so even the support check waits for the first interaction.
      if (supportsWebGL()) setLive(true);
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.swarmState = ready ? "live" : "still";
  }, [ready]);

  return (
    <div aria-hidden className="swarm-backdrop pointer-events-none fixed inset-0 z-0">
      {live && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <SwarmScene artUrl={heroArt} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
