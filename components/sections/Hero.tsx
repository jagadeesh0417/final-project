"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES, CITIES } from "../../lib/data";
import { priceShort } from "../../lib/format";

const ease = [0.16, 1, 0.3, 1] as const;
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };

export default function Hero() {
  const live = PROPERTIES.filter((p) => p.status === "approved");
  const hero = live.find((p) => p.featured && p.images?.length);
  const img = hero?.images[0] ?? live[0]?.images[0];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Cinematic image */}
      <div className="absolute inset-0">
        <img src={img} alt="" className="h-full w-full object-cover" style={{ filter: "brightness(0.55)" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent" />
      </div>

      {/* Floating luxury badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease }}
        className="absolute left-6 top-32 hidden md:block lg:left-10"
      >
        <div className="glass rounded-2xl px-5 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">Since 2011</p>
          <p className="mt-0.5 text-xs text-gray">Luxury Property Specialists</p>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div variants={container} initial="hidden" animate="visible" className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10" style={{ paddingTop: 90 }}>
        <div className="max-w-3xl">
          <motion.div variants={fadeUp}>
            <span className="badge">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              Extraordinary Living
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="display d-hero mt-6 text-white">
            Discover<br />Extraordinary<br />Living.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            Exclusive residences across Hyderabad, Bengaluru, Goa and beyond.
            Every property is personally verified before listing.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/properties" className="btn-lux btn-white">
              Browse Collection
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-lux border border-white/20 text-white hover:border-gold hover:text-gold">
              Book Consultation
            </Link>
          </motion.div>
        </div>

        {/* Floating pill search */}
        <motion.div variants={fadeUp} className="relative z-10 mt-16">
          <div className="glass mx-auto max-w-3xl rounded-full p-1.5">
            <form className="flex items-center gap-1.5">
              <div className="flex flex-1 items-center gap-3 pl-5">
                <svg className="h-[18px] w-[18px] shrink-0 text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search by city, locality or property..." className="w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-gray" />
              </div>
              <select className="hidden border-0 bg-transparent py-3 text-sm outline-none md:block">
                <option>Property Type</option>
                <option>Villa</option><option>Apartment</option><option>Plot</option><option>Commercial</option>
              </select>
              <select className="hidden border-0 bg-transparent py-3 text-sm outline-none md:block">
                <option>City</option>
                {CITIES.map((c) => (<option key={c}>{c}</option>))}
              </select>
              <button type="submit" className="btn-lux btn-gold shrink-0 rounded-full px-6 py-3 text-xs">
                Search
              </button>
            </form>
          </div>
        </motion.div>

        {/* Trust row */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-8 text-sm text-white/50">
          <span className="flex items-center gap-2"><svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Trusted by 1000+ buyers</span>
          <span className="flex items-center gap-2"><svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>50+ Verified Properties</span>
          <span className="flex items-center gap-2"><svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a3.5 3.5 0 01-4.284 3.663 3.5 3.5 0 01-2.697-2.697" /></svg>Luxury Specialists</span>
        </motion.div>
      </motion.div>

      {/* Floating stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5, ease }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="glass rounded-full px-8 py-3 flex items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="num text-lg text-gold">{live.length}+</span>
            <span className="text-xs text-gray uppercase tracking-widest">Properties</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-3">
            <span className="num text-lg text-gold">{new Set(live.map(p => p.address.city)).size}</span>
            <span className="text-xs text-gray uppercase tracking-widest">Cities</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-3">
            <span className="num text-lg text-gold">98%</span>
            <span className="text-xs text-gray uppercase tracking-widest">Satisfaction</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 right-10 z-10 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
