import Link from "next/link";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";
import PropertyCard from "../ui/PropertyCard";
import type { Property } from "../../lib/types";

export default function FeaturedProperties({ items }: { items: Property[] }) {
  return (
    <section className="bg-void-2 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="badge">Featured listings</span>
            </Reveal>
            <RevealText
              as="h2"
              text="Six worth the drive."
              className="display d-lg mt-6"
            />
          </div>
          <Reveal delay={0.2}>
            <Link href="/properties" className="btn" data-cursor="OPEN">
              View all listings
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <PropertyCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
