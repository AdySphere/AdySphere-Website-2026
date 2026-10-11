"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type Mode = "static" | "3d";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Background of the hero. Server-renders the static gradient, star field and SVG mark, then swaps in the
 * WebGL scene once the browser is idle. Reduced-motion users and browsers without WebGL keep the static version.
 */
export function HeroStage({ progress }: { progress: MotionValue<number> }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("static");
  const [glbUrl, setGlbUrl] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !supportsWebGL()) return;

    let cancelled = false;
    const start = async () => {
      const glb = await fetch("/brand/mark.glb", { method: "HEAD" })
        .then((r) => (r.ok && !r.headers.get("content-type")?.includes("text/html") ? "/brand/mark.glb" : null))
        .catch(() => null);
      if (cancelled) return;
      setGlbUrl(glb);
      setMode("3d");
    };
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const handle = idle(() => void start());
    return () => {
      cancelled = true;
      window.cancelIdleCallback?.(handle as number);
    };
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/mark.svg"
        alt=""
        aria-hidden
        width={440}
        height={440}
        fetchPriority="high"
        className={`hero-mark pointer-events-none absolute transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {mode === "3d" && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <HeroScene progress={progress} active={inView} glbUrl={glbUrl} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
