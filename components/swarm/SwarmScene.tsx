"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { buildSwarm, SHAPES, type ShapeName, type SwarmData } from "./shapes";

type Xform = [x: number, y: number, scale: number, intensity: number];

/** Where each shape sits, how big it is and how bright, for a viewport of W x H world units. */
function placement(shape: ShapeName, W: number, H: number): Xform {
  const wide = W > H * 1.05;
  switch (shape) {
    case "face":
      return [0, H * 0.02, Math.min(H * 1.0, W * 1.05), 1.1];
    case "scatter":
      return [0, 0, W * 0.5, 0.45];
    case "wave":
      return [0, -H * 0.24, W * 0.46, 0.85];
    case "sphere":
      return wide ? [W * 0.26, 0, H * 0.3, 0.75] : [0, H * 0.1, W * 0.35, 0.5];
    case "helix":
      return wide ? [W * 0.36, 0, H * 0.36, 0.75] : [0, 0, H * 0.3, 0.4];
    case "galaxy":
      return wide ? [W * 0.22, 0, Math.min(W * 0.48, H * 0.75), 0.95] : [0, H * 0.18, W * 0.62, 0.8];
    case "vortex":
      return wide ? [-W * 0.24, -H * 0.02, H * 0.3, 0.8] : [0, H * 0.3, W * 0.36, 0.6];
  }
}

const vertexShader = /* glsl */ `
  attribute vec3 aS0;
  attribute vec3 aS1;
  attribute vec3 aS2;
  attribute vec3 aS3;
  attribute vec3 aS4;
  attribute vec3 aS5;
  attribute vec3 aS6;
  attribute float aSeed;
  attribute float aTint;
  uniform float uTime;
  uniform float uFrom;
  uniform float uTo;
  uniform float uMix;
  uniform vec4 uFromXf;
  uniform vec4 uToXf;
  uniform float uIntro;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying float vTint;
  varying float vHue;

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.0, 0.0, 0.0, 0.0, c, s, 0.0, -s, c); }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c, s, 0.0, -s, c, 0.0, 0.0, 0.0, 1.0); }

  // Raw normalised position of this particle in shape 'id', with that shape's own motion.
  vec3 shape(float id) {
    float t = uTime;
    if (id < 0.5) {
      return rotY(sin(t * 0.3) * 0.12) * aS0;
    } else if (id < 1.5) {
      return aS1 + 0.04 * vec3(sin(t * 0.4 + aSeed * 40.0), cos(t * 0.33 + aSeed * 23.0), sin(t * 0.27 + aSeed * 11.0));
    } else if (id < 2.5) {
      vec3 p = aS2;
      p.y = 0.07 * sin(p.x * 5.0 + t * 0.9) * cos(p.z * 6.0 + t * 0.6) + 0.04 * sin(p.x * 11.0 - t * 1.3);
      return rotX(0.42) * p;
    } else if (id < 3.5) {
      return rotX(0.25) * rotY(t * 0.12) * aS3;
    } else if (id < 4.5) {
      return rotZ(0.18) * rotY(t * 0.35) * aS4;
    } else if (id < 5.5) {
      float r = length(aS5.xz);
      return rotX(1.05) * rotY(t * (0.05 + 0.08 / (r + 0.3))) * aS5;
    }
    float r6 = length(aS6.xy);
    return rotX(0.35) * rotZ(t * 0.35 / r6) * aS6;
  }

  vec3 place(vec3 p, vec4 xf) {
    return p * xf.z + vec3(xf.x, xf.y, 0.0);
  }

  void main() {
    vec3 a = place(shape(uFrom), uFromXf);
    vec3 b = place(shape(uTo), uToXf);

    // Each particle starts its journey at a slightly different moment, and swirls on the way.
    float m = clamp(uMix * 1.6 - aSeed * 0.6, 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);
    vec3 swirl = vec3(sin(aSeed * 40.0), cos(aSeed * 23.0), sin(aSeed * 11.0)) * sin(m * 3.14159) * 0.9;
    vec3 pos = mix(a, b, m) + swirl;

    // Intro: particles fly in from a single point of light.
    float intro = clamp(uIntro * 1.4 - aSeed * 0.4, 0.0, 1.0);
    intro = 1.0 - pow(1.0 - intro, 3.0);
    pos = mix(vec3(0.0, 0.0, 2.0), pos, intro);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aSeed * 0.9) * (1.0 + aTint * 0.6) * uPixelRatio * (7.0 / -mv.z);

    float intensity = mix(uFromXf.w, uToXf.w, m);
    vAlpha = intensity * intro * (0.6 + 0.4 * aSeed);
    vTint = aTint;
    vHue = clamp(0.5 + pos.x * 0.12 + (aSeed - 0.5) * 0.6, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uTeal;
  uniform vec3 uBlue;
  uniform vec3 uWhite;
  varying float vAlpha;
  varying float vTint;
  varying float vHue;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);
    vec3 color = mix(uTeal, uBlue, vHue);
    color = mix(color, uWhite, vTint * 0.7);
    gl_FragColor = vec4(color, soft * vAlpha);
  }
`;

type Section = { top: number; height: number; shape: number };

/** Reads the homepage's [data-swarm] sections. "hold" keeps the previous section's shape. */
function readSections(): Section[] {
  const out: Section[] = [];
  let last = 0;
  document.querySelectorAll<HTMLElement>("section[data-swarm]").forEach((el) => {
    const name = el.dataset.swarm as ShapeName | "hold";
    const shape = name === "hold" ? last : Math.max(0, SHAPES.indexOf(name));
    last = shape;
    const rect = el.getBoundingClientRect();
    out.push({ top: rect.top + window.scrollY, height: rect.height, shape });
  });
  return out;
}

function Swarm({ data, onReady }: { data: SwarmData; onReady: () => void }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const { gl, viewport } = useThree();
  const sections = useRef<Section[]>([]);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const ready = useRef(false);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // The face doubles as 'position' so three.js has a bounding volume; the shader uses aS0..aS6.
    geo.setAttribute("position", new THREE.BufferAttribute(data.shapes[0], 3));
    data.shapes.forEach((arr, i) => geo.setAttribute(`aS${i}`, new THREE.BufferAttribute(arr, 3)));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(data.seed, 1));
    geo.setAttribute("aTint", new THREE.BufferAttribute(data.tint, 1));
    return geo;
  }, [data]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uMix: { value: 0 },
      uFromXf: { value: new THREE.Vector4() },
      uToXf: { value: new THREE.Vector4() },
      uIntro: { value: 0 },
      uSize: { value: 2.0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uTeal: { value: new THREE.Color("#34c4c9") },
      uBlue: { value: new THREE.Color("#2b5cff") },
      uWhite: { value: new THREE.Color("#eaf6ff") },
    }),
    [gl],
  );

  useEffect(() => {
    const refresh = () => (sections.current = readSections());
    refresh();
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useFrame((_, delta) => {
    const m = material.current;
    const g = group.current;
    if (!m || !g) return;
    if (!ready.current) {
      ready.current = true;
      onReady();
    }

    // Continuous section index: whole numbers are "inside a section", fractions are morphs between shapes.
    // Morphs happen as a section's last ~40% passes the middle of the screen.
    const list = sections.current;
    let target = 0;
    if (list.length) {
      const line = window.scrollY + window.innerHeight * 0.55;
      let i = list.findIndex((s) => line < s.top + s.height);
      if (i === -1) i = list.length - 1;
      const s = list[i];
      const t = THREE.MathUtils.clamp((line - s.top) / s.height, 0, 1);
      target = i + THREE.MathUtils.smoothstep(t, 0.6, 1);
    }
    progress.current = THREE.MathUtils.damp(progress.current, target, 3.2, delta);

    const p = Math.max(0, progress.current);
    const i = Math.min(Math.floor(p), Math.max(0, list.length - 1));
    const from = list[i]?.shape ?? 0;
    const to = list[Math.min(i + 1, list.length - 1)]?.shape ?? from;
    const mix = from === to ? 0 : p - Math.floor(p);

    const W = viewport.width;
    const H = viewport.height;
    m.uniforms.uTime.value += delta;
    m.uniforms.uIntro.value = Math.min(1.2, m.uniforms.uIntro.value + delta * 0.5);
    m.uniforms.uFrom.value = from;
    m.uniforms.uTo.value = to;
    m.uniforms.uMix.value = mix;
    m.uniforms.uFromXf.value.set(...placement(SHAPES[from], W, H));
    m.uniforms.uToXf.value.set(...placement(SHAPES[to], W, H));

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.current.x * 0.12, 2.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.current.y * 0.08, 2.5, delta);
  });

  return (
    <group ref={group}>
      <points geometry={geometry} frustumCulled={false}>
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
    </group>
  );
}

export default function SwarmScene({ artUrl, onReady }: { artUrl: string; onReady: () => void }) {
  const [data, setData] = useState<SwarmData | null>(null);

  useEffect(() => {
    let cancelled = false;
    const small = window.matchMedia("(max-width: 767px)").matches;
    buildSwarm(artUrl, small ? 9000 : 22000)
      .then((d) => !cancelled && setData(d))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [artUrl]);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      {data && <Swarm data={data} onReady={onReady} />}
    </Canvas>
  );
}
