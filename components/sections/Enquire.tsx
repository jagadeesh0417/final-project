import Link from "next/link";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";

export default function Enquire() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-xl bg-aqua px-6 py-16 md:px-16 md:py-24">
          {/* decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-white">
                Talk to the desk
              </span>
            </Reveal>

            <RevealText
              as="h2"
              text="Tell us what you are looking for. We will tell you if we have it."
              className="display d-lg mt-8 text-white"
            />

            <Reveal delay={0.3}>
              <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/80">
                If nothing on the register fits, we will say so — and put you on
                the list for what comes in next.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 rounded bg-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-aqua transition-all hover:bg-white/90"
                  data-cursor="BROWSE"
                >
                  Browse the register
                </Link>
                <a
                  href="tel:+919848579053"
                  className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-white/10"
                  data-cursor="CALL"
                >
                  +91 98485 79053
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
