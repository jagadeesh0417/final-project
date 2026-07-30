"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { label: "Average ROI", value: 18, suffix: "%", desc: "Annual return on luxury property investments in prime locations." },
  { label: "Rental Yield", value: 4.8, suffix: "%", desc: "Average rental yield across our portfolio of premium properties." },
  { label: "Market Growth", value: 23, suffix: "%", desc: "Year-on-year appreciation in luxury real estate segments." },
  { label: "Client Portfolio", value: 850, suffix: " Cr+", desc: "Combined portfolio value managed by our advisory team." },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Investment() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="overflow-hidden bg-dark py-[100px]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <span className="section-label text-gold-2">Investment</span>
          <h2 className="display d-xl max-w-3xl text-white">
            Luxury real estate<br />
            <span className="text-gold">built for returns.</span>
          </h2>
          <p className="mt-4 max-w-lg text-white/50">
            Data-driven insights for discerning investors. Our market intelligence helps you make informed decisions.
          </p>
        </motion.div>

        <div ref={ref} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="glass-card-dark p-8"
            >
              <p className="display d-xl text-gold">
                {inView ? (
                  <Counter from={0} to={s.value} duration={2} decimals={s.value % 1 !== 0 ? 1 : 0} />
                ) : (
                  "0"
                )}
                {s.suffix}
              </p>
              <p className="display d-sm mt-2 font-medium text-white">{s.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Decorative chart bars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex items-end gap-4"
        >
          {[35, 55, 45, 75, 60, 85, 70, 90, 65, 80].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 + i * 0.05, ease }}
              className="w-full rounded-t-sm bg-gold/20"
              style={{ height: `${h}%`, maxHeight: 200, minHeight: 20 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ from, to, duration, decimals = 0 }: { from: number; to: number; duration: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const hasRun = useRef(false);

  if (inView && !hasRun.current) {
    hasRun.current = true;
    const startTime = performance.now();
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = (from + (to - from) * eased).toFixed(decimals);
      if (ref.current) ref.current.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  return <span ref={ref}>{from.toFixed(decimals)}</span>;
}
