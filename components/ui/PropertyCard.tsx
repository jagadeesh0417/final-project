"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { area, price } from "../../lib/format";
import type { Property } from "../../lib/types";
import FacingMark from "./FacingMark";
import Favourite from "./Favourite";

/**
 * Tilts toward the pointer on a 3D plane; the artwork counter-shifts so it
 * reads as depth rather than a flat card being rotated.
 */
export default function PropertyCard({ p, index = 0 }: { p: Property; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18, mass: 0.5 };
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-9, 9]), spring);
  const ix = useSpring(useTransform(px, [0, 1], [14, -14]), spring);
  const iy = useSpring(useTransform(py, [0, 1], [10, -10]), spring);
  const glowX = useTransform(px, (v) => `${v * 100}%`);
  const glowY = useTransform(py, (v) => `${v * 100}%`);

  const move = (e: React.MouseEvent) => {
    if (still || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="group relative"
    >
      <motion.article
        style={{ rotateX: still ? 0 : rx, rotateY: still ? 0 : ry, transformStyle: "preserve-3d" }}
        className="relative border border-line bg-void-2/60 transition-colors duration-500 group-hover:border-line-2"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, rgba(240,178,63,0.13), transparent 65%)`
            ),
          }}
        />

        <Link href={`/properties/${p.slug}`} data-cursor="VIEW" className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-void">
            <motion.div style={{ x: still ? 0 : ix, y: still ? 0 : iy }} className="absolute -inset-6">
              <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-70" />

            <span className="data absolute left-4 top-4 border border-line-2 bg-void/70 px-2 py-1 text-pearl-dim backdrop-blur-sm">
              {p.deal === "sale" ? "For sale" : "To let"}
            </span>

            <span className="data absolute bottom-4 left-4 text-gold">{p.id}</span>
          </div>
        </Link>

        <div className="absolute right-4 top-4 z-20">
          <Favourite id={p.id} />
        </div>

        <div className="relative p-5 md:p-6" style={{ transform: "translateZ(28px)" }}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="display d-sm truncate">
                <Link href={`/properties/${p.slug}`} className="ulink">
                  {p.title}
                </Link>
              </h3>
              <p className="data mt-2 truncate">
                {p.address.locality} — {p.address.city}
              </p>
            </div>
            <FacingMark value={p.facing} />
          </div>

          <div className="rule my-5" />

          <div className="flex items-end justify-between gap-4">
            <p className="data-lg text-pearl">{price(p.price, p.deal)}</p>
            <p className="data text-right">
              {p.bedrooms ? `${p.bedrooms} bed · ` : ""}
              {area(p.areaSqft)}
            </p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
