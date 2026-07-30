"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="section-p">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pearl via-[#2a2420] to-pearl px-6 py-16 text-center text-white md:px-16 md:py-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(184,134,45,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <span className="inline-block rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              Get in touch
            </span>
            <h2 className="display d-lg mt-6 text-white">Find your next property</h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Whether you&apos;re buying, selling, or leasing — our team is ready to help.
              Schedule a consultation today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="p-btn bg-white text-pearl hover:bg-white/90 hover:shadow-xl hover:shadow-white/20"
              >
                Schedule a visit
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+919848579053"
                className="p-btn border border-white/20 text-white hover:border-gold hover:text-gold"
              >
                +91 98485 79053
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
