import { memo } from "react";

/**
 * Listing artwork, generated rather than stored.
 *
 * Each plate is an architectural elevation drawn deterministically from a seed,
 * so the same listing always gets the same skyline. Rendering it inline instead
 * of shipping twelve SVG files means no image requests, no layout shift, and
 * artwork that stays sharp at any size — a card thumbnail and a full-bleed
 * gallery frame are the same markup.
 */

const W = 1600;
const H = 1100;
const HORIZON = 830;

const SKIES: Array<[string, string, string]> = [
  ["#08060e", "#1a1030", "#3a1f4e"],
  ["#07060d", "#16112c", "#2d2350"],
  ["#090610", "#1e1236", "#48265a"],
  ["#06060f", "#131a33", "#22405c"],
  ["#0a0713", "#231435", "#54284c"],
];

const DISCS = ["#f0b23f", "#ff6a8d", "#9a85ff", "#46e0d0", "#f4effa"];
const EDGES = ["#f0b23f", "#ff6a8d", "#9a85ff", "#46e0d0"];
const LIT = ["#f0b23f", "#9a85ff", "#f4effa"];

/** mulberry32 — small, fast, and stable across runs. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  o?: number;
}

function block(
  x: number,
  w: number,
  h: number,
  base: number,
  fill: string,
  seed: number,
  out: Rect[]
) {
  const r = rng(seed);
  let top = base - h;
  out.push({ x, y: top, w, h, fill });

  // taller blocks get a setback, which keeps the skyline from reading as bars
  if (h > 260 && w > 120) {
    const sw = Math.round(w * (0.42 + r() * 0.24));
    const sh = Math.round(h * (0.16 + r() * 0.14));
    out.push({ x: x + Math.round((w - sw) / 2), y: top - sh, w: sw, h: sh, fill });
    top -= sh;
  }

  const cols = Math.max(2, Math.floor(w / 46));
  const rows = Math.max(3, Math.floor(h / 62));
  const gx = w / cols;
  const gy = (base - top - 26) / rows;

  for (let c = 0; c < cols; c++) {
    for (let n = 0; n < rows; n++) {
      if (r() < 0.66) continue;
      const lit = r() < 0.26;
      out.push({
        x: Math.round(x + gx * c + gx * 0.28),
        y: Math.round(top + 18 + gy * n + gy * 0.22),
        w: Math.max(3, Math.round(gx * 0.42)),
        h: Math.max(4, Math.round(gy * 0.44)),
        fill: lit ? LIT[Math.floor(r() * LIT.length)] : "#08060e",
        o: lit ? 0.3 + r() * 0.45 : 0.3 + r() * 0.25,
      });
    }
  }

  const edge = EDGES[seed % EDGES.length];
  out.push({ x, y: top - 2, w, h: 2, fill: edge, o: 0.55 });
  out.push({ x, y: top, w: 1.5, h: base - top, fill: edge, o: 0.25 });
}

function Plate({ seed, label }: { seed: number; label?: string }) {
  const i = ((seed % 12) + 12) % 12;
  const r = rng(1000 + i * 37);
  const [a, b, c] = SKIES[i % SKIES.length];
  const disc = DISCS[i % DISCS.length];

  const dx = 300 + Math.floor(r() * 1000);
  const dy = 150 + Math.floor(r() * 150);
  const dr = 70 + Math.floor(r() * 58);

  const layers: Array<[number, number, number, string, number]> = [
    [0.34, 70, 190, "#241a3d", HORIZON - 46],
    [0.62, 120, 290, "#161028", HORIZON - 16],
    [1, 150, 380, "#0a0712", HORIZON + 22],
  ];

  const groups = layers.map(([opacity, hmin, hmax, fill, base], li) => {
    const rects: Rect[] = [];
    let x = -20 - Math.floor(r() * 90);
    let n = 0;
    while (x < W) {
      const w = 76 + Math.floor(r() * 114);
      const h = hmin + Math.floor(r() * (hmax - hmin));
      block(x, w, h, base, fill, 7000 + i * 91 + li * 17 + n, rects);
      x += w + 24 + Math.floor(r() * 68);
      n++;
    }
    return { opacity, rects };
  });

  const uid = `p${i}`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="presentation"
    >
      <defs>
        <linearGradient id={`${uid}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="58%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
        <radialGradient id={`${uid}glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={disc} stopOpacity="0.5" />
          <stop offset="100%" stopColor={disc} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}haze`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0" />
          <stop offset="100%" stopColor={c} stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${uid}iri`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f0b23f" />
          <stop offset="35%" stopColor="#ff6a8d" />
          <stop offset="70%" stopColor="#9a85ff" />
          <stop offset="100%" stopColor="#46e0d0" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${uid}sky)`} />
      <circle cx={dx} cy={dy} r={dr * 4} fill={`url(#${uid}glow)`} />
      <circle cx={dx} cy={dy} r={dr} fill={disc} opacity="0.85" />

      <g fill="#f4effa" opacity="0.022">
        {Array.from({ length: Math.ceil(W / 64) }, (_, n) => (
          <rect key={`v${n}`} x={n * 64} y={0} width={1} height={HORIZON} />
        ))}
        {Array.from({ length: Math.ceil(HORIZON / 64) }, (_, n) => (
          <rect key={`h${n}`} x={0} y={n * 64} width={W} height={1} />
        ))}
      </g>

      {groups.map((g, gi) => (
        <g key={gi} opacity={g.opacity}>
          {g.rects.map((rc, ri) => (
            <rect
              key={ri}
              x={rc.x}
              y={rc.y}
              width={rc.w}
              height={rc.h}
              fill={rc.fill}
              opacity={rc.o}
            />
          ))}
        </g>
      ))}

      <rect x={0} y={HORIZON - 280} width={W} height={300} fill={`url(#${uid}haze)`} />
      <rect x={0} y={HORIZON + 22} width={W} height={H - HORIZON - 22} fill="#070510" />
      <rect x={0} y={HORIZON + 22} width={W} height={1.5} fill={disc} opacity="0.5" />

      <rect x={96} y={H - 78} width={360} height={1.5} fill={`url(#${uid}iri)`} opacity="0.85" />
      <text
        x={96}
        y={H - 94}
        fill={`url(#${uid}iri)`}
        opacity="0.9"
        fontFamily="monospace"
        fontSize="19"
        letterSpacing="5"
      >
        {label ?? `PLATE ${String(i + 1).padStart(2, "0")}`}
      </text>
    </svg>
  );
}

export default memo(Plate);
