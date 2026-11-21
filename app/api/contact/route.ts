import { NextResponse } from "next/server";
import { profile } from "../../lib/data";
import { rateLimit } from "../../lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_MESSAGE = "Thanks — your message was sent. I'll get back to you soon.";
const SENDS_PER_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: the "company" input is hidden from people, so only bots fill it.
  // Pretend success so the bot gets no signal to adapt.
  if (String(body.company ?? "").trim()) {
    return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long (5000 characters max)." },
      { status: 400 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip, SENDS_PER_WINDOW, WINDOW_MS)) {
    return NextResponse.json(
      {
        error: `You've sent a few messages already — please try again in a few minutes, or email me at ${profile.email}.`,
      },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message not delivered");
    return deliveryFailed(503);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // resend.dev is Resend's shared sender, usable before you verify a domain.
        // It only delivers to the Resend account owner's own address.
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [profile.email],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected the message", res.status, await res.text());
      return deliveryFailed(502);
    }
  } catch (err) {
    console.error("[contact] Resend request failed", err);
    return deliveryFailed(502);
  }

  return NextResponse.json({ ok: true, message: SUCCESS_MESSAGE });
}

function deliveryFailed(status: number) {
  return NextResponse.json(
    { error: `Couldn't send your message right now. Please email me at ${profile.email}.` },
    { status },
  );
}
