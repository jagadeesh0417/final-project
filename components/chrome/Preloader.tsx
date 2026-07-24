"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Runs once per tab. Counts up, then lifts like a sheet off a drawing board. */
export default function Preloader() {
  const [open, setOpen] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("akradhi:seen")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("akradhi:seen", "1");
      return;
    }
    setOpen(true);
    document.body.style.overflow = "hidden";

    let n = 0;
    const tick = setInterval(() => {
      n = Math.min(100, n + Math.random() * 14 + 4);
      setPct(Math.floor(n));
      if (n >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          sessionStorage.setItem("akradhi:seen", "1");
          document.body.style.overflow = "";
          setOpen(false);
        }, 420);
      }
    }, 110);

    return () => {
      clearInterval(tick);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[99] flex flex-col justify-between bg-void px-6 py-8 md:px-14 md:py-12"
          exit={{ y: "-100%", transition: { duration: 1, ease: EASE } }}
        >
          <div className="flex items-start justify-between">
            <span className="data">AKRADHI — Property</span>
            <span className="data">Est. 2026</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <h1 className="display d-xl overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
              >
                AKRADHI
              </motion.span>
            </h1>
            <span className="data-lg shrink-0 tabular-nums text-gold">
              {String(pct).padStart(3, "0")}
            </span>
          </div>

          <div>
            <div className="relative h-px w-full bg-line">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gold"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>
            <p className="data mt-3">Drawing the sheet</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
