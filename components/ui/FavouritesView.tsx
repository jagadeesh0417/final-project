"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useFavourites } from "../../lib/favourites";
import type { Property } from "../../lib/types";
import PropertyCard from "./PropertyCard";

export default function FavouritesView({ all }: { all: Property[] }) {
  const { ids, clear, ready } = useFavourites();

  if (!ready) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[420px] animate-pulse border border-line bg-void-2/40" />
        ))}
      </div>
    );
  }

  const kept = ids
    .map((id) => all.find((p) => p.id === id))
    .filter((p): p is Property => Boolean(p));

  if (!kept.length) {
    return (
      <div className="border border-line p-14 text-center">
        <p className="display d-md">Nothing kept yet.</p>
        <p className="lede mx-auto mt-4 text-center">
          Add properties from the register and they will collect here, ready to send to the desk in
          one go.
        </p>
        <Link href="/properties" className="btn btn-solid mt-8" data-cursor="OPEN">
          Open the register
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <p className="data">
          {kept.length} kept — {kept.length === 1 ? "one property" : "properties"}
        </p>
        <button className="btn px-4 py-2" onClick={clear}>Clear all</button>
      </div>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {kept.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.4 } }}
            >
              <PropertyCard p={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
