"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Property } from "../../lib/types";
import { priceShort } from "../../lib/format";

export default function ScrollingStrip({ items }: { items: Property[] }) {
  return (
    <section className="overflow-hidden border-y border-line bg-void-2 py-6 md:py-8">
      <motion.div
        className="flex gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((p, i) => (
          <Link
            key={`${p.id}-${i}`}
            href={`/properties/${p.slug}`}
            className="flex shrink-0 items-center gap-5 rounded-lg border border-line bg-surface px-5 py-3 transition-shadow hover:shadow-md"
          >
            <div className="h-14 w-20 overflow-hidden rounded">
              <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="mt-0.5 font-mono text-xs text-muted">
                {p.address.city} — {priceShort(p.price)}
              </p>
            </div>
            <span className="ml-2 shrink-0 rounded-full bg-aqua/10 px-3 py-1 font-mono text-xs font-medium text-aqua">
              {p.deal === "sale" ? "Buy" : "Rent"}
            </span>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
