import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import ScrollProgress from "../components/chrome/ScrollProgress";
import CursorGlow from "../components/chrome/CursorGlow";
import SmoothScroll from "../components/chrome/SmoothScroll";
import { FavouritesProvider } from "../lib/favourites";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "AKRADHI — Extraordinary Living", template: "%s — AKRADHI" },
  description: "Exclusive residences across Hyderabad, Bengaluru, Goa and beyond. Every property verified before listing.",
  openGraph: {
    title: "AKRADHI — Extraordinary Living",
    description: "Exclusive residences across South India. Every property verified.",
    type: "website",
    url: site,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <FavouritesProvider>
          <ScrollProgress />
          <CursorGlow />
          <SmoothScroll />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </FavouritesProvider>
      </body>
    </html>
  );
}
