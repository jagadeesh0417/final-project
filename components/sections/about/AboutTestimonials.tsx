"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    name: "Priya Reddy",
    location: "Hyderabad",
    text: "Exceptional service from start to finish. The team's attention to detail and market knowledge made our property journey effortless.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=85",
  },
  {
    name: "Ravi Krishnan",
    location: "Bengaluru",
    text: "I've dealt with many real estate firms, but AKRADHI's professionalism and transparency are unmatched. Truly a premium experience.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=85",
  },
  {
    name: "Anita Deshmukh",
    location: "Pune",
    text: "As a first-time buyer, I was nervous. AKRADHI held my hand through the entire journey. Their advisory team is world-class.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=85",
  },
];

export default function AboutTestimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section overflow-hidden bg-dark" style={{ paddingBlock: "120px" }}>
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-12 text-center"
        >
          <span className="badge bg-white/5 text-warm">Client Voices</span>
          <h2 className="display d-lg mt-3 text-white">What our clients say</h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease }}
              className="glass bg-white/5 border-white/5 p-10 text-center md:p-14"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="display d-md text-white/90 leading-snug">
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <img src={TESTIMONIALS[active].img} alt="" className="h-12 w-12 rounded-full object-cover" />
                <div className="text-left">
                  <p className="font-medium text-white">{TESTIMONIALS[active].name}</p>
                  <p className="text-sm text-white/50">{TESTIMONIALS[active].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
