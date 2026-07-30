"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=85", ratio: "3/4" },
  { src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=85", ratio: "4/3" },
  { src: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=85", ratio: "1/1" },
  { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85", ratio: "4/3" },
  { src: "https://images.unsplash.com/photo-1512917771580-5a1e3617b1f8?w=800&q=85", ratio: "3/4" },
  { src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800&q=85", ratio: "16/9" },
  { src: "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=800&q=85", ratio: "1/1" },
  { src: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=85", ratio: "4/3" },
  { src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=85", ratio: "3/4" },
  { src: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=85", ratio: "16/9" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-[100px]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 text-center"
        >
          <span className="section-label">Gallery</span>
          <h2 className="display d-xl">Interiors &amp; Architecture</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            A visual journey through the finest properties we represent.
          </p>
        </motion.div>

        <div className="columns-2 gap-4 md:columns-3 lg:columns-4">
          {IMAGES.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.5, ease }}
              onClick={() => setLightbox(i)}
              className="group relative mb-4 w-full overflow-hidden rounded-[var(--radius-lux)]"
            >
              <img
                src={img.src}
                alt=""
                className="w-full transition-all duration-700 group-hover:scale-105"
                style={{ aspectRatio: img.ratio }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-dark/95 p-4"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-6 top-6 text-3xl text-white/60 transition-colors hover:text-white"
              >
                &times;
              </button>
              <motion.img
                key={lightbox}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={IMAGES[lightbox].src}
                alt=""
                className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="flex gap-2">
                  {IMAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox(i)}
                      className={`h-2 rounded-full transition-all ${i === lightbox ? "w-8 bg-gold" : "w-2 bg-white/20 hover:bg-white/40"}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
