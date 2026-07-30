"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden" style={{ paddingBlock: "140px" }}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="container-lux relative z-10"
      >
        <span className="badge bg-white/5">Get in Touch</span>
        <h2 className="display d-hero mt-6 max-w-3xl text-white">
          Ready To Find Your<br />Dream Property?
        </h2>
        <p className="mt-6 max-w-lg text-lg text-white/50">
          Let our team of luxury property specialists help you find the perfect home.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/properties" className="btn-lux btn-white">
            Browse Properties
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link href="/contact" className="btn-lux border border-white/20 text-white hover:border-gold hover:text-gold">
            Book Consultation
          </Link>
          <a href="tel:+919848579053" className="btn-lux border border-white/20 text-white hover:border-gold hover:text-gold">
            Call Now
          </a>
        </div>
      </motion.div>
    </section>
  );
}
