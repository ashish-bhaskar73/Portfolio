import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentPropsWithoutRef<"h1">) => (
      <h1
        className="mt-2 text-3xl font-bold tracking-tight text-foreground"
        {...props}
      />
    ),
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <h2
        className="mt-14 mb-4 text-[clamp(26px,3vw,36px)] tracking-[-0.035em] text-foreground scroll-mt-24"
        {...props}
      />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
      <h3 className="mt-10 mb-3 text-[22px] tracking-[-0.025em] text-foreground" {...props} />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="my-5 leading-[1.75] text-ink-2" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
      <a
        className="text-accent underline underline-offset-4 hover:text-accent-dim"
        {...props}
      />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      // The accent dot belongs to bullet lists only; on the shared <li> it also
      // drew inside numbered lists, next to the number.
      <ul
        className="my-4 space-y-2 pl-1 [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-accent"
        {...props}
      />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol
        className="my-4 list-decimal space-y-2 pl-6 marker:font-mono marker:text-accent [&>li]:pl-1"
        {...props}
      />
    ),
    li: (props: ComponentPropsWithoutRef<"li">) => (
      <li className="relative text-ink-2 leading-relaxed" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote
        className="my-5 border-l-2 border-accent/50 bg-surface/50 py-1 pl-4 italic text-muted"
        {...props}
      />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code
        className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan"
        {...props}
      />
    ),
    pre: (props: ComponentPropsWithoutRef<"pre">) => (
      <pre
        className="my-5 overflow-x-auto rounded-xl border border-border bg-surface-2 p-4 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-foreground"
        {...props}
      />
    ),
    hr: (props: ComponentPropsWithoutRef<"hr">) => (
      <hr className="my-8 border-border" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    ...components,
  };
}
