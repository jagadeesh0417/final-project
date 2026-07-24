import Link from "next/link";
import Marquee from "../motion/Marquee";
import { CITIES } from "../../lib/data";

export default function Footer() {
  return (
    <footer className="hairline-t mt-32 bg-void">
      <div className="hairline-b overflow-hidden">
        <Marquee items={CITIES} />
      </div>

      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="display d-md">AKRADHI</p>
          <p className="lede mt-4 text-sm">
            A private-office property practice working across the Deccan, the Konkan coast and the
            south. Listings are surveyed before they are published.
          </p>
        </div>

        <div>
          <p className="data mb-4">Browse</p>
          <ul className="flex flex-col gap-2 text-sm text-pearl-dim">
            <li><Link href="/properties" className="ulink">All listings</Link></li>
            <li><Link href="/properties?deal=sale" className="ulink">For sale</Link></li>
            <li><Link href="/properties?deal=rent" className="ulink">To let</Link></li>
            <li><Link href="/filters" className="ulink">Advanced search</Link></li>
            <li><Link href="/contact" className="ulink">Contact</Link></li>
            <li><Link href="/favourites" className="ulink">Your favourites</Link></li>
          </ul>
        </div>

        <div>
          <p className="data mb-4">Office</p>
          <ul className="flex flex-col gap-2 text-sm text-pearl-dim">
            <li>Road No. 3, Banjara Hills</li>
            <li>Hyderabad 500034</li>
            <li className="pt-2">
              <a href="tel:+919849011204" className="ulink">+91 98490 11204</a>
            </li>
            <li>
              <a href="mailto:desk@akradhi.example" className="ulink">desk@akradhi.example</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="data mb-4">Hours</p>
          <ul className="flex flex-col gap-2 text-sm text-pearl-dim">
            <li>Mon — Fri, 10:00 to 18:30</li>
            <li>Sat, by appointment</li>
            <li className="pt-2 text-muted">Viewings arranged within 48 hours.</li>
          </ul>
        </div>
      </div>

      <div className="shell hairline-t flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
        <p className="data">© 2026 AKRADHI Property</p>
        <p className="data">Listings shown are illustrative</p>
      </div>
    </footer>
  );
}
