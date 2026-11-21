# Ashish Bhaskar — Personal Portfolio

A single-page developer portfolio + technical blog for **Ashish Bhaskar** (Java Backend Engineer), built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## Features

- Terminal-inspired design with a **light / dark theme toggle** (persisted, no flash of wrong theme).
- Sections: Hero, About (animated stat counters), Experience, Skills, Projects, **System Architecture** diagram, **Writing**, Contact.
- **MDX blog** at `/blog` — posts live in `app/blog/<slug>/page.mdx`; the manifest is `app/blog/posts.ts`.
- Working contact form (`/api/contact`) with validation, scroll-progress bar, scroll-reveal animations, and full mobile responsiveness.
- SEO: dynamic Open Graph / Twitter social image (`app/opengraph-image.tsx`), `AB` favicon (`app/icon.svg`), rich metadata.

## Editing content

Almost everything is data-driven — edit **`app/lib/data.ts`** (profile, links, experience, skills, projects, architecture diagram, nav). Blog posts are MDX files under `app/blog/`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

The project is deploy-ready with zero configuration and no required environment variables.

```bash
npm i -g vercel      # install the Vercel CLI (one-time)
vercel login         # authenticate (opens the browser)
vercel               # deploy a preview
vercel --prod        # promote to production
```

After you know your production URL, set it so social-share/OG links resolve correctly — either update the fallback in `app/layout.tsx` (`siteUrl`) or add an environment variable:

```bash
vercel env add NEXT_PUBLIC_SITE_URL production   # e.g. https://ashish-bhaskar.vercel.app
```

> **Tip:** In this session you can run the interactive login yourself by typing
> `! vercel login` in the prompt.

## Optional: real contact-form email

The contact form currently validates and logs submissions server-side. To actually
deliver emails, wire a provider (e.g. Resend or AWS SES) inside
`app/api/contact/route.ts` — a ready-to-use snippet is included in the comments there —
and store the API key as a Vercel environment variable.
