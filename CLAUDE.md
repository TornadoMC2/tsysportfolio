# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Next.js dev server on :3000
npm run build      # Static export -> ./out
npm run start      # Serves ./out on :3000 via `serve` — requires a build first, does NOT run Next
npm run preview    # build + start
npm run lint       # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build — run this before calling work done
```

There is no test suite.

## Architecture

Personal portfolio: Next.js 16 App Router + React 19 + Tailwind CSS v4, deployed as a **fully static export**.

### Static export constraints (`next.config.ts`)

`output: "export"` — everything is prerendered at build time. No API routes, no middleware, no server actions, no request-time rendering. `images.unoptimized: true`, so `next/image` acts as a plain img with layout helpers. `reactCompiler: true` is on, so avoid hand-written memoization.

Two rules this imposes that are easy to trip over:

- Any dynamic route segment needs `generateStaticParams()` or the build fails.
- **Every metadata route must export `export const dynamic = "force-static"`** — `robots.ts`, `sitemap.ts` and both `opengraph-image.tsx` files do. Without it the build errors out at page-data collection.

### Two independent route groups, each owning `<html>`

`src/app/layout.tsx` is a deliberate pass-through returning `children`. The real document shells live in the route groups:

- `src/app/(main)/layout.tsx` — the portfolio. Renders `<html>`/`<body>`, the skip link, `MotionProvider`, Navbar and Footer, plus the site-wide metadata (including `metadataBase` and the `%s | tsys.dev` title template).
- `src/app/(portal)/layout.tsx` — a standalone captive-portal page at `/welcome`. Own shell, own viewport (zoom disabled), `robots: noindex`, no site chrome or animation runtime.

Consequence: anything rendered *outside* a route group must supply its own `<html>`/`<body>`. `src/app/not-found.tsx` does exactly this — it becomes `out/404.html`. Do not add a document shell to the root layout.

### Content lives in `src/lib/data.ts` and `src/lib/notes.ts`; identity in `src/lib/site.ts`

`projects` is a **discriminated union** on `isExternal`: `InternalProject` requires `content` and gets a route at `/projects/[slug]`; `ExternalProject` requires `link` and only ever renders a card. Narrow with the `isExternal` check rather than reaching for optional fields — the union is what stops dead links and empty write-ups.

`notes` powers `/notes` and `/notes/[slug]`. Always read `publishedNotes`, never `notes` — it filters `draft: true` entries and sorts newest first, and it is what the routes, sitemap and OG images enumerate. Reading time is derived from the content, so don't add a field for it. `formatNoteDate` pins locale and time zone deliberately: `toLocaleDateString` with machine defaults produces different output at build time and in the browser, which is a hydration mismatch.

Adding an object to either array is enough to produce its card, route, OG image and sitemap entry. `skillGroups` is the source of truth for skills; `skills` is the flattened derivation used by the marquee.

`src/lib/site.ts` holds name, role, availability, URL and every contact address. Never hardcode an email or social URL in a component.

### Metadata and social cards

`src/lib/metadata.ts` exports `pageMetadata({ title, description, path })` — every page uses it. It deliberately does **not** set `openGraph.images`, because the card comes from the `opengraph-image.tsx` file convention (rendered to PNG by Satori at build time); setting both would override the generated card.

Satori is stricter than the browser: a `<div>` with more than one child needs an explicit `display: flex`. `{expr} literal text` counts as two children — interpolate into a single template literal instead.

The home page sets `title: { absolute: ... }`; a plain string would be double-templated, and `undefined` deletes the title entirely.

### Markdown subset

`src/lib/markdown.tsx` renders both project and note write-ups without a parser dependency. Supported: `##`/`###`, `- ` bullets, fenced code blocks (common indent stripped, since content is authored as indented template literals), pipe tables, `**bold**`, `` `code` ``. Anything else becomes a paragraph. `parseBlocks` buffers list and table rows and flushes them as complete blocks — table rows must stay inside a `<table>`.

### Styling

Tailwind v4 via `@tailwindcss/postcss`, configured CSS-first in `src/app/globals.css` (`@theme inline`). There is no `tailwind.config`. Custom utilities defined there: `.glass`, `.bg-grid-pattern`, `.prose-custom` (styles the parsed write-ups, including `pre`/`table`), `.marquee`/`.marquee-track`, and the `.animate-fade-in-up` / `.animation-delay-*` pair used by the portal.

Dark-only (`className="dark"` hardcoded), slate-950 with a cyan-400 accent. Fonts are declared once in `src/lib/fonts.ts` and applied by both shells via `fontVariables` — neither layout inherits from the other, so both must apply them.

Animation is split by intent: `(main)` uses framer-motion wrapped in `MotionProvider` (`reducedMotion="user"`); `(portal)` uses CSS keyframes only, to stay light on a captive-portal connection. `globals.css` also disables the CSS animations under `prefers-reduced-motion`.

### Client/server split

Each route is a server `page.tsx` that exports `metadata` and renders a sibling client component (`HomeClient`, `AboutClient`, `ProjectsClient`, `NotesClient`, `ContactClient`, `ProjectDetailClient`, `NoteDetailClient`). Keep this split — a `"use client"` page cannot export `metadata`, which is how per-page titles and link previews are lost. `params` is a Promise in Next 16 and must be awaited.

`TechTicker` and `Footer` are intentionally server components; don't add hooks to them.

### Contact

There is deliberately **no contact form and no form backend** — the owner does not want to operate SMTP. `/contact` lists direct channels only: a `mailto:` link, a copy-to-clipboard button and social links. Don't reintroduce a form; a static export cannot deliver mail, and a form that silently drops messages is worse than no form.

Imports use the `@/*` → `./src/*` alias.
