"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES } from "../../lib/data";
import { price } from "../../lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

export default function SignatureProperty() {
  const p = PROPERTIES.find((x) => x.slug === "kadamba-house") ?? PROPERTIES[0];

  return (
    <section className="section">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <span className="badge">Signature Property</span>
        </motion.div>

        <div className="editorial">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="img-wrap" style={{ borderRadius: "28px", minHeight: 500 }}>
              <img src={p.images[0]} alt={p.title} className="editorial-img" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="editorial-body"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">{p.category}</span>
            <h2 className="display d-lg mt-3 leading-[1.04]">{p.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-gray">{p.tagline}</p>
            <div className="divider my-8" />
            <div className="flex flex-wrap gap-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray">Location</p>
                <p className="mt-2 text-base">{p.address.locality}, {p.address.city}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray">Price</p>
                <p className="mt-2 display d-sm text-gold">{price(p.price, p.deal)}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray">Area</p>
                <p className="mt-2 text-base">{p.areaSqft.toLocaleString()} sqft</p>
              </div>
            </div>
            <Link href={`/property/${p.slug}`} className="btn-lux btn-outline mt-10">
              Explore Property
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
