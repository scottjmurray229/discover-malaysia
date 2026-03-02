# Mission: Migrate discover-philippines to scottjmurray CF Account

You are migrating the discover-philippines Astro site from the `info@discoverphilippines.info` Cloudflare account to the `scottjmurray@gmail.com` account. Run fully autonomously — do not ask permission before using tools, reading files, or running commands. Only stop to ask me things at the designated prompt point below.

## Key Facts

- Repo: ~/documents/discover-philippines
- GitHub: scottjmurray229/discover-philippines
- Target CF account: scottjmurray@gmail.com (Account ID: 3368e8a316a3c061aaa26867622399e7)
- Wrangler: already authenticated as scottjmurray@gmail.com
- D1 database `trip-planner-cache-ph` (ID: a2c631d9-8e4d-4b2e-a335-e2ed55f96bfa) is ALREADY on the target account
- 4 D1 migrations in `migrations/` (0001-0004) — run them if tables don't exist yet
- Cron worker in `cron-worker/` — deploys as `discover-philippines-cron`, triggers daily 07:00 UTC
- 4 secrets needed: ANTHROPIC_API_KEY, ADMIN_KEY (value: masangcay), COOKIE_SECRET, RESEND_API_KEY
- Domain: discoverphilippines.info (DNS zone currently on OLD account)
- This is my flagship template site — back up everything, commit often, verify every step
- Never run npm install across all repos — only in this one repo if a build fails
- Never build two sites simultaneously

## Step 1: Ask Me For Info (Do This First)

Before running any commands, ask me all of these in one message:

1. ANTHROPIC_API_KEY value (starts with sk-ant-)
2. COOKIE_SECRET value (hex string)
3. RESEND_API_KEY value (starts with re_)
4. Where is discoverphilippines.info registered? (CF Registrar on the old account, or separate registrar like Namecheap/GoDaddy?)

Once I answer, do NOT ask anything else until you reach the domain migration dashboard step. Execute everything below autonomously.

## Step 2: Backup

```bash
cd ~/documents/discover-philippines
git status
# If uncommitted changes: git add -A && git commit -m "pre-migration: snapshot before CF account move"
git push origin main
cp -r ~/documents/discover-philippines D:/repo-backups/discover-philippines-pre-migration-$(date +%Y%m%d)
ls D:/repo-backups/ | grep philippines-pre-migration
```

HARD STOP if backup to D: fails. Tell me and do not continue.

## Step 3: Create Pages Project, Build, Deploy

```bash
wrangler whoami  # Must show scottjmurray@gmail.com
wrangler pages project create discover-philippines  # "already exists" is fine
```

Check D1 tables and run migrations if needed:
```bash
wrangler d1 execute trip-planner-cache-ph --remote --command "SELECT name FROM sqlite_master WHERE type='table'"
# If tables missing:
wrangler d1 migrations apply trip-planner-cache-ph --remote
```

Build and deploy:
```bash
npm run build && wrangler pages deploy dist --project-name=discover-philippines
```

Verify pages.dev loads:
```bash
curl -s -o /dev/null -w "%{http_code}" https://discover-philippines.pages.dev/
# Must return 200
```

## Step 4: Set Secrets

Use the values I gave you. Pipe them to avoid interactive prompts:
```bash
echo "THE_VALUE" | wrangler pages secret put ANTHROPIC_API_KEY --project-name=discover-philippines
echo "masangcay" | wrangler pages secret put ADMIN_KEY --project-name=discover-philippines
echo "THE_VALUE" | wrangler pages secret put COOKIE_SECRET --project-name=discover-philippines
echo "THE_VALUE" | wrangler pages secret put RESEND_API_KEY --project-name=discover-philippines
```

If `wrangler pages secret put` errors, try: `wrangler secret put SECRET_NAME --name=discover-philippines`

Verify:
```bash
curl -s "https://discover-philippines.pages.dev/api/admin/stats?key=masangcay" | head -30
# Should return HTML stats, not env var errors
```

## Step 5: Deploy Cron Worker

```bash
cd ~/documents/discover-philippines/cron-worker
wrangler deploy
echo "masangcay" | wrangler secret put ADMIN_KEY
wrangler deployments list
cd ~/documents/discover-philippines
```

## Step 6: Commit Progress

```bash
git add -A && git commit -m "migration: deployed pages, secrets, cron to scottjmurray account" && git push origin main
```

## Step 7: Domain Migration (Ask Me To Do Dashboard Steps)

This is the ONE place you stop and talk to me. Give me these exact instructions:

> Everything is deployed and verified on discover-philippines.pages.dev. Now I need you to move the domain in the Cloudflare dashboard:
>
> **In the OLD account (info@discoverphilippines.info):**
> 1. Workers & Pages → discover-philippines → Custom domains → Remove `discoverphilippines.info`
> 2. Go to the discoverphilippines.info zone → Overview sidebar → "Move zone to another account" → enter scottjmurray@gmail.com
>    - If "Move zone" isn't available: delete the zone entirely from the old account
>
> **In the NEW account (scottjmurray@gmail.com):**
> 3. If you moved the zone: accept the transfer. If you deleted it: "Add a site" → discoverphilippines.info → Free plan → update nameservers at your registrar if CF gives new ones
> 4. Workers & Pages → discover-philippines → Custom domains → "Set up a custom domain" → add `discoverphilippines.info` and `www.discoverphilippines.info`
> 5. Wait for SSL to show green/active (usually under 5 minutes)
>
> Tell me "done" when finished.

Wait for me to say "done", then continue.

## Step 8: Full Verification

```bash
nslookup discoverphilippines.info

curl -sI https://discoverphilippines.info/ | head -10

curl -s "https://discoverphilippines.info/api/admin/stats?key=masangcay" | head -30

for page in "/" "/destinations/boracay" "/destinations/cebu" "/destinations/siquijor" "/plan" "/snorkeling-philippines/" "/about/scott"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://discoverphilippines.info${page}")
  echo "${page} → HTTP ${status}"
done

curl -sI -X OPTIONS "https://discoverphilippines.info/api/generate-itinerary" \
  -H "Origin: https://discoverphilippines.info" | grep -i access-control

cd ~/documents/discover-philippines/cron-worker && wrangler deployments list && cd ~/documents/discover-philippines
```

Report all results to me. If anything fails, troubleshoot immediately.

## Step 9: Final Commit & Session Log

```bash
cd ~/documents/discover-philippines
git add -A
git commit -m "migration complete: discover-philippines on scottjmurray@gmail.com CF account

- Pages project deployed and verified
- D1 trip-planner-cache-ph with all migrations applied
- 4 secrets configured
- Cron worker discover-philippines-cron deployed (daily 07:00 UTC)
- Custom domain discoverphilippines.info transferred with SSL
- All endpoints and pages verified

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main
```

```bash
echo "" >> ~/documents/discover-more/docs/session-log.md
echo "## $(date +%Y-%m-%d) — Philippines CF Account Migration" >> ~/documents/discover-more/docs/session-log.md
echo "- Migrated discover-philippines from info@discoverphilippines.info to scottjmurray@gmail.com" >> ~/documents/discover-more/docs/session-log.md
echo "- Pages, D1, cron worker, 4 secrets, custom domain all verified working" >> ~/documents/discover-more/docs/session-log.md
echo "- Old account left intact for 24h safety period" >> ~/documents/discover-more/docs/session-log.md
```

## Step 10: Tell Me We're Done

> Migration complete. discover-philippines is running on scottjmurray@gmail.com.
>
> Verified: pages.dev, custom domain + SSL, D1 tables, all 4 secrets, cron worker, API endpoints, multiple page loads.
>
> Do NOT delete anything on the old account for 24 hours. Check tomorrow:
> - Daily report email arrives at 07:00 UTC
> - GA4 Real-time shows visitors
> - Trip planner works on the live site
> - /api/admin/stats shows data
>
> After all 4 confirmed, safe to clean up old account.

## If Something Goes Wrong

- Full backup: D:/repo-backups/discover-philippines-pre-migration-YYYYMMDD
- Old site still live on old account until manually deleted
- Rollback: re-point domain back to old account
- D1 is already on target account, unaffected by rollback
- Build fails: fix errors in this repo only, never npm install across all repos
- Secrets not working: try CF dashboard instead of CLI, then redeploy
- SSL not provisioning: wait 15 min, verify zone shows "Active" in dashboard
