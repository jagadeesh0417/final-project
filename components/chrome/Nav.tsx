"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavourites } from "../../lib/favourites";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Listings" },
  { href: "/properties?deal=rent", label: "To let" },
  { href: "/filters", label: "Search" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { ids, ready } = useFavourites();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        solid
          ? "bg-surface/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:h-20 md:px-8">
        <Link href="/" className="display text-xl tracking-tight md:text-2xl" data-cursor="HOME">
          AKRADHI
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  pathname === l.href ? "text-gold" : "text-pearl-dim"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/favourites"
            className="flex items-center gap-2 rounded border border-line bg-surface px-3 py-2 text-xs font-medium uppercase tracking-wider transition-colors hover:border-gold hover:text-gold"
            data-cursor="FAVOURITES"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="tabular-nums text-gold">
              {ready ? String(ids.length).padStart(2, "0") : "--"}
            </span>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface px-5 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`block rounded px-4 py-3 text-base font-medium transition-colors ${
                    pathname === l.href
                      ? "bg-aqua/10 text-aqua"
                      : "text-pearl-dim hover:bg-void-2 hover:text-pearl"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
