import Link from "next/link";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";
import Parallax from "../motion/Parallax";
import Plate from "../ui/Plate";
import { PROPERTIES } from "../../lib/data";
import { priceShort } from "../../lib/format";

export default function Cities() {
  const live = PROPERTIES.filter((p) => p.status === "approved");
  const cities = Array.from(new Set(live.map((p) => p.address.city))).map((city) => {
    const inCity = live.filter((p) => p.address.city === city);
    return {
      city,
      count: inCity.length,
      from: Math.min(...inCity.map((p) => p.price)),
      sheet: inCity[0].sheet,
    };
  });

  return (
    <section className="shell py-24 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal>
            <p className="eyebrow">Where we work</p>
          </Reveal>
          <RevealText as="h2" text="Seven cities, one desk." className="display d-lg mt-6" />
        </div>
        <Reveal delay={0.2}>
          <Link href="/properties" className="btn" data-cursor="OPEN">
            Open the register
          </Link>
        </Reveal>
      </div>

      <ul className="mt-16 border-t border-line">
        {cities.map((c, i) => (
          <li key={c.city} className="border-b border-line">
            <Link
              href={`/properties?city=${encodeURIComponent(c.city)}`}
              data-cursor="FILTER"
              className="group relative flex items-center justify-between gap-6 py-6 md:py-8"
            >
              <span className="data w-10 shrink-0 text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>

              <span className="display d-md flex-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                {c.city}
              </span>

              {/* the plate slides in from the right on hover */}
              <span className="pointer-events-none absolute right-40 top-1/2 hidden h-24 w-36 -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 lg:block">
                <Parallax distance={18} className="h-full w-full">
                  <Plate seed={c.sheet} />
                </Parallax>
              </span>

              <span className="data shrink-0 text-right">
                from {priceShort(c.from)}
                <span className="ml-4 text-gold">{String(c.count).padStart(2, "0")}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
