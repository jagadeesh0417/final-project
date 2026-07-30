"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavourites } from "../../lib/favourites";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/properties?category=villa", label: "Luxury Villas" },
  { href: "/properties?category=apartment", label: "Apartments" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { ids, ready } = useFavourites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-dark/90 backdrop-blur-xl" : "bg-transparent"
      }`}
      style={{ height: 90 }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className={`display text-2xl tracking-tight transition-colors md:text-3xl ${
            scrolled ? "text-white" : "text-white"
          }`}
        >
          AKRADHI
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={`text-sm font-medium tracking-wider uppercase transition-colors hover:text-gold ${
                  pathname === l.href ? "text-gold" : "text-white/80"
                } ${scrolled ? "text-white/80" : "text-white/80"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/favourites"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-gold ${
              scrolled ? "border-white/20 text-white" : "border-white/20 text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {ready && ids.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                {ids.length}
              </span>
            )}
          </Link>

          <Link href="/contact" className="btn-lux btn-lux-white hidden md:inline-flex text-xs">
            Book Viewing
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              scrolled ? "border-white/20 text-white" : "border-white/20 text-white"
            }`}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="mx-4 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-dark/95 px-4 pb-6 pt-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    pathname === l.href ? "bg-gold/10 text-gold" : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 px-4">
              <Link href="/contact" className="btn-lux btn-lux-white w-full justify-center text-xs">
                Book Viewing
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
