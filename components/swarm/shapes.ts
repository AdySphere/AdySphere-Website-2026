/**
 * Particle shapes for the homepage swarm. Every shape gives each particle a position in normalised units
 * (roughly -1..1); the scene places and scales each shape for the current viewport.
 * Order matters: the index is the shape id used by the shader.
 */
export const SHAPES = ["face", "scatter", "wave", "sphere", "helix", "galaxy", "vortex"] as const;
export type ShapeName = (typeof SHAPES)[number];

const TAU = Math.PI * 2;

export type SwarmData = {
  count: number;
  shapes: Float32Array[]; // one xyz array per shape, same order as SHAPES
  seed: Float32Array;
  tint: Float32Array;
};

/** Samples the artwork's bright pixels. Edge pixels are favoured so outlines (profile, circuit lines) read clearly. */
async function sampleArt(url: string, count: number): Promise<{ pts: Float32Array; edge: Uint8Array }> {
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  await img.decode();

  // Fine enough to keep the eye, lips and thin circuit traces of the artwork.
  const res = 320;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = res;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, res, res);
  const px = ctx.getImageData(0, 0, res, res).data;

  const on = new Uint8Array(res * res);
  for (let i = 0; i < res * res; i++) {
    const r = px[i * 4];
    const g = px[i * 4 + 1];
    const b = px[i * 4 + 2];
    if (px[i * 4 + 3] > 120 && (g + b) / 2 > 70 && g + b > r * 1.4) on[i] = 1;
  }
  const fill: number[] = [];
  const edges: number[] = [];
  for (let i = 0; i < res * res; i++) {
    if (!on[i]) continue;
    fill.push(i);
    const x = i % res;
    if (x === 0 || x === res - 1 || !on[i - 1] || !on[i + 1] || !on[i - res] || !on[i + res]) edges.push(i);
  }

  const pts = new Float32Array(count * 3);
  const edge = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const onEdge = edges.length > 0 && Math.random() < 0.4;
    const pool = onEdge ? edges : fill.length ? fill : [Math.floor(res * res * 0.5)];
    const p = pool[Math.floor(Math.random() * pool.length)];
    const u = (p % res) / res + (Math.random() - 0.5) / res;
    const v = Math.floor(p / res) / res + (Math.random() - 0.5) / res;
    pts.set([u - 0.5, -(v - 0.5), (0.5 - u) * 0.12 + (Math.random() - 0.5) * 0.02], i * 3);
    edge[i] = onEdge ? 1 : 0;
  }
  return { pts, edge };
}

function scatter(count: number) {
  const a = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    a.set([(Math.random() * 2 - 1) * 1.1, (Math.random() * 2 - 1) * 0.65, (Math.random() * 2 - 1) * 0.6], i * 3);
  }
  return a;
}

/** A flat field of particles; the shader animates the swell and tilts it into a band. */
function wave(count: number) {
  const a = new Float32Array(count * 3);
  const cols = Math.ceil(Math.sqrt(count * 4));
  for (let i = 0; i < count; i++) {
    const x = ((i % cols) / cols) * 2 - 1;
    const z = (Math.floor(i / cols) / Math.ceil(count / cols)) * 2 - 1;
    a.set([x * 1.2 + (Math.random() - 0.5) * 0.01, 0, z * 0.35], i * 3);
  }
  return a;
}

/** A shell with a denser core: the shared AI layer. */
function sphere(count: number) {
  const a = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const shell = Math.random() < 0.8 ? 1 : Math.cbrt(Math.random()) * 0.6;
    a.set([Math.cos(th) * r * shell, y * shell, Math.sin(th) * r * shell], i * 3);
  }
  return a;
}

/** A double helix with rungs. */
function helix(count: number) {
  const a = new Float32Array(count * 3);
  const turns = 2.4;
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const y = (t - 0.5) * 2.6;
    const ang = t * turns * TAU;
    const roll = Math.random();
    let x: number;
    let z: number;
    if (roll < 0.82) {
      const strand = roll < 0.41 ? 0 : Math.PI;
      const jitter = 0.05 * Math.cbrt(Math.random());
      x = Math.cos(ang + strand) * 0.42 + (Math.random() - 0.5) * jitter;
      z = Math.sin(ang + strand) * 0.42 + (Math.random() - 0.5) * jitter;
    } else {
      // Rung: a point between the two strands, at a rung height.
      const rungT = Math.round(t * 34) / 34;
      const rAng = rungT * turns * TAU;
      const k = Math.random() * 2 - 1;
      x = Math.cos(rAng) * 0.42 * k;
      z = Math.sin(rAng) * 0.42 * k;
    }
    a.set([x, y, z], i * 3);
  }
  return a;
}

/** A three-armed spiral galaxy in the XZ plane, with a bright core. */
function galaxy(count: number) {
  const a = new Float32Array(count * 3);
  const arms = 3;
  for (let i = 0; i < count; i++) {
    const core = Math.random() < 0.15;
    const r = core ? Math.pow(Math.random(), 2) * 0.18 : 0.08 + Math.pow(Math.random(), 0.7) * 0.92;
    const arm = (i % arms) * (TAU / arms);
    const spin = r * 5.2;
    const spread = (Math.random() - 0.5) * (0.5 - r * 0.25);
    const ang = arm + spin + spread;
    const y = (Math.random() - 0.5) * 0.06 * (1 - r);
    a.set([Math.cos(ang) * r, y, Math.sin(ang) * r], i * 3);
  }
  return a;
}

/** An accretion ring around an empty centre. */
function vortex(count: number) {
  const a = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 0.45 + Math.pow(Math.random(), 2.2) * 0.75;
    const ang = Math.random() * TAU;
    a.set([Math.cos(ang) * r, Math.sin(ang) * r, (Math.random() - 0.5) * 0.08], i * 3);
  }
  return a;
}

export async function buildSwarm(artUrl: string, count: number): Promise<SwarmData> {
  const { pts: face, edge } = await sampleArt(artUrl, count);
  const seed = new Float32Array(count);
  const tint = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    seed[i] = Math.random();
    tint[i] = edge[i] ? 0.45 : Math.random() < 0.05 ? 1 : 0;
  }
  return {
    count,
    shapes: [face, scatter(count), wave(count), sphere(count), helix(count), galaxy(count), vortex(count)],
    seed,
    tint,
  };
}
