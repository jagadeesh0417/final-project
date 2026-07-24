import type { Metadata } from "next";
import { Suspense } from "react";
import FilterRail from "../../components/ui/FilterRail";
import Pagination from "../../components/ui/Pagination";
import PropertyCard from "../../components/ui/PropertyCard";
import PageHead from "../../components/ui/PageHead";
import { parseFilters, search } from "../../lib/query";

export const metadata: Metadata = {
  title: "The register",
  description: "Every live AKRADHI listing, filterable by city, budget, type and orientation.",
};

const SORTS = [
  { value: "recent", label: "Newest" },
  { value: "price-asc", label: "Price, low first" },
  { value: "price-desc", label: "Price, high first" },
  { value: "area-desc", label: "Largest" },
];

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const { items, total, page, pages } = search(filters);

  return (
    <>
      <PageHead
        eyebrow="The register"
        title="Everything we are carrying right now."
        note="Filters read from the address bar, so any view you land on is a link you can send to someone else."
      />

      <div className="shell grid gap-10 pb-24 lg:grid-cols-[320px_1fr] lg:gap-14 2xl:grid-cols-[380px_1fr] 2xl:gap-20">
        <Suspense fallback={<div className="data">Loading filters…</div>}>
          <FilterRail total={total} />
        </Suspense>

        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="data hidden lg:block">
              {total} propert{total === 1 ? "y" : "ies"} — page {page} of {pages}
            </p>
            <form className="ml-auto flex items-center gap-3">
              <label htmlFor="sort" className="data">Order</label>
              <select
                id="sort"
                name="sort"
                defaultValue={filters.sort}
                className="select w-auto"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <button type="submit" className="btn px-4 py-2">Apply</button>
            </form>
          </div>

          {items.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {items.map((p, i) => (
                <PropertyCard key={p.id} p={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="border border-line p-12 text-center">
              <p className="display d-md">Nothing matches that yet.</p>
              <p className="lede mx-auto mt-4 text-center">
                Widen the budget or clear a filter — or tell the desk what you are after and we
                will call when it comes in.
              </p>
              <a href="tel:+919849011204" className="btn btn-solid mt-8">Call the desk</a>
            </div>
          )}

          <Pagination filters={filters} page={page} pages={pages} />
        </div>
      </div>
    </>
  );
}
