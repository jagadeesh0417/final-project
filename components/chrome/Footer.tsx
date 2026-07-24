import Link from "next/link";
import Marquee from "../motion/Marquee";
import { CITIES } from "../../lib/data";

export default function Footer() {
  return (
    <footer className="mt-24 bg-void-2">
      <div className="border-y border-line overflow-hidden">
        <Marquee items={CITIES} />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <p className="display text-3xl">AKRADHI</p>
            <p className="mt-4 text-sm leading-relaxed text-pearl-dim">
              A private-office property practice working across the Deccan,
              the Konkan coast and the south. Every listing is surveyed before
              it is published — what you see is what we know.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Browse</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/properties" className="text-pearl-dim transition-colors hover:text-pearl">All listings</Link></li>
              <li><Link href="/properties?deal=sale" className="text-pearl-dim transition-colors hover:text-pearl">For sale</Link></li>
              <li><Link href="/properties?deal=rent" className="text-pearl-dim transition-colors hover:text-pearl">To let</Link></li>
              <li><Link href="/filters" className="text-pearl-dim transition-colors hover:text-pearl">Advanced search</Link></li>
              <li><Link href="/favourites" className="text-pearl-dim transition-colors hover:text-pearl">Shortlist</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Contact</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="text-pearl-dim">Road No. 3, Banjara Hills</li>
              <li className="text-pearl-dim">Hyderabad 500034</li>
              <li className="pt-1">
                <a href="tel:+919848579053" className="text-gold transition-colors hover:text-gold-2">+91 98485 79053</a>
              </li>
              <li>
                <a href="mailto:desk@akradhi.example" className="text-pearl-dim transition-colors hover:text-pearl">desk@akradhi.example</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">Hours</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="text-pearl-dim">Mon — Fri, 10:00 – 18:30</li>
              <li className="text-pearl-dim">Saturday, by appointment</li>
              <li className="pt-2 text-xs text-muted">Viewings arranged within 48 hours</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">© 2026 AKRADHI Property. All rights reserved.</p>
          <p className="text-xs text-muted">Listings shown are for illustrative purposes.</p>
        </div>
      </div>
    </footer>
  );
}
