"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Plates change with a vertical wipe plus a counter-scale on the outgoing
 * frame, so the two images appear to pass each other in depth.
 */
export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const still = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      setDir(next > i ? 1 : -1);
      setI((next + images.length) % images.length);
    },
    [i, images.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i]);

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-void md:aspect-[16/9]">
        <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={i}
              custom={dir}
              className="absolute inset-0"
              initial={
                still
                  ? { opacity: 0 }
                  : { clipPath: dir > 0 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", scale: 1.12 }
              }
              animate={still ? { opacity: 1 } : { clipPath: "inset(0% 0 0% 0)", scale: 1 }}
              exit={still ? { opacity: 0 } : { scale: 0.94, opacity: 0.4 }}
              transition={{ duration: still ? 0.2 : 1.05, ease: EASE }}
            >
              <img
                src={images[i]}
                alt={`${title} — ${String(i + 1).padStart(2, "0")}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

        <span className="data absolute left-5 top-5 border border-line-2 bg-void/60 px-2 py-1 backdrop-blur-sm">
          {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>

        <div className="absolute bottom-5 right-5 flex gap-2">
          <button
            className="btn bg-void/60 px-4 py-2 backdrop-blur-sm"
            onClick={() => go(i - 1)}
            aria-label="Previous plate"
          >
            ←
          </button>
          <button
            className="btn bg-void/60 px-4 py-2 backdrop-blur-sm"
            onClick={() => go(i + 1)}
            aria-label="Next plate"
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        {images.map((src, n) => (
          <button
            key={n}
            onClick={() => go(n)}
            aria-label={`Show image ${n + 1}`}
            aria-current={n === i}
            className={`relative h-16 w-24 shrink-0 overflow-hidden border transition-colors duration-500 ${
              n === i ? "border-gold" : "border-line hover:border-line-2"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
            {n !== i ? <span className="absolute inset-0 bg-void/55" /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}
