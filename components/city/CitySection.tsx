"use client";

import { useEffect, useRef, useState } from "react";
import { cityVideo, site } from "@/lib/site";
import { DubaiSkyline } from "./DubaiSkyline";

/**
 * Full-bleed Dubai skyline. Plays the real video when `cityVideo` is set, otherwise the code-drawn skyline.
 * The video only loads when the section is near the viewport, pauses off-screen, and stays still for reduced motion.
 */
export function CitySection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        const v = videoRef.current;
        if (!v || reduce) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} data-swarm="hold" aria-labelledby="city-title" className="relative h-[78vh] min-h-[480px] overflow-hidden bg-black">
      <div className="absolute inset-0">
        {cityVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={near ? cityVideo.src : undefined}
            poster={cityVideo.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
        ) : (
          near && <DubaiSkyline />
        )}
      </div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.7),rgb(0_0_0/0.15)_45%,transparent_70%)]" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-start px-4 pt-20 sm:px-6 md:pt-28 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal">25.1972° N, 55.2744° E</p>
        <h2 id="city-title" className="mt-4 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-ivory sm:text-6xl">
          Built in Dubai. <em className="text-gradient not-italic">Working across the UAE and the UK.</em>
        </h2>
        <p className="mt-5 max-w-lg leading-relaxed text-ivory-dim">
          Founder-led, close to the businesses we serve, and in the room from the first workshop to go-live.
        </p>
        <p className="sr-only">{site.legalNote}</p>
      </div>
    </section>
  );
}
