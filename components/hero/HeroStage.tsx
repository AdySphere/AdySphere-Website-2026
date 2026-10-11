"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";
import { heroArt } from "@/lib/site";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Background of the hero. Server-renders the gradient, star field and the artwork as a still image, then swaps in
 * the particle scene. WebGL starts on the visitor's first interaction (move, scroll, tap, key), so it never competes
 * with page load. Until then the still artwork shows in the same place. Reduced-motion users and browsers without WebGL keep the still version.
 */
export function HeroStage({ progress }: { progress: MotionValue<number> }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

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
    const el = wrapper.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="hero-backdrop absolute inset-0">
      <div className="hero-stars absolute inset-0" aria-hidden />
      <div className="hero-grid absolute inset-0" aria-hidden />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={heroArt}
        alt=""
        aria-hidden
        width={800}
        height={800}
        fetchPriority="high"
        className={`hero-art pointer-events-none absolute transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-90"}`}
      />
      {live && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene progress={progress} active={inView} artUrl={heroArt} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
