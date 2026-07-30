"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: 500, label: "Properties Sold", suffix: "+" },
  { value: 5000, label: "Happy Clients", suffix: "+" },
  { value: 10, label: "Years Experience", suffix: "+" },
  { value: 25, label: "Cities Covered", suffix: "+" },
  { value: 300, label: "Projects", suffix: "+" },
  { value: 4.9, label: "Google Rating", suffix: "★", decimals: 1 },
];

function Counter({ to, decimals = 0, duration = 2 }: { to: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const hasRun = useRef(false);

  if (inView && !hasRun.current) {
    hasRun.current = true;
    const start = performance.now();
    const update = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - (1 - p) * (1 - p);
      const v = (to * eased).toFixed(decimals);
      if (ref.current) ref.current.textContent = v;
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  return <span ref={ref}>0</span>;
}

export default function Statistics() {
  return (
    <section className="overflow-hidden bg-dark section" style={{ paddingBlock: "120px" }}>
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 text-center"
        >
          <span className="badge bg-white/5 text-warm">By the Numbers</span>
          <h2 className="display d-lg mt-3 text-white">AKRADHI in numbers</h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
              className="text-center"
            >
              <p className="num d-lg text-gold">
                <Counter to={s.value} decimals={s.decimals ?? 0} />
                {s.suffix}
              </p>
              <p className="mt-2 text-sm text-white/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
