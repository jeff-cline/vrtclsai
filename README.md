# VRTCLS.AI — Predictive Intelligence Exchange

The Operating System for Predictive Customer Acquisition.

Dark, institutional, enterprise-grade predictive intelligence platform. Marketing site + customer / manager / admin portals + credit engine. No internal payment processor — credits are issued manually from the admin portal after offline payment.

## Stack

- **Next.js 15** (App Router, React 19 RC, TypeScript)
- **Tailwind CSS** with custom dark institutional design tokens
- **Framer Motion** + animated canvas hero
- **Recharts** for all data visualization
- **Prisma** + **PostgreSQL** for data layer
- **NextAuth.js v5** (credentials provider, JWT sessions, RBAC)
- Deploys to **Vultr** (Node + Postgres + nginx + PM2 + Cloudflare)

## Local development

```bash
cp .env.example .env
# Fill DATABASE_URL, AUTH_SECRET (openssl rand -base64 32), SEED_ADMIN_PASSWORD
npm install --legacy-peer-deps
npm run db:push       # apply schema to your local Postgres
npm run db:seed       # seed admin + demo orgs + demo users
npm run dev
```

Visit `http://localhost:3000`. Sign in at `/login`.

### Seeded accounts (after `db:seed`)

| Role | Email | Password |
|------|-------|----------|
| Admin | `jeff.cline@me.com` | `SEED_ADMIN_PASSWORD` env var |
| Manager | `manager@meridian.example` | `DemoManager!1` |
| Customer | `analyst@meridian.example` | `DemoCustomer!1` |
| Customer | `ops@aurora.example` | `DemoCustomer!1` |

**Rotate every demo password before going live.**

## Routes

### Marketing
- `/` — homepage (hero, trust, why predictive wins, calculator, industries, case studies, research, FAQ, CTA)
- `/platform` — six-layer architecture overview
- `/platform/[scoring|identity-graph|enrichment|api]` — platform subpages
- `/industries` — index of 12 industry pillar pages
- `/industries/[slug]` — pillar page per vertical (healthcare, real-estate, finance, insurance, legal, travel, political, b2b-saas, automotive, private-equity, wellness, home-services)
- `/research` — research hub (topic + industry silos)
- `/research/[slug]` — supporting cluster articles
- `/case-studies` — index
- `/case-studies/[slug]` — detail
- `/faq` — schema-marked FAQ
- `/about`, `/contact`, `/demo` — additional

### Portals (auth required)
- `/portal` — customer dashboard, audiences, requests, downloads, API
- `/manager` — team, approvals, usage (requires MANAGER or ADMIN)
- `/admin` — users, credits, demo inbox, analytics (requires ADMIN)

### SEO
- `/sitemap.xml`, `/robots.txt` — auto-generated
- FAQ + Article + Organization + SoftwareApplication schemas inline

## Credit engine

- No Stripe. No checkout.
- Admin manually issues credits via `/admin/credits` after offline payment.
- Every grant/revoke is audit-logged in `CreditTxn` with `grantedById`.
- `Organization.creditBalance` is the authoritative balance, maintained transactionally with each `CreditTxn` write.

## Vultr deployment

See [`docs/deploy/vultr.md`](docs/deploy/vultr.md) for the full runbook. Quick summary:

1. Provision a Vultr instance (Ubuntu 22.04, 4 vCPU / 8 GB minimum).
2. Install Node 20, PostgreSQL 16, nginx, certbot, PM2.
3. Create a Postgres DB and user; copy connection string into `.env`.
4. `git clone`, `npm install --legacy-peer-deps`, `npm run build`.
5. `npm run db:push && npm run db:seed`.
6. `pm2 start ecosystem.config.cjs && pm2 save && pm2 startup`.
7. Configure nginx reverse proxy on port 80/443, run `certbot --nginx`.
8. Point Cloudflare in front (recommended).

## Design system

- Colors: deep navy `#07111F` → midnight `#0B1627` base; AI blue `#2F80ED`, intelligence cyan `#00C2FF`, predictive green `#00D084`, warning gold `#FFC857`.
- Typography: Space Grotesk (display), Inter (body), IBM Plex Mono (numeric).
- Tokens in `tailwind.config.ts`; primitives in `src/components/ui/`.

## Content / SEO silos

- **Industry silos** (12 pillars): healthcare, real-estate, finance, insurance, legal, travel, political, b2b-saas, automotive, private-equity, wellness, home-services.
- **Topic silos** (4 pillars): predictive-methodology, identity-graphing, behavioral-economics, compliance.
- Each pillar links to ~5–6 cluster articles under `/research/[slug]`.
- All long-tail content scaffolded; fill iteratively in the research hub.

## License

Proprietary. © Jeff Cline / VRTCLS.AI.
