"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PROPERTIES } from "../../lib/data";
import { priceShort } from "../../lib/format";
import type { Property, Inquiry, Deal, Category, Facing, Status } from "../../lib/types";

const ADMIN_EMAIL = "admin@akradhi.in";
const ADMIN_PASS = "admin123";

type Tab = "dashboard" | "listings" | "enquiries" | "add";

const STORAGE_KEY = "akradhi_admin_listings";
const ENQ_KEY = "akradhi_admin_enquiries";
const LOGIN_KEY = "akradhi_admin_logged_in";

const SEED_INQUIRIES: Inquiry[] = [
  { id: "EN-001", propertyId: "MP-1001", name: "Sridhar Kalyan", email: "sridhar@example.in", phone: "+91 98661 20044", message: "Interested in the courtyard house. Can we see it on Saturday morning?", status: "new", createdAt: "2026-07-19" },
  { id: "EN-002", propertyId: "MP-1003", name: "Reema Fernandes", email: "reema@example.in", phone: "+91 91100 38210", message: "Asking about FAR on the Assagao parcel.", status: "new", createdAt: "2026-07-20" },
  { id: "EN-003", propertyId: "MP-1014", name: "Ajay Bhatnagar", email: "ajay@example.in", phone: "+91 99450 77321", message: "Need the rent roll for Gachibowli block.", status: "contacted", createdAt: "2026-07-15" },
  { id: "EN-004", propertyId: "MP-1008", name: "Priya Nambiar", email: "priya@example.in", phone: "+91 90070 11562", message: "Confirmed viewing for the river house.", status: "closed", createdAt: "2026-07-08" },
];

function loadListings(): Property[] {
  if (typeof window === "undefined") return PROPERTIES;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : PROPERTIES;
  } catch { return PROPERTIES; }
}

function loadEnquiries(): Inquiry[] {
  if (typeof window === "undefined") return SEED_INQUIRIES;
  try {
    const saved = localStorage.getItem(ENQ_KEY);
    return saved ? JSON.parse(saved) : SEED_INQUIRIES;
  } catch { return SEED_INQUIRIES; }
}

const CATEGORIES: Category[] = ["apartment", "villa", "plot", "commercial"];

const STATUS_PILL: Record<Status, string> = {
  approved: "pill pill-ok",
  pending: "pill pill-warn",
  rejected: "pill pill-bad",
};

const TABS: { key: Tab; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "listings", label: "Listings" },
  { key: "enquiries", label: "Enquiries" },
  { key: "add", label: "Add New" },
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loginError, setLoginError] = useState("");

  const [listings, setListings] = useState<Property[]>([]);
  const [enquiries, setEnquiries] = useState<Inquiry[]>([]);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [note, setNote] = useState("");

  const [form, setForm] = useState({
    id: "", slug: "", title: "", tagline: "", description: "", price: 0,
    deal: "sale" as Deal, category: "apartment" as Category, bedrooms: 0, bathrooms: 0,
    areaSqft: 0, facing: "N" as Facing, floors: 0, yearBuilt: 2024,
    locality: "", city: "", state: "", pincode: "",
    amenities: "", images: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOGIN_KEY);
      if (stored === "true") setLoggedIn(true);
      setListings(loadListings());
      setEnquiries(loadEnquiries());
    }
  }, []);

  const saveListings = (updated: Property[]) => {
    setListings(updated);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const saveEnquiries = (updated: Inquiry[]) => {
    setEnquiries(updated);
    if (typeof window !== "undefined") localStorage.setItem(ENQ_KEY, JSON.stringify(updated));
  };

  const flash = (msg: string) => { setNote(msg); setTimeout(() => setNote(""), 3000); };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setLoggedIn(true);
      setLoginError("");
      if (typeof window !== "undefined") localStorage.setItem(LOGIN_KEY, "true");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const logout = () => {
    setLoggedIn(false);
    if (typeof window !== "undefined") localStorage.removeItem(LOGIN_KEY);
  };

  const stats = useMemo(() => {
    const live = listings.filter((p) => p.status === "approved");
    return {
      live: live.length,
      pending: listings.filter((p) => p.status === "pending").length,
      featured: listings.filter((p) => p.featured).length,
      views: listings.reduce((n, p) => n + p.views, 0),
      value: live.filter((p) => p.deal === "sale").reduce((n, p) => n + p.price, 0),
      newEnq: enquiries.filter((e) => e.status === "new").length,
      totalEnq: enquiries.length,
    };
  }, [listings, enquiries]);

  const setStatus = (id: string, status: Status) => {
    saveListings(listings.map((p) => (p.id === id ? { ...p, status } : p)));
    flash(`${id} ${status === "approved" ? "published" : status}`);
  };

  const toggleFeatured = (id: string) => {
    saveListings(listings.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));
    flash(`${id} featured toggled`);
  };

  const removeListing = (id: string) => {
    if (confirm(`Remove ${id}?`)) {
      saveListings(listings.filter((p) => p.id !== id));
      flash(`${id} removed`);
    }
  };

  const moveEnquiry = (id: string, status: Inquiry["status"]) => {
    saveEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status } : e)));
    flash(`Enquiry ${id} moved to ${status}`);
  };

  const deleteEnquiry = (id: string) => {
    if (confirm("Delete this enquiry?")) {
      saveEnquiries(enquiries.filter((e) => e.id !== id));
      flash("Enquiry deleted");
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({ id: "", slug: "", title: "", tagline: "", description: "", price: 0, deal: "sale", category: "apartment", bedrooms: 0, bathrooms: 0, areaSqft: 0, facing: "N", floors: 0, yearBuilt: 2024, locality: "", city: "", state: "", pincode: "", amenities: "", images: "" });
    setEditingId(null);
  };

  const editListing = (p: Property) => {
    setForm({
      id: p.id, slug: p.slug, title: p.title, tagline: p.tagline, description: p.description,
      price: p.price, deal: p.deal, category: p.category, bedrooms: p.bedrooms, bathrooms: p.bathrooms,
      areaSqft: p.areaSqft, facing: p.facing, floors: p.floors, yearBuilt: p.yearBuilt,
      locality: p.address.locality, city: p.address.city, state: p.address.state, pincode: p.address.pincode,
      amenities: p.amenities.join(", "), images: (p.images || []).join("\n"),
    });
    setEditingId(p.id);
    setTab("add");
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const images = form.images.split("\n").map((s) => s.trim()).filter(Boolean);
    const amenities = form.amenities.split(",").map((s) => s.trim()).filter(Boolean);
    const property: Property = {
      id: form.id || `MP-${String(listings.length + 1001)}`,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-"),
      title: form.title, tagline: form.tagline, description: form.description,
      price: Number(form.price), deal: form.deal, category: form.category,
      bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms),
      areaSqft: Number(form.areaSqft), facing: form.facing, floors: Number(form.floors),
      yearBuilt: Number(form.yearBuilt),
      address: { locality: form.locality, city: form.city, state: form.state, pincode: form.pincode, lat: 17.4, lng: 78.4 },
      amenities, images, sheet: (listings.length % 12) + 1,
      agent: { name: "Admin", firm: "AKRADHI", phone: "+91 98485 79053" },
      status: "pending", featured: false, views: 0, listedAt: new Date().toISOString().split("T")[0],
    };

    if (editingId) {
      saveListings(listings.map((p) => (p.id === editingId ? { ...property, id: editingId, slug: p.slug } : p)));
      flash(`Listing ${editingId} updated`);
    } else {
      saveListings([...listings, property]);
      flash(`Listing ${property.id} added`);
    }
    resetForm();
    setTab("listings");
  };

  const rows = listings.filter((p) => filter === "all" || p.status === filter);

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center admin-shell px-5 pt-24">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <p className="display text-3xl tracking-tight text-white">AKRADHI</p>
            <div className="divider-gold mx-auto mt-4" />
            <p className="mt-4 text-sm text-white/50">Admin panel — sign in</p>
          </div>
          <form onSubmit={login} className="card-dark p-8">
            {loginError && (
              <p className="mb-4 rounded-xl bg-[rgba(214,93,93,0.12)] px-4 py-3 text-sm text-[#d65d5d]">{loginError}</p>
            )}
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Email</label>
            <input name="email" type="email" placeholder="admin@akradhi.in" value={email} onChange={(e) => setEmail(e.target.value)} className="input-dark mb-5" required />
            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Password</label>
            <input name="pass" type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} className="input-dark mb-8" required />
            <button type="submit" className="btn-lux btn-gold w-full justify-center">Sign in</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell pt-28">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        {/* header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="badge mb-4">Control Centre</p>
            <h1 className="display text-4xl text-white md:text-5xl">Admin Panel</h1>
            <p className="mt-2 text-sm text-white/45">Manage listings, enquiries, and publishing</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 md:flex">
              <span className="h-2 w-2 rounded-full bg-[#7fb069]" />
              Signed in as {ADMIN_EMAIL}
            </span>
            <button onClick={logout} className="btn-lux btn-ghost px-5 py-2.5 text-xs">Sign out</button>
          </div>
        </div>

        {/* tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-white/10 pb-6">
          {TABS.map((t) => (
            <button
              key={t.key}
              className="chip-dark"
              data-on={tab === t.key}
              onClick={() => { setTab(t.key); if (t.key !== "add") resetForm(); }}
            >
              {t.label}
              {t.key === "listings" && <span className="num text-current opacity-60">{listings.length}</span>}
              {t.key === "enquiries" && stats.newEnq > 0 && <span className="num text-current opacity-60">{stats.newEnq} new</span>}
            </button>
          ))}
        </div>

        {/* notification */}
        {note && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/10 px-5 py-3 text-sm text-[#d5ae63]">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {note}
          </div>
        )}

        {/* dashboard */}
        {tab === "dashboard" && (
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Live listings", value: String(stats.live), sub: "Published & visible", accent: "text-[#d5ae63]" },
                { label: "Pending review", value: String(stats.pending), sub: "Awaiting approval", accent: "text-white" },
                { label: "New enquiries", value: String(stats.newEnq), sub: `of ${stats.totalEnq} total`, accent: "text-[#7fb069]" },
                { label: "Portfolio value", value: priceShort(stats.value), sub: "Sale listings", accent: "text-[#d5ae63]" },
              ].map((s) => (
                <div key={s.label} className="card-dark p-6 transition-transform duration-500 hover:-translate-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">{s.label}</p>
                  <p className={`num mt-3 text-4xl ${s.accent}`}>{s.value}</p>
                  <div className="mt-4 h-px bg-white/8" />
                  <p className="mt-3 text-xs text-white/40">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="card-dark p-7">
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Register health</p>
                <dl className="space-y-4">
                  {[
                    ["Total views", stats.views.toLocaleString("en-IN")],
                    ["Featured listings", String(stats.featured)],
                    ["Live cities", String(new Set(listings.filter(p => p.status === "approved").map(p => p.address.city)).size)],
                    ["Awaiting action", String(stats.pending + stats.newEnq)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between border-b border-white/8 pb-3 last:border-0">
                      <dt className="text-sm text-white/50">{k}</dt>
                      <dd className="num text-lg text-white">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="card-dark p-7">
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Quick actions</p>
                <div className="flex flex-wrap gap-3">
                  <button className="btn-lux btn-gold text-xs" onClick={() => { resetForm(); setTab("add"); }}>
                    + Add property
                  </button>
                  <button className="btn-lux btn-ghost text-xs" onClick={() => setTab("enquiries")}>
                    View enquiries ({stats.newEnq} new)
                  </button>
                  <button className="btn-lux btn-ghost text-xs" onClick={() => { setFilter("pending"); setTab("listings"); }}>
                    Review pending
                  </button>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-white/40">
                  Changes made here are saved instantly to this browser. Use{" "}
                  <span className="num text-[#d5ae63]">Listings</span> to edit, publish or feature properties, and{" "}
                  <span className="num text-[#d5ae63]">Enquiries</span> to manage client leads.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* listings */}
        {tab === "listings" && (
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(["all", "approved", "pending", "rejected"] as const).map((f) => (
                  <button key={f} className="chip-dark" data-on={filter === f} onClick={() => setFilter(f)}>
                    {f === "all" ? "All" : f}
                    <span className="num text-current opacity-60">
                      {f === "all" ? listings.length : listings.filter((p) => p.status === f).length}
                    </span>
                  </button>
                ))}
              </div>
              <button className="btn-lux btn-gold text-xs" onClick={() => { resetForm(); setTab("add"); }}>+ Add listing</button>
            </div>

            <div className="overflow-x-auto card-dark">
              <table className="w-full min-w-[860px] text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    {["ID", "Title", "City", "Price", "Status", "Featured", "Actions"].map((h) => (
                      <th key={h} className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.02]">
                      <td className="px-5 py-4 font-mono text-xs text-[#d5ae63]">{p.id}</td>
                      <td className="px-5 py-4">
                        <Link href={`/properties/${p.slug}`} className="text-sm font-medium text-white/85 underline-offset-4 hover:text-[#d5ae63] hover:underline">{p.title}</Link>
                        <p className="mt-0.5 text-xs text-white/35">{p.category} · {p.bedrooms} bhk</p>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-white/50">{p.address.city}</td>
                      <td className="px-5 py-4 num text-sm font-medium text-white">{priceShort(p.price)}</td>
                      <td className="px-5 py-4"><span className={STATUS_PILL[p.status]}>{p.status}</span></td>
                      <td className="px-5 py-4 text-center text-[#d5ae63]">{p.featured ? "★" : <span className="text-white/20">★</span>}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          <button className="chip-dark !px-3 !py-1.5 text-[10px]" onClick={() => editListing(p)}>Edit</button>
                          {p.status !== "approved" ? (
                            <button className="chip-dark !px-3 !py-1.5 text-[10px]" onClick={() => setStatus(p.id, "approved")}>Publish</button>
                          ) : (
                            <button className="chip-dark !px-3 !py-1.5 text-[10px]" onClick={() => setStatus(p.id, "pending")}>Unpublish</button>
                          )}
                          <button className="chip-dark !px-3 !py-1.5 text-[10px]" onClick={() => toggleFeatured(p.id)}>{p.featured ? "Unfeature" : "Feature"}</button>
                          <button className="chip-dark !px-3 !py-1.5 text-[10px] !text-[#d65d5d]" onClick={() => removeListing(p.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!rows.length && <p className="p-14 text-center text-sm text-white/40">No listings found for this status.</p>}
            </div>
          </div>
        )}

        {/* enquiries */}
        {tab === "enquiries" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {(["new", "contacted", "closed"] as const).map((lane) => {
              const cards = enquiries.filter((e) => e.status === lane);
              const accent = lane === "new" ? "text-[#d65d5d]" : lane === "contacted" ? "text-[#d5ae63]" : "text-[#7fb069]";
              return (
                <div key={lane} className="card-dark">
                  <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      {lane === "new" ? "New" : lane === "contacted" ? "Contacted" : "Closed"}
                    </h3>
                    <span className={`num text-sm ${accent}`}>{String(cards.length).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-col gap-3 p-5">
                    {cards.map((e) => (
                      <div key={e.id} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-colors hover:border-gold/40">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-white">{e.name}</p>
                          <span className="shrink-0 font-mono text-[10px] text-white/35">{e.id}</span>
                        </div>
                        <p className="mt-1 font-mono text-xs text-white/40">{e.propertyId} · {e.phone}</p>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">{e.message}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-mono text-[10px] text-white/30">{e.createdAt}</span>
                          <div className="flex gap-1.5">
                            {(["new", "contacted", "closed"] as const).filter((l) => l !== lane).map((l) => (
                              <button key={l} className="chip-dark !px-2.5 !py-1 text-[9px]" onClick={() => moveEnquiry(e.id, l)}>
                                → {l}
                              </button>
                            ))}
                            <button className="chip-dark !px-2.5 !py-1 text-[9px] !text-[#d65d5d]" onClick={() => deleteEnquiry(e.id)}>Del</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {!cards.length && (
                      <p className="py-10 text-center font-mono text-xs text-white/30">No enquiries</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* add / edit form */}
        {tab === "add" && (
          <div className="card-dark p-7 md:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="badge mb-3">{editingId ? "Editing" : "New listing"}</p>
                <h2 className="display text-2xl text-white md:text-3xl">{editingId ? editingId : "Add new listing"}</h2>
              </div>
              {editingId && (
                <button className="chip-dark text-[10px]" onClick={() => { resetForm(); setTab("listings"); }}>
                  Cancel edit
                </button>
              )}
            </div>
            <form onSubmit={submitForm} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Title</label>
                <input name="title" value={form.title} onChange={handleFormChange} className="input-dark" placeholder="The Courtyard House" required />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">ID</label>
                <input name="id" value={form.id} onChange={handleFormChange} className="input-dark" placeholder="Auto-generated" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Slug</label>
                <input name="slug" value={form.slug} onChange={handleFormChange} className="input-dark" placeholder="Auto-generated" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Deal</label>
                <select name="deal" value={form.deal} onChange={handleFormChange} className="select-dark">
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Tagline</label>
                <input name="tagline" value={form.tagline} onChange={handleFormChange} className="input-dark" placeholder="A short poetic line" />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} className="input-dark min-h-[100px]" placeholder="Describe the property…" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Price (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleFormChange} className="input-dark" required />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Category</label>
                <select name="category" value={form.category} onChange={handleFormChange} className="select-dark">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Bedrooms</label>
                <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleFormChange} className="input-dark" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Bathrooms</label>
                <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleFormChange} className="input-dark" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Area (sqft)</label>
                <input name="areaSqft" type="number" value={form.areaSqft} onChange={handleFormChange} className="input-dark" required />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Floors</label>
                <input name="floors" type="number" value={form.floors} onChange={handleFormChange} className="input-dark" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Year built</label>
                <input name="yearBuilt" type="number" value={form.yearBuilt} onChange={handleFormChange} className="input-dark" />
              </div>
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Facing</label>
                <select name="facing" value={form.facing} onChange={handleFormChange} className="select-dark">
                  {["N","NE","E","SE","S","SW","W","NW"].map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Address</label>
                <div className="grid gap-3 md:grid-cols-4">
                  <input name="locality" placeholder="Locality" value={form.locality} onChange={handleFormChange} className="input-dark" />
                  <input name="city" placeholder="City" value={form.city} onChange={handleFormChange} className="input-dark" required />
                  <input name="state" placeholder="State" value={form.state} onChange={handleFormChange} className="input-dark" />
                  <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleFormChange} className="input-dark" />
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Amenities (comma separated)</label>
                <input name="amenities" value={form.amenities} onChange={handleFormChange} className="input-dark" placeholder="Pool, Garden, Parking" />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">Image URLs (one per line)</label>
                <textarea name="images" value={form.images} onChange={handleFormChange} className="input-dark min-h-[90px]" placeholder="https://images.unsplash.com/photo-…" />
              </div>
              <div className="flex flex-wrap gap-3 pt-3 md:col-span-2 lg:col-span-3">
                <button type="submit" className="btn-lux btn-gold text-xs">
                  {editingId ? "Update listing" : "Add listing"}
                </button>
                <button type="button" className="btn-lux btn-ghost text-xs" onClick={() => { resetForm(); setTab("dashboard"); }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
