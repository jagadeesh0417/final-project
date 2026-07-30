"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const PROJECTS = [
  { title: "Kadamba Estate", location: "Jubilee Hills, Hyderabad", price: "₹11.8 Cr", roi: "18%", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85", slug: "kadamba-house" },
  { title: "Rushikonda Terraces", location: "Visakhapatnam", price: "₹4.5 Cr", roi: "14%", image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1000&q=85", slug: "rushikonda-terraces-11a" },
  { title: "Siolim Boat House", location: "North Goa", price: "₹7.45 Cr", roi: "22%", image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1000&q=85", slug: "siolim-boat-house" },
];

const STATS = [
  { value: "18%", label: "Average ROI" },
  { value: "4.8%", label: "Rental Yield" },
  { value: "23%", label: "Market Growth" },
];

export default function Investment() {
  return (
    <section className="overflow-hidden bg-dark section" style={{ paddingBlock: "120px" }}>
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="badge bg-white/5 text-warm">Investment</span>
          <h2 className="display d-xl mt-3 max-w-3xl text-white">
            Luxury real estate <span className="text-gold">built for returns.</span>
          </h2>
        </motion.div>

        {/* Project banners */}
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
            >
              <Link href={`/property/${p.slug}`} className="group block overflow-hidden rounded-[var(--radius)]">
                <div className="relative overflow-hidden" style={{ minHeight: 320 }}>
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105" style={{ minHeight: 320 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="display d-sm text-white">{p.title}</p>
                    <p className="mt-1 text-sm text-white/50">{p.location}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="display d-xs text-gold">{p.price}</span>
                      <span className="flex items-center gap-1 text-sm text-warm">
                        ROI {p.roi}
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="divider my-14 border-white/10" />
        <div className="flex flex-wrap justify-between gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
            >
              <p className="num d-xl text-gold">{s.value}</p>
              <p className="mt-1 text-sm text-gray">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
