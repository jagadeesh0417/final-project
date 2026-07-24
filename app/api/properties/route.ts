import { NextResponse, type NextRequest } from "next/server";
import { parseFilters, search } from "../../../lib/query";

/**
 * GET /api/properties?city=Hyderabad&deal=sale&max=100000000
 * Same filter contract as the page, so the UI and the API can never drift.
 */
export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const filters = parseFilters(params);
  const result = search(filters);

  return NextResponse.json(
    {
      total: result.total,
      page: result.page,
      pages: result.pages,
      items: result.items,
    },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
  );
}
