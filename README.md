# Algoritham Infrastructure — Website

Marketing website for **Algoritham Infrastructure Pvt. Ltd.**, a Mumbai-based national IT integrator (est. 2009). Fully content-managed: every piece of copy, image, testimonial, client, and partner on the site is edited from a built-in CMS — no code changes needed for day-to-day updates.

**Live site:** https://algoritham.com

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Prerequisites](#prerequisites)
3. [Local setup](#local-setup)
4. [Environment variables](#environment-variables)
5. [Content management (Sanity CMS)](#content-management-sanity-cms)
6. [Project structure](#project-structure)
7. [How the site gets its content](#how-the-site-gets-its-content)
8. [Editing content — the everyday workflow](#editing-content--the-everyday-workflow)
9. [Forms (contact + newsletter)](#forms-contact--newsletter)
10. [Deployment](#deployment)
11. [DNS / domain setup](#dns--domain-setup)
12. [Accounts, access & credentials](#accounts-access--credentials)
13. [Ownership transfer](#ownership-transfer)
14. [Security](#security)
15. [Common tasks & troubleshooting](#common-tasks--troubleshooting)

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Styling | Tailwind CSS v4 (design tokens in `src/app/globals.css`) |
| Animation | Framer Motion 12 |
| Icons | lucide-react |
| CMS | Sanity v5 (embedded Studio at `/studio`) |
| Hosting | Vercel (auto-deploy from GitHub `main`) |
| Analytics | Vercel Analytics + Speed Insights |

---

## Prerequisites

- **Node.js 20+** (22 recommended)
- **npm** (comes with Node)
- A **Sanity account** with access to project `gphbi065` (for CMS editing)
- A **Vercel account** with access to the project (for deploys)

---

## Local setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd algoritham-redesign

# 2. Install dependencies
npm install

# 3. Create your env file (see next section)
cp .env.local.example .env.local
#    then fill in SANITY_API_TOKEN and SANITY_REVALIDATE_SECRET

# 4. Run the dev server
npm run dev
```

Open **http://localhost:3000** for the site and **http://localhost:3000/studio** for the CMS.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build (run this before pushing to catch errors) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run sanity:seed` | Populate the CMS with starter content (see below) |
| `npm run sanity:setup` | Configure Sanity CORS origins + revalidation webhook |

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in the two server-side secrets. The public values are already defaulted in code, so the build runs even without them.

```bash
# Public (safe to expose — visible in every image URL anyway)
NEXT_PUBLIC_SANITY_PROJECT_ID=gphbi065
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01

# Server-only — get these from your Sanity + Vercel dashboards
SANITY_API_TOKEN=          # Editor or Developer role token (sanity.io/manage → API → Tokens)
SANITY_REVALIDATE_SECRET=  # Any random string; must match the Sanity webhook secret
```

**On Vercel**, set `SANITY_API_TOKEN` and `SANITY_REVALIDATE_SECRET` under
Project → Settings → Environment Variables (Production scope), then redeploy.

> ⚠️ The write token needs **Editor** or **Developer** role. A "Viewer" or
> "Access Manager" token can read but not write — the contact/newsletter
> forms and the seed script will fail with a 403 permission error.

---

## Content management (Sanity CMS)

The CMS ("Sanity Studio") is embedded in the site itself at **`/studio`**.

- **Local:** http://localhost:3000/studio
- **Production:** https://algoritham.com/studio

Log in with a Sanity account that's a member of project `gphbi065`. First-time
visitors on a new domain must be added to the project's **CORS origins**
(sanity.io/manage → API → CORS) — the `sanity:setup` script does this
automatically for the standard domains.

### Studio sidebar layout

Content is grouped by how often it's edited:

- **🌐 Site Settings** — brand name, contact numbers, address, marketing claims (uptime %, years, projects), default SEO
- **🧭 Navigation / 👣 Footer** — menu links, footer columns, social links
- **📄 Pages** — per-page hero copy and SEO for Home, About, Mission & Vision, Services, Industries, Case Studies, Contact
- **⚙️ Services / 🏭 Industries / 📈 Case Studies / 💬 Testimonials / 🏆 Certifications** — the main business content
- **🤝 OEM Partners / 👥 Clients** — logos and names shown in the trust bar
- **🖥️ Home page content** — event photos, how-it-works steps, infrastructure features, coverage-map cities
- **📜 Legal pages** — privacy, terms, refund
- **📮 Contact submissions / ✉️ Newsletter subscribers** — form inbox (newest first)

### Seeding starter content

To populate an empty dataset with the current site content:

```bash
npm run sanity:seed                  # add missing documents (safe, idempotent)
npm run sanity:seed -- --reset-lists # wipe & replace client/partner/event lists
```

This also uploads the event photos from `public/gallery/` into Sanity as
image assets.

---

## Project structure

```
src/
├── app/                        Next.js App Router pages
│   ├── page.tsx                Home (composes all home sections)
│   ├── about/                  About page (page.tsx = server, view.tsx = client UI)
│   ├── services/               Services page
│   ├── industries/             Industries page
│   ├── case-studies/           Case Studies page
│   ├── mission-vision/         Mission & Vision page
│   ├── contact/                Contact page (+ form)
│   ├── legal/[slug]/           Privacy / Terms / Refund
│   ├── studio/[[...tool]]/     Embedded Sanity Studio
│   ├── api/
│   │   ├── contact/            POST → saves a contact submission
│   │   ├── newsletter/         POST → saves a subscriber
│   │   └── revalidate/         Sanity webhook → refreshes cached pages
│   ├── sitemap.ts, robots.ts   SEO
│   └── globals.css             Design tokens + base styles
├── components/
│   ├── sections/               Page-level blocks (Hero, TrustBar, Services…)
│   ├── layout/                 Navbar + Footer wrapper for sub-pages
│   └── ui/                     Reusable visual primitives
├── sanity/
│   ├── schemas/                Content model (what editors can edit)
│   ├── queries.ts              GROQ queries
│   ├── content.ts              Fetch helpers (query + static fallback)
│   ├── defaults.ts             Fallback content (site renders even if CMS is empty)
│   ├── structure.ts            Studio sidebar layout
│   ├── client.ts / image.ts    Sanity client + image URL builder
│   └── types.ts                TypeScript types for all content
├── lib/                        Helpers (SEO, icons, rate-limit, safe-json…)
scripts/
├── seed-sanity.ts              Populate CMS
└── setup-sanity.ts             Configure CORS + webhook
```

Each sub-page uses a **two-file pattern**: `page.tsx` is a server component
that fetches content and sets SEO metadata; `view.tsx` is the client component
that renders the animated UI.

---

## How the site gets its content

Every section fetches from Sanity with a **static fallback**:

1. `content.ts` runs a GROQ query against Sanity.
2. If Sanity returns nothing (empty dataset, network issue), it falls back to
   `defaults.ts`.

This means **the site always renders correctly**, even before the CMS is
populated. Editors can fill in content at their own pace.

**Single source of truth for marketing claims:** uptime SLA, years in
business, carriers, and projects delivered all live in **Site Settings**.
Change them once and the Hero badge, Trust Bar, and Infrastructure stats all
update together.

Content is cached and refreshed:
- **Automatically** ~60 seconds after an edit (ISR), or
- **Instantly** via the revalidation webhook (see [Deployment](#deployment)).

---

## Editing content — the everyday workflow

1. Go to https://algoritham.com/studio and log in.
2. Find the item in the sidebar (e.g. **Testimonials** → pick one).
3. Edit the fields — each field has a description explaining where it appears.
4. Click **Publish**.
5. The live site updates within a few seconds (or up to 60s if the webhook
   isn't configured).

To add a photo, testimonial, client, etc.: open the relevant list → **Create
new** → fill in → Publish.

---

## Forms (contact + newsletter)

- **Contact form** (`/contact`) → saves to **Contact submissions** in Studio.
- **Newsletter** (footer) → saves to **Newsletter subscribers** in Studio.

Both are protected by:
- Rate limiting (per IP)
- Honeypot spam trap
- Server-side validation + length caps

They require `SANITY_API_TOKEN` (Editor/Developer role) to be set on Vercel.

---

## Deployment

The site auto-deploys to **Vercel** on every push to the GitHub `main` branch.

```bash
git add -A
git commit -m "your change"
git push origin main
# → Vercel builds & deploys automatically (~1-2 min)
```

Check build status in the Vercel dashboard → Deployments.

### Revalidation webhook (instant content updates)

So CMS edits appear instantly instead of waiting for the 60s cache:

1. sanity.io/manage → project → API → **Webhooks** → Create
2. URL: `https://algoritham.com/api/revalidate`
3. Trigger: Create, Update, Delete
4. Secret: must match `SANITY_REVALIDATE_SECRET` in Vercel env vars

Or just run `npm run sanity:setup` with a Developer/Admin token, which
configures this automatically.

---

## DNS / domain setup

The domain is registered at **Hostinger**; the marketing site is served by
**Vercel**; the internal CRM stays on Hostinger.

| Record | Type | Value | Purpose |
|---|---|---|---|
| `@` | A | `216.198.79.1` | Marketing site → Vercel |
| `www` | CNAME | (Vercel-provided target) | www → Vercel |
| `crm` | A | `46.28.45.163` | CRM → Hostinger |
| `crm1` | A | `46.28.45.163` | CRM → Hostinger |
| `ftp` | A | `46.28.45.163` | FTP → Hostinger |
| `@` | MX | `mx1/mx2.hostinger.com` | Email → Hostinger |
| `@` | TXT | `v=spf1 include:_spf.mail.hostinger.com ~all` | Email SPF |

> Hostinger's website-CDN toggle locks the apex `@` record. If you ever need
> to re-point the root, disable that CDN first, then edit the `@` record.

Add the production domain(s) in Vercel → Project → Settings → Domains, and add
them to Sanity CORS origins so `/studio` loads there.

---

## Accounts, access & credentials

The project spans four external services. Here's what each is, the
**non-secret** identifiers, and **where the real credentials live** (they are
deliberately **not** stored in this repository).

| Service | What it's for | How you log in | Non-secret IDs |
|---|---|---|---|
| **GitHub** | Source code + auto-deploy trigger | GitHub account with repo access | repo: `algoritham-redesign` |
| **Vercel** | Hosting, builds, env vars, domains | Vercel account added to the project/team | project: `algoritham-redesign` |
| **Sanity** | CMS content + Studio | Sanity account added as a project member | project ID: `gphbi065` · org ID: `oEhGWitni` · dataset: `production` |
| **Hostinger** | Domain registrar + DNS + CRM + email | Hostinger account (domain owner) | domain: `algoritham.com` |

### Where the secrets actually live

> **Never commit passwords or API tokens to this repository.** It is version
> controlled and shared; a leaked token gives write access to the CMS. All
> secrets live in the dashboards below and are injected at runtime.

| Secret | Lives in | How to view / rotate |
|---|---|---|
| `SANITY_API_TOKEN` | Vercel env vars (Production) + your local `.env.local` | sanity.io/manage → project → **API → Tokens** → create a new **Editor** token, paste into Vercel, redeploy |
| `SANITY_REVALIDATE_SECRET` | Vercel env vars + the Sanity webhook config | Any random string; must match on both sides (Vercel env var ↔ sanity.io/manage → API → Webhooks → Secret) |
| Sanity login | Personal — each editor logs in with their own Sanity account | Add/remove members at sanity.io/manage → project → **Members** |
| Hostinger login | Held by the domain owner | Hostinger account; enable 2FA |
| Vercel login | Personal — each dev logs in with their own account | Add/remove at Vercel → Team/Project → **Members** |

**If any token was ever shared over chat/email, rotate it.** Generate a fresh
one in the relevant dashboard, update it in Vercel, redeploy, and delete the
old one.

### Accessing Sanity Studio

The CMS lives at **https://algoritham.com/studio** (also `/studio` locally).

1. You must be a **member** of Sanity project `gphbi065`. The project owner
   adds you at sanity.io/manage → project → **Members** → Invite (by email).
2. Once invited, accept the email, then open `/studio` and log in with that
   Sanity account (Google / GitHub / email — whatever the account uses).
3. If Studio shows a **CORS error**, the domain isn't whitelisted yet. The
   owner adds it at sanity.io/manage → project → **API → CORS Origins**
   (with "Allow credentials" ✓), or runs `npm run sanity:setup`.

**Roles** (set per member in the Members panel):
- **Administrator / Owner** — full control, can manage members, API, billing
- **Editor / Developer** — read + write all content (what most editors need)
- **Viewer** — read-only (cannot publish or run the seed script)

---

## Ownership transfer

To hand the project to a new owner **while keeping a developer on board**,
decide up front between two patterns:

- **Full transfer** — everything moves to the new owner's account; the
  previous dev is re-added as a collaborator afterwards (owner controls that
  access).
- **Shared org (recommended)** — create an Organization/Team on each platform;
  both parties are members and retain independent access.

Do the steps in this order so the deploy pipeline never breaks:

**Step 0 — the new owner creates accounts first**
They sign up for GitHub, Vercel, and Sanity (using the company email), and send
back their **GitHub username** and **Vercel team name** (an email address alone
cannot receive a repo or project).

**Step 1 — Sanity (lowest risk, no pipeline dependency)**
1. sanity.io/manage → project `gphbi065` → **Members** → Invite the new owner
   as **Administrator**.
2. Under the organization (`oEhGWitni`) settings, set them as **Owner**.
3. Keep the outgoing dev as **Editor/Developer** so they retain access.
4. New owner rotates `SANITY_API_TOKEN` (create fresh Editor token) and updates
   it in Vercel.

**Step 2 — GitHub (repo)**
1. Repo → **Settings → Danger Zone → Transfer** → enter the new owner's
   username (or transfer to their Organization). They accept via email.
2. New owner re-adds the dev: repo → **Settings → Collaborators** → add the
   dev's username with **Write** (or Admin) access.

**Step 3 — Vercel (hosting)**
1. Project → **Settings → Advanced → Transfer Project** → select the new
   owner's team. They accept.
2. **Reconnect Git**: after the GitHub transfer, Project → **Settings → Git** →
   reconnect to the new repo location (auto-deploy breaks until you do this).
3. **Re-add env vars** on the new team's project: `SANITY_API_TOKEN`,
   `SANITY_REVALIDATE_SECRET` (transfers can drop these).
4. **Re-check domains**: Project → **Settings → Domains** → confirm
   `algoritham.com` + `www` are attached; re-add if needed.
5. New owner re-adds the dev: Team → **Settings → Members** → invite the dev.

**Step 4 — verify end to end**
1. Push a trivial commit → confirm Vercel auto-deploys.
2. Open `https://algoritham.com` and `/studio` → both load.
3. Submit a test contact/newsletter form → confirm it appears in Studio.
4. Edit something in Studio + publish → confirm the site updates.

**Keep-developer-access checklist** — after transfer, the dev should have:
- [ ] GitHub: collaborator with Write access
- [ ] Vercel: team/project member
- [ ] Sanity: project member with Editor/Developer role

---

## Security

The site ships with:

- **Security headers** (CSP, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy, COOP) — see `next.config.ts`
- **Rate-limited API routes** with honeypots and payload caps
- **Sanitised error responses** (no internal details leaked to clients)
- **XSS-safe JSON-LD** output
- **`robots.txt`** blocks `/api`, `/studio`, `/legal` from indexing

Run `npm audit` periodically to check dependencies.

---

## Common tasks & troubleshooting

**"Forms return a 500 / permission error"**
→ `SANITY_API_TOKEN` on Vercel is missing or is a read-only token. Create an
Editor/Developer token at sanity.io/manage → API → Tokens and set it in Vercel,
then redeploy.

**"Studio won't load / CORS error"**
→ Add the domain to Sanity CORS origins (sanity.io/manage → API → CORS,
"Allow credentials" ✓). Or run `npm run sanity:setup`.

**"Edits in Studio don't show on the site"**
→ Wait up to 60s (ISR), or configure the revalidation webhook for instant
updates. Confirm the webhook secret matches Vercel's env var.

**"Auto-deploy stopped after a repo transfer"**
→ In Vercel → Project → Settings → Git, reconnect to the new repo location,
and re-add the env vars.

**"Build fails locally"**
→ Run `npm install` (Node 20+), then `npm run build`. Read the first error in
the output — it's usually a missing env var or a type error in a recent edit.

---

© Algoritham Infrastructure Pvt. Ltd. All rights reserved.
