"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { priceShort } from "../../lib/format";
import type { Inquiry, Property, Status } from "../../lib/types";
import BarChart from "./BarChart";

const TABS = ["Listings", "Enquiries"] as const;
const LANES: Array<Inquiry["status"]> = ["new", "contacted", "closed"];
const LANE_LABEL: Record<Inquiry["status"], string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export default function AdminDesk({
  seed,
  enquiries,
}: {
  seed: Property[];
  enquiries: Inquiry[];
}) {
  const [items, setItems] = useState(seed);
  const [board, setBoard] = useState(enquiries);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Listings");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [note, setNote] = useState("");

  const stats = useMemo(() => {
    const live = items.filter((p) => p.status === "approved");
    return {
      live: live.length,
      pending: items.filter((p) => p.status === "pending").length,
      featured: items.filter((p) => p.featured).length,
      views: items.reduce((n, p) => n + p.views, 0),
      value: live.filter((p) => p.deal === "sale").reduce((n, p) => n + p.price, 0),
      newEnquiries: board.filter((e) => e.status === "new").length,
    };
  }, [items, board]);

  const byCity = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((p) => map.set(p.address.city, (map.get(p.address.city) ?? 0) + 1));
    return Array.from(map, ([key, value]) => ({ key: key.slice(0, 6), value }));
  }, [items]);

  const flash = (msg: string) => {
    setNote(msg);
    setTimeout(() => setNote(""), 2600);
  };

  const setStatus = (id: string, status: Status) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    flash(`${id} ${status === "approved" ? "published" : status}`);
  };

  const toggleFeatured = (id: string) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
    flash(`${id} feature flag changed`);
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    flash(`${id} removed from the register`);
  };

  const move = (id: string, status: Inquiry["status"]) => {
    setBoard((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const rows = items.filter((p) => filter === "all" || p.status === filter);

  return (
    <div>
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Live", String(stats.live), "Published to the register"],
          ["Awaiting survey", String(stats.pending), "Not yet public"],
          ["New enquiries", String(stats.newEnquiries), "Unanswered"],
          ["Register value", priceShort(stats.value), "Sale listings only"],
        ].map(([label, value, note2]) => (
          <div key={label} className="bg-void p-6">
            <p className="data">{label}</p>
            <p className="display d-md mt-4 text-gold">{value}</p>
            <p className="data mt-3 text-muted">{note2}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <BarChart data={byCity} label="Listings by city" />
        <div className="border border-line bg-void-2/40 p-5">
          <p className="data mb-6">Register health</p>
          <dl className="flex flex-col gap-4">
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="data">Featured</dt>
              <dd className="data-lg text-pearl">{stats.featured}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-3">
              <dt className="data">Total views</dt>
              <dd className="data-lg text-pearl">{stats.views.toLocaleString("en-IN")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="data">Awaiting action</dt>
              <dd className="data-lg text-flare">{stats.pending + stats.newEnquiries}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button key={t} className="chip" data-on={tab === t} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {tab === "Listings" ? (
          <div className="flex gap-2">
            {(["all", "approved", "pending", "rejected"] as const).map((f) => (
              <button key={f} className="chip" data-on={filter === f} onClick={() => setFilter(f)}>
                {f === "all" ? "Everything" : f}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <AnimatePresence>
        {note ? (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="data mt-4 border border-gold/50 bg-gold/10 px-4 py-3 text-gold"
          >
            {note}
          </motion.p>
        ) : null}
      </AnimatePresence>

      {tab === "Listings" ? (
        <div className="mt-6 overflow-x-auto border border-line">
          <table className="w-full min-w-[860px] text-left">
            <thead className="hairline-b bg-void-2/60">
              <tr>
                {["Ref", "Property", "City", "Price", "State", "Actions"].map((h) => (
                  <th key={h} className="data px-4 py-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {rows.map((p) => (
                  <motion.tr
                    key={p.id}
                    layout
                    exit={{ opacity: 0, height: 0 }}
                    className="border-b border-line last:border-0"
                  >
                    <td className="data px-4 py-4 text-gold">{p.id}</td>
                    <td className="px-4 py-4">
                      <Link href={`/properties/${p.slug}`} className="ulink text-sm">
                        {p.title}
                      </Link>
                      {p.featured ? <span className="data ml-2 text-flare">★</span> : null}
                    </td>
                    <td className="data px-4 py-4">{p.address.city}</td>
                    <td className="data-lg px-4 py-4">{priceShort(p.price)}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`data ${
                          p.status === "approved"
                            ? "text-gold"
                            : p.status === "pending"
                              ? "text-flare"
                              : "text-muted"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {p.status !== "approved" ? (
                          <button className="chip" onClick={() => setStatus(p.id, "approved")}>Publish</button>
                        ) : (
                          <button className="chip" onClick={() => setStatus(p.id, "pending")}>Unpublish</button>
                        )}
                        <button className="chip" onClick={() => toggleFeatured(p.id)}>
                          {p.featured ? "Unfeature" : "Feature"}
                        </button>
                        <button className="chip" onClick={() => remove(p.id)}>Remove</button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {!rows.length ? (
            <p className="p-10 text-center text-sm text-pearl-dim">
              Nothing in this state. Choose another filter.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {LANES.map((lane) => {
            const cards = board.filter((e) => e.status === lane);
            return (
              <section key={lane} className="border border-line bg-void-2/30">
                <div className="hairline-b flex items-center justify-between px-4 py-3">
                  <h3 className="data">{LANE_LABEL[lane]}</h3>
                  <span className="data text-gold">{String(cards.length).padStart(2, "0")}</span>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  {cards.map((e) => (
                    <motion.article key={e.id} layout className="border border-line bg-void p-4">
                      <p className="text-sm">{e.name}</p>
                      <p className="data mt-1">{e.propertyId} — {e.phone}</p>
                      <p className="mt-3 text-xs leading-relaxed text-pearl-dim">{e.message}</p>
                      <div className="mt-4 flex gap-2">
                        {LANES.filter((l) => l !== lane).map((l) => (
                          <button key={l} className="chip" onClick={() => move(e.id, l)}>
                            → {LANE_LABEL[l]}
                          </button>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                  {!cards.length ? (
                    <p className="data py-6 text-center text-muted">Empty</p>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
