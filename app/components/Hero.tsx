"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile } from "../lib/data";
import {
  ArrowRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
} from "./icons";

const ROLES = [
  "Java Backend Engineer",
  "Spring Boot Specialist",
  "Distributed Systems Builder",
  "Microservices Architect",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let delay = deleting ? 45 : 85;

    if (!deleting && text === current) {
      delay = 1500;
    } else if (deleting && text === "") {
      delay = 400;
    }

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[92vh] max-w-5xl flex-col justify-center px-5 sm:px-6 pt-24 pb-16"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="lg:flex-1">
          <p className="font-mono text-accent text-sm sm:text-base mb-5 animate-[fadeIn_0.6s_ease]">
            <span className="text-faint">$</span> whoami
          </p>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            <span className="text-foreground">{profile.name}</span>
          </h1>

          <div className="mt-4 h-9 sm:h-11 flex items-center">
            <span className="font-mono text-xl sm:text-3xl text-gradient font-semibold">
              {typed}
            </span>
            <span className="cursor" aria-hidden />
          </div>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted">
            {profile.tagline}{" "}
            <span className="text-foreground/90">
              I build systems that move terabytes, stay resilient across
              regions, and ship with fewer defects.
            </span>
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-faint font-mono">
            <MapPinIcon width={15} height={15} className="text-accent" />
            {profile.location}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="btn-primary group glow-accent"
            >
              View my work
              <ArrowRightIcon
                width={16}
                height={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href={profile.resume}
              download
              className="btn-secondary"
            >
              <DownloadIcon width={16} height={16} />
              Download Resume
            </a>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-muted hover:text-accent transition-colors"
            >
              <MailIcon width={22} height={22} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-accent transition-colors"
            >
              <GitHubIcon width={22} height={22} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-accent transition-colors"
            >
              <LinkedInIcon width={22} height={22} />
            </a>
          </div>
        </div>

        <div className="card mx-auto w-full max-w-[280px] shrink-0 overflow-hidden lg:mx-0 lg:w-72">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="ml-2 font-mono text-xs text-faint truncate">
              ~/whoami.png
            </span>
          </div>
          <Image
            src={profile.photo}
            alt={profile.name}
            width={420}
            height={472}
            priority
            sizes="(min-width: 1024px) 288px, 280px"
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
