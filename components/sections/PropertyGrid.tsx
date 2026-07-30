"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES } from "../../lib/data";
import { priceShort } from "../../lib/format";
import { useFavourites } from "../../lib/favourites";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const childV = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const CAT_LABELS: Record<string, string> = {
  apartment: "Apartment",
  villa: "Villa",
  plot: "Plot",
  commercial: "Commercial",
};

export default function PropertyGrid() {
  const properties = PROPERTIES.filter((p) => p.status === "approved").slice(0, 9);
  const { has, toggle } = useFavourites();

  return (
    <section className="section bg-[#f5f3ef]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="section-label">Available Properties</span>
            <h2 className="display d-xl">Discover Our Collection</h2>
          </div>
          <Link href="/properties" className="btn-lux btn-lux-outline shrink-0">
            View All
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="columns-1 gap-6 md:columns-2 lg:columns-3"
        >
          {properties.map((p, i) => {
            const isFav = has(p.id);
            const cols = i % 3 === 0 ? "lg:row-span-2" : "";
            return (
              <motion.div key={p.id} variants={childV} className={`mb-6 break-inside-avoid ${cols}`}>
                <div className="prop-card group">
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}>
                    <Link href={`/property/${p.slug}`}>
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="prop-card-img h-full w-full object-cover"
                      />
                      <div className="prop-card-overlay" />
                    </Link>

                    {/* Badges */}
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-dark backdrop-blur-md">
                        {p.deal === "rent" ? "For Rent" : "For Sale"}
                      </span>
                      {p.category && (
                        <span className="rounded-full bg-gold/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                          {CAT_LABELS[p.category]}
                        </span>
                      )}
                    </div>

                    {/* Favorite */}
                    <button
                      onClick={(e) => { e.preventDefault(); toggle(p.id); }}
                      className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                        isFav ? "bg-gold text-white" : "bg-white/80 text-muted hover:bg-white"
                      }`}
                    >
                      <svg className="h-4 w-4" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Hover overlay button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="btn-lux btn-lux-white text-xs opacity-0 transition-all duration-500 group-hover:opacity-100" style={{ transform: "translateY(10px)" }}>
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/property/${p.slug}`}>
                          <h3 className="display d-sm font-medium">{p.title}</h3>
                        </Link>
                        <p className="mt-1 text-sm text-muted">
                          {p.address.locality}, {p.address.city}
                        </p>
                      </div>
                      <span className="shrink-0 text-right">
                        <p className="text-sm font-medium text-gold">{priceShort(p.price)}</p>
                        {p.deal === "rent" && <span className="text-[11px] text-muted">/month</span>}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-5 border-t pt-4 text-xs text-muted">
                      {p.bedrooms > 0 && (
                        <span className="flex items-center gap-1.5">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {p.bedrooms} Beds
                        </span>
                      )}
                      {p.bathrooms > 0 && <span>{p.bathrooms} Baths</span>}
                      <span>{p.areaSqft.toLocaleString()} sqft</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
