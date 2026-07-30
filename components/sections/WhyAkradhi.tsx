"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    num: "01",
    title: "Verified Listings",
    desc: "Every property is personally inspected, measured, and photographed before it goes live. No fake listings. No surprises.",
  },
  {
    num: "02",
    title: "Private Viewings",
    desc: "Exclusive, by-appointment viewings arranged within 48 hours. A personal concierge for every visit.",
  },
  {
    num: "03",
    title: "Legal Support",
    desc: "End-to-end legal due diligence and documentation. Our panel advises on every transaction.",
  },
  {
    num: "04",
    title: "Investment Advisory",
    desc: "Data-driven market intelligence and portfolio recommendations for discerning investors.",
  },
];

export default function WhyAkradhi() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="overflow-hidden bg-dark section" style={{ paddingBlock: "120px" }}>
      <div className="container-lux">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-20">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="img-wrap" style={{ minHeight: 560 }}>
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85"
                alt="Luxury property"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
            ref={ref}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">Why Akradhi</span>
            <h2 className="display d-lg mt-3 text-white">Built differently.</h2>
            <p className="mt-4 text-gray">We don&apos;t just list properties — we stand behind every single one.</p>

            <div className="divider my-10 border-white/10" />

            <div className="flex flex-col gap-8">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  className="flex gap-6"
                >
                  <span className="num text-2xl text-gold/60">{f.num}</span>
                  <div>
                    <h3 className="display d-sm font-medium text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
