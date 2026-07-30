import type { Metadata } from "next";
import "./globals.css";
import Nav from "../components/chrome/Nav";
import Footer from "../components/chrome/Footer";
import ScrollProgress from "../components/chrome/ScrollProgress";
import SmoothScroll from "../components/chrome/SmoothScroll";
import { FavouritesProvider } from "../lib/favourites";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "AKRADHI — Luxury Property, Verified", template: "%s — AKRADHI" },
  description: "Exclusive residences across Hyderabad, Bengaluru, Goa and beyond. Every property is verified, photographed, and documented before listing.",
  openGraph: {
    title: "AKRADHI — Luxury Property",
    description: "Exclusive residences across Hyderabad, Bengaluru, Goa and beyond.",
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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <FavouritesProvider>
          <ScrollProgress />
          <SmoothScroll />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </FavouritesProvider>
      </body>
    </html>
  );
}
