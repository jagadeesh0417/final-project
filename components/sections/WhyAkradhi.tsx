"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Verified Listings",
    desc: "Every property is personally inspected, measured, and photographed before it goes live. No fake listings. No surprises.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Private Viewings",
    desc: "Exclusive, by-appointment viewings arranged within 48 hours. Personal concierge for every visit.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Legal Assistance",
    desc: "End-to-end legal due diligence and documentation support. Our panel of property lawyers reviews every transaction.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Investment Advisory",
    desc: "Data-driven market insights and portfolio recommendations. Maximize your returns with expert guidance.",
  },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const ease = [0.16, 1, 0.3, 1] as const;
const child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export default function WhyAkradhi() {
  return (
    <section className="overflow-hidden bg-dark py-[100px]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 text-center"
        >
          <span className="section-label text-gold-2">Why Akradhi</span>
          <h2 className="display d-xl mt-3 text-white">Built differently</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            We don&apos;t just list properties — we stand behind every single one.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={child}>
              <div className="glass-card-dark group cursor-default p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(182,141,64,0.08)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold/20">
                  {f.icon}
                </div>
                <h3 className="display d-sm mt-6 font-medium text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
