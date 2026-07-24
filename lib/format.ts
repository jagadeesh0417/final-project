import type { Deal, Facing } from "./types";

const CR = 10_000_000;
const L = 100_000;

/** ₹11.80 Cr · ₹96.00 L · ₹78,000 — the way prices are actually quoted in India. */
export function price(value: number, deal: Deal = "sale") {
  const suffix = deal === "rent" ? " / mo" : "";
  if (value >= CR) return `₹${(value / CR).toFixed(2)} Cr${suffix}`;
  if (value >= L) return `₹${(value / L).toFixed(2)} L${suffix}`;
  return `₹${value.toLocaleString("en-IN")}${suffix}`;
}

/** Compact form for dense tables and chips. */
export function priceShort(value: number) {
  if (value >= CR) return `₹${(value / CR).toFixed(1)}Cr`;
  if (value >= L) return `₹${(value / L).toFixed(1)}L`;
  return `₹${Math.round(value / 1000)}k`;
}

export function area(sqft: number) {
  if (sqft >= 43560) return `${(sqft / 43560).toFixed(2)} acres`;
  return `${sqft.toLocaleString("en-IN")} sq ft`;
}

export function rate(value: number, sqft: number) {
  return `₹${Math.round(value / sqft).toLocaleString("en-IN")} / sq ft`;
}

const COMPASS: Record<Facing, string> = {
  N: "North",
  NE: "North-east",
  E: "East",
  SE: "South-east",
  S: "South",
  SW: "South-west",
  W: "West",
  NW: "North-west",
};

export function facing(f: Facing) {
  return COMPASS[f];
}

/** Degrees clockwise from north — drives the compass mark. */
export function bearing(f: Facing) {
  return { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 }[f];
}


export function emi(principal: number, annualRate: number, years: number) {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
