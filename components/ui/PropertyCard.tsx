"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { price } from "../../lib/format";
import type { Property } from "../../lib/types";
import { useFavourites } from "../../lib/favourites";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PropertyCard({ p, index = 0 }: { p: Property; index?: number }) {
  const { has, toggle } = useFavourites();
  const isFav = has(p.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease, delay: (index % 6) * 0.06 }}
      className="group"
    >
      <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-surface transition-all duration-500 hover:border-gold hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.04)]">
        {/* Image */}
        <Link href={`/properties/${p.slug}`} className="relative block overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img
            src={p.images[0]}
            alt={p.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {p.featured && (
              <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                Featured
              </span>
            )}
            <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-dark backdrop-blur-sm">
              {p.deal === "sale" ? "For Sale" : "For Rent"}
            </span>
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); toggle(p.id); }}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all ${
              isFav ? "bg-gold text-white" : "bg-white/80 text-gray hover:bg-white"
            }`}
          >
            <svg className="h-4 w-4" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Price overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <p className="display d-xs text-white drop-shadow-lg">{price(p.price, p.deal)}</p>
            </div>
          </div>
        </Link>

        {/* Info */}
        <Link href={`/properties/${p.slug}`} className="block p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="display d-sm font-medium truncate">{p.title}</h3>
              <p className="mt-1 text-sm text-gray truncate">
                {p.address.locality}, {p.address.city}
              </p>
            </div>
            <span className="badge shrink-0 text-[10px] px-2.5 py-1">
              {p.category}
            </span>
          </div>

          <p className="mt-3 text-sm text-gray line-clamp-2">{p.tagline}</p>

          <div className="divider my-4" />

          <div className="flex items-center gap-4 text-xs text-gray">
            {p.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {p.bedrooms} Beds
              </span>
            )}
            {p.bathrooms > 0 && <span>{p.bathrooms} Baths</span>}
            <span>{p.areaSqft.toLocaleString()} sqft</span>
          </div>
        </Link>

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex gap-2 p-5 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
          <Link
            href={`/properties/${p.slug}`}
            className="btn-lux btn-solid flex-1 justify-center text-[11px] px-4 py-2.5"
          >
            View Details
          </Link>
          <Link
            href={`/contact?property=${p.slug}`}
            className="btn-lux btn-outline flex-1 justify-center text-[11px] px-4 py-2.5"
          >
            Book Visit
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
