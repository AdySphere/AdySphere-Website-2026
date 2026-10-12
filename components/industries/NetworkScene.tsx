"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const NODES = 150;
const LINKS_PER_NODE = 3;
const PULSES = 28;

/** Nodes spread over a sphere, each linked to its nearest neighbours: teams, systems and the handoffs between them. */
function buildNetwork() {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < NODES; i++) {
    const y = 1 - (i / (NODES - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const jitter = 0.92 + Math.random() * 0.16;
    nodes.push(new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(jitter));
  }
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ j, d: a.distanceToSquared(b) }))
      .filter((n) => n.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, LINKS_PER_NODE)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push([i, j]);
        }
      });
  });
  return { nodes, edges };
}

const dotVertex = /* glsl */ `
  attribute float aSize;
  uniform float uPixelRatio;
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (7.0 / -mv.z);
    vDepth = clamp((position.z + 1.0) * 0.5, 0.0, 1.0);
  }
`;
const dotFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vDepth;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, d) * uOpacity * (0.35 + 0.65 * vDepth));
  }
`;

function Network() {
  const group = useRef<THREE.Group>(null);
  const pulseGeo = useRef<THREE.BufferGeometry>(null);
  const { gl, viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });
  const { nodes, edges } = useMemo(buildNetwork, []);

  const nodePositions = useMemo(() => new Float32Array(nodes.flatMap((n) => [n.x, n.y, n.z])), [nodes]);
  const nodeSizes = useMemo(() => new Float32Array(nodes.map(() => 3 + Math.random() * 4)), [nodes]);
  const linePositions = useMemo(
    () => new Float32Array(edges.flatMap(([a, b]) => [...nodes[a].toArray(), ...nodes[b].toArray()])),
    [nodes, edges],
  );
  const pulses = useMemo(
    () => Array.from({ length: PULSES }, () => ({ edge: Math.floor(Math.random() * edges.length), t: Math.random(), speed: 0.15 + Math.random() * 0.25 })),
    [edges],
  );
  const pulsePositions = useMemo(() => new Float32Array(PULSES * 3), []);
  const pulseSizes = useMemo(() => new Float32Array(PULSES).fill(9), []);

  const pr = Math.min(gl.getPixelRatio(), 2);
  const dotUniforms = useMemo(
    () => ({ uPixelRatio: { value: pr }, uColor: { value: new THREE.Color("#34c4c9") }, uOpacity: { value: 0.85 } }),
    [pr],
  );
  const pulseUniforms = useMemo(
    () => ({ uPixelRatio: { value: pr }, uColor: { value: new THREE.Color("#8fb3ff") }, uOpacity: { value: 1 } }),
    [pr],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const a = new THREE.Vector3();
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const W = viewport.width;
    const H = viewport.height;
    const wide = W > H * 1.05;
    g.position.set(wide ? W * 0.3 : 0, wide ? 0 : H * 0.22, 0);
    g.scale.setScalar(wide ? H * 0.36 : W * 0.42);

    // A slow turn, nudged a little by scrolling and by the pointer.
    const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    g.rotation.y += delta * 0.04;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.25 + scroll * 0.5 + pointer.current.y * 0.08, 2, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, pointer.current.x * -0.06, 2, delta);

    // Pulses travel along the links, then hop to another link.
    pulses.forEach((p, i) => {
      p.t += delta * p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
      }
      const [from, to] = edges[p.edge];
      a.copy(nodes[from]).lerp(nodes[to], p.t);
      pulsePositions.set([a.x, a.y, a.z], i * 3);
    });
    if (pulseGeo.current) pulseGeo.current.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2b7fd6" transparent opacity={0.22} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[nodeSizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={dotVertex}
          fragmentShader={dotFragment}
          uniforms={dotUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points frustumCulled={false}>
        <bufferGeometry ref={pulseGeo}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[pulseSizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={dotVertex}
          fragmentShader={dotFragment}
          uniforms={pulseUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function NetworkScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 35 }} gl={{ antialias: true, alpha: true }} aria-hidden>
      <Network />
    </Canvas>
  );
}
