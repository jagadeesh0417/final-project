import Link from "next/link";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";
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
      image: inCity[0].images[0],
    };
  });

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="badge">Where we work</span>
            </Reveal>
            <RevealText as="h2" text="Seven cities, one desk." className="display d-lg mt-6" />
          </div>
          <Reveal delay={0.2}>
            <Link href="/properties" className="btn" data-cursor="OPEN">
              Open the register
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.map((c, i) => (
            <Reveal key={c.city} delay={i * 0.05}>
              <Link
                href={`/properties?city=${encodeURIComponent(c.city)}`}
                data-cursor="FILTER"
                className="group relative block overflow-hidden rounded-lg border border-line bg-surface transition-all hover:border-line-2 hover:shadow-md"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.city}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white">{c.city}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-white/70">
                      from {priceShort(c.from)}
                    </span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-xs text-white backdrop-blur-sm">
                      {String(c.count).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
