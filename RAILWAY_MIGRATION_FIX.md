# Fix Railway Database Migration Issue

## Problem
The seed endpoint is failing because the database schema hasn't been properly migrated on Railway. The tables might not exist or have outdated schema.

## Solution: Run Migrations on Railway

### Option 1: Add Migration to package.json (Recommended)

1. **Update package.json** - Add a migrate script:
```json
"scripts": {
  "migrate": "node run-migrations-railway.mjs",
  "start": "node run-migrations-railway.mjs && NODE_ENV=production node dist/index.js"
}
```

This will automatically run migrations every time Railway starts the server.

### Option 2: Run Manual Migration via Railway CLI

1. **Install Railway CLI** (if not already installed):
```bash
npm install -g @railway/cli
```

2. **Login to Railway**:
```bash
railway login
```

3. **Link to your project**:
```bash
railway link
```

4. **Run migrations**:
```bash
railway run node run-migrations-railway.mjs
```

### Option 3: Use Railway Dashboard

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Settings" tab
4. Add a "Deploy Command" or "Build Command":
   ```
   npm run build && node run-migrations-railway.mjs
   ```

## After Migration

Once migrations are complete, visit:
https://picknlearn-production-f5a5.up.railway.app/seed-database

And click "Seed Database Now" button to populate all content.

## Verify Success

After seeding, check:
- https://picknlearn-production-f5a5.up.railway.app/lessons (should show 6 lessons)
- https://picknlearn-production-f5a5.up.railway.app/quizzes (should show 3 quizzes)
