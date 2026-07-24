"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AMENITIES, CITIES } from "../../lib/data";
import { price, priceShort } from "../../lib/format";
import { DEFAULT_FILTERS, countActive, toSearchParams } from "../../lib/query";
import type { Category, Deal, Facing, Filters } from "../../lib/types";
import MagneticButton from "../motion/MagneticButton";
import Reveal from "../motion/Reveal";

const CATEGORIES: Array<{ value: Category; label: string; blurb: string }> = [
  { value: "apartment", label: "Apartment", blurb: "Floors in a managed building" },
  { value: "villa", label: "House", blurb: "Standalone, row or bungalow" },
  { value: "plot", label: "Land", blurb: "Parcels and layouts" },
  { value: "commercial", label: "Commercial", blurb: "Office, retail and industrial" },
];

const FACINGS: Facing[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
const CEILING = 300_000_000;

/**
 * The full search surface, laid out to use a desktop screen properly. Every
 * change re-counts against the same API the register uses, so the number on
 * the button is the number of results you will land on.
 */
export default function SearchBuilder() {
  const router = useRouter();
  const [f, setF] = useState<Filters>(DEFAULT_FILTERS);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const query = useMemo(() => toSearchParams({ ...f, page: 1 }).toString(), [f]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/properties?${query}`);
        const data = await res.json();
        if (!cancelled) setCount(data.total ?? 0);
      } catch {
        if (!cancelled) setCount(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query]);

  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((p) => ({ ...p, [k]: v }));

  const toggleAmenity = (a: string) =>
    setF((p) => ({
      ...p,
      amenities: p.amenities.includes(a) ? p.amenities.filter((x) => x !== a) : [...p.amenities, a],
    }));

  const active = countActive(f);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16 2xl:grid-cols-[1fr_420px]">
      <div className="flex flex-col gap-12">
        <Reveal>
          <fieldset>
            <legend className="eyebrow mb-6">01 — What are you doing</legend>
            <div className="grid gap-4 sm:grid-cols-3">
              {([
                ["", "Either", "Show everything"],
                ["sale", "Buying", "Freehold and resale"],
                ["rent", "Renting", "Monthly tenancies"],
              ] as const).map(([v, label, blurb]) => (
                <button
                  key={label}
                  onClick={() => set("deal", v as Deal | "")}
                  data-on={f.deal === v}
                  className="glass-iri group p-5 text-left transition-transform duration-500 hover:-translate-y-1 data-[on=true]:ring-1 data-[on=true]:ring-gold"
                >
                  <p className="display d-sm">{label}</p>
                  <p className="data mt-2">{blurb}</p>
                </button>
              ))}
            </div>
          </fieldset>
        </Reveal>

        <Reveal delay={0.05}>
          <fieldset>
            <legend className="eyebrow mb-6">02 — What kind of property</legend>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => set("category", f.category === c.value ? "" : c.value)}
                  data-on={f.category === c.value}
                  className="glass-iri group p-5 text-left transition-transform duration-500 hover:-translate-y-1 data-[on=true]:ring-1 data-[on=true]:ring-gold"
                >
                  <p className="display d-sm">{c.label}</p>
                  <p className="data mt-2">{c.blurb}</p>
                </button>
              ))}
            </div>
          </fieldset>
        </Reveal>

        <Reveal delay={0.1}>
          <fieldset>
            <legend className="eyebrow mb-6">03 — Where</legend>
            <div className="flex flex-wrap gap-2.5">
              <button className="chip" data-on={!f.city} onClick={() => set("city", "")}>Anywhere</button>
              {CITIES.map((c) => (
                <button key={c} className="chip" data-on={f.city === c} onClick={() => set("city", c)}>{c}</button>
              ))}
            </div>
          </fieldset>
        </Reveal>

        <Reveal delay={0.15}>
          <fieldset>
            <legend className="eyebrow mb-6">04 — Budget</legend>
            <div className="glass p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <span className="data">Ceiling</span>
                <span className="display d-md iri">{f.max ? price(f.max) : "No limit"}</span>
              </div>
              <input
                type="range"
                min={0}
                max={CEILING}
                step={2_500_000}
                value={f.max}
                aria-label="Maximum price"
                className="mt-6"
                onChange={(e) => set("max", Number(e.target.value))}
              />
              <div className="mt-3 flex justify-between">
                <span className="data">₹0</span>
                <span className="data">₹30 Cr+</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {[30_000_000, 75_000_000, 150_000_000, 0].map((v) => (
                  <button key={v} className="chip" data-on={f.max === v} onClick={() => set("max", v)}>
                    {v ? `Under ${priceShort(v)}` : "No limit"}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        </Reveal>

        <Reveal delay={0.2}>
          <fieldset>
            <legend className="eyebrow mb-6">05 — Size and orientation</legend>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="data mb-3.5">Bedrooms, minimum</p>
                <div className="flex flex-wrap gap-2.5">
                  {[0, 1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className="chip" data-on={f.bedrooms === n} onClick={() => set("bedrooms", n)}>
                      {n === 0 ? "Any" : `${n}+`}
                    </button>
                  ))}
                </div>
                <p className="data mb-3.5 mt-7">Built area, minimum</p>
                <div className="flex flex-wrap gap-2.5">
                  {[0, 1000, 2000, 4000, 8000].map((n) => (
                    <button key={n} className="chip" data-on={f.minArea === n} onClick={() => set("minArea", n)}>
                      {n === 0 ? "Any" : `${n.toLocaleString("en-IN")} sq ft`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="data mb-3.5">Facing</p>
                <div className="grid max-w-[260px] grid-cols-4 gap-2.5">
                  {FACINGS.map((d) => (
                    <button key={d} className="chip text-center" data-on={f.facing === d} onClick={() => set("facing", f.facing === d ? "" : d)}>
                      {d}
                    </button>
                  ))}
                </div>
                <p className="data mt-4 text-muted">
                  Orientation changes light, heat and resale here — worth setting.
                </p>
              </div>
            </div>
          </fieldset>
        </Reveal>

        <Reveal delay={0.25}>
          <fieldset>
            <legend className="eyebrow mb-6">06 — Must have</legend>
            <div className="flex flex-wrap gap-2.5">
              {AMENITIES.map((a) => (
                <button key={a} className="chip" data-on={f.amenities.includes(a)} onClick={() => toggleAmenity(a)}>
                  {a}
                </button>
              ))}
            </div>
          </fieldset>
        </Reveal>
      </div>

      <aside className="lg:sticky lg:top-28 lg:h-fit">
        <div className="glass-iri p-6 md:p-8">
          <p className="eyebrow">Matching now</p>
          <p className="display mt-5 text-[clamp(4rem,9vw,7rem)] leading-none">
            <span className="iri">{loading ? "—" : String(count ?? 0).padStart(2, "0")}</span>
          </p>
          <p className="data mt-3">
            {count === 1 ? "property on the register" : "properties on the register"}
          </p>

          <div className="rule my-7" />

          <dl className="flex flex-col gap-3">
            {[
              ["Doing", f.deal === "sale" ? "Buying" : f.deal === "rent" ? "Renting" : "Either"],
              ["Type", CATEGORIES.find((c) => c.value === f.category)?.label ?? "Any"],
              ["Where", f.city || "Anywhere"],
              ["Ceiling", f.max ? priceShort(f.max) : "None"],
              ["Bedrooms", f.bedrooms ? `${f.bedrooms}+` : "Any"],
              ["Facing", f.facing || "Any"],
              ["Must have", f.amenities.length ? `${f.amenities.length} selected` : "Nothing set"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5 last:border-0">
                <dt className="data">{k}</dt>
                <dd className="data-lg text-pearl">{v}</dd>
              </div>
            ))}
          </dl>

          <MagneticButton
            className="btn btn-solid mt-8 w-full"
            cursor="SEARCH"
            onClick={() => router.push(query ? `/properties?${query}` : "/properties")}
          >
            Show {loading ? "results" : `${count ?? 0} result${count === 1 ? "" : "s"}`}
          </MagneticButton>

          {active > 0 ? (
            <button className="btn mt-3 w-full" onClick={() => setF(DEFAULT_FILTERS)}>
              Reset {active} filter{active === 1 ? "" : "s"}
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
