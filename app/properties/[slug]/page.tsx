import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "../../../components/ui/Gallery";
import SitePlan from "../../../components/ui/SitePlan";
import EnquiryForm from "../../../components/ui/EnquiryForm";
import EmiCalculator from "../../../components/ui/EmiCalculator";
import FacingMark from "../../../components/ui/FacingMark";
import Favourite from "../../../components/ui/Favourite";
import PropertyCard from "../../../components/ui/PropertyCard";
import Reveal from "../../../components/motion/Reveal";
import RevealText from "../../../components/motion/RevealText";
import { PROPERTIES, bySlug } from "../../../lib/data";
import { related } from "../../../lib/query";
import { area, price, rate } from "../../../lib/format";

/**
 * Only published listings get a route. With dynamicParams off, anything else —
 * an unpublished slug or a typo — is a real 404 from the router rather than a
 * soft 404 rendered with a 200.
 *
 * Moving to a database? Set `dynamicParams = true` so listings added after the
 * build are still reachable, and keep the notFound() guard below.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return PROPERTIES.filter((p) => p.status === "approved").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.title}, ${p.address.locality}`,
    description: p.tagline,
    openGraph: { title: p.title, description: p.tagline },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p || p.status !== "approved") notFound();

  const sheets = [p.sheet, ((p.sheet + 3) % 12) + 1, ((p.sheet + 6) % 12) + 1, ((p.sheet + 9) % 12) + 1];
  const others = related(p);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: p.title,
    description: p.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: p.address.locality,
      addressLocality: p.address.city,
      addressRegion: p.address.state,
      postalCode: p.address.pincode,
      addressCountry: "IN",
    },
    numberOfRooms: p.bedrooms,
    floorSize: { "@type": "QuantitativeValue", value: p.areaSqft, unitCode: "FTK" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="shell pb-10 pt-32 md:pt-44">
        <Reveal>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/properties" className="data ulink">← The register</Link>
            <span className="data text-gold">{p.id}</span>
            <span className="data">{p.deal === "sale" ? "For sale" : "To let"}</span>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <RevealText as="h1" text={p.title} className="display d-lg" />
            <Reveal delay={0.2}>
              <p className="lede mt-4">{p.tagline}</p>
            </Reveal>
          </div>
          <Reveal delay={0.3}>
            <div className="flex items-center gap-4">
              <FacingMark value={p.facing} size={44} />
              <Favourite id={p.id} />
            </div>
          </Reveal>
        </div>
      </header>

      <div className="shell">
        <Gallery sheets={sheets} title={p.title} />
      </div>

      <div className="shell mt-14 grid gap-12 pb-8 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
            <div className="field border-0"><dt>Price</dt><dd className="text-gold">{price(p.price, p.deal)}</dd></div>
            <div className="field border-0"><dt>Built area</dt><dd>{area(p.areaSqft)}</dd></div>
            {p.plotSqft ? <div className="field border-0"><dt>Plot</dt><dd>{area(p.plotSqft)}</dd></div> : null}
            <div className="field border-0"><dt>Rate</dt><dd>{rate(p.price, p.areaSqft)}</dd></div>
            {p.bedrooms ? <div className="field border-0"><dt>Bedrooms</dt><dd>{p.bedrooms}</dd></div> : null}
            {p.bathrooms ? <div className="field border-0"><dt>Bathrooms</dt><dd>{p.bathrooms}</dd></div> : null}
            {p.floors ? <div className="field border-0"><dt>Floors</dt><dd>{p.floors}</dd></div> : null}
            <div className="field border-0"><dt>Fabric from</dt><dd>{p.yearBuilt}</dd></div>
            <div className="field border-0"><dt>Locality</dt><dd>{p.address.locality}</dd></div>
            <div className="field border-0"><dt>City</dt><dd>{p.address.city}</dd></div>
          </dl>

          <section className="mt-14">
            <p className="eyebrow">The sheet</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pearl-dim">{p.description}</p>
          </section>

          <section className="mt-14">
            <p className="eyebrow">What comes with it</p>
            <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {p.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 bg-void px-4 py-4 text-sm">
                  <span className="h-1 w-1 rotate-45 bg-gold" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <SitePlan p={p} />
          </section>

          {p.deal === "sale" ? (
            <section className="mt-14">
              <EmiCalculator value={p.price} />
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-line bg-void-2/50 p-6">
            <p className="data">{p.deal === "sale" ? "Guide price" : "Monthly rent"}</p>
            <p className="display d-md mt-2 text-gold">{price(p.price, p.deal)}</p>
            <div className="rule my-5" />
            <p className="data">Surveyed by</p>
            <p className="mt-2 text-base">{p.agent.name}</p>
            <p className="data mt-1">{p.agent.firm}</p>
            <a href={`tel:${p.agent.phone.replace(/\s/g, "")}`} className="btn mt-5 w-full justify-center" data-cursor="CALL">
              {p.agent.phone}
            </a>
          </div>

          <div className="mt-6">
            <EnquiryForm propertyId={p.id} title={p.title} />
          </div>
        </aside>
      </div>

      {others.length ? (
        <section className="shell mt-24">
          <div className="rule mb-12" />
          <p className="eyebrow">Nearby, or similar</p>
          <h2 className="display d-lg mt-6">Also on the register.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((o, i) => (
              <PropertyCard key={o.id} p={o} index={i} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
