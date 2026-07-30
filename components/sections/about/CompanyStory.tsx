"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const TIMELINE = [
  { year: "2015", label: "Company Started" },
  { year: "2017", label: "500+ Clients" },
  { year: "2020", label: "Expanded to Luxury Projects" },
  { year: "2023", label: "Best Real Estate Agency Award" },
  { year: "2026", label: "5000+ Happy Customers" },
];

export default function CompanyStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="section">
      <div className="container-lux">
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="img-wrap" style={{ minHeight: 520 }}>
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=85"
                alt="AKRADHI office"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
          >
            <span className="badge">Our Story</span>
            <h2 className="display d-lg mt-3">Built on trust,<br />driven by excellence.</h2>
            <div className="divider my-8" />
            <div className="space-y-5 text-gray">
              <p>
                AKRADHI was founded in 2015 with a simple belief: luxury real estate deserves
                a different kind of service. One built on transparency, trust, and an uncompromising
                commitment to quality.
              </p>
              <p>
                What started as a small office in Hyderabad has grown into one of South India&apos;s
                most respected luxury property practices, with offices across four major cities
                and a portfolio of over 5000 satisfied clients.
              </p>
              <p>
                Our mission is to make every property transaction seamless, transparent, and
                rewarding. We combine deep local market knowledge with a global standard of service
                to deliver exceptional results for buyers, sellers, and investors alike.
              </p>
            </div>

            {/* Timeline */}
            <div ref={ref} className="mt-10 space-y-4">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease }}
                  className="flex items-center gap-4"
                >
                  <span className="num shrink-0 text-sm font-semibold text-gold w-12">{t.year}</span>
                  <div className={`h-px flex-1 ${inView ? "bg-gold/40" : "bg-border"}`} />
                  <span className="text-sm text-dark/70">{t.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
