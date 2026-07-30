"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    name: "Priya Reddy", location: "Hyderabad",
    text: "The team walked us through every step of selling our family home. The photography and documentation were exceptional. We received multiple offers within the first week.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=85",
  },
  {
    name: "Ravi Krishnan", location: "Bengaluru",
    text: "I've been using AKRADHI for property search across three cities. The verification process saves me weeks of site visits. I trust their sheets more than any other source.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=85",
  },
  {
    name: "Anita Deshmukh", location: "Pune",
    text: "As a first-time buyer I was nervous about the process. Their advisory team held my hand through the entire journey — from shortlisting to registration. Truly professional.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=85",
  },
  {
    name: "Vikram Solanki", location: "Goa",
    text: "We list all our premium projects with AKRADHI. Their presentation standard is unmatched, and the quality of enquiries is significantly higher than other platforms.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=85",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="section overflow-hidden">
      <div className="container-lux">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Left: heading + quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="badge">Testimonials</span>
            <h2 className="display d-lg mt-3">What our clients say</h2>
            <div className="divider my-8" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="display text-6xl leading-none text-gold/20 md:text-8xl">&ldquo;</div>
                <p className="mt-2 text-lg leading-relaxed text-gray md:text-xl">
                  {TESTIMONIALS[active].text}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <img src={TESTIMONIALS[active].avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-medium">{TESTIMONIALS[active].name}</p>
                    <p className="text-sm text-gray">{TESTIMONIALS[active].location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Glass controls */}
            <div className="glass inline-flex items-center gap-2 mt-8 rounded-full p-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-500 ${i === active ? "bg-gold px-5 py-2 text-xs text-white" : "px-3 py-2 text-xs text-gray hover:text-dark"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="img-wrap" style={{ minHeight: 500 }}>
              <img
                src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=85"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
