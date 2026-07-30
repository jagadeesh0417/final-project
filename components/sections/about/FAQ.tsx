"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  { q: "How do I schedule a property visit?", a: "Simply call us or fill out the contact form on our website. Our concierge team will arrange a private viewing within 48 hours at your convenience." },
  { q: "Do you provide legal verification for properties?", a: "Yes. Every property listed with AKRADHI undergoes thorough legal due diligence. Our panel of property lawyers reviews title deeds, encumbrances, and all documentation." },
  { q: "Can you help with home loans?", a: "Absolutely. We have partnerships with leading banks and financial institutions to help you secure the best home loan rates and terms." },
  { q: "What are your brokerage charges?", a: "Our charges are transparent and competitive. We believe in no hidden fees — everything is communicated upfront during the initial consultation." },
  { q: "Do you handle commercial properties?", a: "Yes. We specialize in both residential and commercial properties including office spaces, retail outlets, and industrial properties across major cities." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

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
          <span className="badge">FAQ</span>
          <h2 className="display d-lg mt-3">Frequently asked questions</h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between rounded-[var(--radius)] border border-border bg-surface px-7 py-5 text-left transition-all hover:border-gold/40"
              >
                <span className="font-medium pr-4">{faq.q}</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-gray transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 py-5 text-gray border-x border-b border-border rounded-b-[var(--radius)]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
