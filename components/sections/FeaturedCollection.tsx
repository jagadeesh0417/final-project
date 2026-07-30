"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROPERTIES } from "../../lib/data";
import { price } from "../../lib/format";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function FeaturedCollection() {
  const featured = PROPERTIES.filter((p) => p.featured && p.status === "approved").slice(0, 4);

  return (
    <section className="section">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16"
        >
          <span className="section-label">Curated Collection</span>
          <h2 className="display d-xl">Featured Properties</h2>
        </motion.div>
      </div>

      {featured.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className={`container-lux ${i > 0 ? "mt-16 md:mt-24" : ""}`}
        >
          <div className={`editorial-grid ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
            {/* Image */}
            <div className={`overflow-hidden rounded-[var(--radius-lux)] ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <Link href={`/property/${p.slug}`}>
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="editorial-image transition-all duration-700 hover:scale-105"
                />
              </Link>
            </div>

            {/* Content */}
            <div className={`editorial-content ${i % 2 === 1 ? "md:order-1 md:pr-16" : "md:pl-16"}`}>
              <span className="section-label">{p.category}</span>
              <h3 className="display d-lg mt-2">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-muted">{p.tagline}</p>
              <p className="mt-6 text-sm leading-relaxed text-muted">{p.description}</p>

              <div className="mt-6 flex items-center gap-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">Location</p>
                  <p className="mt-1 font-medium">{p.address.locality}, {p.address.city}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">Price</p>
                  <p className="mt-1 font-medium text-gold">{price(p.price, p.deal)}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-8">
                {p.bedrooms > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">Bedrooms</p>
                    <p className="mt-1 font-medium">{p.bedrooms}</p>
                  </div>
                )}
                {p.bathrooms > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted">Bathrooms</p>
                    <p className="mt-1 font-medium">{p.bathrooms}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">Area</p>
                  <p className="mt-1 font-medium">{p.areaSqft.toLocaleString()} sqft</p>
                </div>
              </div>

              <Link
                href={`/property/${p.slug}`}
                className="btn-lux btn-lux-outline mt-8"
              >
                Explore Property
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        .direction-rtl {
          direction: rtl;
        }
        .direction-rtl > * {
          direction: ltr;
        }
      `}} />
    </section>
  );
}
