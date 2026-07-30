"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES } from "../../lib/data";
import { price } from "../../lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

const LAYOUTS = ["left", "right", "left-wide", "right-wide"];

export default function CuratedCollection() {
  const items = PROPERTIES.filter((p) => p.featured && p.status === "approved").slice(0, 4);

  return (
    <section className="section bg-[#f5f3ef]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="badge">Curated Collection</span>
          <h2 className="display d-xl mt-3">An editorial selection of extraordinary properties.</h2>
        </motion.div>
      </div>

      {items.map((p, i) => {
        const layout = LAYOUTS[i % LAYOUTS.length];
        const isLeft = layout.includes("left");
        const isWide = layout.includes("wide");

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className={`container-lux ${i > 0 ? "mt-12 md:mt-20" : ""}`}
          >
            <div
              className={`grid items-center gap-0 rounded-[var(--radius)] overflow-hidden ${
                isWide ? "md:grid-cols-[1.4fr_1fr]" : "md:grid-cols-[1fr_1fr]"
              } ${isLeft ? "" : "md:direction-rtl"}`}
            >
              <div className={isLeft ? "" : "md:order-2"}>
                <div className="img-wrap" style={{ borderRadius: 0, minHeight: 420 }}>
                  <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" style={{ minHeight: 420 }} />
                </div>
              </div>

              <div className={`p-8 md:p-14 ${isLeft ? "" : "md:order-1 md:pr-10"}`}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">{p.category}</span>
                <h3 className="display d-lg mt-2">{p.title}</h3>
                <p className="mt-4 text-gray">{p.tagline}</p>
                <div className="divider my-6" />
                <div className="flex flex-wrap gap-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray">Location</p>
                    <p className="mt-1 text-sm font-medium">{p.address.city}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray">Price</p>
                    <p className="mt-1 display d-xs text-gold">{price(p.price, p.deal)}</p>
                  </div>
                  {p.bedrooms > 0 && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray">Beds</p>
                      <p className="mt-1 text-sm font-medium">{p.bedrooms}</p>
                    </div>
                  )}
                </div>
                <Link href={`/property/${p.slug}`} className="btn-lux btn-outline mt-8 text-xs px-6 py-3">
                  Explore
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}

      <style dangerouslySetInnerHTML={{ __html: `
        .direction-rtl { direction: rtl; }
        .direction-rtl > * { direction: ltr; }
      `}} />
    </section>
  );
}
