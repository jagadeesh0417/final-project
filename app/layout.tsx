import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import Cursor from "../components/chrome/Cursor";
import Preloader from "../components/chrome/Preloader";
import SmoothScroll from "../components/chrome/SmoothScroll";
import SheetFrame from "../components/chrome/SheetFrame";
import { FavouritesProvider } from "../lib/favourites";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "AKRADHI — Property, surveyed before it is published",
    template: "%s — AKRADHI",
  },
  description:
    "A private-office property practice working across Hyderabad, Bengaluru, the Konkan coast and the south. Houses, apartments, land and commercial floors.",
  openGraph: {
    title: "AKRADHI — Property",
    description: "Houses, apartments, land and commercial floors across south India.",
    type: "website",
    url: site,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Sora:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <FavouritesProvider>
          <SmoothScroll />
          <Preloader />
          <Cursor />
          <SheetFrame />
          <span className="grain" aria-hidden />

          <a
            href="#main"
            className="data sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-gold focus:bg-void focus:px-4 focus:py-3 focus:text-pearl"
          >
            Skip to content
          </a>

          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </FavouritesProvider>
      </body>
    </html>
  );
}
