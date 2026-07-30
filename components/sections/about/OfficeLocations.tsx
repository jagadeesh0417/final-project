"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const OFFICES = [
  {
    city: "Hyderabad",
    address: "Road No. 3, Banjara Hills, Hyderabad 500034",
    phone: "+91 98485 79053",
    email: "hyd@akradhi.example",
    hours: "Mon — Fri, 10:00 – 18:30",
  },
  {
    city: "Bengaluru",
    address: "Indiranagar, 100 Feet Road, Bengaluru 560038",
    phone: "+91 98485 79053",
    email: "blr@akradhi.example",
    hours: "Mon — Fri, 10:00 – 18:30",
  },
  {
    city: "Mumbai",
    address: "Bandra Kurla Complex, Mumbai 400051",
    phone: "+91 98485 79053",
    email: "mum@akradhi.example",
    hours: "Mon — Fri, 10:00 – 18:30",
  },
  {
    city: "Delhi",
    address: "Connaught Place, New Delhi 110001",
    phone: "+91 98485 79053",
    email: "del@akradhi.example",
    hours: "Mon — Fri, 10:00 – 18:30",
  },
];

export default function OfficeLocations() {
  return (
    <section className="section bg-[#f5f3ef]">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease }}
          className="mb-14 text-center"
        >
          <span className="badge">Locations</span>
          <h2 className="display d-lg mt-3">Our offices</h2>
          <p className="mx-auto mt-3 max-w-lg text-gray">
            Four cities. One standard of excellence.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((o, i) => (
            <motion.div
              key={o.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="rounded-[var(--radius)] border border-border bg-surface p-7 transition-all duration-500 hover:border-gold hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="display d-sm mt-4 font-medium">{o.city}</h3>
              <p className="mt-2 text-sm text-gray">{o.address}</p>
              <div className="divider my-4" />
              <div className="space-y-1 text-sm">
                <p className="text-gold">{o.phone}</p>
                <p className="text-gray">{o.email}</p>
                <p className="text-xs text-gray">{o.hours}</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(o.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lux btn-outline mt-5 w-full justify-center text-xs px-4 py-3"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Google Maps
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
