"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: 250, label: "Luxury Properties", suffix: "+" },
  { value: 12, label: "Cities Covered", suffix: "" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
  { value: 15, label: "Years Experience", suffix: "+" },
];

function Counter({ to, duration = 2 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const hasRun = useRef(false);

  if (inView && !hasRun.current) {
    hasRun.current = true;
    const start = performance.now();
    const update = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const v = Math.round(to * (1 - (1 - p) * (1 - p)));
      if (ref.current) ref.current.textContent = v.toLocaleString();
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  return <span ref={ref}>0</span>;
}

export default function MarketIntelligence() {
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
          <span className="badge">Market Intelligence</span>
          <h2 className="display d-xl mt-3 max-w-3xl">
            Luxury real estate in South India by the numbers.
          </h2>
        </motion.div>

        {/* Stats — no boxes, thin dividers */}
        <div className="flex flex-wrap">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="relative flex-1 basis-1/2 border-b border-border py-8 md:basis-0 md:border-b-0 md:py-0"
            >
              <div className="px-6 py-4">
                <p className="num d-lg text-gold">
                  <Counter to={s.value} />
                  {s.suffix}
                </p>
                <p className="mt-2 text-sm text-gray">{s.label}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="absolute right-0 top-0 hidden h-full w-px bg-border md:block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Graph bars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray mb-6">Market Performance</p>
          <div className="flex items-end gap-3 md:gap-5">
            {[
              { label: "Bengaluru", value: 92, color: "bg-gold" },
              { label: "Hyderabad", value: 88, color: "bg-gold" },
              { label: "Goa", value: 76, color: "bg-warm" },
              { label: "Kochi", value: 65, color: "bg-warm" },
              { label: "Pune", value: 71, color: "bg-warm" },
              { label: "Visakhapatnam", value: 58, color: "bg-gray/50" },
            ].map((c) => (
              <div key={c.label} className="flex flex-1 flex-col items-center gap-3">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${c.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5, ease }}
                  className={`w-full rounded-t-sm ${c.color}`}
                  style={{ maxHeight: 200, minHeight: 8 }}
                />
                <span className="text-[11px] font-medium text-gray">{c.label}</span>
                <span className="num text-sm text-gold">{c.value}%</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[10px] uppercase tracking-[0.15em] text-gray text-right">Growth Index 2026</p>
        </motion.div>
      </div>
    </section>
  );
}
