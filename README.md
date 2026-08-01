# tsys.dev

Portfolio site for Hunter Johanson — network & systems engineer. Built with
Next.js 16 (App Router) and React 19, compiled to a **fully static export** and
self-hosted on the same infrastructure it documents.

Live: <https://tsys.dev>

## Commands

```bash
npm run dev        # dev server on :3000
npm run build      # static export -> ./out
npm run start      # serve ./out on :3000 (build first)
npm run preview    # build + start
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck + build
```

## How it's put together

- **Static export.** `output: "export"` in `next.config.ts` — no server runtime,
  no API routes, no request-time rendering. Deployment is copying `out/` behind
  a web server.
- **Two document shells.** `src/app/(main)` is the public site; `src/app/(portal)`
  is the guest-WiFi captive portal at `/welcome`, which needs its own viewport
  policy and ships without the animation runtime. Each route group renders its
  own `<html>`; the root layout is an intentional pass-through.
- **Content lives in `src/lib/data.ts` and `src/lib/notes.ts`.** Projects and
  write-ups are typed exports — no CMS. Adding an object is enough to generate
  the card, the route, the social card and the sitemap entry.
- **Site identity lives in `src/lib/site.ts`.** Name, role, availability blurb
  and every contact address, so nothing is duplicated across pages.
- **No contact form.** `/contact` lists direct channels only — there is no SMTP
  or form backend to operate.

## Adding a project

Append to `projects` in `src/lib/data.ts`. Internal projects need `content`
(the write-up); external ones need `link` instead — the discriminated union
enforces this at compile time. Drop cover art at `public/images/<name>.svg`.

## Adding a note

Append to `notes` in `src/lib/notes.ts` with a `slug`, `title`, `description`,
ISO `date` and `tags`. The index sorts newest first and reading time is
calculated from the content, so nothing else needs updating.

Set `draft: true` to keep an unfinished note out of the index, the routes and
the sitemap.

## Markdown

Both projects and notes use the same small Markdown subset
(`src/lib/markdown.tsx`): `##`/`###` headings, `-` bullets, fenced code blocks,
pipe tables, `**bold**` and `` `code` ``. Anything else renders as a paragraph.
Content is authored as indented template literals; code blocks have their common
indent stripped automatically.

## Roadmap

Ideas for turning the domain into something beyond a portfolio are in
[`docs/ROADMAP.md`](docs/ROADMAP.md).
