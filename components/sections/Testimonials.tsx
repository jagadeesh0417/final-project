"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Priya Reddy",
    location: "Hyderabad",
    text: "The team walked us through every step of selling our family home. The photography and documentation were exceptional. We received multiple offers within the first week.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=85",
  },
  {
    name: "Ravi Krishnan",
    location: "Bengaluru",
    text: "I've been using AKRADHI for property search across three cities now. The verification process saves me weeks of site visits. I trust their sheets more than any other source.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=85",
  },
  {
    name: "Anita Deshmukh",
    location: "Pune",
    text: "As a first-time buyer I was nervous about the process. Their advisory team held my hand through the entire journey — from shortlisting to registration. Truly professional.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=85",
  },
  {
    name: "Vikram Solanki",
    location: "Goa",
    text: "We list all our premium projects with AKRADHI. Their presentation standard is unmatched, and the quality of enquiries is significantly higher than other platforms.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=85",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? TESTIMONIALS.length - 1 : a - 1));
  const next = () => setActive((a) => (a === TESTIMONIALS.length - 1 ? 0 : a + 1));

  return (
    <section className="bg-dark py-[100px]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 text-center"
        >
          <span className="section-label text-gold-2">Testimonials</span>
          <h2 className="display d-xl text-white">What Our Clients Say</h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="glass-card-dark relative p-10 md:p-16"
              >
                {/* Large quote mark */}
                <div className="display absolute -top-2 left-6 text-8xl leading-none text-gold/20 md:left-10 md:text-9xl">
                  &ldquo;
                </div>

                <div className="relative z-10">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="mt-8 text-lg leading-relaxed text-white/80 md:text-xl">
                    &ldquo;{TESTIMONIALS[active].text}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={TESTIMONIALS[active].avatar}
                      alt={TESTIMONIALS[active].name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-white">{TESTIMONIALS[active].name}</p>
                      <p className="text-sm text-white/50">{TESTIMONIALS[active].location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-gold" : "w-2 bg-white/20"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-gold hover:text-gold"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
