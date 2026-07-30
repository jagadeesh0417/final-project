"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES } from "../../lib/data";
import { priceShort } from "../../lib/format";
import { useFavourites } from "../../lib/favourites";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const ease = [0.16, 1, 0.3, 1] as const;
const child = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

const CAT_LABELS: Record<string, string> = { apartment: "Apartment", villa: "Villa", plot: "Plot", commercial: "Commercial" };

export default function FeaturedListings() {
  const featured = PROPERTIES.filter((p) => p.featured && p.status === "approved").slice(0, 6);
  const { has, toggle } = useFavourites();

  return (
    <section className="section-p">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="section-label">Curated selection</span>
            <h2 className="display d-lg mt-2">Featured properties</h2>
            <p className="mt-2 max-w-lg text-pearl-dim">Every property is verified, photographed, and documented before listing.</p>
          </div>
          <Link href="/properties" className="p-btn p-btn-ghost shrink-0">
            View all
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((p) => {
            const isFav = has(p.id);
            return (
              <motion.div key={p.id} variants={child}>
                <div className="p-card group">
                  {/* image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Link href={`/property/${p.slug}`}>
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* badges */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                      <span className="verified-badge">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        Verified
                      </span>
                      {p.category && (
                        <span className="new-badge">{CAT_LABELS[p.category] ?? p.category}</span>
                      )}
                    </div>

                    {/* price + fav */}
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={(e) => { e.preventDefault(); toggle(p.id); }}
                        className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                          isFav ? "bg-gold text-white" : "bg-white/70 text-pearl-dim hover:bg-white"
                        }`}
                      >
                        <svg className="h-4 w-4" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/property/${p.slug}`}>
                          <h3 className="display d-sm font-semibold tracking-tight">{p.title}</h3>
                        </Link>
                        <p className="mt-1 text-sm text-pearl-dim">
                          {p.address.locality}, {p.address.city}
                        </p>
                      </div>
                      <span className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-gold">{priceShort(p.price)}</p>
                        {p.deal === "rent" && <span className="text-xs text-muted">/mo</span>}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-xs text-pearl-dim">
                      {p.bedrooms > 0 && (
                        <span className="flex items-center gap-1">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {p.bedrooms} Beds
                        </span>
                      )}
                      {p.bathrooms > 0 && (
                        <span>{p.bathrooms} Baths</span>
                      )}
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
