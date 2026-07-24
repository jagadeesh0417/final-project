import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";

/** Numbered because it genuinely is a sequence — each step gates the next. */
const STEPS = [
  {
    n: "01",
    title: "Survey",
    body: "A measured drawing, a title search and a site visit. Anything that fails at this stage never reaches the register, which is why the book is short.",
  },
  {
    n: "02",
    title: "Sheet",
    body: "Every property gets a sheet: dimensions, orientation, age of fabric, what has been changed and when. You read the same document we work from.",
  },
  {
    n: "03",
    title: "Stand in it",
    body: "Viewings are arranged within forty-eight hours, with the person who surveyed it. They will tell you what is wrong with the building before you ask.",
  },
];

export default function Method() {
  return (
    <section className="hairline-t hairline-b bg-void-2/40">
      <div className="shell py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">How a listing gets here</p>
            </Reveal>
            <RevealText as="h2" text="Three gates, in order." className="display d-lg mt-6" />
          </div>
          <Reveal delay={0.15}>
            <p className="lede">
              Most portals publish whatever an owner sends them. We do the opposite — the sheet is
              produced by us, and a property only moves forward when the previous step is clean.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="bg-void p-7 md:p-9">
              <li>
                <div className="flex items-baseline justify-between">
                  <span className="data text-gold">{s.n}</span>
                  <span className="data text-muted">Step {s.n} of 03</span>
                </div>
                <h3 className="display d-md mt-8">{s.title}</h3>
                <div className="rule my-6" />
                <p className="text-sm leading-relaxed text-pearl-dim">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
