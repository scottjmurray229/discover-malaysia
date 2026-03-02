# Autonomous Sonnet Instructions: Migrate discover-philippines to scottjmurray CF Account

**Paste this entire file as your first message to a new Sonnet session.**

---

## YOUR ROLE

You are migrating the discover-philippines Astro site from one Cloudflare account to another. Run fully autonomously. Do NOT ask permission before using tools, reading files, or running commands.

## CONTEXT

- **Source CF account:** info@discoverphilippines.info (OLD — we're leaving this)
- **Target CF account:** scottjmurray@gmail.com, Account ID: `3368e8a316a3c061aaa26867622399e7`
- **Repo:** ~/documents/discover-philippines (GitHub: scottjmurray229/discover-philippines)
- **Wrangler:** Authenticated as scottjmurray@gmail.com (target account)
- **D1 database:** `trip-planner-cache-ph` (ID: `a2c631d9-8e4d-4b2e-a335-e2ed55f96bfa`) — ALREADY on target account
- **Domain:** discoverphilippines.info — DNS zone currently on OLD account
- **4 D1 migrations** in `migrations/` folder (0001-0004)
- **Cron worker** in `cron-worker/` folder — daily at 07:00 UTC
- **4 secrets required:** ANTHROPIC_API_KEY, ADMIN_KEY, COOKIE_SECRET, RESEND_API_KEY
- **ADMIN_KEY value:** masangcay (same across all sites)

## BEFORE YOU START: COLLECT EVERYTHING FROM THE USER

Ask the user for ALL of these upfront in a single prompt. Do not proceed until you have them:

1. **ANTHROPIC_API_KEY** — "What is your Anthropic API key? (starts with sk-ant-)"
2. **COOKIE_SECRET** — "What is your COOKIE_SECRET value? (32-byte hex string)"
3. **RESEND_API_KEY** — "What is your Resend API key? (starts with re_)"
4. **Domain registrar** — "Where is discoverphilippines.info registered? (Cloudflare Registrar on the old account, or a separate registrar like Namecheap/GoDaddy?)"
5. **Dashboard permission** — "During this migration, I'll need you to do some steps in the Cloudflare dashboard (moving the domain zone between accounts). Are you ready to do that when I tell you, or should I save those steps for later?"

Once you have answers to all 5, proceed autonomously through every phase without stopping.

---

## PHASE 0: BACKUP (No Exceptions — Do This First)

```bash
cd ~/documents/discover-philippines
git status
```

If uncommitted changes exist:
```bash
git add -A && git commit -m "pre-migration: snapshot before CF account move"
```

Then:
```bash
git push origin main
cp -r ~/documents/discover-philippines D:/repo-backups/discover-philippines-pre-migration-$(date +%Y%m%d)
ls D:/repo-backups/ | grep philippines-pre-migration
```

**HARD STOP if backup to D: fails.** Tell the user and do not continue.

---

## PHASE 1: CREATE PAGES PROJECT & DEPLOY

```bash
cd ~/documents/discover-philippines
wrangler whoami
# MUST show scottjmurray@gmail.com
```

```bash
wrangler pages project create discover-philippines
# "already exists" is OK
```

```bash
wrangler d1 execute trip-planner-cache-ph --remote --command "SELECT name FROM sqlite_master WHERE type='table'"
```

If tables missing, run migrations:
```bash
wrangler d1 migrations apply trip-planner-cache-ph --remote
```

Build and deploy:
```bash
npm run build && wrangler pages deploy dist --project-name=discover-philippines
```

Verify:
```bash
curl -s -o /dev/null -w "%{http_code}" https://discover-philippines.pages.dev/
# Must return 200
```

If 200, commit progress:
```bash
git add -A && git commit -m "migration phase 1: deployed to scottjmurray CF account" && git push origin main
```

---

## PHASE 2: SET ALL 4 SECRETS

Use the values collected at the start. Pipe them to avoid interactive prompts:

```bash
echo "COLLECTED_VALUE" | wrangler pages secret put ANTHROPIC_API_KEY --project-name=discover-philippines
echo "masangcay" | wrangler pages secret put ADMIN_KEY --project-name=discover-philippines
echo "COLLECTED_VALUE" | wrangler pages secret put COOKIE_SECRET --project-name=discover-philippines
echo "COLLECTED_VALUE" | wrangler pages secret put RESEND_API_KEY --project-name=discover-philippines
```

If `wrangler pages secret put` fails, try the worker-style approach:
```bash
wrangler secret put ANTHROPIC_API_KEY --name=discover-philippines
```

Verify secrets work:
```bash
curl -s "https://discover-philippines.pages.dev/api/admin/stats?key=masangcay" | head -30
```

Should return HTML stats page. If you see errors about missing environment variables, secrets are not set correctly — troubleshoot before continuing.

---

## PHASE 3: DEPLOY CRON WORKER

```bash
cd ~/documents/discover-philippines/cron-worker
wrangler deploy
echo "masangcay" | wrangler secret put ADMIN_KEY
wrangler deployments list
cd ~/documents/discover-philippines
```

---

## PHASE 4: DOMAIN MIGRATION (Give User Dashboard Instructions)

Everything automatable is done. Now give the user these exact instructions:

---

**Your turn for the dashboard steps. Here's exactly what to do:**

### Step 1: Remove custom domain from OLD Pages project
1. Go to dash.cloudflare.com and log in as **info@discoverphilippines.info**
2. Navigate to: Workers & Pages → discover-philippines → Custom domains
3. Click the three dots next to `discoverphilippines.info` → Remove

### Step 2: Move the DNS zone
**If domain is registered at Cloudflare on the old account:**
- Go to: discoverphilippines.info zone → Overview → right sidebar → "Move zone to another account"
- Enter: scottjmurray@gmail.com
- Log into scottjmurray account and accept the transfer

**If domain is registered at a separate registrar (Namecheap, GoDaddy, etc.):**
- Old account: Delete the discoverphilippines.info zone entirely
- scottjmurray account: Click "Add a site" → enter discoverphilippines.info → Free plan
- CF will give you two nameservers — update them at your registrar
- Wait for "Active" status (can take up to 24h but usually < 30 min)

### Step 3: Add custom domain to NEW Pages project
1. In scottjmurray account: Workers & Pages → discover-philippines → Custom domains
2. Click "Set up a custom domain"
3. Add: `discoverphilippines.info`
4. Also add: `www.discoverphilippines.info`
5. Wait for SSL to show green/active (usually < 5 minutes)

### Step 4: Tell me "done" and I'll verify everything

---

Wait for the user to confirm, then proceed to Phase 5.

---

## PHASE 5: FULL VERIFICATION

Run ALL of these checks:

```bash
# Domain resolves
nslookup discoverphilippines.info

# Site loads
curl -sI https://discoverphilippines.info/ | head -10

# SSL headers
curl -sI https://discoverphilippines.info/ | grep -i strict-transport

# Admin stats endpoint
curl -s "https://discoverphilippines.info/api/admin/stats?key=masangcay" | head -30

# Multiple pages load
for page in "/" "/destinations/boracay" "/destinations/cebu" "/destinations/siquijor" "/plan" "/snorkeling-philippines/" "/about/scott"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://discoverphilippines.info${page}")
  echo "${page} → HTTP ${status}"
done

# CORS on API
curl -sI -X OPTIONS "https://discoverphilippines.info/api/generate-itinerary" \
  -H "Origin: https://discoverphilippines.info" | grep -i access-control

# Cron worker
cd ~/documents/discover-philippines/cron-worker && wrangler deployments list && cd ~/documents/discover-philippines
```

Report results to user. If any check fails, troubleshoot immediately.

---

## PHASE 6: FINAL COMMIT & SESSION LOG

```bash
cd ~/documents/discover-philippines
git add -A
git commit -m "migration complete: discover-philippines now on scottjmurray@gmail.com CF account

- Pages project created and deployed
- D1 database trip-planner-cache-ph (already on target account) with migrations applied
- 4 secrets configured (ANTHROPIC_API_KEY, ADMIN_KEY, COOKIE_SECRET, RESEND_API_KEY)
- Cron worker discover-philippines-cron deployed (daily 07:00 UTC)
- Custom domain discoverphilippines.info transferred and verified
- All API endpoints, pages, SSL, and CORS verified working

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

git push origin main
```

Update session log:
```bash
echo "" >> ~/documents/discover-more/docs/session-log.md
echo "## $(date +%Y-%m-%d) — Philippines CF Account Migration" >> ~/documents/discover-more/docs/session-log.md
echo "- Migrated discover-philippines from info@discoverphilippines.info CF account to scottjmurray@gmail.com" >> ~/documents/discover-more/docs/session-log.md
echo "- Pages project, D1 (already on target), cron worker, 4 secrets, custom domain all verified" >> ~/documents/discover-more/docs/session-log.md
echo "- Old account resources left intact for 24h safety period" >> ~/documents/discover-more/docs/session-log.md
```

---

## FINAL MESSAGE TO USER

> Migration complete. discover-philippines is now running entirely on your scottjmurray@gmail.com Cloudflare account.
>
> **Verified working:**
> - Pages deployment at discover-philippines.pages.dev
> - Custom domain discoverphilippines.info with SSL
> - D1 database with all 4 migration tables
> - All 4 secrets configured
> - Cron worker (daily report at 07:00 UTC)
> - API endpoints (stats, trip planner, subscribe)
>
> **24-hour checklist before cleaning up old account:**
> - [ ] Daily report email arrives tomorrow morning
> - [ ] GA4 Real-time shows visitors
> - [ ] Trip planner generates itineraries on the live site
> - [ ] Check /api/admin/stats for data flowing
>
> After confirming all 4, you can delete everything on the old info@discoverphilippines.info account.

---

## TROUBLESHOOTING REFERENCE

| Problem | Fix |
|---------|-----|
| "Project already exists" | Fine — just deploy to it |
| Build fails | Fix errors, do NOT run npm install across all repos |
| Secrets not working | Try dashboard instead of CLI; redeploy after setting |
| SSL not provisioning | Wait 15 min; verify zone is Active in dashboard |
| D1 table not found | Run `wrangler d1 migrations apply trip-planner-cache-ph --remote` |
| Cron not firing | Check `wrangler triggers list --name discover-philippines-cron` |
| Domain not resolving | Check nameservers match what CF assigned; wait for propagation |

## ROLLBACK

If catastrophic failure:
1. Backup at `D:/repo-backups/discover-philippines-pre-migration-YYYYMMDD`
2. Old site still live on old account (don't delete for 24h)
3. Re-point domain back to old account to restore immediately
