"use client";

import { useState, type FormEvent } from "react";
import { profile } from "../lib/data";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      setMessage(json.message || "Message received — I'll get back to you soon.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Failed to send. Try emailing me directly.",
      );
    }
  }

  const direct = [{ label: "Email", href: `mailto:${profile.email}`, text: profile.email }];
  const social = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
  ];

  return (
    <section id="contact" className="section">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
        {/* direct details */}
        <Reveal className="grid gap-8 content-start">
          {direct.map((d) => (
            <a key={d.label} href={d.href} className="group grid gap-2">
              <span className="label">{d.label}</span>
              <span className="font-display text-[clamp(22px,2.6vw,36px)] font-extrabold tracking-[-0.03em] [overflow-wrap:anywhere] group-hover:text-accent transition-colors">
                {d.text}
              </span>
            </a>
          ))}
          <div className="grid gap-3">
            <span className="label">Elsewhere</span>
            <div className="flex flex-wrap gap-3">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn ghost"
                >
                  {s.label} <span className="arr">→</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        {/* form — submits to /api/contact via onSubmit above */}
        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="relative grid gap-8">
            {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="field">
                <label htmlFor="name" className="label">
                  Your name
                </label>
                <input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message" className="label">
                Tell me about the role or project
              </label>
              <textarea id="message" name="message" required rows={5} className="resize-y" />
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Send message"}
                {status !== "sending" && <span className="arr">→</span>}
              </button>

              {message && (
                <p
                  role="status"
                  className={`text-sm font-mono ${
                    status === "success" ? "text-accent" : "text-red"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
