"use client";

import { useEffect, useRef } from "react";

/**
 * A code-drawn Dubai night skyline: three parallax layers of towers, the landmarks in front, window lights that
 * flicker, traffic on Sheikh Zayed Road and a reflection in the water. Drawn on a 2D canvas: the layers are
 * rendered once per resize, and each frame only pans them and draws the moving lights.
 * Stands in until a real video is set (see `cityVideo` in lib/site.ts).
 */
export function DubaiSkyline({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scene: Scene | null = null;
    let raf = 0;
    let visible = false;
    let last = performance.now();
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      scene = buildScene(canvas.width, canvas.height, dpr);
      draw(ctx, scene, t);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      if (scene) draw(ctx, scene, t);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}

type Light = { x: number; y: number; r: number; phase: number; speed: number; warm: boolean };
type Car = { lane: number; x: number; speed: number; dir: 1 | -1 };
type Layer = { canvas: HTMLCanvasElement; parallax: number; lights: Light[] };
type Scene = { w: number; h: number; dpr: number; horizon: number; layers: Layer[]; cars: Car[]; beacon: { x: number; y: number } };

// Deterministic randomness so the skyline is the same on every visit.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function buildScene(w: number, h: number, dpr: number): Scene {
  const horizon = Math.round(h * 0.78);
  const extra = Math.round(w * 0.25); // room to pan
  const layerWidth = w + extra;
  const rand = rng(20260111);

  const makeLayer = (parallax: number, fill: string, count: number, minH: number, maxH: number, windowDensity: number) => {
    const c = document.createElement("canvas");
    c.width = layerWidth;
    c.height = h;
    const g = c.getContext("2d")!;
    const lights: Light[] = [];
    let x = -20 * dpr;
    for (let i = 0; i < count && x < layerWidth; i++) {
      const bw = (18 + rand() * 46) * dpr;
      const bh = h * (minH + rand() * (maxH - minH));
      const top = horizon - bh;
      g.fillStyle = fill;
      g.fillRect(x, top, bw, bh);
      // Some towers get a slanted or stepped crown.
      if (rand() < 0.3) {
        g.beginPath();
        g.moveTo(x, top);
        g.lineTo(x + bw, top);
        g.lineTo(x + bw * (rand() < 0.5 ? 1 : 0), top - bw * 0.6);
        g.closePath();
        g.fill();
      }
      // Window lights, stored so they can flicker.
      const cols = Math.max(1, Math.floor(bw / (7 * dpr)));
      const rows = Math.floor(bh / (9 * dpr));
      for (let r = 1; r < rows; r++) {
        for (let k = 0; k < cols; k++) {
          if (rand() > windowDensity) continue;
          lights.push({
            x: x + (k + 0.5) * (bw / cols),
            y: top + r * 9 * dpr,
            r: 0.9 * dpr,
            phase: rand() * Math.PI * 2,
            speed: 0.2 + rand() * 1.2,
            warm: rand() < 0.35,
          });
        }
      }
      x += bw + rand() * 10 * dpr;
    }
    return { canvas: c, parallax, lights, g };
  };

  const far = makeLayer(0.25, "#041826", 90, 0.05, 0.2, 0.1);
  const mid = makeLayer(0.55, "#020d16", 60, 0.1, 0.3, 0.16);
  const near = makeLayer(1, "#000000", 0, 0, 0, 0);

  // Landmarks on the near layer.
  const g = near.g;
  const unit = h / 100;
  const cx = layerWidth * 0.58;
  g.fillStyle = "#000";

  // Burj Khalifa: stepped, tapering setbacks up to a spire.
  const burjH = h * 0.6;
  const hw = 11 * unit;
  const tiers = [
    [1, 0],
    [1, 0.2],
    [0.78, 0.2],
    [0.78, 0.38],
    [0.6, 0.38],
    [0.6, 0.54],
    [0.44, 0.54],
    [0.44, 0.67],
    [0.3, 0.67],
    [0.3, 0.78],
    [0.17, 0.78],
    [0.17, 0.87],
    [0.06, 0.87],
    [0.02, 1],
  ];
  g.beginPath();
  g.moveTo(cx - hw, horizon);
  tiers.forEach(([wf, hf]) => g.lineTo(cx - hw * wf, horizon - burjH * hf));
  [...tiers].reverse().forEach(([wf, hf]) => g.lineTo(cx + hw * wf, horizon - burjH * hf));
  g.lineTo(cx + hw, horizon);
  g.closePath();
  g.fill();
  // Its vertical light lines.
  for (let k = -2; k <= 2; k++) {
    for (let y = horizon - 4 * unit; y > horizon - burjH * 0.8; y -= 3 * dpr) {
      const half = hw * (1 - (horizon - y) / burjH) * 0.9;
      if (Math.abs(k) * hw * 0.22 > half) continue;
      if (rand() < 0.5) near.lights.push({ x: cx + k * hw * 0.22, y, r: 0.8 * dpr, phase: rand() * 6.28, speed: 0.3 + rand(), warm: false });
    }
  }
  const beacon = { x: cx, y: horizon - burjH };

  // Emirates Towers: two blades with triangular tops.
  const tower = (x: number, height: number, width: number) => {
    g.beginPath();
    g.moveTo(x, horizon);
    g.lineTo(x, horizon - height * 0.82);
    g.lineTo(x + width * 0.5, horizon - height);
    g.lineTo(x + width, horizon - height * 0.86);
    g.lineTo(x + width, horizon);
    g.closePath();
    g.fill();
  };
  tower(layerWidth * 0.38, h * 0.36, 7 * unit);
  tower(layerWidth * 0.43, h * 0.3, 6.5 * unit);

  // Cayan-style twisted tower, a few plain towers around the Burj.
  for (const [fx, fh, fw] of [
    [0.47, 0.28, 5],
    [0.68, 0.3, 6],
    [0.73, 0.24, 7],
    [0.79, 0.33, 5],
    [0.84, 0.22, 8],
    [0.3, 0.2, 9],
  ]) {
    g.fillRect(layerWidth * fx, horizon - h * fh, fw * unit, h * fh);
  }

  // Museum of the Future: a ring on a low base.
  const mx = layerWidth * 0.22;
  const my = horizon - 9 * unit;
  g.beginPath();
  g.ellipse(mx, my, 9 * unit, 7 * unit, 0, 0, Math.PI * 2);
  g.ellipse(mx, my - 0.5 * unit, 5 * unit, 3.4 * unit, 0, 0, Math.PI * 2, true);
  g.fill("evenodd");
  g.fillRect(mx - 10 * unit, horizon - 3 * unit, 20 * unit, 3 * unit);

  // Dubai Frame.
  const fx = layerWidth * 0.1;
  g.fillRect(fx, horizon - 22 * unit, 2.2 * unit, 22 * unit);
  g.fillRect(fx + 11 * unit, horizon - 22 * unit, 2.2 * unit, 22 * unit);
  g.fillRect(fx, horizon - 22 * unit, 13.2 * unit, 2.4 * unit);

  // Burj Al Arab: a sail on the water, far right.
  const bx = layerWidth * 0.93;
  g.beginPath();
  g.moveTo(bx, horizon);
  g.quadraticCurveTo(bx + 1 * unit, horizon - 22 * unit, bx + 7 * unit, horizon - 30 * unit);
  g.lineTo(bx + 8 * unit, horizon);
  g.closePath();
  g.fill();
  g.fillRect(bx + 7.5 * unit, horizon - 34 * unit, 0.6 * unit, 34 * unit);

  // Sheikh Zayed Road traffic.
  const cars: Car[] = Array.from({ length: 70 }, () => ({
    lane: Math.floor(rand() * 4),
    x: rand() * layerWidth,
    speed: (40 + rand() * 60) * dpr,
    dir: rand() < 0.5 ? 1 : -1,
  }));

  return {
    w,
    h,
    dpr,
    horizon,
    layers: [far, mid, near].map(({ canvas, parallax, lights }) => ({ canvas, parallax, lights })),
    cars,
    beacon,
  };
}

function draw(ctx: CanvasRenderingContext2D, s: Scene, t: number) {
  const { w, h, horizon, dpr } = s;

  // Sky: black at the top, navy, then a teal glow at the horizon.
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, "#000000");
  sky.addColorStop(0.55, "#01182a");
  sky.addColorStop(0.9, "#064e68");
  sky.addColorStop(1, "#0e7c8c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, horizon);

  // Slow pan back and forth.
  const pan = (Math.sin(t * 0.05) * 0.5 + 0.5) * (s.layers[0].canvas.width - w);

  s.layers.forEach((layer, i) => {
    const ox = -pan * layer.parallax;
    ctx.drawImage(layer.canvas, ox, 0);
    // Haze between layers.
    if (i < 2) {
      const haze = ctx.createLinearGradient(0, horizon - h * 0.3, 0, horizon);
      haze.addColorStop(0, "rgba(14,124,140,0)");
      haze.addColorStop(1, "rgba(14,124,140,0.12)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, horizon - h * 0.3, w, h * 0.3);
    }
    for (const l of layer.lights) {
      const x = l.x + ox;
      if (x < -4 || x > w + 4) continue;
      const a = 0.35 + 0.65 * Math.abs(Math.sin(t * l.speed + l.phase)) ** 6;
      ctx.fillStyle = l.warm ? `rgba(255,214,150,${a * 0.8})` : `rgba(160,236,240,${a})`;
      ctx.fillRect(x - l.r, l.y - l.r, l.r * 2, l.r * 2);
    }
  });

  // Aviation light on the Burj spire.
  const near = s.layers[2];
  const bx = s.beacon.x - pan * near.parallax;
  if (Math.sin(t * 3) > 0.2) {
    ctx.fillStyle = "rgba(255,70,60,0.95)";
    ctx.beginPath();
    ctx.arc(bx, s.beacon.y, 2.2 * dpr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Road and traffic.
  const road = horizon - 1.5 * dpr;
  for (const car of s.cars) {
    car.x += car.dir * car.speed * (1 / 60);
    const span = near.canvas.width;
    if (car.x > span) car.x = 0;
    if (car.x < 0) car.x = span;
    const x = car.x - pan;
    if (x < -20 || x > w + 20) continue;
    const y = road - car.lane * 1.6 * dpr;
    ctx.fillStyle = car.dir > 0 ? "rgba(255,90,70,0.85)" : "rgba(255,240,210,0.9)";
    ctx.fillRect(x, y, 7 * dpr, 1.2 * dpr);
  }

  // Water: the skyline reflected, broken into wavering strips.
  const waterH = h - horizon;
  ctx.fillStyle = "#00070c";
  ctx.fillRect(0, horizon, w, waterH);
  ctx.save();
  ctx.globalAlpha = 0.28;
  const strip = 3 * dpr;
  for (let y = 0; y < waterH; y += strip) {
    const srcY = horizon - y - strip;
    if (srcY < 0) break;
    const wobble = Math.sin(t * 1.4 + y * 0.12) * (1 + y / waterH) * 3 * dpr;
    ctx.drawImage(ctx.canvas, 0, srcY, w, strip, wobble, horizon + y, w, strip);
  }
  ctx.restore();
  const fade = ctx.createLinearGradient(0, horizon, 0, h);
  fade.addColorStop(0, "rgba(0,7,12,0)");
  fade.addColorStop(1, "rgba(0,7,12,0.95)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, horizon, w, waterH);
}
