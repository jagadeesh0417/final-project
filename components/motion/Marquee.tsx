"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useVelocity, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/** Infinite ticker whose speed and direction react to scroll velocity. */
export default function Marquee({ items, baseSpeed = 40 }: { items: string[]; baseSpeed?: number }) {
  const x = useMotionValue(0);
  const track = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useAnimationFrame((_, delta) => {
    if (still || !track.current) return;
    const width = track.current.scrollWidth / 2;
    if (!width) return;
    const boost = Math.min(600, Math.abs(velocity.get())) / 300;
    let next = x.get() - (baseSpeed * (1 + boost) * delta) / 1000;
    if (next <= -width) next += width;
    x.set(next);
  });

  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-7" aria-hidden>
      <motion.div ref={track} style={{ x }} className="flex w-max gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="display d-md flex items-center gap-12 text-pearl-dim">
            {item}
            <span className="inline-block h-1 w-1 rotate-45 bg-gold" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
