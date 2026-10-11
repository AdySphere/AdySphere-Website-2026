"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Stars, Trail, useGLTF } from "@react-three/drei";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import type { MotionValue } from "motion/react";
import { lobes } from "@/lib/site";

const TEAL = new THREE.Color("#34c4c9");
const MARK_HEIGHT = 2.2;
const RING_RADIUS = 1.55;
const TAU = Math.PI * 2;

type Pointer = { x: number; y: number };

export type HeroSceneProps = {
  progress: MotionValue<number>;
  active: boolean;
  glbUrl: string | null;
  onReady: () => void;
};

export default function HeroScene({ progress, active, glbUrl, onReady }: HeroSceneProps) {
  const pointer = usePointerTarget();
  const labels = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 2]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [0, 0, 7], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} color="#fff6e6" />
        <directionalLight position={[-4, -2, 2]} intensity={0.6} color={TEAL} />
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={3} color="#f8f7f5" position={[0, 4, 4]} scale={[8, 1.5, 1]} />
          <Lightformer form="rect" intensity={1.4} color="#f8f7f5" position={[0, 0, 6]} scale={[6, 3, 1]} />
          <Lightformer
            form="rect"
            intensity={1.6}
            color="#34c4c9"
            position={[-5, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[6, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={0.8}
            color="#ffffff"
            position={[5, -1, 1]}
            rotation-y={-Math.PI / 2}
            scale={[4, 4, 1]}
          />
        </Environment>

        <Stars radius={60} depth={40} count={1600} factor={2.2} saturation={0} fade speed={0.3} />

        <Rig progress={progress} pointer={pointer}>
          <Suspense fallback={null}>
            {glbUrl ? <GlbMark url={glbUrl} /> : <SvgMark />}
            <ReadySignal onReady={onReady} />
          </Suspense>
          <Orbit progress={progress} labels={labels} />
        </Rig>
      </Canvas>
      {/* Lobe labels live in the DOM so they stay crisp; Orbit positions them every frame. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {lobes.map((lobe, i) => (
          <div
            key={lobe}
            ref={(el) => void (labels.current[i] = el)}
            className="absolute left-0 top-0 whitespace-nowrap border border-teal/40 bg-navy-950/75 px-2 py-1 font-mono text-[11px] tracking-wide text-ivory opacity-0 will-change-transform"
          >
            {lobe}
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

const smooth = (a: number, b: number, v: number) => THREE.MathUtils.smoothstep(v, a, b);

/** Positions the whole composition: right-hand side on desktop, top on mobile, centred once the Brain unfolds. */
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
    const e = smooth(0.18, 0.45, p.current);

    const wide = viewport.aspect > 1.1;
    const restX = wide ? viewport.width * 0.22 : 0;
    const restY = wide ? 0 : viewport.height * 0.17;
    const restScale = wide ? Math.min(1, viewport.width / 7) : Math.min(1, viewport.width / 3.6);
    const openScale = Math.min(1, viewport.width / 6.6, viewport.height / 5.3);

    g.position.x = THREE.MathUtils.lerp(restX, 0, e);
    g.position.y = THREE.MathUtils.lerp(restY, 0, e);
    g.scale.setScalar(THREE.MathUtils.lerp(restScale, openScale, e));

    const { x, y } = pointer.current;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.18, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, y * 0.12, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

function useMarkMotion() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.32) * 0.38;
    ref.current.position.y = Math.sin(t * 0.6) * 0.03;
  });
  return ref;
}

function MarkMaterial() {
  return (
    <meshPhysicalMaterial
      color="#efe8d6"
      metalness={0.6}
      roughness={0.32}
      anisotropy={0.7}
      clearcoat={0.3}
      clearcoatRoughness={0.35}
      envMapIntensity={1.6}
    />
  );
}

/** Extrudes the filled paths of mark.svg. Stroked paths (the orbit) are skipped; the orbit is drawn as the ring. */
function SvgMark() {
  const data = useLoader(SVGLoader, "/brand/mark.svg");
  const ref = useMarkMotion();

  const geometry = useMemo(() => {
    const shapes = data.paths
      .filter((path) => {
        const fill = (path.userData?.style as { fill?: string } | undefined)?.fill;
        return fill && fill !== "none";
      })
      .flatMap((path) => path.toShapes());
    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 9,
      bevelEnabled: true,
      bevelThickness: 1.4,
      bevelSize: 0.7,
      bevelSegments: 5,
      curveSegments: 12,
    });
    geo.center();
    geo.computeBoundingBox();
    const height = geo.boundingBox!.max.y - geo.boundingBox!.min.y;
    const s = MARK_HEIGHT / height;
    geo.scale(s, s, s);
    return geo;
  }, [data]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <group ref={ref}>
      {/* SVG y points down; a half turn about X flips it upright without inverting the faces. */}
      <mesh geometry={geometry} rotation-x={Math.PI}>
        <MarkMaterial />
      </mesh>
    </group>
  );
}

function GlbMark({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useMarkMotion();
  const model = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = MARK_HEIGHT / size.y;
    clone.position.copy(center.multiplyScalar(-s));
    clone.scale.setScalar(s);
    return clone;
  }, [scene]);

  return (
    <group ref={ref}>
      <primitive object={model} />
    </group>
  );
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    onReady();
  });
  return null;
}

/**
 * The orbit sweep: a teal ring with a comet and trail. On scroll the ring widens, turns to face the viewer
 * and the comet splits into five nodes, one per Brain lobe.
 */
function Orbit({
  progress,
  labels,
}: {
  progress: MotionValue<number>;
  labels: React.RefObject<(HTMLDivElement | null)[]>;
}) {
  const tilt = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const ringMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const nodes = useRef<(THREE.Group | null)[]>([]);
  const spokes = useRef<THREE.BufferGeometry>(null);
  const spokeMat = useRef<THREE.LineBasicMaterial>(null);
  const trail = useRef<THREE.Mesh>(null);
  const comet = useRef<THREE.Group>(null);
  const angle = useRef(0.6);
  const p = useRef(0);

  const spokePositions = useMemo(() => new Float32Array(lobes.length * 6), []);

  useLayoutEffect(() => {
    spokes.current?.setAttribute("position", new THREE.BufferAttribute(spokePositions, 3));
  }, [spokePositions]);

  const world = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, size }, delta) => {
    p.current = THREE.MathUtils.damp(p.current, progress.get(), 6, delta);
    const expand = smooth(0.2, 0.48, p.current);
    const split = smooth(0.32, 0.56, p.current);

    angle.current += delta * 0.85 * (1 - 0.88 * split);

    if (tilt.current) {
      tilt.current.rotation.x = THREE.MathUtils.lerp(-1.2, -0.62, expand);
      tilt.current.rotation.z = THREE.MathUtils.lerp(-0.3, -0.08, expand);
    }
    const radius = RING_RADIUS * (1 + 0.42 * expand);
    ring.current?.scale.setScalar(radius / RING_RADIUS);
    if (ringMat.current) ringMat.current.opacity = 0.55 * (1 - split) + 0.08 * split;
    if (glowMat.current) glowMat.current.opacity = 0.14 * (1 - split);

    const step = TAU / lobes.length;
    nodes.current.forEach((node, i) => {
      if (!node) return;
      const a = angle.current + i * step * split;
      const x = Math.cos(a) * radius;
      const y = Math.sin(a) * radius;
      node.position.set(x, y, 0);
      if (i === 0) comet.current?.position.set(x, y, 0);
      node.visible = i === 0 || split > 0.01;
      node.scale.setScalar(i === 0 ? 1 : split);
      spokePositions.set([0, 0, 0, x, y, 0], i * 6);

      const label = labels.current[i];
      if (label) {
        const opacity = smooth(0.5, 0.9, split);
        label.style.opacity = String(opacity);
        if (opacity > 0) {
          node.updateWorldMatrix(true, false);
          world.setFromMatrixPosition(node.matrixWorld).project(camera);
          const lx = ((world.x + 1) / 2) * size.width;
          const ly = ((1 - world.y) / 2) * size.height - 22;
          label.style.transform = `translate3d(${lx}px, ${ly}px, 0) translate(-50%, -50%)`;
        }
      }
    });
    if (spokes.current) spokes.current.attributes.position.needsUpdate = true;
    if (spokeMat.current) spokeMat.current.opacity = 0.35 * split;
    if (trail.current) {
      const mat = trail.current.material as THREE.Material;
      mat.transparent = true;
      mat.opacity = 1 - smooth(0, 0.6, split);
    }
  });

  return (
    <group position={[0, -0.18, 0]}>
      <group ref={tilt}>
        <group ref={ring}>
          <mesh>
            <torusGeometry args={[RING_RADIUS, 0.012, 12, 160]} />
            <meshBasicMaterial ref={ringMat} color={TEAL} transparent opacity={0.55} toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[RING_RADIUS, 0.06, 12, 160]} />
            <meshBasicMaterial
              ref={glowMat}
              color={TEAL}
              transparent
              opacity={0.14}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>

        <lineSegments>
          <bufferGeometry ref={spokes} />
          <lineBasicMaterial ref={spokeMat} color={TEAL} transparent opacity={0} toneMapped={false} />
        </lineSegments>

        {/* The comet and its trail ride on the first node; drei types the Trail ref as the geometry, but it is forwarded to the line mesh. */}
        <group ref={comet}>
          <Trail ref={trail as never} width={1.4} length={5} color={TEAL} attenuation={(t) => t * t}>
            <mesh>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#e8f3f4" toneMapped={false} />
            </mesh>
          </Trail>
        </group>

        {lobes.map((lobe, i) => (
          <group key={lobe} ref={(el) => void (nodes.current[i] = el)}>
            <Node />
          </group>
        ))}
      </group>
    </group>
  );
}

function Node() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.05, 20, 20]} />
        <meshBasicMaterial color="#e8f3f4" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshBasicMaterial
          color={TEAL}
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
