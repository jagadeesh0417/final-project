"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    title: "Our Mission",
    desc: "To provide an unparalleled real estate experience through transparency, expertise, and a deep commitment to our clients' goals. We strive to make every transaction seamless and rewarding.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Our Vision",
    desc: "To redefine luxury real estate in India by setting new standards of trust, innovation, and service excellence. We envision a future where every property journey is extraordinary.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
];

export default function MissionVision() {
  return (
    <section className="section bg-[#f5f3ef]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 text-center"
        >
          <span className="badge">Mission &amp; Vision</span>
          <h2 className="display d-lg mt-3">What drives us</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {ITEMS.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease }}
              className="group rounded-[var(--radius)] border border-border bg-surface p-10 transition-all duration-500 hover:border-gold hover:shadow-[0_0_40px_rgba(182,141,64,0.06)]"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold/20">
                {item.icon}
              </div>
              <h3 className="display d-md mt-6">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-gray">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
