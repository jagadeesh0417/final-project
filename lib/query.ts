import { PROPERTIES } from "./data";
import type { Category, Deal, Facing, Filters, Property } from "./types";

export const PAGE_SIZE = 9;

export const DEFAULT_FILTERS: Filters = {
  q: "",
  city: "",
  deal: "",
  category: "",
  bedrooms: 0,
  min: 0,
  max: 0,
  minArea: 0,
  facing: "",
  amenities: [],
  sort: "recent",
  page: 1,
};

type Params = Record<string, string | string[] | undefined>;

function one(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

/** URL search params are the single source of truth for filter state. */
export function parseFilters(params: Params): Filters {
  const num = (k: string) => {
    const n = Number(one(params[k]));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };
  const amenities = one(params.amenities);
  return {
    q: one(params.q) ?? "",
    city: one(params.city) ?? "",
    deal: (one(params.deal) as Deal) ?? "",
    category: (one(params.category) as Category) ?? "",
    bedrooms: num("bedrooms"),
    min: num("min"),
    max: num("max"),
    minArea: num("minArea"),
    facing: (one(params.facing) as Facing) ?? "",
    amenities: amenities ? amenities.split(",").filter(Boolean) : [],
    sort: (one(params.sort) as Filters["sort"]) ?? "recent",
    page: num("page") || 1,
  };
}

export function toSearchParams(f: Partial<Filters>) {
  const sp = new URLSearchParams();
  const put = (k: string, v: unknown) => {
    if (v === "" || v === 0 || v === undefined || v === null) return;
    if (Array.isArray(v)) {
      if (v.length) sp.set(k, v.join(","));
      return;
    }
    if (k === "page" && v === 1) return;
    if (k === "sort" && v === "recent") return;
    sp.set(k, String(v));
  };
  Object.entries(f).forEach(([k, v]) => put(k, v));
  return sp;
}

export function countActive(f: Filters) {
  let n = 0;
  if (f.city) n++;
  if (f.deal) n++;
  if (f.category) n++;
  if (f.bedrooms) n++;
  if (f.min || f.max) n++;
  if (f.minArea) n++;
  if (f.facing) n++;
  n += f.amenities.length;
  return n;
}

export interface Result {
  items: Property[];
  total: number;
  page: number;
  pages: number;
}

/**
 * Runs against the seed array. The shape mirrors a Mongo query so the swap is
 * mechanical — see lib/db.ts.
 */
export function search(f: Filters, source: Property[] = PROPERTIES): Result {
  const q = f.q.trim().toLowerCase();

  let items = source.filter((p) => {
    if (p.status !== "approved") return false;
    if (f.city && p.address.city !== f.city) return false;
    if (f.deal && p.deal !== f.deal) return false;
    if (f.category && p.category !== f.category) return false;
    if (f.bedrooms && p.bedrooms < f.bedrooms) return false;
    if (f.min && p.price < f.min) return false;
    if (f.max && p.price > f.max) return false;
    if (f.minArea && p.areaSqft < f.minArea) return false;
    if (f.facing && p.facing !== f.facing) return false;
    if (f.amenities.length && !f.amenities.every((a) => p.amenities.includes(a))) return false;
    if (q) {
      const hay = `${p.title} ${p.tagline} ${p.address.locality} ${p.address.city} ${p.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  items = items.sort((a, b) => {
    switch (f.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "area-desc":
        return b.areaSqft - a.areaSqft;
      default:
        return b.listedAt.localeCompare(a.listedAt);
    }
  });

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(Math.max(1, f.page), pages);
  return {
    items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total,
    page,
    pages,
  };
}

/** Same city or same category, never the property itself. */
export function related(p: Property, limit = 3) {
  return PROPERTIES.filter(
    (o) =>
      o.id !== p.id &&
      o.status === "approved" &&
      (o.address.city === p.address.city || o.category === p.category)
  )
    .sort((a, b) => Math.abs(a.price - p.price) - Math.abs(b.price - p.price))
    .slice(0, limit);
}

export function priceBounds(source: Property[] = PROPERTIES) {
  const sale = source.filter((p) => p.deal === "sale").map((p) => p.price);
  return { min: 0, max: Math.max(...sale) };
}
