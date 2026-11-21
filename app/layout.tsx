import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "./lib/data";
import { personJsonLd, rssAlternates, serializeJsonLd, siteUrl } from "./lib/site";
import { BAR_COLOR } from "./lib/theme";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FloatCta from "./components/FloatCta";

// next/font variables use an --nf-* prefix so they never collide with the
// Tailwind theme names (--font-display / --font-mono) defined in globals.css;
// `--font-mono: var(--font-mono)` would be a self-reference and break fonts.
//
// Display face. The `wdth` axis lets headings use font-stretch (the hero
// name is set slightly condensed at 92%).
const display = Archivo({
  variable: "--nf-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const body = Instrument_Sans({
  variable: "--nf-body",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--nf-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "Ashish Bhaskar",
    "Java Backend Engineer",
    "Spring Boot",
    "Microservices",
    "AWS",
    "Distributed Systems",
    "REST APIs",
  ],
  authors: [{ name: profile.name }],
  alternates: rssAlternates,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
  },
};

// Mobile browser bar matches the page background. ThemeToggle repoints these
// when the visitor picks the theme their OS did not.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BAR_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: BAR_COLOR.dark },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          // Set theme before paint to avoid a flash of the wrong theme. A saved
          // toggle choice wins; otherwise follow the OS setting.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`,
          }}
        />
        <script
          type="application/ld+json"
          // Raw JSON is required inside a JSON-LD script; serializeJsonLd escapes "<".
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd()) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatCta />
        <Analytics />
      </body>
    </html>
  );
}
