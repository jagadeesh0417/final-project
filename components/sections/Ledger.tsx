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
    ["Cities", <Counter key="c" to={cities} />, "Deccan, coast and south"],
    ["Oldest fabric", <span key="d">{oldest}</span>, "Still standing, still let"],
  ];

  return (
    <section className="shell py-24 md:py-36">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">The register</p>
          </Reveal>
          <RevealText
            as="h2"
            text="A short book, kept carefully."
            className="display d-lg mt-6"
          />
        </div>
        <Reveal delay={0.15}>
          <p className="lede">
            We would rather carry twenty-four properties we can answer questions about than four
            hundred we cannot. Everything below has a measured drawing, a title check and a named
            person who has walked it.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {rows.map(([label, value, note], i) => (
          <Reveal key={label} delay={i * 0.08} className="bg-void p-6 md:p-8">
            <p className="data">{label}</p>
            <p className="display d-lg mt-6 text-gold">{value}</p>
            <p className="data mt-4 text-muted">{note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
