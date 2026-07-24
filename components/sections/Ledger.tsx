import Counter from "../motion/Counter";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";
import { PROPERTIES } from "../../lib/data";

export default function Ledger() {
  const live = PROPERTIES.filter((p) => p.status === "approved");
  const acres = live.reduce((n, p) => n + (p.plotSqft ?? 0), 0) / 43560;
  const cities = new Set(live.map((p) => p.address.city)).size;
  const oldest = Math.min(...live.map((p) => p.yearBuilt).filter((y) => y > 1800));

  const rows: Array<[string, React.ReactNode, string]> = [
    ["Live listings", <Counter key="a" to={live.length} />, "Surveyed and published"],
    ["Land held", <Counter key="b" to={acres} decimals={1} suffix=" ac" />, "Across four layouts"],
    ["Cities covered", <Counter key="c" to={cities} />, "Deccan, coast and south"],
    ["Oldest fabric", <span key="d">{oldest}</span>, "Still standing, still let"],
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-20">
          <div>
            <Reveal>
              <span className="badge">The register</span>
            </Reveal>
            <RevealText
              as="h2"
              text="A short book, kept carefully."
              className="display d-lg mt-6"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              We would rather carry twenty-four properties we can answer questions
              about than four hundred we cannot. Everything below has a measured
              drawing, a title check, and a named person who has walked it.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {rows.map(([label, value, note], i) => (
            <Reveal key={label} delay={i * 0.08} className="bg-surface p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
              <p className="display d-lg mt-4 text-aqua">{value}</p>
              <p className="mt-3 text-xs text-pearl-dim">{note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
