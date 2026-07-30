"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES, CITIES } from "../../../lib/data";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PropertiesHero() {
  const router = useRouter();
  const live = PROPERTIES.filter((p) => p.status === "approved");
  const [city, setCity] = useState("");
  const [deal, setDeal] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (deal) params.set("deal", deal);
    if (category) params.set("category", category);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden md:min-h-[75vh]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.5)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10"
        style={{ paddingTop: 90 }}
      >
        <div className="max-w-3xl">
          <span className="badge bg-white/5 text-warm">Explore Properties</span>
          <h1 className="display d-hero mt-6 text-white">Find Your Dream Property</h1>
          <p className="mt-6 max-w-xl text-lg text-white/60 md:text-xl">
            Explore verified luxury villas, apartments, penthouses, commercial spaces, plots, and investment opportunities across South India.
          </p>
        </div>

        {/* Animated search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease }}
          className="mt-10"
        >
          <div className="glass mx-auto max-w-4xl rounded-full p-1.5">
            <div className="flex items-center gap-1.5">
              <div className="flex flex-1 items-center gap-3 pl-5">
                <svg className="h-[18px] w-[18px] shrink-0 text-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search by city, locality or property..." className="w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-gray" />
              </div>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="hidden border-0 bg-transparent py-3 text-sm outline-none md:block">
                <option value="">All Cities</option>
                {CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
              <select value={deal} onChange={(e) => setDeal(e.target.value)} className="hidden border-0 bg-transparent py-3 text-sm outline-none md:block">
                <option value="">Buy / Rent</option>
                <option value="sale">Buy</option>
                <option value="rent">Rent</option>
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="hidden border-0 bg-transparent py-3 text-sm outline-none lg:block">
                <option value="">Property Type</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
              <button type="submit" className="btn-lux btn-gold shrink-0 rounded-full px-6 py-3 text-xs">
                Search
              </button>
            </div>
          </div>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-8"
        >
          {[
            { value: live.length, label: "Available Properties" },
            { value: new Set(live.map(p => p.address.city)).size, label: "Cities Covered" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="num text-xl text-gold md:text-2xl">{s.value}</span>
              <span className="text-xs uppercase tracking-widest text-white/50">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
