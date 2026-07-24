"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { AMENITIES, CITIES } from "../../lib/data";
import { priceShort } from "../../lib/format";
import { countActive, parseFilters, toSearchParams } from "../../lib/query";
import type { Category, Deal, Facing, Filters } from "../../lib/types";

const CATEGORIES: Array<{ value: Category; label: string }> = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "House" },
  { value: "plot", label: "Land" },
  { value: "commercial", label: "Commercial" },
];

const FACINGS: Facing[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const CEILING = 300_000_000;

export default function FilterRail({ total }: { total: number }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, start] = useTransition();

  const current = useMemo(
    () => parseFilters(Object.fromEntries(params.entries())),
    [params]
  );

  const [draft, setDraft] = useState<Filters>(current);
  const [open, setOpen] = useState(false);
  const first = useRef(true);

  // Keep local state in step when the URL changes from elsewhere (chips, links).
  useEffect(() => setDraft(current), [current]);

  // Debounce so dragging the budget handle doesn't push a route per frame.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      const next = toSearchParams({ ...draft, page: 1 }).toString();
      if (next !== params.toString()) {
        start(() => router.replace(next ? `/properties?${next}` : "/properties", { scroll: false }));
      }
    }, 260);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const toggleAmenity = (a: string) =>
    setDraft((d) => ({
      ...d,
      amenities: d.amenities.includes(a)
        ? d.amenities.filter((x) => x !== a)
        : [...d.amenities, a],
    }));

  const active = countActive(draft);

  const body = (
    <div className="flex flex-col gap-8">
      <div>
        <label className="data mb-3 block" htmlFor="f-q">Search</label>
        <input
          id="f-q"
          className="input"
          placeholder="Locality, name or city"
          value={draft.q}
          onChange={(e) => set("q", e.target.value)}
        />
      </div>

      <div>
        <p className="data mb-3">Looking to</p>
        <div className="flex flex-wrap gap-2">
          {(["", "sale", "rent"] as const).map((d) => (
            <button
              key={d || "any"}
              className="chip"
              data-on={draft.deal === d}
              onClick={() => set("deal", d as Deal | "")}
            >
              {d === "" ? "Either" : d === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="data mb-3 block" htmlFor="f-city">City</label>
        <select
          id="f-city"
          className="select"
          value={draft.city}
          onChange={(e) => set("city", e.target.value)}
        >
          <option value="">Anywhere</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <p className="data mb-3">Type</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              className="chip"
              data-on={draft.category === c.value}
              onClick={() => set("category", draft.category === c.value ? "" : c.value)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-baseline justify-between">
          <span className="data">Budget ceiling</span>
          <span className="data-lg text-gold">
            {draft.max ? priceShort(draft.max) : "Any"}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={CEILING}
          step={5_000_000}
          value={draft.max}
          aria-label="Maximum price"
          onChange={(e) => set("max", Number(e.target.value))}
        />
        <div className="mt-2 flex justify-between">
          <span className="data text-[0.55rem]">₹0</span>
          <span className="data text-[0.55rem]">₹30 Cr+</span>
        </div>
      </div>

      <div>
        <p className="data mb-3">Bedrooms, minimum</p>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className="chip"
              data-on={draft.bedrooms === n}
              onClick={() => set("bedrooms", n)}
            >
              {n === 0 ? "Any" : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="data mb-3">Facing</p>
        <div className="flex flex-wrap gap-2">
          {FACINGS.map((f) => (
            <button
              key={f}
              className="chip"
              data-on={draft.facing === f}
              onClick={() => set("facing", draft.facing === f ? "" : f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="data mb-3">Must have</p>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((a) => (
            <button
              key={a}
              className="chip"
              data-on={draft.amenities.includes(a)}
              onClick={() => toggleAmenity(a)}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {active > 0 ? (
        <button
          className="btn justify-center"
          onClick={() => {
            setDraft({ ...draft, city: "", deal: "", category: "", bedrooms: 0, min: 0, max: 0, minArea: 0, facing: "", amenities: [], q: "" });
          }}
        >
          Clear {active} filter{active === 1 ? "" : "s"}
        </button>
      ) : null}
    </div>
  );

  return (
    <>
      {/* mobile trigger */}
      <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
        <p className="data">
          {pending ? "Filtering…" : `${total} propert${total === 1 ? "y" : "ies"}`}
        </p>
        <button className="btn" onClick={() => setOpen(true)}>
          Filters {active ? `(${active})` : ""}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[70] flex flex-col bg-void lg:hidden">
          <div className="hairline-b flex items-center justify-between px-5 py-4">
            <p className="data">Filters</p>
            <button className="btn" onClick={() => setOpen(false)}>Done</button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-6">{body}</div>
        </div>
      ) : null}

      <aside className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto border border-line bg-void-2/40 p-6 lg:block">
        <div className="mb-6 flex items-baseline justify-between">
          <p className="data">Filters</p>
          <p className="data text-gold">
            {pending ? "…" : String(total).padStart(2, "0")}
          </p>
        </div>
        {body}
      </aside>
    </>
  );
}
