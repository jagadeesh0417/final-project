"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavourites } from "../../lib/favourites";
import { useTheme } from "./DarkModeProvider";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Listings" },
  { href: "/properties?deal=rent", label: "To let" },
  { href: "/filters", label: "Search" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { ids, ready } = useFavourites();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-all duration-500 md:px-8 ${
          scrolled
            ? "glass-card rounded-2xl px-5 py-2 md:px-6"
            : "px-0"
        }`}
      >
        <Link href="/" className="display text-xl tracking-tight md:text-2xl">
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
          {/* dark mode toggle */}
          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-colors hover:border-gold"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <Link
            href="/favourites"
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors hover:border-gold hover:text-gold"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="tabular-nums">{ready ? String(ids.length).padStart(2, "0") : "--"}</span>
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            aria-expanded={open}
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

      {open && (
        <div className="mx-5 mt-2 overflow-hidden rounded-2xl border border-line bg-surface/95 px-4 pb-5 pt-4 shadow-lg backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    pathname === l.href ? "bg-gold/10 text-gold" : "text-pearl-dim hover:bg-void-2"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
