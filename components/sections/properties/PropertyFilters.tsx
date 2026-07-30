"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { AMENITIES, CITIES } from "../../../lib/data";
import { priceShort } from "../../../lib/format";
import { countActive, parseFilters, toSearchParams } from "../../../lib/query";
import type { Category, Deal, Facing, Filters } from "../../../lib/types";

const CATEGORIES: Array<{ value: Category | ""; label: string }> = [
  { value: "", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
];

const FACINGS: Facing[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const CEILING = 300_000_000;
const BUDGET_STEPS = [
  { label: "Any", min: 0, max: 0 },
  { label: "Under ₹3 Cr", min: 0, max: 30000000 },
  { label: "₹3–10 Cr", min: 30000000, max: 100000000 },
  { label: "₹10–25 Cr", min: 100000000, max: 250000000 },
  { label: "Above ₹25 Cr", min: 250000000, max: 0 },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-desc", label: "Largest First" },
  { value: "popularity", label: "Most Viewed" },
];

interface Props {
  total: number;
  pending: boolean;
}

export default function PropertyFilters({ total, pending }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [, start] = useTransition();

  const current = useMemo(
    () => parseFilters(Object.fromEntries(params.entries())),
    [params]
  );

  const [draft, setDraft] = useState<Filters>(current);
  const [open, setOpen] = useState(false);
  const first = useRef(true);

  useEffect(() => setDraft(current), [current]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const t = setTimeout(() => {
      const next = toSearchParams({ ...draft, page: 1 }).toString();
      if (next !== params.toString()) {
        start(() => router.replace(next ? `/properties?${next}` : "/properties", { scroll: false }));
      }
    }, 260);
    return () => clearTimeout(t);
  }, [draft, params, router]);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const toggleAmenity = (a: string) =>
    setDraft((d) => ({
      ...d,
      amenities: d.amenities.includes(a) ? d.amenities.filter((x) => x !== a) : [...d.amenities, a],
    }));

  const active = countActive(draft);

  const filterBody = (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3 block">Search</label>
        <input
          className="input-lux"
          placeholder="Locality, name or city..."
          value={draft.q}
          onChange={(e) => set("q", e.target.value)}
        />
      </div>

      {/* Purpose */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3">Purpose</p>
        <div className="flex gap-2">
          {(["", "sale", "rent"] as const).map((d) => (
            <button
              key={d || "all"}
              onClick={() => set("deal", d as Deal | "")}
              className={`flex-1 rounded-full px-4 py-2.5 text-xs font-medium transition-all ${
                draft.deal === d ? "bg-dark text-white" : "bg-bg text-dark/60 hover:bg-border"
              }`}
            >
              {d === "" ? "All" : d === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3 block">City</label>
        <select className="select-lux" value={draft.city} onChange={(e) => set("city", e.target.value)}>
          <option value="">All Cities</option>
          {CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
      </div>

      {/* Property Type */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3">Property Type</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => set("category", (draft.category === c.value ? "" : c.value) as Category | "")}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                draft.category === c.value ? "bg-dark text-white" : "bg-bg text-dark/60 hover:bg-border"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3">Budget</p>
        <div className="flex flex-wrap gap-2">
          {BUDGET_STEPS.map((b, i) => (
            <button
              key={b.label}
              onClick={() => { set("min", b.min); set("max", b.max); }}
              className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                draft.min === b.min && draft.max === b.max ? "bg-dark text-white" : "bg-bg text-dark/60 hover:bg-border"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray">Price Range</span>
          <span className="num text-sm text-gold">
            {draft.max ? `₹0 – ${priceShort(draft.max)}` : "Any"}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={CEILING}
          step={5000000}
          value={draft.max}
          onChange={(e) => set("max", Number(e.target.value))}
          className="w-full accent-gold"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-gray">₹0</span>
          <span className="text-[10px] text-gray">₹30 Cr+</span>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3">Bedrooms</p>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => set("bedrooms", n)}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                draft.bedrooms === n ? "bg-dark text-white" : "bg-bg text-dark/60 hover:bg-border"
              }`}
            >
              {n === 0 ? "Any" : `${n}`}
            </button>
          ))}
        </div>
      </div>

      {/* Facing */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3">Facing</p>
        <div className="flex flex-wrap gap-2">
          {FACINGS.map((f) => (
            <button
              key={f}
              onClick={() => set("facing", draft.facing === f ? "" : f)}
              className={`rounded-full px-3 py-2 text-xs font-medium transition-all ${
                draft.facing === f ? "bg-dark text-white" : "bg-bg text-dark/60 hover:bg-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-3">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.slice(0, 12).map((a) => (
            <button
              key={a}
              onClick={() => toggleAmenity(a)}
              className={`rounded-full px-3 py-2 text-xs font-medium transition-all ${
                draft.amenities.includes(a) ? "bg-dark text-white" : "bg-bg text-dark/60 hover:bg-border"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      {active > 0 && (
        <button
          onClick={() => setDraft({ ...draft, city: "", deal: "", category: "", bedrooms: 0, min: 0, max: 0, minArea: 0, facing: "", amenities: [], q: "" })}
          className="btn-lux btn-outline w-full justify-center text-xs"
        >
          Clear All Filters ({active})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
        <p className="text-sm text-gray">
          {pending ? "Updating..." : `${total} propert${total === 1 ? "y" : "ies"}`}
        </p>
        <button
          onClick={() => setOpen(true)}
          className="btn-lux btn-outline text-xs px-5 py-2.5"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters {active > 0 && `(${active})`}
        </button>
      </div>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-bg lg:hidden">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <p className="font-medium">Filters</p>
            <button onClick={() => setOpen(false)} className="btn-lux btn-gold text-xs px-5 py-2">
              Show {total} results
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-6">{filterBody}</div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[var(--radius)] border border-border bg-surface p-6 lg:block" style={{ width: 320 }}>
        <div className="mb-6 flex items-baseline justify-between">
          <span className="text-sm font-medium">Filters</span>
          <span className="num text-sm text-gold">
            {pending ? "..." : String(total).padStart(2, "0")}
          </span>
        </div>
        {filterBody}
      </aside>
    </>
  );
}
