import Link from "next/link";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";

export default function Enquire() {
  return (
    <section className="shell py-28 md:py-40">
      <div className="relative border border-line bg-void-2/50 px-6 py-16 md:px-16 md:py-24">
        <span className="corner-tick absolute left-3 top-3 border-l border-t" />
        <span className="corner-tick absolute right-3 top-3 border-r border-t" />
        <span className="corner-tick absolute bottom-3 left-3 border-b border-l" />
        <span className="corner-tick absolute bottom-3 right-3 border-b border-r" />

        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow justify-center">Talk to the desk</p>
          </Reveal>

          <RevealText
            as="h2"
            text="Tell us what you are looking for. We will tell you if we have it."
            className="display d-lg mt-8"
          />

          <Reveal delay={0.3}>
            <p className="lede mx-auto mt-8 text-center">
              If nothing on the register fits, we will say so — and put you on the list for what
              comes in next.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link href="/properties" className="btn btn-solid" data-cursor="BROWSE">
                Browse the register
              </Link>
              <a href="tel:+919849011204" className="btn" data-cursor="CALL">
                +91 98490 11204
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
