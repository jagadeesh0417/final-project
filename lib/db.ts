/**
 * Optional persistence.
 *
 * The site runs entirely off lib/data.ts. Nothing in this file executes unless
 * MONGODB_URI is set, so you can ignore it until you actually want a database.
 *
 * To switch over:
 *   1. npm install mongoose
 *   2. Set MONGODB_URI in .env.local
 *   3. npx tsx tools/seed.ts   (writes lib/data.ts into the collection)
 *   4. In lib/query.ts, replace `search(filters)` with `searchDb(filters)` below
 *
 * The filter shape is identical on both sides, so nothing else changes.
 */

import type { Filters, Property } from "./types";
import { PAGE_SIZE } from "./query";

export const hasDatabase = Boolean(process.env.MONGODB_URI);

/** Translates our Filters into a Mongo query document. */
export function toMongoQuery(f: Filters): Record<string, unknown> {
  const where: Record<string, unknown> = { status: "approved" };

  if (f.city) where["address.city"] = f.city;
  if (f.deal) where.deal = f.deal;
  if (f.category) where.category = f.category;
  if (f.facing) where.facing = f.facing;
  if (f.bedrooms) where.bedrooms = { $gte: f.bedrooms };
  if (f.minArea) where.areaSqft = { $gte: f.minArea };
  if (f.amenities.length) where.amenities = { $all: f.amenities };

  if (f.min || f.max) {
    const range: Record<string, number> = {};
    if (f.min) range.$gte = f.min;
    if (f.max) range.$lte = f.max;
    where.price = range;
  }

  if (f.q) {
    const rx = new RegExp(f.q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    where.$or = [{ title: rx }, { tagline: rx }, { "address.locality": rx }, { "address.city": rx }];
  }

  return where;
}

export function toMongoSort(sort: Filters["sort"]): Record<string, 1 | -1> {
  switch (sort) {
    case "price-asc":
      return { price: 1 };
    case "price-desc":
      return { price: -1 };
    case "area-desc":
      return { areaSqft: -1 };
    default:
      return { listedAt: -1 };
  }
}

/**
 * Reference implementation. Uncomment once mongoose is installed and a
 * PropertyModel exists — kept inert here so the project builds with no extra
 * dependencies.
 */
export async function searchDb(_f: Filters): Promise<{ items: Property[]; total: number }> {
  throw new Error(
    "searchDb is a template. Install mongoose, define PropertyModel, then use " +
      "toMongoQuery/toMongoSort with .find().sort().skip(" +
      PAGE_SIZE +
      ").lean()"
  );
}

/**
 * Indexes worth creating on the properties collection:
 *
 *   { "address.city": 1, status: 1 }
 *   { price: 1 }
 *   { category: 1, deal: 1 }
 *   { slug: 1 } unique
 *   { listedAt: -1 }
 */
export const RECOMMENDED_INDEXES = [
  { "address.city": 1, status: 1 },
  { price: 1 },
  { category: 1, deal: 1 },
  { slug: 1 },
  { listedAt: -1 },
];
