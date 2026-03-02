# Migration Plan: discover-philippines to scottjmurray@gmail.com CF Account

**Created:** 2026-03-02
**Status:** READY TO EXECUTE
**Risk Level:** HIGH — flagship template, domain transfer involved, brief downtime expected

---

## Current State

| Resource | Location | Details |
|----------|----------|---------|
| CF Pages project | **OLD** (info@discoverphilippines.info) | `discover-philippines`, live at discoverphilippines.info |
| D1 database | **NEW** (scottjmurray@gmail.com) | `trip-planner-cache-ph` / `a2c631d9-8e4d-4b2e-a335-e2ed55f96bfa` |
| Cron worker | **OLD** (info@discoverphilippines.info) | `discover-philippines-cron`, daily 07:00 UTC |
| DNS zone | **OLD** (info@discoverphilippines.info) | discoverphilippines.info, CF nameservers |
| Domain registrar | **CHECK** | Need to verify where domain is registered |
| Git repo | GitHub (scottjmurray229) | Clean, all committed |
| Secrets (4) | **OLD** account | ANTHROPIC_API_KEY, ADMIN_KEY, COOKIE_SECRET, RESEND_API_KEY |

## Target State

Everything on scottjmurray@gmail.com (Account ID: `3368e8a316a3c061aaa26867622399e7`)

---

## PHASE 0: BACKUP EVERYTHING (Before Touching Anything)

### 0.1 — Git safety
```bash
cd ~/documents/discover-philippines
git status                        # Verify clean working tree
git add -A && git commit -m "pre-migration snapshot" # Only if uncommitted changes
git push origin main
```

### 0.2 — Full repo backup to 2TB
```bash
cp -r ~/documents/discover-philippines D:/repo-backups/discover-philippines-pre-migration-$(date +%Y%m%d)
```

### 0.3 — Export D1 data (if any real data exists)
The D1 `trip-planner-cache-ph` is already on scottjmurray account, so data stays.
But verify tables exist and check for data:
```bash
wrangler d1 execute trip-planner-cache-ph --command "SELECT name FROM sqlite_master WHERE type='table'"
wrangler d1 execute trip-planner-cache-ph --command "SELECT COUNT(*) FROM itineraries" 2>/dev/null
```

If the old account also has a D1 with real data, user must manually export it from old CF dashboard.

### 0.4 — Record secret values
**USER MUST DO MANUALLY:** Log into old CF dashboard (info@discoverphilippines.info) and copy these 4 secret values:
1. `ANTHROPIC_API_KEY`
2. `ADMIN_KEY` (value: `masangcay`)
3. `COOKIE_SECRET`
4. `RESEND_API_KEY`

Save them somewhere secure (NOT in a file in the repo).

---

## PHASE 1: BUILD & DEPLOY TO NEW ACCOUNT

### 1.1 — Verify wrangler auth
```bash
wrangler whoami
# Must show: scottjmurray@gmail.com
```

### 1.2 — Create Pages project on new account
```bash
cd ~/documents/discover-philippines
wrangler pages project create discover-philippines
```

### 1.3 — Run D1 migrations (tables may not exist yet)
```bash
wrangler d1 migrations apply trip-planner-cache-ph --remote
```

### 1.4 — Build the site
```bash
npm run build
```

### 1.5 — Deploy to new account
```bash
wrangler pages deploy dist --project-name=discover-philippines
```

### 1.6 — Set secrets on the Pages project
```bash
echo "VALUE" | wrangler pages secret put ANTHROPIC_API_KEY --project-name=discover-philippines
echo "masangcay" | wrangler pages secret put ADMIN_KEY --project-name=discover-philippines
echo "VALUE" | wrangler pages secret put COOKIE_SECRET --project-name=discover-philippines
echo "VALUE" | wrangler pages secret put RESEND_API_KEY --project-name=discover-philippines
```
(Replace VALUE with actual secret values — user provides interactively)

### 1.7 — Deploy cron worker
```bash
cd ~/documents/discover-philippines/cron-worker
wrangler deploy
wrangler secret put ADMIN_KEY
# Enter: masangcay
```

### 1.8 — Verify pages.dev deployment
```bash
curl -s -o /dev/null -w "%{http_code}" https://discover-philippines.pages.dev/
# Should return 200
curl -s https://discover-philippines.pages.dev/api/admin/stats?key=masangcay | head -20
# Should return HTML stats page
```

---

## PHASE 2: DOMAIN MIGRATION (Causes Brief Downtime)

This is the only part that causes user-visible downtime. Target: < 30 minutes.

### Option A: Zone Transfer (Preferred — Minimal Downtime)
**Requires access to BOTH CF accounts simultaneously.**

1. **Old account dashboard** → discoverphilippines.info zone → Settings
2. Remove custom domain from old Pages project first
3. Initiate zone transfer: "Move zone to another account"
4. Enter destination account email: scottjmurray@gmail.com
5. Accept transfer in scottjmurray account dashboard
6. Add custom domain to new Pages project:
   ```bash
   wrangler pages project update discover-philippines --custom-domain=discoverphilippines.info
   ```
   Or via dashboard: Pages → discover-philippines → Custom domains → Add

### Option B: Re-add Zone (If Transfer Not Available)
1. **Old account dashboard** → Remove custom domain from old Pages project
2. **Old account dashboard** → Delete zone (discoverphilippines.info)
3. **Domain registrar** → Verify nameservers (may need to update to new CF nameservers)
4. **New account dashboard** → Add site → discoverphilippines.info
5. Update nameservers at registrar if CF gives new ones
6. Add custom domain to Pages project via dashboard
7. Wait for SSL certificate provisioning (usually < 5 min on CF)

### Option C: Domain Registered at Cloudflare
If the domain was registered through CF Registrar on the old account:
1. Transfer domain registration to scottjmurray account first
2. Then follow Option A

### Post-Domain Verification
```bash
# Wait 2-5 minutes after domain setup
curl -sI https://discoverphilippines.info/ | head -5
# Should show HTTP/2 200

nslookup discoverphilippines.info
# Should resolve to CF IPs

curl -s https://discoverphilippines.info/api/admin/stats?key=masangcay | head -5
# Should return stats HTML
```

---

## PHASE 3: VERIFY EVERYTHING

### 3.1 — Pages deployment
- [ ] https://discover-philippines.pages.dev loads correctly
- [ ] https://discoverphilippines.info loads correctly (after domain)
- [ ] SSL certificate is valid and active
- [ ] All pages render (spot-check 5+ pages)
- [ ] Videos load and play
- [ ] Navigation works

### 3.2 — API endpoints
- [ ] `/api/admin/stats?key=masangcay` returns HTML dashboard
- [ ] `/api/admin/daily-report?key=masangcay` sends email
- [ ] `/api/generate-itinerary` accepts POST (test with curl)
- [ ] `/api/subscribe` accepts POST

### 3.3 — D1 database
- [ ] Tables exist (itineraries, rate_limits, email_subscribers, usage_analytics, maps_page_views)
- [ ] Trip planner generates and caches itineraries

### 3.4 — Cron worker
- [ ] `wrangler deployments list --name discover-philippines-cron` shows deployment
- [ ] Cron trigger set for `0 7 * * *`

### 3.5 — Headers & CORS
- [ ] `_headers` file serving correctly (check with curl -I)
- [ ] CORS allows discoverphilippines.info origin on /api/* routes

### 3.6 — External services still working
- [ ] GA4 (G-FMCBFTZZ35) — check Real-time in GA dashboard
- [ ] Resend emails delivering
- [ ] Google Maps loading on /plan page

---

## PHASE 4: CLEANUP OLD ACCOUNT

**Only after Phase 3 is 100% verified and site has been stable for 24+ hours.**

1. Log into old CF account (info@discoverphilippines.info)
2. Delete old Pages project `discover-philippines`
3. Delete old cron worker `discover-philippines-cron`
4. Delete old D1 database (if one existed on old account)
5. Remove any remaining DNS records
6. Optionally close/downgrade old CF account

---

## ROLLBACK PLAN

If anything goes wrong during migration:

1. **Before domain move:** Old site is still live, no impact
2. **During domain move:** Re-point domain back to old account Pages project
3. **After domain move:** Re-add zone to old account, point custom domain back
4. **Code issues:** `D:/repo-backups/discover-philippines-pre-migration-*` has full backup
5. **D1 data:** Already on scottjmurray account, not affected by migration

---

## IMPORTANT NOTES

- **wrangler is ONLY authenticated as scottjmurray** — cannot run wrangler commands against old account
- **Domain migration requires manual CF dashboard work** on the old account
- **Downtime window:** Only during Phase 2 (domain transfer) — ~5-30 minutes
- **Do NOT delete anything on old account until new deployment verified for 24 hours**
- **The ADMIN_KEY secret value is `masangcay`** — same across all sites
- **After migration, update `public/_headers` CORS origin** only if domain changes (it won't — same domain)
- **GA4, GSC, Bing Webmaster, Maps API keys** — all tied to the domain, not the CF account, so they continue working
