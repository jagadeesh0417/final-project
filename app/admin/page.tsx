"use client";

import { useState, useMemo, useEffect } from "react";
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

  const [showAddForm, setShowAddForm] = useState(false);

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
    setShowAddForm(true);
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
    setShowAddForm(false);
    setTab("listings");
  };

  const rows = listings.filter((p) => filter === "all" || p.status === filter);

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void px-5">
        <form onSubmit={login} className="w-full max-w-sm rounded-xl border border-line bg-surface p-8 shadow-lg">
          <p className="display d-md mb-2 text-center">AKRADHI</p>
          <p className="mb-8 text-center text-sm text-muted">Admin panel — sign in</p>
          {loginError && <p className="mb-4 rounded bg-flare/10 px-4 py-3 text-sm text-flare">{loginError}</p>}
          <input name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input mb-3" required />
          <input name="pass" type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} className="input mb-6" required />
          <button type="submit" className="btn btn-gold w-full justify-center">Sign in</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void pt-24">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="display d-md">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted">Manage listings, enquiries, and settings</p>
          </div>
          <button onClick={logout} className="btn px-5 py-2 text-xs">Sign out</button>
        </div>

        {/* tabs */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-line pb-4">
          {[
            { key: "dashboard" as Tab, label: "Dashboard" },
            { key: "listings" as Tab, label: "Listings" },
            { key: "enquiries" as Tab, label: "Enquiries" },
            { key: "add" as Tab, label: editingId ? "Edit" : "Add New" },
          ].map((t) => (
            <button key={t.key} className="chip" data-on={tab === t.key} onClick={() => { setTab(t.key); if (t.key !== "add") resetForm(); }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* notification */}
        {note && <div className="mb-6 rounded border border-aqua/30 bg-aqua/5 px-5 py-3 text-sm text-aqua">{note}</div>}

        {/* dashboard */}
        {tab === "dashboard" && (
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Live listings", String(stats.live), "Published"],
                ["Pending review", String(stats.pending), "Awaiting survey"],
                ["New enquiries", String(stats.newEnq), `of ${stats.totalEnq} total`],
                ["Portfolio value", priceShort(stats.value), "Sale listings"],
              ].map(([label, value, sub]) => (
                <div key={label} className="stat-tile">
                  <p className="label">{label}</p>
                  <p className="value">{value}</p>
                  <p className="mt-2 text-xs text-muted">{sub}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-muted">Register health</p>
                <dl className="space-y-4">
                  {[
                    ["Total views", stats.views.toLocaleString("en-IN")],
                    ["Featured", String(stats.featured)],
                    ["Live cities", String(new Set(listings.filter(p => p.status === "approved").map(p => p.address.city)).size)],
                    ["Awaiting action", String(stats.pending + stats.newEnq)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-line pb-3 last:border-0">
                      <dt className="font-mono text-xs text-muted">{k}</dt>
                      <dd className="text-sm font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-widest text-muted">Quick actions</p>
                <div className="flex flex-wrap gap-3">
                  <button className="btn btn-solid" onClick={() => { resetForm(); setTab("add"); }}>Add property</button>
                  <button className="btn" onClick={() => setTab("enquiries")}>View enquiries ({stats.newEnq} new)</button>
                  <button className="btn" onClick={function(){setFilter("pending");setTab("listings")}}>Review pending</button>
                </div>
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
                  <button key={f} className="chip" data-on={filter === f} onClick={() => setFilter(f)}>
                    {f === "all" ? "All" : f}
                  </button>
                ))}
              </div>
              <button className="btn btn-solid" onClick={() => { resetForm(); setTab("add"); }}>+ Add listing</button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-void-2">
                  <tr>
                    {["ID", "Title", "City", "Price", "Status", "Featured", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.id} className="border-t border-line transition-colors hover:bg-void-2/50">
                      <td className="px-4 py-4 font-mono text-xs text-gold">{p.id}</td>
                      <td className="px-4 py-4">
                        <Link href={`/properties/${p.slug}`} className="text-sm font-medium underline-offset-2 hover:underline">{p.title}</Link>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs text-muted">{p.address.city}</td>
                      <td className="px-4 py-4 font-mono text-xs font-medium">{priceShort(p.price)}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs ${
                          p.status === "approved" ? "bg-aqua/10 text-aqua" : p.status === "pending" ? "bg-gold/10 text-gold" : "bg-flare/10 text-flare"
                        }`}>{p.status}</span>
                      </td>
                      <td className="px-4 py-4 text-center">{p.featured ? "★" : "—"}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-1.5">
                          <button className="chip text-[0.55rem]" onClick={() => editListing(p)}>Edit</button>
                          {p.status !== "approved" ? (
                            <button className="chip text-[0.55rem]" onClick={() => setStatus(p.id, "approved")}>Pub</button>
                          ) : (
                            <button className="chip text-[0.55rem]" onClick={() => setStatus(p.id, "pending")}>Unpub</button>
                          )}
                          <button className="chip text-[0.55rem]" onClick={() => toggleFeatured(p.id)}>{p.featured ? "Unfeat" : "Feat"}</button>
                          <button className="chip text-[0.55rem] text-flare" onClick={() => removeListing(p.id)}>Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!rows.length && <p className="p-10 text-center text-sm text-muted">No listings found.</p>}
            </div>
          </div>
        )}

        {/* enquiries */}
        {tab === "enquiries" && (
          <div className="grid gap-6 lg:grid-cols-3">
            {(["new", "contacted", "closed"] as const).map((lane) => {
              const cards = enquiries.filter((e) => e.status === lane);
              return (
                <div key={lane} className="rounded-lg border border-line bg-surface">
                  <div className="flex items-center justify-between border-b border-line px-5 py-4">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                      {lane === "new" ? "New" : lane === "contacted" ? "Contacted" : "Closed"}
                    </h3>
                    <span className="font-mono text-xs text-aqua">{String(cards.length).padStart(2, "0")}</span>
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    {cards.map((e) => (
                      <div key={e.id} className="rounded border border-line bg-void p-4">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold">{e.name}</p>
                          <span className="shrink-0 font-mono text-[0.55rem] text-muted">{e.id}</span>
                        </div>
                        <p className="mt-1 font-mono text-xs text-muted">{e.propertyId} — {e.phone}</p>
                        <p className="mt-2 text-xs leading-relaxed text-pearl-dim">{e.message}</p>
                        <p className="mt-1 font-mono text-[0.55rem] text-muted">{e.createdAt}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {(["new", "contacted", "closed"] as const).filter((l) => l !== lane).map((l) => (
                            <button key={l} className="chip text-[0.55rem]" onClick={() => moveEnquiry(e.id, l)}>→ {l}</button>
                          ))}
                          <button className="chip text-[0.55rem] text-flare" onClick={() => deleteEnquiry(e.id)}>Delete</button>
                        </div>
                      </div>
                    ))}
                    {!cards.length && <p className="py-6 text-center font-mono text-xs text-muted">Empty</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* add / edit form */}
        {tab === "add" && (
          <div className="rounded-lg border border-line bg-surface p-6 md:p-8">
            <h2 className="display d-sm mb-6">{editingId ? `Editing ${editingId}` : "Add new listing"}</h2>
            <form onSubmit={submitForm} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Title</label>
                <input name="title" value={form.title} onChange={handleFormChange} className="input" required />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">ID</label>
                <input name="id" value={form.id} onChange={handleFormChange} className="input" placeholder="Auto-generated" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Slug</label>
                <input name="slug" value={form.slug} onChange={handleFormChange} className="input" placeholder="Auto-generated" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Deal</label>
                <select name="deal" value={form.deal} onChange={handleFormChange} className="select">
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Tagline</label>
                <input name="tagline" value={form.tagline} onChange={handleFormChange} className="input" />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Description</label>
                <textarea name="description" value={form.description} onChange={handleFormChange} className="input min-h-[80px]" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Price (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleFormChange} className="input" required />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Category</label>
                <select name="category" value={form.category} onChange={handleFormChange} className="select">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Bedrooms</label>
                <input name="bedrooms" type="number" value={form.bedrooms} onChange={handleFormChange} className="input" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Bathrooms</label>
                <input name="bathrooms" type="number" value={form.bathrooms} onChange={handleFormChange} className="input" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Area (sqft)</label>
                <input name="areaSqft" type="number" value={form.areaSqft} onChange={handleFormChange} className="input" required />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Floors</label>
                <input name="floors" type="number" value={form.floors} onChange={handleFormChange} className="input" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Year built</label>
                <input name="yearBuilt" type="number" value={form.yearBuilt} onChange={handleFormChange} className="input" />
              </div>
              <div>
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Facing</label>
                <select name="facing" value={form.facing} onChange={handleFormChange} className="select">
                  {["N","NE","E","SE","S","SW","W","NW"].map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Address</label>
                <div className="grid gap-3 md:grid-cols-4">
                  <input name="locality" placeholder="Locality" value={form.locality} onChange={handleFormChange} className="input" />
                  <input name="city" placeholder="City" value={form.city} onChange={handleFormChange} className="input" required />
                  <input name="state" placeholder="State" value={form.state} onChange={handleFormChange} className="input" />
                  <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleFormChange} className="input" />
                </div>
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Amenities (comma separated)</label>
                <input name="amenities" value={form.amenities} onChange={handleFormChange} className="input" placeholder="Pool, Garden, Parking" />
              </div>
              <div className="md:col-span-2 lg:col-span-3">
                <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wider text-muted">Image URLs (one per line)</label>
                <textarea name="images" value={form.images} onChange={handleFormChange} className="input min-h-[80px]" placeholder="https://images.unsplash.com/photo-..." />
              </div>
              <div className="md:col-span-2 lg:col-span-3 flex gap-3 pt-2">
                <button type="submit" className="btn btn-gold">
                  {editingId ? "Update listing" : "Add listing"}
                </button>
                <button type="button" className="btn" onClick={() => { resetForm(); setShowAddForm(false); setTab("dashboard"); }}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
