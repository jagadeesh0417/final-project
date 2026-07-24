import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const Body = z.object({
  name: z.string().trim().min(2, "Tell us your name.").max(80),
  email: z.string().trim().email("That email address does not look right."),
  phone: z.string().trim().regex(/^[+0-9 ()-]{8,18}$/, "Use a phone number we can call."),
  subject: z.string().trim().min(2).max(60),
  budget: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(5, "Add a line about what you need.").max(2000),
});

const seen = new Map<string, number>();
const WINDOW = 60_000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  if (now - (seen.get(ip) ?? 0) < WINDOW) {
    return NextResponse.json({ error: "You have just sent one. Give us a minute." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Send the message as JSON." }, { status: 400 });
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check the form and try again." },
      { status: 422 }
    );
  }

  seen.set(ip, now);
  const ref = `AK-${Math.floor(Math.random() * 9000 + 1000)}`;

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
          subject: `${parsed.data.subject} — ${parsed.data.name} (${ref})`,
          text: `${parsed.data.name} · ${parsed.data.phone} · ${parsed.data.email}\nBudget: ${parsed.data.budget || "not given"}\n\n${parsed.data.message}`,
        }),
      });
    } catch {
      // Still accepted; the desk sees it on the dashboard.
    }
  } else {
    console.info("[contact]", ref, parsed.data.name, parsed.data.subject);
  }

  return NextResponse.json({ ok: true, ref }, { status: 201 });
}
