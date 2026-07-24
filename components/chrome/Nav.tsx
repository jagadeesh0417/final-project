"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useFavourites } from "../../lib/favourites";

const LINKS = [
  { href: "/properties", label: "Listings" },
  { href: "/properties?deal=rent", label: "To let" },
  { href: "/filters", label: "Search" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Desk" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { ids, ready } = useFavourites();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-line bg-void/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <Link href="/" className="display text-xl tracking-tight md:text-2xl" data-cursor="HOME">
          AKRADHI
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="data ulink hover:text-pearl">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/favourites"
            className="data flex items-center gap-2 border border-line px-3 py-2 transition-colors hover:border-line-2 hover:text-pearl"
            data-cursor="FAVOURITES"
          >
            Shortlist
            <span className="tabular-nums text-gold">
              {ready ? String(ids.length).padStart(2, "0") : "--"}
            </span>
          </Link>

          <button
            type="button"
            className="data border border-line px-3 py-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-nav" className="shell border-t border-line bg-void pb-6 pt-4 md:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.label} className="border-b border-line">
                <Link href={l.href} className="display d-sm block py-4">
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
