"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "WhatsApp", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-dark">
      {/* Newsletter */}
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col gap-6 border-b border-white/5 py-14 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="display d-md text-white">Stay updated</p>
            <p className="mt-1 text-sm text-white/40">New listings, market reports, and insights — once a week.</p>
          </div>
          <form className="flex w-full max-w-sm shrink-0 gap-3" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="input-lux flex-1 border-white/5 bg-white/5 text-white placeholder:text-white/30" />
            <button type="submit" className="btn-lux btn-gold shrink-0 text-xs px-5 py-3">
              Subscribe
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>
        </motion.div>
      </div>

      <div className="container-lux py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="display text-2xl text-white md:text-3xl">AKRADHI</Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              A private-office property practice working across the Deccan, the Konkan coast and the south.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Properties</p>
            <ul className="flex flex-col gap-3 text-sm">
              {["All Properties", "For Sale", "For Rent", "Luxury Villas"].map((l) => (
                <li key={l}><Link href="/properties" className="text-white/50 transition-colors hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Services</p>
            <ul className="flex flex-col gap-3 text-sm">
              {["Book Viewing", "Property Valuation", "Legal Support", "Investment Advisory"].map((l) => (
                <li key={l}><Link href="/contact" className="text-white/50 transition-colors hover:text-gold">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/30">Contact</p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="text-white/50">Road No. 3, Banjara Hills</li>
              <li className="text-white/50">Hyderabad 500034</li>
              <li className="pt-2"><a href="tel:+919848579053" className="text-gold transition-colors hover:text-warm">+91 98485 79053</a></li>
              <li><a href="mailto:desk@akradhi.example" className="text-white/50 transition-colors hover:text-gold">desk@akradhi.example</a></li>
            </ul>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 text-white/40 transition-colors hover:border-gold hover:text-gold text-[10px] font-semibold uppercase tracking-widest">
                  {s.label.slice(0, 3)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-lux flex flex-col gap-3 py-6 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 AKRADHI Property. All rights reserved.</p>
          <p>All properties verified. Prices subject to change.</p>
        </div>
      </div>
    </footer>
  );
}
