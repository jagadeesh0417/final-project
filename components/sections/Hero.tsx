"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES, CITIES } from "../../lib/data";
import { priceShort } from "../../lib/format";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export default function Hero() {
  const live = PROPERTIES.filter((p) => p.status === "approved");
  const featured = live.filter((p) => p.featured && p.images?.length);
  const heroImg = featured[0]?.images[0] ?? live[0]?.images[0];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Cinematic background image (video placeholder) */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10"
        style={{ paddingTop: 90 }}
      >
        <div className="max-w-3xl">
          <motion.div variants={fadeUp}>
            <span className="badge">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified Luxury Properties
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="display d-hero mt-6 text-white">
            Discover<br />
            Extraordinary<br />
            Living.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">
            Exclusive residences across Hyderabad, Bengaluru, Goa and beyond.
            Every property is verified before listing.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/properties" className="btn-lux btn-lux-white">
              Browse Collection
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-lux border border-white/20 text-white hover:border-gold hover:text-gold">
              Book Consultation
            </Link>
          </motion.div>
        </div>

        {/* Floating Search */}
        <motion.div variants={fadeUp} className="mt-12">
          <div className="glass-card mx-auto max-w-4xl rounded-full p-2">
            <form className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 pl-4">
                <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by city, locality..."
                  className="w-full border-0 bg-transparent py-3 text-sm outline-none"
                />
              </div>
              <select className="hidden border-0 bg-transparent py-3 text-sm outline-none md:block">
                <option>Property Type</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>Plot</option>
                <option>Commercial</option>
              </select>
              <select className="hidden border-0 bg-transparent py-3 text-sm outline-none md:block">
                <option>City</option>
                {CITIES.map((c) => (<option key={c}>{c}</option>))}
              </select>
              <select className="hidden border-0 bg-transparent py-3 text-sm outline-none lg:block">
                <option>Budget</option>
                <option>Under ₹3 Cr</option>
                <option>₹3 — 10 Cr</option>
                <option>₹10 — 25 Cr</option>
                <option>Above ₹25 Cr</option>
              </select>
              <button
                type="submit"
                className="btn-lux btn-lux-gold shrink-0 rounded-full px-6 py-3 text-xs"
              >
                Search
              </button>
            </form>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Trusted by 1000+ buyers
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804z" />
            </svg>
            50+ Verified Properties
          </span>
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a3.5 3.5 0 01-4.284 3.663 3.5 3.5 0 01-2.697-2.697" />
            </svg>
            Luxury Specialists
          </span>
        </motion.div>
      </motion.div>

      {/* Floating stats */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="absolute bottom-12 right-6 hidden flex-col gap-3 md:flex lg:right-12"
      >
        {[
          { value: "250+", label: "Luxury Properties" },
          { value: "12", label: "Cities" },
          { value: "98%", label: "Client Satisfaction" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl px-5 py-3 text-right">
            <p className="display d-xs text-gold">{s.value}</p>
            <p className="text-[11px] uppercase tracking-widest text-muted">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
