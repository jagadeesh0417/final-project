import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import SearchBar from "../ui/SearchBar";
import { PROPERTIES } from "../../lib/data";

export default function Hero() {
  const live = PROPERTIES.filter((p) => p.status === "approved").length;
  const hero = PROPERTIES.find((p) => p.featured && p.images?.length) ?? PROPERTIES[0];

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24 md:pt-28">
      <div className="absolute inset-0 -z-10">
        <img
          src={hero.images[0]}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-void/95 via-void/75 to-void/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/20" />
      </div>

      <div className="shell relative flex min-h-[calc(100svh-7rem)] flex-col justify-between pb-10">
        <div className="max-w-4xl">
          <Reveal>
            <p className="eyebrow">AKRADHI — South India</p>
          </Reveal>

          <RevealText
            as="h1"
            text="Every listing here has been stood in."
            className="display d-xl mt-7"
            delay={0.1}
          />

          <Reveal delay={0.35}>
            <p className="lede mt-8">
              We measure, photograph and survey each property before it goes up, so what you read
              on the sheet is what you find at the gate. {live} live across seven cities.
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal delay={0.5}>
            <SearchBar />
          </Reveal>

          <Reveal delay={0.6}>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="data">Scroll — the cluster resolves</p>
              <p className="data">Study 01 — Prism cluster</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
