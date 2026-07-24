"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { area, price } from "../../lib/format";
import type { Property } from "../../lib/types";
import FacingMark from "../ui/FacingMark";

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
      className="group relative block w-[86vw] shrink-0 overflow-hidden rounded-lg border border-line bg-surface sm:w-[62vw] lg:w-[38vw]"
    >
      <div className="relative aspect-[3/4] overflow-hidden lg:aspect-[4/5]">
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
          <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />

        <span className="absolute left-5 top-5 rounded bg-surface/80 px-2 py-1 font-mono text-xs uppercase tracking-wider text-muted backdrop-blur-sm">
          {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>

        <div className="absolute inset-x-5 bottom-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="display d-md truncate">{p.title}</h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-pearl-dim">
                {p.address.locality} — {p.address.city}
              </p>
            </div>
            <FacingMark value={p.facing} />
          </div>
          <div className="divider my-4" />
          <div className="flex items-center justify-between gap-3">
            <span className="text-lg font-semibold">{price(p.price, p.deal)}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">{area(p.areaSqft)}</span>
          </div>
        </div>
      </div>
    </Link>
  ));

  if (still) {
    return (
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <span className="badge">Selected</span>
          <h2 className="display d-lg mt-6">Six worth the drive.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">{plates}</div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrap} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-5 pb-10 md:px-8">
          <div>
            <span className="badge">Selected</span>
            <h2 className="display d-lg mt-5">Six worth the drive.</h2>
          </div>
          <p className="hidden font-mono text-xs uppercase tracking-wider text-muted md:block">Keep scrolling — the row moves</p>
        </div>

        <motion.div style={{ x }} className="flex w-max gap-6 px-5 md:px-8">
          {plates}
        </motion.div>
      </div>
    </section>
  );
}
