import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";

export default function PageHead({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string;
  title: string;
  note?: string;
}) {
  return (
    <header className="shell pb-12 pt-32 md:pb-16 md:pt-44">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <RevealText as="h1" text={title} className="display d-lg mt-6 max-w-4xl" />
      {note ? (
        <Reveal delay={0.2}>
          <p className="lede mt-6">{note}</p>
        </Reveal>
      ) : null}
      <div className="rule mt-12" />
    </header>
  );
}
