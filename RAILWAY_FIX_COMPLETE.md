# Complete Railway Deployment Fix

## Problem Identified

Your Railway deployment is failing with:
```
Build Failed: secret JWT_SECRET not found
```

This happens because Railway needs proper **Variable References** between services.

## Solution: Step-by-Step Fix

### Step 1: Fix DATABASE_URL Variable Reference

In your **picknlearn** service Variables tab:

1. Click on `DATABASE_URL` variable
2. **Delete** the current value
3. Click **"+ New Variable"**
4. Set name: `DATABASE_URL`
5. Click **"Variable Reference"** button
6. Select: `MySQL` → `DATABASE_URL`
7. This will show as: `${{MySQL.DATABASE_URL}}`

**Why?** This creates a proper link between your MySQL service and your app.

### Step 2: Verify JWT_SECRET is in picknlearn Service

In your **picknlearn** service Variables tab (NOT in MySQL):

1. Verify `JWT_SECRET` exists with a value
2. If missing, add it:
   - Name: `JWT_SECRET`
   - Value: Generate with command below
   - Click "Add"

**Generate JWT_SECRET:**
```bash
# Option 1: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: OpenSSL
openssl rand -hex 32

# Option 3: Online (use with caution)
# Visit: https://generate-secret.vercel.app/32
```

### Step 3: Verify Other Required Variables

Make sure these exist in **picknlearn** service:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | `${{MySQL.DATABASE_URL}}` | Variable Reference |
| `JWT_SECRET` | `<your-32-char-hex>` | Direct value |
| `NODE_ENV` | `production` | Direct value |
| `PORT` | `8080` | Direct value |

### Step 4: Remove Old Manus Variables (if they exist)

Delete these from **picknlearn** service Variables:
- ❌ `OAUTH_SERVER_URL`
- ❌ `OWNER_OPEN_ID`
- ❌ `VITE_OAUTH_PORTAL_URL`
- ❌ `VITE_APP_ID`

### Step 5: Trigger Redeploy

**Option A: From Railway Dashboard**
1. Go to **picknlearn** service
2. Click **"Deployments"** tab
3. Click **"Redeploy"** on latest deployment

**Option B: Push empty commit**
```bash
git commit --allow-empty -m "Trigger Railway redeploy with fixed variables"
git push origin main
```

### Step 6: Monitor Deployment

1. Go to **Deployments** tab
2. Click on the new deployment
3. Watch the **Build Logs**
4. Look for:
   - ✅ `pnpm install` completes
   - ✅ `pnpm run build` completes
   - ✅ `Server running on http://localhost:8080/`

### Step 7: Run Database Migrations

After deployment succeeds, run these commands:

**Option A: Railway CLI** (recommended)
```bash
# Install Railway CLI if not installed
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run pnpm db:push
railway run pnpm tsx server/seed-complete.mjs
railway run pnpm tsx server/seed-achievements.mjs
```

**Option B: From Railway Dashboard**
1. Go to **picknlearn** service
2. Click **"Settings"** tab
3. Scroll to **"Service"** section
4. Click **"Open Shell"**
5. Run commands:
```bash
pnpm db:push
pnpm tsx server/seed-complete.mjs
pnpm tsx server/seed-achievements.mjs
```

### Step 8: Test Your Deployment

Visit: `https://picknlearn-production.up.railway.app/`

Test these flows:
1. ✅ Homepage loads without errors
2. ✅ Click "Sign Up" and create account
3. ✅ Login with your account
4. ✅ Click "Forgot Password?" and test reset
5. ✅ Navigate to Lessons, Quizzes, etc.

## Common Issues & Solutions

### Issue: "Cannot connect to database"

**Solution:** Check DATABASE_URL format in MySQL service:
```
mysql://user:password@host:port/database
```

Make sure picknlearn's DATABASE_URL is: `${{MySQL.DATABASE_URL}}`

### Issue: "JWT_SECRET is required"

**Solution:** 
1. Go to picknlearn Variables
2. Add JWT_SECRET with a 32-character hex string
3. Redeploy

### Issue: Build still fails with "secret not found"

**Solution:**
1. Delete ALL variables in picknlearn service
2. Re-add them one by one:
   - DATABASE_URL → Variable Reference → MySQL.DATABASE_URL
   - JWT_SECRET → Direct value
   - NODE_ENV → production
   - PORT → 8080
3. Redeploy

### Issue: "No tables" error after deployment

**Solution:** Run migrations:
```bash
railway run pnpm db:push
railway run pnpm tsx server/seed-complete.mjs
railway run pnpm tsx server/seed-achievements.mjs
```

### Issue: Old build still showing

**Solution:**
1. Go to Settings → "Danger" section
2. Click "Clear Cache"
3. Redeploy

## Visual Guide

### Correct Variable Setup:

```
picknlearn Service Variables:
├─ DATABASE_URL: ${{MySQL.DATABASE_URL}}  ← Variable Reference
├─ JWT_SECRET: a1b2c3d4e5f6...           ← Direct value
├─ NODE_ENV: production                   ← Direct value
└─ PORT: 8080                             ← Direct value

MySQL Service Variables:
├─ DATABASE_URL: mysql://...              ← Provided by Railway
├─ MYSQL_DATABASE: railway                ← Provided by Railway
└─ (other MySQL vars...)                  ← Provided by Railway
```

## Need Help?

If you're still having issues:

1. **Check the ⚠️ 8 warnings** on your picknlearn service
   - Click on the service
   - Look for warning messages
   - Share them if you need help

2. **Download latest logs**
   - Go to Deployments
   - Click on failed deployment
   - Click "Download Logs"
   - Check for specific error messages

3. **Verify MySQL is running**
   - MySQL service should show "Online" status
   - If not, check MySQL logs

## Success Indicators

You'll know it's working when:
- ✅ Build completes without errors
- ✅ Deployment shows "Active" status
- ✅ Website loads at your Railway URL
- ✅ You can sign up and login
- ✅ No console errors in browser

Good luck! 🚀
