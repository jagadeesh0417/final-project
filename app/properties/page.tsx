"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo, useState, useTransition } from "react";
import { PROPERTIES } from "../../lib/data";
import { parseFilters, search, PAGE_SIZE } from "../../lib/query";
import PropertiesHero from "../../components/sections/properties/PropertiesHero";
import PropertyFilters from "../../components/sections/properties/PropertyFilters";
import PropertyCard from "../../components/ui/PropertyCard";

const ease = [0.16, 1, 0.3, 1] as const;

const SORT_OPTIONS = [
  { value: "recent", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-desc", label: "Largest First" },
];

function Skeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface">
          <div className="skeleton" style={{ aspectRatio: "4/3" }} />
          <div className="p-5 space-y-3">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-px w-full" />
            <div className="flex gap-4">
              <div className="skeleton h-3 w-16" />
              <div className="skeleton h-3 w-16" />
              <div className="skeleton h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PropertiesContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [pending, start] = useTransition();
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const filters = useMemo(
    () => parseFilters(Object.fromEntries(params.entries())),
    [params]
  );

  const { items, total, page, pages } = useMemo(
    () => search(filters, PROPERTIES),
    [filters]
  );

  const handleSort = (sort: string) => {
    const next = new URLSearchParams(params.toString());
    next.set("sort", sort);
    next.set("page", "1");
    start(() => router.push(`/properties?${next.toString()}`, { scroll: false }));
  };

  const goToPage = (p: number) => {
    const next = new URLSearchParams(params.toString());
    next.set("page", String(p));
    start(() => router.push(`/properties?${next.toString()}`, { scroll: false }));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const compareItems = useMemo(
    () => PROPERTIES.filter((p) => compareIds.includes(p.id)),
    [compareIds]
  );

  // Generate page numbers
  const pageNumbers = useMemo(() => {
    const nums: (number | "...")[] = [];
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) nums.push(i);
    } else {
      nums.push(1);
      if (page > 3) nums.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(pages - 1, page + 1); i++) nums.push(i);
      if (page < pages - 2) nums.push("...");
      nums.push(pages);
    }
    return nums;
  }, [page, pages]);

  return (
    <>
      <PropertiesHero />

      <section className="section" style={{ paddingBlock: "60px" }}>
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="flex gap-8" style={{ alignItems: "flex-start" }}>
            {/* Sidebar */}
            <div className="hidden lg:block" style={{ width: 320, minWidth: 320 }}>
              <PropertyFilters total={total} pending={pending} />
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Mobile filters + Sort bar */}
              <div className="lg:hidden mb-6">
                <PropertyFilters total={total} pending={pending} />
              </div>

              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-gray">
                  {pending ? "Updating..." : (
                    <>
                      <span className="num font-medium text-gold">{total}</span> propert{total === 1 ? "y" : "ies"}
                      {page > 1 && ` — Page ${page} of ${pages}`}
                    </>
                  )}
                </p>
                <div className="flex items-center gap-3">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray">Sort</label>
                  <select
                    value={filters.sort}
                    onChange={(e) => handleSort(e.target.value)}
                    className="select-lux py-2.5 text-sm"
                    style={{ width: "auto", minWidth: 160 }}
                  >
                    {SORT_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid */}
              {pending ? (
                <Skeleton />
              ) : items.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {items.map((p, i) => (
                    <div key={p.id} className="relative">
                      <PropertyCard p={p} index={i} />
                      {/* Compare checkbox */}
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className={`absolute left-4 top-4 z-10 hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all group-hover:flex ${
                          compareIds.includes(p.id)
                            ? "bg-gold text-white"
                            : "bg-white/80 text-dark backdrop-blur-sm hover:bg-white"
                        }`}
                      >
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        Compare
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="flex flex-col items-center justify-center rounded-[var(--radius)] border border-border bg-surface px-8 py-20 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                    <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="display d-md">No properties match your search.</h3>
                  <p className="mt-3 max-w-md text-gray">Try widening your budget, clearing some filters, or browse our full collection.</p>
                  <button
                    onClick={() => router.push("/properties")}
                    className="btn-lux btn-outline mt-8"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {pages > 1 && !pending && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-gray transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {pageNumbers.map((n, i) =>
                    n === "..." ? (
                      <span key={`e${i}`} className="px-2 text-gray">...</span>
                    ) : (
                      <button
                        key={n}
                        onClick={() => goToPage(n as number)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all ${
                          page === n ? "bg-dark text-white" : "text-gray hover:bg-border"
                        }`}
                      >
                        {n}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= pages}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-gray transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison bar */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-surface/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Compare ({compareItems.length}/4)</span>
                <div className="hidden gap-3 md:flex">
                  {compareItems.map((p) => (
                    <div key={p.id} className="flex items-center gap-2 rounded-full border border-border px-3 py-1">
                      <span className="text-xs truncate max-w-[120px]">{p.title}</span>
                      <button onClick={() => toggleCompare(p.id)} className="text-gray hover:text-dark">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setCompareIds([])}
                className="btn-lux btn-outline text-xs px-4 py-2"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="skeleton h-8 w-48 mx-auto mb-4" />
          <div className="skeleton h-4 w-64 mx-auto" />
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
