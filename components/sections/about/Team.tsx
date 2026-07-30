"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const TEAM = [
  {
    name: "Arjun Reddy",
    role: "Founder & CEO",
    exp: "18+ years",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=85",
  },
  {
    name: "Priya Sharma",
    role: "Managing Director",
    exp: "15+ years",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=85",
  },
  {
    name: "Ravi Krishnan",
    role: "Head of Sales",
    exp: "12+ years",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=85",
  },
  {
    name: "Anita Deshmukh",
    role: "Senior Property Consultant",
    exp: "10+ years",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=85",
  },
];

export default function Team() {
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
          <span className="badge">Leadership</span>
          <h2 className="display d-lg mt-3">Meet our team</h2>
          <p className="mx-auto mt-3 max-w-lg text-gray">
            Seasoned professionals dedicated to delivering exceptional real estate experiences.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
            >
              <div className="glass group overflow-hidden transition-all duration-500 hover:-translate-y-2">
                <div className="overflow-hidden">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="h-72 w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="display d-sm font-medium">{t.name}</h3>
                  <p className="mt-1 text-sm text-gold">{t.role}</p>
                  <p className="mt-1 text-xs text-gray">{t.exp} experience</p>
                  <div className="mt-4 flex justify-center gap-3">
                    {["in", "tel", "mail"].map((icon) => (
                      <a
                        key={icon}
                        href="#"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-xs text-gray transition-colors hover:border-gold hover:text-gold"
                      >
                        {icon === "in" && (
                          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        )}
                        {icon === "tel" && (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        )}
                        {icon === "mail" && (
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
