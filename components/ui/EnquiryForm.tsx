"use client";

import { useState } from "react";
import MagneticButton from "../motion/MagneticButton";

type State = "idle" | "sending" | "sent" | "error";

export default function EnquiryForm({
  propertyId,
  title,
}: {
  propertyId: string;
  title: string;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I would like to see ${title}.`,
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, propertyId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "That did not go through. Try again.");
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
      <div className="border border-gold bg-gold/8 p-6">
        <p className="data text-gold">Enquiry logged</p>
        <p className="display d-sm mt-3">We will call within one working day.</p>
        <p className="mt-3 text-sm text-pearl-dim">
          Reference {propertyId}. If it is urgent, ring the desk on +91 98490 11204.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-line bg-void-2/50 p-6">
      <p className="data">Arrange a viewing</p>
      <p className="display d-sm mt-3">Speak to the surveyor.</p>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label className="data mb-2 block" htmlFor="e-name">Your name</label>
          <input
            id="e-name"
            className="input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="data mb-2 block" htmlFor="e-email">Email</label>
            <input
              id="e-email"
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              autoComplete="email"
            />
          </div>
          <div>
            <label className="data mb-2 block" htmlFor="e-phone">Phone</label>
            <input
              id="e-phone"
              type="tel"
              className="input"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <label className="data mb-2 block" htmlFor="e-msg">Message</label>
          <textarea
            id="e-msg"
            rows={3}
            className="input resize-none"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </div>

        {error ? (
          <p role="alert" className="border border-flare/50 bg-flare/10 px-4 py-3 text-sm text-pearl">
            {error}
          </p>
        ) : null}

        <MagneticButton
          className="btn btn-solid justify-center"
          onClick={submit}
          cursor="SEND"
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
        </MagneticButton>

        <p className="data text-muted">We reply to every enquiry, including the no.</p>
      </div>
    </div>
  );
}
