# Fix Railway Deployment Error

## Problem
Railway is showing "Failed to construct 'URL': Invalid URL" error because it's running an old build with Manus OAuth code.

## Solution

### Step 1: Update Environment Variables in Railway

Remove these OLD Manus variables (if they exist):
- `OAUTH_SERVER_URL`
- `OWNER_OPEN_ID`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_APP_ID`

Keep/Add these REQUIRED variables:
```
DATABASE_URL=<your-mysql-connection-string>
JWT_SECRET=<generate-random-32-char-string>
PORT=8080
NODE_ENV=production
```

### Step 2: Trigger New Deployment

Option A: Push a small change to trigger rebuild
```bash
git commit --allow-empty -m "Trigger Railway redeploy"
git push origin main
```

Option B: In Railway Dashboard
1. Go to your project
2. Click "Deployments" tab
3. Click "Redeploy" on the latest deployment

### Step 3: Run Database Migrations

After deployment succeeds, run in Railway CLI or from your local machine:
```bash
railway run pnpm db:push
railway run pnpm tsx server/seed-complete.mjs
railway run pnpm tsx server/seed-achievements.mjs
```

### Step 4: Test

Visit your Railway URL and test:
1. Homepage loads without errors
2. Sign Up works
3. Login works
4. Password reset works

## Generate JWT_SECRET

Use one of these methods:

**Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**OpenSSL:**
```bash
openssl rand -hex 32
```

**Online (use with caution):**
https://generate-secret.vercel.app/32

## Common Issues

**Issue:** "Cannot connect to database"
**Fix:** Check DATABASE_URL format: `mysql://user:password@host:port/database?ssl={"rejectUnauthorized":true}`

**Issue:** "JWT_SECRET is required"
**Fix:** Make sure JWT_SECRET environment variable is set in Railway

**Issue:** Old build still showing
**Fix:** Clear Railway cache: Settings → "Clear Cache" → Redeploy
