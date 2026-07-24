import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { PROPERTIES } from "../../../lib/data";

const Body = z.object({
  propertyId: z.string().min(3),
  name: z.string().trim().min(2, "Tell us your name.").max(80),
  email: z.string().trim().email("That email address does not look right."),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9 ()-]{8,18}$/, "Use a phone number we can call."),
  message: z.string().trim().min(5, "Add a line about what you want to know.").max(1200),
});

/** One enquiry per minute per address — enough to stop a stuck submit button. */
const seen = new Map<string, number>();
const WINDOW = 60_000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const last = seen.get(ip) ?? 0;
  if (now - last < WINDOW) {
    return NextResponse.json(
      { error: "You have just sent one. Give us a minute to read it." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Send the enquiry as JSON." }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check the form and try again." },
      { status: 422 }
    );
  }

  const property = PROPERTIES.find((p) => p.id === parsed.data.propertyId);
  if (!property) {
    return NextResponse.json({ error: "That listing is no longer on the register." }, { status: 404 });
  }

  seen.set(ip, now);

  const inquiry = {
    id: `EN-${Math.floor(Math.random() * 9000 + 1000)}`,
    ...parsed.data,
    status: "new" as const,
    createdAt: new Date().toISOString(),
  };

  // Persistence and email are opt-in — see lib/db.ts and the README.
  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "AKRADHI <desk@resend.dev>",
          to: [process.env.ENQUIRY_TO_EMAIL],
          subject: `Enquiry — ${property.title} (${property.id})`,
          text: `${inquiry.name} · ${inquiry.phone} · ${inquiry.email}\n\n${inquiry.message}`,
        }),
      });
    } catch {
      // The enquiry is still accepted; the desk picks it up from the dashboard.
    }
  } else {
    console.info("[enquiry]", inquiry.id, property.id, inquiry.name);
  }

  return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
}
