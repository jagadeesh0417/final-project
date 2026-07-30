"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function VideoSection() {
  return (
    <section className="relative overflow-hidden section" style={{ paddingBlock: "140px" }}>
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.45)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
        className="container-lux relative z-10 text-center"
      >
        <span className="badge bg-white/5">Discover Our Journey</span>
        <h2 className="display d-xl mt-6 text-white">Discover our journey</h2>
        <p className="mx-auto mt-4 max-w-lg text-white/50">
          Watch the story behind India&apos;s most trusted luxury real estate platform.
        </p>

        {/* Play button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mx-auto mt-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:border-gold"
        >
          <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.button>
      </motion.div>
    </section>
  );
}
