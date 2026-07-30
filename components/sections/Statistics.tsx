"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { label: "Properties listed", value: 124, suffix: "" },
  { label: "Cities covered", value: 7, suffix: "" },
  { label: "Happy clients", value: 500, suffix: "+" },
  { label: "Years of experience", value: 15, suffix: "+" },
];

function AnimatedNumber({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref}>
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="tabular-nums"
        >
          <Counter from={0} to={to} duration={2} />
          {suffix}
        </motion.span>
      ) : (
        "0" + suffix
      )}
    </span>
  );
}

function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  if (inView && !hasAnimated.current && ref.current) {
    hasAnimated.current = true;
    const start = from;
    const end = to;
    const range = end - start;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(start + range * eased);
      if (ref.current) ref.current.textContent = current.toLocaleString("en-IN");
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  return <span ref={ref}>{from}</span>;
}

export default function Statistics() {
  return (
    <section className="section-p">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="glass-card p-6 text-center">
              <p className="display d-xl text-gold">
                <AnimatedNumber to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-pearl-dim">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
