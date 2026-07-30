"use client";

import { useEffect, useState } from "react";
import { useFavourites } from "../../lib/favourites";

const LINK_CLASS = "relative text-sm font-medium tracking-[0.12em] uppercase text-white/70 transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { ids, ready } = useFavourites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-dark/90 py-3 backdrop-blur-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-10">
        <a href="/" className="display text-2xl tracking-tight text-white md:text-3xl">
          AKRADHI
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className={LINK_CLASS}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="/favourites"
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-gold ${
              scrolled ? "border-white/10 text-white" : "border-white/20 text-white"
            }`}
          >
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {ready && ids.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white">
                {ids.length}
              </span>
            )}
          </a>

          <a href="/contact" className="btn-lux btn-white hidden md:inline-flex text-xs px-6 py-3">
            Book Viewing
          </a>

          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              scrolled ? "border-white/10 text-white" : "border-white/20 text-white"
            }`}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-3 overflow-hidden rounded-2xl border border-white/5 bg-dark/95 px-4 pb-6 pt-4 shadow-2xl backdrop-blur-2xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-white/70 transition-colors hover:bg-white/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-3 px-4">
              <a href="/contact" className="btn-lux btn-white w-full justify-center text-xs">
                Book Viewing
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
