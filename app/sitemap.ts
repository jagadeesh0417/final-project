import type { MetadataRoute } from "next";
import { PROPERTIES } from "../lib/data";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const listings = PROPERTIES.filter((p) => p.status === "approved").map((p) => ({
    url: `${site}/properties/${p.slug}`,
    lastModified: new Date(p.listedAt),
    priority: p.featured ? 0.9 : 0.7,
  }));

  return [
    { url: site, priority: 1 },
    { url: `${site}/properties`, priority: 0.9 },
    ...listings,
  ];
}
