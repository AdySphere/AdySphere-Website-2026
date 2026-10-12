"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; depth: number; phase: number; speed: number; blue: boolean };

/**
 * A quiet starfield behind the page: stars twinkle, drift slowly and shift a little with scroll,
 * with the odd shooting star. Plain 2D canvas, paused when the tab is hidden; reduced motion gets a still sky.
 */
export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 5200);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + depth * 1.1,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.6,
          blue: Math.random() < 0.25,
        };
      });
    };
    resize();
    window.addEventListener("resize", resize);

    let shoot: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    let nextShoot = 3 + Math.random() * 5;
    let raf = 0;
    let last = performance.now();
    let time = 0;

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;

      for (const s of stars) {
        if (!still) s.x -= dt * (2 + s.depth * 6);
        if (s.x < -2) s.x += w + 4;
        const y = (((s.y - scroll * s.depth * 0.08) % h) + h) % h;
        const twinkle = still ? 0.8 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        ctx.globalAlpha = (0.25 + s.depth * 0.6) * twinkle;
        ctx.fillStyle = s.blue ? "#8fd8dc" : "#eef3f8";
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!still) {
        nextShoot -= dt;
        if (!shoot && nextShoot <= 0) {
          shoot = { x: w * (0.3 + Math.random() * 0.7), y: h * Math.random() * 0.4, vx: -520, vy: 180, life: 1 };
          nextShoot = 7 + Math.random() * 8;
        }
        if (shoot) {
          shoot.x += shoot.vx * dt;
          shoot.y += shoot.vy * dt;
          shoot.life -= dt * 1.1;
          const grad = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * 0.18, shoot.y - shoot.vy * 0.18);
          grad.addColorStop(0, "rgba(220,245,255,0.9)");
          grad.addColorStop(1, "rgba(52,196,201,0)");
          ctx.globalAlpha = Math.max(0, shoot.life);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(shoot.x - shoot.vx * 0.18, shoot.y - shoot.vy * 0.18);
          ctx.stroke();
          if (shoot.life <= 0) shoot = null;
        }
        raf = requestAnimationFrame(draw);
      }
      ctx.globalAlpha = 1;
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !still) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    if (still) window.addEventListener("scroll", () => draw(performance.now()), { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="swarm-backdrop pointer-events-none fixed inset-0 z-0">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
