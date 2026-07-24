"use client";

import { useState } from "react";
import MagneticButton from "../motion/MagneticButton";

const SUBJECTS = ["Buying", "Renting", "Selling or letting", "Land", "Commercial", "Something else"];

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: SUBJECTS[0],
    budget: "",
    message: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "That did not send. Try again.");
        setState("error");
        return;
      }
      setState("sent");
    } catch {
      setError("No connection. Check your network and send again.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="glass-iri p-10 text-center">
        <p className="eyebrow justify-center">Received</p>
        <p className="display d-md mt-6">We will be in touch within one working day.</p>
        <p className="lede mx-auto mt-5 text-center">
          If it is urgent, the desk answers the phone between 10:00 and 18:30.
        </p>
        <a href="tel:+919849011204" className="btn mt-8">+91 98490 11204</a>
      </div>
    );
  }

  return (
    <div className="glass p-6 md:p-10">
      <p className="eyebrow">Send a message</p>
      <h2 className="display d-md mt-5">Tell us what you need.</h2>

      <div className="mt-9 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="data mb-2.5 block" htmlFor="c-name">Your name</label>
            <input id="c-name" className="input" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <label className="data mb-2.5 block" htmlFor="c-phone">Phone</label>
            <input id="c-phone" type="tel" className="input" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="data mb-2.5 block" htmlFor="c-email">Email</label>
            <input id="c-email" type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div>
            <label className="data mb-2.5 block" htmlFor="c-subject">This is about</label>
            <select id="c-subject" className="select" value={form.subject} onChange={(e) => set("subject", e.target.value)}>
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="data mb-2.5 block" htmlFor="c-budget">Budget, roughly</label>
          <input id="c-budget" className="input" placeholder="e.g. ₹2–4 Cr, or 80k a month" value={form.budget} onChange={(e) => set("budget", e.target.value)} />
        </div>

        <div>
          <label className="data mb-2.5 block" htmlFor="c-msg">Message</label>
          <textarea id="c-msg" rows={5} className="input resize-none" placeholder="Area, size, timeline — anything that helps us point you at the right thing." value={form.message} onChange={(e) => set("message", e.target.value)} />
        </div>

        {error ? (
          <p role="alert" className="border border-flare/50 bg-flare/10 px-4 py-3.5 text-sm text-pearl">{error}</p>
        ) : null}

        <MagneticButton className="btn btn-solid mt-2" onClick={submit} cursor="SEND">
          {state === "sending" ? "Sending…" : "Send message"}
        </MagneticButton>

        <p className="data text-muted">We reply to everything, including the no.</p>
      </div>
    </div>
  );
}
