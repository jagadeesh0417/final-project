"use client";

import { useState } from "react";
import { emi, price } from "../../lib/format";

export default function EmiCalculator({ value }: { value: number }) {
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const principal = value * (1 - down / 100);
  const monthly = emi(principal, rate, years);
  const total = monthly * years * 12;

  return (
    <div className="border border-line bg-void-2/40">
      <div className="hairline-b flex items-center justify-between px-5 py-3">
        <span className="data">Repayment estimate</span>
        <span className="data">Indicative only</span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-3">
        <div>
          <div className="mb-2 flex justify-between">
            <label className="data" htmlFor="c-down">Deposit</label>
            <span className="data-lg text-gold">{down}%</span>
          </div>
          <input id="c-down" type="range" min={10} max={80} step={5} value={down} onChange={(e) => setDown(Number(e.target.value))} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <label className="data" htmlFor="c-rate">Interest</label>
            <span className="data-lg text-gold">{rate.toFixed(2)}%</span>
          </div>
          <input id="c-rate" type="range" min={7} max={12} step={0.05} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <label className="data" htmlFor="c-years">Term</label>
            <span className="data-lg text-gold">{years} yr</span>
          </div>
          <input id="c-years" type="range" min={5} max={30} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
      </div>

      <dl className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
        <div className="field border-0">
          <dt>Monthly</dt>
          <dd className="display d-sm text-gold">
            ₹{Math.round(monthly).toLocaleString("en-IN")}
          </dd>
        </div>
        <div className="field border-0">
          <dt>Borrowing</dt>
          <dd>{price(principal)}</dd>
        </div>
        <div className="field border-0">
          <dt>Repaid over term</dt>
          <dd>{price(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
