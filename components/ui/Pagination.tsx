import Link from "next/link";
import { toSearchParams } from "../../lib/query";
import type { Filters } from "../../lib/types";

export default function Pagination({
  filters,
  page,
  pages,
}: {
  filters: Filters;
  page: number;
  pages: number;
}) {
  if (pages <= 1) return null;

  const href = (n: number) => `/properties?${toSearchParams({ ...filters, page: n })}`;

  return (
    <nav className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-6" aria-label="Pagination">
      {page > 1 ? (
        <Link href={href(page - 1)} className="btn" data-cursor="BACK">Previous</Link>
      ) : (
        <span className="btn pointer-events-none opacity-30">Previous</span>
      )}

      <ol className="flex items-center gap-1">
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            <Link
              href={href(n)}
              aria-current={n === page ? "page" : undefined}
              className={`data grid h-10 w-10 place-items-center border transition-colors ${
                n === page
                  ? "border-gold text-gold"
                  : "border-transparent text-muted hover:border-line hover:text-pearl"
              }`}
            >
              {String(n).padStart(2, "0")}
            </Link>
          </li>
        ))}
      </ol>

      {page < pages ? (
        <Link href={href(page + 1)} className="btn" data-cursor="NEXT">Next</Link>
      ) : (
        <span className="btn pointer-events-none opacity-30">Next</span>
      )}
    </nav>
  );
}
