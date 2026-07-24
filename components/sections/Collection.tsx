"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { area, price } from "../../lib/format";
import type { Property } from "../../lib/types";
import FacingMark from "../ui/FacingMark";
import Plate from "../ui/Plate";

/**
 * Pinned section that translates a row of plates sideways as the page scrolls.
 * Falls back to a normal vertical stack when motion is reduced or on narrow
 * screens, where horizontal hijacking is hostile.
 */
export default function Collection({ items }: { items: Property[] }) {
  const wrap = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  const plates = items.map((p, i) => (
    <Link
      key={p.id}
      href={`/properties/${p.slug}`}
      data-cursor="VIEW"
      className="group relative block w-[86vw] shrink-0 border border-line bg-void-2 sm:w-[62vw] lg:w-[38vw]"
    >
      <div className="relative aspect-[3/4] overflow-hidden lg:aspect-[4/5]">
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
          <Plate seed={p.sheet} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />

        <span className="data absolute left-5 top-5 text-gold">
          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="display d-md truncate">{p.title}</h3>
              <p className="data mt-2 truncate">
                {p.address.locality} — {p.address.city}
              </p>
            </div>
            <FacingMark value={p.facing} />
          </div>
          <div className="rule my-4" />
          <div className="flex items-center justify-between gap-3">
            <span className="data-lg">{price(p.price, p.deal)}</span>
            <span className="data">{area(p.areaSqft)}</span>
          </div>
        </div>
      </div>
    </Link>
  ));

  if (still) {
    return (
      <section className="shell py-24">
        <p className="eyebrow">Selected</p>
        <h2 className="display d-lg mt-6">Six worth the drive.</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">{plates}</div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="shell flex items-end justify-between gap-6 pb-10">
          <div>
            <p className="eyebrow">Selected</p>
            <h2 className="display d-lg mt-5">Six worth the drive.</h2>
          </div>
          <p className="data hidden shrink-0 md:block">Keep scrolling — the row moves</p>
        </div>

        <motion.div style={{ x }} className="flex w-max gap-6 px-[clamp(1.25rem,5vw,5.5rem)]">
          {plates}
        </motion.div>
      </div>
    </section>
  );
}
