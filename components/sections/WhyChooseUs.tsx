"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Verified listings",
    desc: "Every property is inspected, photographed, and measured before it goes live. What you see is what exists.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Hyper-local coverage",
    desc: "From Banjara Hills to Rushikonda, we know the micro-markets that matter. Our team lives where they list.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "48‑hour viewing",
    desc: "Request a visit today—we arrange it within two working days. No runaround, no delays.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "End‑to‑end advisory",
    desc: "From site visits to legal due diligence, we guide you through the full transaction. No brokers, no middlemen.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const child = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

export default function WhyChooseUs() {
  return (
    <section className="section-p bg-void-2">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <span className="section-label">Why akradhi</span>
          <h2 className="display d-lg mt-2">Built differently</h2>
          <p className="mx-auto mt-3 max-w-xl text-pearl-dim">We don&apos;t just list properties—we stand behind them.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={child}>
              <div className="p-card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  {f.icon}
                </div>
                <h3 className="display d-sm mt-5 font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-pearl-dim">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
