"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const AWARDS = [
  { title: "Best Real Estate Company", year: "2023", org: "Property Awards India" },
  { title: "Customer Excellence Award", year: "2024", org: "Luxury Lifestyle Awards" },
  { title: "Luxury Property Specialist", year: "2024", org: "Asia Pacific Property Awards" },
  { title: "Trusted Brand of the Year", year: "2025", org: "Indian Real Estate Forum" },
];

export default function Awards() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((a) => (a + 1) % AWARDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 text-center"
        >
          <span className="badge">Recognition</span>
          <h2 className="display d-lg mt-3">Awards &amp; accolades</h2>
        </motion.div>

        <div className="relative mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease }}
              className="rounded-[var(--radius)] border border-border bg-surface p-10 text-center md:p-14"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                <svg className="h-8 w-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p className="display d-sm font-medium">{AWARDS[active].title}</p>
              <p className="mt-2 text-sm text-gold">{AWARDS[active].year}</p>
              <p className="mt-1 text-xs text-gray">{AWARDS[active].org}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {AWARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-gold" : "w-2 bg-border hover:bg-gold/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
