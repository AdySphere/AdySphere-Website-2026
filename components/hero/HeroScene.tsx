"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { departments } from "@/lib/site";

const ART_SIZE = 3.4; // world units across the artwork
const RING_RADIUS = 1.9;
const TAU = Math.PI * 2;

type Pointer = { x: number; y: number };

export type HeroSceneProps = {
  progress: MotionValue<number>;
  active: boolean;
  /** Image whose bright pixels become particles: the circuit face. */
  artUrl: string;
  onReady: () => void;
};

export default function HeroScene({ progress, active, artUrl, onReady }: HeroSceneProps) {
  const pointer = usePointerTarget();
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const points = useArtPoints(artUrl);

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 2]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 35 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        {points && (
          <Rig progress={progress} pointer={pointer}>
            <Particles data={points} progress={progress} labels={labels} onReady={onReady} />
          </Rig>
        )}
      </Canvas>
      {/* Department labels live in the DOM so they stay crisp; Particles positions them every frame. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {departments.map((dept, i) => (
          <div
            key={dept}
            ref={(el) => void (labels.current[i] = el)}
            className="absolute left-0 top-0 whitespace-nowrap border border-teal/40 bg-navy-950/70 px-2 py-1 font-mono text-[11px] tracking-wide text-ivory opacity-0 backdrop-blur-sm will-change-transform"
          >
            {dept}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mouse position on desktop, device tilt on mobile, normalised to [-1, 1]. */
function usePointerTarget() {
  const target = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      target.current.x = THREE.MathUtils.clamp(e.gamma / 30, -1, 1);
      target.current.y = THREE.MathUtils.clamp((e.beta - 45) / 30, -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onTilt, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);

  return target;
}

type ArtPoints = {
  count: number;
  target: Float32Array;
  start: Float32Array;
  node: Float32Array;
  seed: Float32Array;
  tint: Float32Array;
};

/**
 * Rasterises the artwork into a small canvas and turns bright pixels into particle targets.
 * Each particle also gets a start position (streaming in from the right, along the circuit lines)
 * and a destination in one of the five department clusters, or on the stream leading to it.
 */
function useArtPoints(url: string) {
  const [data, setData] = useState<ArtPoints | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (cancelled) return;
      const res = 220;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = res;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, res, res);
      const pixels = ctx.getImageData(0, 0, res, res).data;

      // Bright, teal-ish pixels on a dark or transparent background.
      const on = new Uint8Array(res * res);
      for (let i = 0; i < res * res; i++) {
        const r = pixels[i * 4];
        const g = pixels[i * 4 + 1];
        const b = pixels[i * 4 + 2];
        const a = pixels[i * 4 + 3];
        if (a > 120 && (g + b) / 2 > 70 && g + b > r * 1.4) on[i] = 1;
      }
      // Edge pixels trace the outline (profile, circuit lines) and get extra, brighter particles.
      const candidates: number[] = [];
      const edges: number[] = [];
      for (let i = 0; i < res * res; i++) {
        if (!on[i]) continue;
        candidates.push(i);
        const x = i % res;
        if (x === 0 || x === res - 1 || !on[i - 1] || !on[i + 1] || !on[i - res] || !on[i + res]) edges.push(i);
      }
      if (candidates.length === 0) return;

      const small = window.matchMedia("(max-width: 767px)").matches;
      const count = Math.min(small ? 8000 : 18000, candidates.length * 3);
      const target = new Float32Array(count * 3);
      const start = new Float32Array(count * 3);
      const node = new Float32Array(count * 3);
      const seed = new Float32Array(count);
      const tint = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        const onEdge = edges.length > 0 && Math.random() < 0.35;
        const pool = onEdge ? edges : candidates;
        const px = pool[Math.floor(Math.random() * pool.length)];
        const u = (px % res) / res + (Math.random() - 0.5) / res;
        const v = Math.floor(px / res) / res + (Math.random() - 0.5) / res;
        const x = (u - 0.5) * ART_SIZE;
        const y = -(v - 0.5) * ART_SIZE;
        // A shallow relief: the profile sits forward, the circuits trail back.
        const z = (0.5 - u) * 0.35 + (Math.random() - 0.5) * 0.06;
        target.set([x, y, z], i * 3);

        start.set(
          [x + 3.5 + Math.random() * 5, y + (Math.random() - 0.5) * 0.25, z + (Math.random() - 0.5) * 1.5],
          i * 3,
        );

        const lobe = i % departments.length;
        const angle = -Math.PI / 2 + (lobe * TAU) / departments.length;
        const nx = Math.cos(angle) * RING_RADIUS;
        const ny = Math.sin(angle) * RING_RADIUS;
        if (Math.random() < 0.3) {
          // On the data stream from the centre to the department.
          const t = Math.random();
          node.set([nx * t, ny * t, (Math.random() - 0.5) * 0.05], i * 3);
        } else {
          // In the department's cluster.
          const r = Math.cbrt(Math.random()) * 0.2;
          const th = Math.random() * TAU;
          const ph = Math.acos(2 * Math.random() - 1);
          node.set([nx + r * Math.sin(ph) * Math.cos(th), ny + r * Math.sin(ph) * Math.sin(th), r * Math.cos(ph)], i * 3);
        }

        seed[i] = Math.random();
        tint[i] = onEdge ? 0.55 : Math.random() < 0.05 ? 1 : 0;
      }

      setData({ count, target, start, node, seed, tint });
    };
    img.src = url;
    return () => {
      cancelled = true;
    };
  }, [url]);

  return data;
}

const smooth = (a: number, b: number, v: number) => THREE.MathUtils.smoothstep(v, a, b);

/** Positions the composition: right-hand side on desktop, top on mobile, centred once it splits. */
function Rig({
  progress,
  pointer,
  children,
}: {
  progress: MotionValue<number>;
  pointer: React.RefObject<Pointer>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const p = useRef(0);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    p.current = THREE.MathUtils.damp(p.current, progress.get(), 6, delta);
    const e = smooth(0.15, 0.45, p.current);

    const wide = viewport.aspect > 1.1;
    const restX = wide ? viewport.width * 0.24 : 0;
    const restY = wide ? 0 : viewport.height * 0.24;
    const restScale = wide ? Math.min(1, viewport.width / 8.5) : Math.min(1, viewport.width / 4.6);
    const openScale = Math.min(1, viewport.width / 5.4, viewport.height / 5);

    g.position.x = THREE.MathUtils.lerp(restX, 0, e);
    g.position.y = THREE.MathUtils.lerp(restY, 0, e);
    g.scale.setScalar(THREE.MathUtils.lerp(restScale, openScale, e));

    const { x, y } = pointer.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.3, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, y * 0.18, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

const vertexShader = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aNode;
  attribute float aSeed;
  attribute float aTint;
  uniform float uTime;
  uniform float uAssemble;
  uniform float uSplit;
  uniform float uRing;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vTint;
  varying float vPulse;

  vec2 rotate(vec2 p, float a) {
    float c = cos(a), s = sin(a);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }

  void main() {
    // Assemble: particles stream in from the right, circuits first, then the face.
    float u = position.x / ${ART_SIZE.toFixed(1)} + 0.5;
    float delay = (1.0 - u) * 0.55 + aSeed * 0.25;
    float a = clamp((uAssemble - delay) / 0.6, 0.0, 1.0);
    a = 1.0 - pow(1.0 - a, 3.0);
    vec3 pos = mix(aStart, position, a);

    // Idle drift.
    pos += 0.012 * vec3(sin(uTime * 1.1 + position.y * 9.0 + aSeed * 6.28), cos(uTime * 0.9 + position.x * 7.0), 0.0);

    // Split into the five department clusters, which slowly turn.
    float s = clamp(uSplit * 1.5 - aSeed * 0.5, 0.0, 1.0);
    s = s * s * (3.0 - 2.0 * s);
    vec3 node = aNode;
    node.xy = rotate(node.xy, uRing);
    pos = mix(pos, node, s);

    // A pulse that sweeps right to left, like signal running along the circuits.
    float sweep = fract(uTime * 0.18);
    vPulse = 0.7 * smoothstep(0.035, 0.0, abs((1.0 - u) - (sweep * 1.6 - 0.3))) * (1.0 - s);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = uSize * (0.55 + aSeed * 0.9) * (1.0 + aTint * 0.5);
    gl_PointSize = size * uPixelRatio * (7.0 / -mv.z);
    vAlpha = a * (0.75 + 0.35 * aSeed);
    vTint = aTint;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uHighlight;
  varying float vAlpha;
  varying float vTint;
  varying float vPulse;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uColor, uHighlight, max(vTint, vPulse * 0.8));
    gl_FragColor = vec4(color, soft * vAlpha * (0.75 + vPulse * 0.6));
  }
`;

function Particles({
  data,
  progress,
  labels,
  onReady,
}: {
  data: ArtPoints;
  progress: MotionValue<number>;
  labels: React.RefObject<(HTMLDivElement | null)[]>;
  onReady: () => void;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const points = useRef<THREE.Points>(null);
  const { gl, camera, size } = useThree();
  const p = useRef(0);
  const ring = useRef(0);
  const ready = useRef(false);
  const world = useMemo(() => new THREE.Vector3(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.target, 3));
    geo.setAttribute("aStart", new THREE.BufferAttribute(data.start, 3));
    geo.setAttribute("aNode", new THREE.BufferAttribute(data.node, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(data.seed, 1));
    geo.setAttribute("aTint", new THREE.BufferAttribute(data.tint, 1));
    return geo;
  }, [data]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAssemble: { value: 0 },
      uSplit: { value: 0 },
      uRing: { value: 0 },
      uSize: { value: 2.0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color("#34c4c9") },
      uHighlight: { value: new THREE.Color("#e8f3f4") },
    }),
    [gl],
  );

  const nodes = useMemo(
    () =>
      departments.map((_, i) => {
        const angle = -Math.PI / 2 + (i * TAU) / departments.length;
        return new THREE.Vector2(Math.cos(angle) * RING_RADIUS, Math.sin(angle) * RING_RADIUS);
      }),
    [],
  );

  useFrame((_, delta) => {
    const m = material.current;
    const obj = points.current;
    if (!m || !obj) return;
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
    p.current = THREE.MathUtils.damp(p.current, progress.get(), 6, delta);
    const split = smooth(0.22, 0.55, p.current);
    ring.current += delta * 0.06 * split;

    m.uniforms.uTime.value += delta;
    m.uniforms.uAssemble.value = Math.min(1.5, m.uniforms.uAssemble.value + delta * 0.45);
    m.uniforms.uSplit.value = split;
    m.uniforms.uRing.value = ring.current;

    const labelOpacity = smooth(0.55, 0.9, split);
    obj.updateWorldMatrix(true, false);
    const c = Math.cos(ring.current);
    const s = Math.sin(ring.current);
    nodes.forEach((n, i) => {
      const label = labels.current[i];
      if (!label) return;
      label.style.opacity = String(labelOpacity);
      if (labelOpacity <= 0) return;
      world.set(c * n.x - s * n.y, s * n.x + c * n.y, 0).applyMatrix4(obj.matrixWorld).project(camera);
      const lx = ((world.x + 1) / 2) * size.width;
      const ly = ((1 - world.y) / 2) * size.height - 30;
      label.style.transform = `translate3d(${lx}px, ${ly}px, 0) translate(-50%, -50%)`;
    });
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
