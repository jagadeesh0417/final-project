"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CITIES } from "../../lib/data";
import { toSearchParams } from "../../lib/query";
import MagneticButton from "../motion/MagneticButton";

const BUDGETS = [
  { label: "Any budget", min: 0, max: 0 },
  { label: "Under ₹3 Cr", min: 0, max: 30000000 },
  { label: "₹3 — 10 Cr", min: 30000000, max: 100000000 },
  { label: "₹10 — 25 Cr", min: 100000000, max: 250000000 },
  { label: "Above ₹25 Cr", min: 250000000, max: 0 },
];

export default function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [deal, setDeal] = useState("");
  const [budget, setBudget] = useState(0);

  const submit = () => {
    const b = BUDGETS[budget];
    router.push(`/properties?${toSearchParams({ city, deal: deal as never, min: b.min, max: b.max })}`);
  };

  return (
    <div className="border border-line bg-void-2/70 backdrop-blur-md">
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="bg-void-2 p-4">
          <span className="data mb-2 block">City</span>
          <select
            className="select border-0 bg-transparent p-0 focus:border-0"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Anywhere</option>
            {CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="bg-void-2 p-4">
          <span className="data mb-2 block">Looking to</span>
          <select
            className="select border-0 bg-transparent p-0"
            value={deal}
            onChange={(e) => setDeal(e.target.value)}
          >
            <option value="">Buy or rent</option>
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </label>

        <label className="bg-void-2 p-4">
          <span className="data mb-2 block">Budget</span>
          <select
            className="select border-0 bg-transparent p-0"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          >
            {BUDGETS.map((b, i) => (
              <option key={b.label} value={i}>{b.label}</option>
            ))}
          </select>
        </label>

        <MagneticButton
          className="btn btn-solid justify-center border-0 lg:px-10"
          onClick={submit}
        >
          Search
        </MagneticButton>
      </div>
    </div>
  );
}
