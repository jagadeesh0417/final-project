"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };

export default function AboutHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85"
          alt="Luxury villa"
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10"
        style={{ paddingTop: 90 }}
      >
        <div className="max-w-3xl">
          <motion.div variants={fadeUp}>
            <span className="badge bg-white/5 text-warm">About Akradhi</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="display d-hero mt-6 text-white">
            Creating Extraordinary<br />Living Experiences.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-white/60 md:text-xl">
            For over a decade we have been helping families and investors discover luxury homes,
            premium villas, apartments, and commercial properties across the country.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/properties" className="btn-lux btn-white">
              View Properties
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-lux border border-white/20 text-white hover:border-gold hover:text-gold">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.div>

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
