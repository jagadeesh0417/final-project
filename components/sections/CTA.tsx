"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-[120px]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="container-lux relative z-10 text-center"
      >
        <span className="inline-block rounded-full border border-white/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
          Get in touch
        </span>

        <h2 className="display d-hero mt-6 text-white">
          Find Your Next<br />
          Luxury Home
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
          Whether you&apos;re buying, selling, or leasing — our team of luxury property specialists is ready to assist.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="btn-lux btn-lux-white text-xs"
          >
            Book Viewing
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="tel:+919848579053"
            className="btn-lux border border-white/20 text-xs text-white hover:border-gold hover:text-gold"
          >
            Call Now
          </a>
        </div>
      </motion.div>
    </section>
  );
}
