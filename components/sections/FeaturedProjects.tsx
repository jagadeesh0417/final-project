"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=85",
    title: "Kadamba Estate",
    location: "Jubilee Hills, Hyderabad",
    price: "₹11.8 Cr",
    slug: "kadamba-house",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=1400&q=85",
    title: "Rushikonda Terraces",
    location: "Visakhapatnam",
    price: "₹4.5 Cr",
    slug: "rushikonda-terraces-11a",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1400&q=85",
    title: "Siolim Boat House",
    location: "North Goa",
    price: "₹7.45 Cr",
    slug: "siolim-boat-house",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1512917771580-5a1e3617b1f8?w=1400&q=85",
    title: "Banjara Hills Bungalow",
    location: "Hyderabad",
    price: "₹20.5 Cr",
    slug: "banjara-hills-8-2-293",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=85",
    title: "Marine Drive Penthouse",
    location: "Kochi",
    price: "₹8.8 Cr",
    slug: "marine-drive-penthouse",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-[100px]">
      <div className="container-lux mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="section-label">Featured Projects</span>
          <h2 className="display d-xl">Signature Properties</h2>
        </motion.div>
      </div>

      <div className="scroll-container flex gap-6 px-6 md:px-10 lg:px-16">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            className="scroll-item relative w-[85vw] overflow-hidden rounded-[var(--radius-lux)] md:w-[65vw] lg:w-[50vw]"
            style={{ minHeight: 500 }}
          >
            <Link href={`/property/${p.slug}`} className="group block h-full w-full">
              <img
                src={p.image}
                alt={p.title}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                style={{ minHeight: 500 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p className="display d-sm text-white">{p.title}</p>
                <p className="mt-2 text-sm text-white/60">{p.location}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="display d-xs text-gold">{p.price}</span>
                  <span className="btn-lux border border-white/20 text-xs text-white opacity-0 transition-all group-hover:opacity-100">
                    Explore
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
