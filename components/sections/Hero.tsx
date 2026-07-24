import Link from "next/link";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import SearchBar from "../ui/SearchBar";
import { PROPERTIES } from "../../lib/data";
import { priceShort } from "../../lib/format";

export default function Hero() {
  const live = PROPERTIES.filter((p) => p.status === "approved");
  const hero = live.find((p) => p.featured && p.images?.length) ?? live[0];
  const cities = new Set(live.map((p) => p.address.city)).size;
  const totalValue = live.filter((p) => p.deal === "sale").reduce((n, p) => n + p.price, 0);

  return (
    <section className="relative min-h-[90svh] overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0">
        <img
          src={hero.images[0]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void/95 via-void/80 to-void/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[90svh] max-w-7xl flex-col justify-between px-5 pb-8 pt-28 md:px-8 md:pt-36">
        <div className="max-w-3xl">
          <Reveal>
            <span className="badge mb-6">Trusted across {cities} cities</span>
          </Reveal>

          <RevealText
            as="h1"
            text="Every listing here has been stood in."
            className="display d-xl mt-2"
          />

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pearl-dim md:text-xl">
              We measure, photograph, and survey each property before it goes up.
              What you read on the sheet is what you find at the gate.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/properties" className="btn-gold btn" data-cursor="BROWSE">
                Browse listings
              </Link>
              <Link href="/contact" className="btn" data-cursor="CONTACT">
                Talk to us
              </Link>
            </div>
          </Reveal>
        </div>

        {/* search bar */}
        <Reveal delay={0.5}>
          <div className="mt-12 rounded-lg border border-line bg-surface/95 p-4 shadow-lg backdrop-blur-md md:p-6">
            <SearchBar />
          </div>
        </Reveal>

        {/* stats */}
        <Reveal delay={0.6}>
          <div className="mt-8 grid grid-cols-2 gap-3 md:flex md:gap-8">
            <div className="rounded bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-2xl font-medium text-gold md:text-3xl">{live.length}</p>
              <p className="text-xs uppercase tracking-wider text-white/70">Live listings</p>
            </div>
            <div className="rounded bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-2xl font-medium text-gold md:text-3xl">{cities}</p>
              <p className="text-xs uppercase tracking-wider text-white/70">Cities</p>
            </div>
            <div className="rounded bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-2xl font-medium text-gold md:text-3xl">{priceShort(totalValue)}</p>
              <p className="text-xs uppercase tracking-wider text-white/70">Register value</p>
            </div>
            <div className="rounded bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-2xl font-medium text-gold md:text-3xl">48h</p>
              <p className="text-xs uppercase tracking-wider text-white/70">Viewing turnaround</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
