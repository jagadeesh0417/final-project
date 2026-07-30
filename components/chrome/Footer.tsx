"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CITIES } from "../../lib/data";

const QUICK_LINKS = [
  { href: "/properties", label: "All listings" },
  { href: "/properties?deal=sale", label: "For sale" },
  { href: "/properties?deal=rent", label: "To let" },
  { href: "/filters", label: "Advanced search" },
  { href: "/favourites", label: "Shortlist" },
];

const SERVICES = [
  { href: "/contact", label: "Book a valuation" },
  { href: "/contact", label: "Schedule a viewing" },
  { href: "/contact", label: "Legal assistance" },
  { href: "/admin", label: "Partner login" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void-2">
      {/* Newsletter */}
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col gap-6 border-b border-line py-12 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="display d-md">Stay updated</p>
            <p className="mt-1 text-sm text-pearl-dim">New listings, market reports, and insights — once a week.</p>
          </div>
          <form
            className="flex w-full max-w-md shrink-0 gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="input-lux flex-1"
              required
            />
            <button type="submit" className="p-btn p-btn-primary shrink-0">
              Subscribe
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </motion.div>
      </div>

      <div className="container-lux py-12">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="display text-3xl">AKRADHI</Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-pearl-dim">
              A private-office property practice working across the Deccan,
              the Konkan coast and the south. Every listing is surveyed before
              it is published — what you see is what we know.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="tel:+919848579053" className="trust-badge">
                <svg className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 98485 79053
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">Browse</p>
            <ul className="flex flex-col gap-3 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-pearl-dim transition-colors hover:text-gold">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">Services</p>
            <ul className="flex flex-col gap-3 text-sm">
              {SERVICES.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-pearl-dim transition-colors hover:text-gold">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted">Contact</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="text-pearl-dim">Road No. 3, Banjara Hills</li>
              <li className="text-pearl-dim">Hyderabad 500034</li>
              <li className="pt-1">
                <a href="tel:+919848579053" className="font-medium text-gold transition-colors hover:text-gold-2">+91 98485 79053</a>
              </li>
              <li>
                <a href="mailto:desk@akradhi.example" className="text-pearl-dim transition-colors hover:text-gold">desk@akradhi.example</a>
              </li>
              <li className="pt-3 text-xs text-muted">Mon — Fri, 10:00 – 18:30</li>
              <li className="text-xs text-muted">Saturday, by appointment</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-lux flex flex-col gap-3 py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 AKRADHI Property. All rights reserved.</p>
          <p>Listings shown are for illustrative purposes. All prices subject to verification.</p>
        </div>
      </div>
    </footer>
  );
}
