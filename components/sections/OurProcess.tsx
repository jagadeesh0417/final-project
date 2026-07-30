"use client";

import { motion } from "framer-motion";

const STEPS = [
  { num: "01", title: "Discover", desc: "Browse our curated collection of verified luxury properties across South India. Each listing includes detailed photography and documentation." },
  { num: "02", title: "Visit", desc: "Schedule a private viewing at your convenience. Our concierge team arranges everything within 48 hours." },
  { num: "03", title: "Documentation", desc: "Our legal team handles due diligence, title verification, and all paperwork. Transparent process from start to finish." },
  { num: "04", title: "Move In", desc: "Seamless handover with full support. From registration to interior setup, we ensure a smooth transition." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function OurProcess() {
  return (
    <section className="bg-[#f5f3ef] py-[100px]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-center"
        >
          <span className="section-label">Our Process</span>
          <h2 className="display d-xl">How It Works</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            From discovery to move-in, we make luxury property acquisition effortless.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Connecting line */}
          <div className="absolute left-[23px] top-0 hidden h-full w-px bg-border md:block" />

          <div className="flex flex-col gap-16">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className={`relative flex flex-col gap-6 md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Number */}
                <div className="relative z-10 flex items-start md:w-24">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-bg text-lg font-semibold text-gold md:h-14 md:w-14">
                    {s.num}
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <h3 className="display d-md">{s.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-muted">{s.desc}</p>
                </div>

                {/* Spacer for alternating */}
                <div className="hidden flex-1 md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
