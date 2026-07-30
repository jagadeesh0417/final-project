"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES, CITIES } from "../../lib/data";
import { priceShort } from "../../lib/format";
import SearchBar from "../ui/SearchBar";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const ease = [0.16, 1, 0.3, 1] as const;
const child = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

export default function Hero() {
  const live = PROPERTIES.filter((p) => p.status === "approved");
  const featured = live.filter((p) => p.featured && p.images?.length).slice(0, 3);
  const heroImg = featured[0]?.images[0] ?? live[0]?.images[0];
  const cityCount = CITIES.length;
  const totalValue = live.filter((p) => p.deal === "sale").reduce((n, p) => n + p.price, 0);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/95 via-void/70 to-void/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-5 pb-8 pt-28 md:px-8 md:pt-36"
      >
        {/* top section: badge + heading + CTA */}
        <div className="max-w-3xl">
          <motion.div variants={child}>
            <span className="badge">Trusted across {cityCount} cities · South India</span>
          </motion.div>

          <motion.h1 variants={child} className="display d-xl mt-6">
            Every listing<br />has been stood in.
          </motion.h1>

          <motion.p variants={child} className="mt-6 max-w-xl text-lg leading-relaxed text-pearl-dim md:text-xl">
            We measure, photograph, and survey each property before it goes up.
            What you read on the sheet is what you find at the gate.
          </motion.p>

          <motion.div variants={child} className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/properties" className="p-btn p-btn-primary">
              Browse listings
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="p-btn p-btn-ghost">Talk to us</Link>
          </motion.div>
        </div>

        {/* floating search card */}
        <motion.div variants={child} className="relative z-10 mt-12">
          <div className="glass-card p-4 md:p-5">
            <SearchBar />
          </div>
        </motion.div>

        {/* stats row + floating cards */}
        <motion.div variants={child} className="relative mt-8">
          <div className="grid grid-cols-2 gap-3 md:flex md:gap-8">
            {[
              { label: "Live listings", value: String(live.length) },
              { label: "Cities", value: String(cityCount) },
              { label: "Register value", value: priceShort(totalValue) },
              { label: "Viewing turnaround", value: "48h" },
            ].map((s) => (
              <div key={s.label} className="glass-card px-4 py-3">
                <p className="font-mono text-2xl font-medium text-gold md:text-3xl">{s.value}</p>
                <p className="text-xs uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* floating property cards */}
      {featured.slice(1, 3).map((p, i) => (
        <Link
          key={p.id}
          href={`/property/${p.slug}`}
          className={`glass-card absolute right-8 hidden w-56 overflow-hidden p-3 transition-all duration-500 hover:scale-105 md:block ${i === 0 ? "float bottom-36" : "float-delayed bottom-8"}`}
        >
          <img src={p.images[0]} alt="" className="h-28 w-full rounded-xl object-cover" />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-semibold">{p.title}</span>
            <span className="text-xs font-medium text-gold">{priceShort(p.price)}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
