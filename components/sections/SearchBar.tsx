"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { CITIES } from "../../lib/data";

export default function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [deal, setDeal] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (city) params.set("city", city);
    if (deal) params.set("deal", deal);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <svg className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by city, locality, or property…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input-lux pl-10"
        />
      </div>
      <select value={city} onChange={(e) => setCity(e.target.value)} className="select-lux md:w-44">
        <option value="">All cities</option>
        {CITIES.map((c) => (<option key={c} value={c}>{c}</option>))}
      </select>
      <select value={deal} onChange={(e) => setDeal(e.target.value)} className="select-lux md:w-36">
        <option value="">All deals</option>
        <option value="sale">For sale</option>
        <option value="rent">To let</option>
      </select>
      <button type="submit" className="p-btn p-btn-primary shrink-0">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </button>
    </form>
  );
}
