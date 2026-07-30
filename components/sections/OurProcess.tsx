"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { num: "01", title: "Discover", desc: "Browse our curated collection of verified luxury properties. Each listing includes detailed photography and comprehensive documentation." },
  { num: "02", title: "Visit", desc: "Schedule a private viewing at your convenience. Our concierge team arranges everything within 48 hours." },
  { num: "03", title: "Legal", desc: "Our legal team handles due diligence, title verification, and all paperwork. Transparent from start to finish." },
  { num: "04", title: "Move In", desc: "Seamless handover with full support. From registration to interior setup, we ensure a smooth transition." },
];

export default function OurProcess() {
  return (
    <section className="section">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="badge">Our Process</span>
          <h2 className="display d-xl mt-3 max-w-2xl">From discovery to keys — a seamless journey.</h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-0 top-8 h-px w-full bg-border" />
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3, ease }}
            className="absolute left-0 top-8 h-px bg-gold"
          />

          <div className="grid gap-8 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6, ease }}
                className="relative pt-16"
              >
                <div className="absolute left-0 top-[29px] z-10 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-bg">
                  <div className="h-[6px] w-[6px] rounded-full bg-gold" />
                </div>
                <span className="num text-4xl text-gold/20">{s.num}</span>
                <h3 className="display d-sm mt-3 font-medium">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
