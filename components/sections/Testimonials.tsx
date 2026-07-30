"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Priya Reddy",
    location: "Hyderabad",
    role: "Homeowner",
    avatar: "PR",
    text: "The team walked us through every step of selling our family home. The photography and documentation were exceptional. We received multiple offers within the first week.",
  },
  {
    name: "Ravi Krishnan",
    location: "Bengaluru",
    role: "Investor",
    avatar: "RK",
    text: "I&apos;ve been using AKRADHI for property search across three cities now. The verification process saves me weeks of site visits. I trust their sheets more than any other source.",
  },
  {
    name: "Anita Deshmukh",
    location: "Pune",
    role: "First-time buyer",
    avatar: "AD",
    text: "As a first-time buyer I was nervous about the process. Their advisory team held my hand through the entire journey—from shortlisting to registration. Truly professional.",
  },
  {
    name: "Vikram Solanki",
    location: "Goa",
    role: "Property Developer",
    avatar: "VS",
    text: "We list all our premium projects with AKRADHI. Their presentation standard is unmatched, and the quality of enquiries is significantly higher than other platforms.",
  },
  {
    name: "Lakshmi Nair",
    location: "Kochi",
    role: "NRI Investor",
    avatar: "LN",
    text: "Living abroad, finding trustworthy property listings was always a challenge. AKRADHI&apos;s detailed sheets and virtual tours gave me the confidence to invest remotely.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? TESTIMONIALS.length - 1 : a - 1));
  const next = () => setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1));

  return (
    <section className="section-p bg-void-2">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center"
        >
          <span className="section-label">Testimonials</span>
          <h2 className="display d-lg mt-2">What our clients say</h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="glass-card p-8 md:p-12"
              >
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="h-4 w-4 star" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-6 text-lg leading-relaxed md:text-xl">&ldquo;{TESTIMONIALS[active].text}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                    {TESTIMONIALS[active].avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{TESTIMONIALS[active].name}</p>
                    <p className="text-sm text-pearl-dim">{TESTIMONIALS[active].role} · {TESTIMONIALS[active].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-gold" : "w-2 bg-line-2"}`}
                />
              ))}
            </div>
            <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-gold hover:text-gold">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
