# tsys.dev — what this domain could actually be

The portfolio is table stakes. The differentiator is that you *operate
infrastructure*, and almost nobody applying for the same roles can prove it.
Everything below is aimed at one thing: make the site itself the evidence.

Ordered by payoff per hour. Implementation notes assume the current static
export — anything needing a server is called out.

---

## Tier 1 — weekend projects, disproportionate payoff

### 1. `/status` — a live status page for your own infrastructure

The single highest-value thing you can add. A recruiter clicks it and sees node
uptime, container count, WAN throughput and tunnel latency updating from *your
rack*. No other student portfolio does this.

**How, without giving up the static export:** a cron job in the lab queries
Prometheus, writes a small JSON snapshot, and `PUT`s it to Cloudflare KV or R2
through a Worker with a write token. The page fetches that JSON client-side.
Your network is never reachable from the internet; the public only ever touches
Cloudflare.

Guard rails: publish aggregates, never hostnames, internal IPs or service
inventory. A status page is also a reconnaissance page if you're careless.

### 2. ~~Public postmortems / an infra changelog~~ — shipped, keep feeding it

`/notes` is live with three seeded write-ups. Add to `notes` in
`src/lib/notes.ts`; `draft: true` keeps an unfinished one out of the index,
routes and sitemap.

This remains the highest-signal thing an engineer can read about you — it shows
judgement, not just tool familiarity — and it's the only item here that brings
in traffic from search. It only works if you keep publishing. Candidates from
the lab: losing quorum on a 3-node cluster, a ZFS scrub finding real bit rot,
what the Grafana dashboards actually caught, the DMX timing bug that only
appeared on long cable runs.

Next step for the section itself: an **RSS feed**, so the people most worth
reaching can subscribe.

### 3. An in-page terminal

A `~` keypress (or `/console`) opens a shell on top of the site. `whoami`,
`ls projects`, `cat about.txt`, `neofetch`, `traceroute tsys.dev`, `sudo hire-me`.
Entirely client-side, so it survives the static export.

It's a gimmick, but it's *your* gimmick, it takes an afternoon, and it makes
people play with the site instead of bouncing off it.

### 4. `/uses` and a real `/resume`

- `/uses` — full hardware and software inventory. Cheap to write, genuinely
  popular with the homelab crowd, and good for search.
- `/resume` — an HTML résumé generated from `src/lib/data.ts` so it can never
  drift from the site, with a PDF rendered at build time. One URL to put on
  applications, always current.

### 5. Interactive topology diagram

Replace the topology *prose* in the homelab write-up with a clickable SVG:
click the RB5009 → firewall and VLAN design; click a Proxmox node → what runs on
it. You already have the diagram in your head; putting it on screen is the
difference between claiming and demonstrating.

---

## Tier 2 — bigger builds, strong portfolio pieces

### 6. `tools.tsys.dev` — a network engineer's public toolbelt

Small, fast, ad-free tools that people actually bookmark:

| Tool                               | Where it runs                          |
| ---------------------------------- | -------------------------------------- |
| Subnet / VLSM calculator           | client-side, ships today               |
| CIDR ↔ mask ↔ wildcard converter   | client-side                            |
| MAC OUI lookup                     | client-side with a bundled table       |
| DNS lookup (A/AAAA/MX/TXT/DNSSEC)  | Worker (DoH upstream)                  |
| Reverse DNS, ASN & IP info         | Worker                                 |
| TLS certificate inspector          | Worker                                 |
| Traceroute *from your edge*        | lab-hosted, rate-limited, tunneled out |

The last one is the flex: "run a traceroute from my network." Rate-limit it
hard and never let user input reach a shell — build the argv array yourself.

### 7. `ssh tsys.dev`

A TUI portfolio over SSH, built with Charm's Wish. Container in the lab, exposed
through the existing VPS/WireGuard ingress on port 22 of a dedicated address.

For a networking résumé this is close to a perfect party trick: it *is* the
portfolio, it *is* a demonstration of ingress design, and it's a story you can
tell for the entire interview.

### 8. Guest portal, phase two

The `/welcome` page is currently static. Turn it into the real thing:
- Per-guest PSK / self-service device onboarding
- A QR code that joins the SSID directly
- Live "you are on VLAN x, y Mbps available"
- Automatic expiry and revocation

Then write it up. Guest network onboarding is a genuine enterprise problem and
you'd have shipped a working version of it.

### 9. Live DMX control from the browser

A WebSerial page that drives your DMX node from a phone or laptop — colour
picker in, RGB fixture out. Record a ten-second clip of a real light responding
and put it on the project page. Embedded work is invisible on a résumé until
someone sees it move.

### 10. `api.tsys.dev` — a documented, operated service

Not a toy endpoint: versioned, rate-limited, authenticated, OpenAPI-described,
with published latency and error-rate dashboards. Expose something only you have
— lab metrics, the tools above — and treat it like a product you're on call for.

---

## Tier 3 — the flexes

### 11. Run the domain the way a network engineer would, then publish the receipts

DNSSEC. AAAA records and full IPv6 reachability. CAA. TLS 1.3 with a modern
cipher suite. HSTS preload. MTA-STS and DANE/TLSA on mail. SPF, DKIM and DMARC
at `p=reject`. A `/.well-known/security.txt`.

Then build `/security`, a page that *shows* the current state of each — pulled
live rather than hand-written. Very few people can point at their own apex
domain and say "here is my DMARC policy and here is why."

### 12. Now-playing, and the audio half of you

A now-playing widget fed by Navidrome, plus an A/B before-and-after player for
Tornado Audio mixes using the Web Audio API. Right now the site reads as two
unrelated people; this is what stitches the engineer and the audio engineer into
one story.

### 13. `links.tsys.dev`

Self-hosted short links with click analytics, plus QR generation. Put
`tsys.dev/hire` on a business card at a career fair and watch the hits arrive in
real time.

---

## Smaller things worth doing to the site as it stands

- **Tag filtering** on `/projects` — trivial now that projects are typed data.
- **RSS feed** for `/notes` — a static `feed.xml` generated the same way as
  `sitemap.xml`.
- **Self-hosted analytics** (Umami or Plausible in the lab) — no third-party
  scripts, and it's another service to point at.
- **A light theme.** The site hardcodes `class="dark"`; some people do read
  portfolios in daylight.
- **Real cover photography** of the actual rack. The generated SVG art is good,
  but one honest photo of the hardware outperforms all of it.
- **A short demo video** on the homelab page — a walkthrough of the rack and the
  Grafana dashboards. Ninety seconds, no editing required.

---

## What to do first

`/notes` is up, so the next two are **`/status`** and **`ssh tsys.dev`**, in that
order. The first proves the infrastructure is real; the second makes you
memorable.

Before either: go through the three seeded notes and make them yours. They were
drafted from the architecture described in your project write-ups, so the
reasoning is right, but the war stories are generic. The specific detail — the
error you actually saw, the hour it happened, the thing you tried first that
didn't work — is the entire reason anyone reads a post like that.
