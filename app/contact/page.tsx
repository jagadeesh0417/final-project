import type { Metadata } from "next";
import ContactForm from "../../components/ui/ContactForm";
import PageHead from "../../components/ui/PageHead";
import Reveal from "../../components/motion/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the AKRADHI desk about buying, renting, selling or letting property across south India.",
};

const OFFICES = [
  { city: "Hyderabad", role: "Head office", lines: ["Road No. 3, Banjara Hills", "Hyderabad 500034"], phone: "+91 98485 79053" },
  { city: "Bengaluru", role: "South desk", lines: ["12th Main, Indiranagar", "Bengaluru 560038"], phone: "+91 98485 79053" },
  { city: "North Goa", role: "Coastal desk", lines: ["Anjuna–Assagao Road", "Assagao 403507"], phone: "+91 98485 79053" },
];

export default function ContactPage() {
  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Three desks, one number that always answers."
        note="Buying, renting, selling or letting — start here and we will put you with the person who knows that patch."
      />

      <div className="shell grid gap-12 pb-24 lg:grid-cols-[1.15fr_1fr] lg:gap-20 2xl:gap-28">
        <ContactForm />

        <div className="flex flex-col gap-8">
          <div className="grid gap-px bg-line">
            {OFFICES.map((o, i) => (
              <Reveal key={o.city} delay={i * 0.08} className="bg-void p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display d-sm">{o.city}</h3>
                  <span className="data">{o.role}</span>
                </div>
                <div className="rule my-5" />
                {o.lines.map((l) => (
                  <p key={l} className="text-sm text-pearl-dim">{l}</p>
                ))}
                <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="data-lg ulink mt-4 inline-block text-gold" data-cursor="CALL">
                  {o.phone}
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="glass p-6 md:p-8">
              <p className="eyebrow">Hours</p>
              <dl className="mt-6 flex flex-col gap-4">
                {[
                  ["Monday — Friday", "10:00 — 18:30"],
                  ["Saturday", "By appointment"],
                  ["Sunday", "Closed"],
                  ["Viewings", "Arranged within 48 hours"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-b border-line pb-3 last:border-0">
                    <dt className="data">{k}</dt>
                    <dd className="data-lg text-pearl">{v}</dd>
                  </div>
                ))}
              </dl>
              <a href="mailto:desk@akradhi.example" className="btn mt-8 w-full" data-cursor="EMAIL">
                desk@akradhi.example
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
