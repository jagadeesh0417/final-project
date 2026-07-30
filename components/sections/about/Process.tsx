"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { num: "01", title: "Property Consultation", desc: "We begin by understanding your needs, preferences, and budget to curate the best options." },
  { num: "02", title: "Property Visit", desc: "Schedule private viewings of handpicked properties at your convenience." },
  { num: "03", title: "Documentation", desc: "Our legal team handles all due diligence and paperwork with complete transparency." },
  { num: "04", title: "Loan Assistance", desc: "We connect you with trusted financial partners for the best home loan options." },
  { num: "05", title: "Registration", desc: "Smooth and hassle-free registration process with complete legal verification." },
  { num: "06", title: "Move In", desc: "Seamless handover with full support — from keys to interior setup." },
];

export default function Process() {
  return (
    <section className="section bg-[#f5f3ef]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 text-center"
        >
          <span className="badge">Our Process</span>
          <h2 className="display d-lg mt-3">From consultation to move-in</h2>
          <p className="mx-auto mt-3 max-w-lg text-gray">
            A seamless journey designed to make your property experience effortless.
          </p>
        </motion.div>

        {/* Horizontal timeline */}
        <div className="relative">
          <div className="absolute left-0 top-8 h-px w-full bg-border" />
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.3, ease }}
            className="absolute left-0 top-8 h-px bg-gold"
          />

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease }}
                className="relative pt-16 text-center"
              >
                <div className="absolute left-1/2 top-[29px] z-10 flex h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-bg">
                  <div className="h-[6px] w-[6px] rounded-full bg-gold" />
                </div>
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                  <span className="num text-sm text-gold">{s.num}</span>
                </div>
                <h3 className="display d-xs font-medium">{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
