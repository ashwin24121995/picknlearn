# Railway Deployment Guide - Pick N Learn Platform

This guide will walk you through deploying the Pick N Learn fantasy cricket education platform to Railway with MySQL database.

## Prerequisites

- GitHub account
- Railway account (sign up at https://railway.app)
- Git installed locally

## Step 1: Push Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `pick-n-learn-platform` (or your preferred name)
   - Make it Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Push your local code to GitHub:**
   ```bash
   cd /path/to/pick-n-learn-platform
   git remote add origin https://github.com/YOUR_USERNAME/pick-n-learn-platform.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Set Up Railway Project

1. **Log in to Railway:**
   - Go to https://railway.app
   - Sign in with your GitHub account

2. **Create a new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `pick-n-learn-platform` repository
   - Railway will automatically detect it as a Node.js project

## Step 3: Add MySQL Database

1. **Add MySQL service:**
   - In your Railway project dashboard
   - Click "+ New"
   - Select "Database"
   - Choose "MySQL"
   - Railway will provision a MySQL database

2. **Get database connection string:**
   - Click on the MySQL service
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` value
   - It will look like: `mysql://user:password@host:port/database`

## Step 4: Configure Environment Variables

1. **Go to your web service (not the database):**
   - Click on your main application service
   - Go to "Variables" tab
   - Click "+ New Variable"

2. **Add required environment variables:**

   ```env
   # Database
   DATABASE_URL=<paste the MySQL DATABASE_URL from Step 3>
   
   # JWT Secret (generate a random 32-character string)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # OAuth Configuration (Manus OAuth - keep as is for now)
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://auth.manus.im
   VITE_APP_ID=pick-n-learn
   
   # Owner Information (your details)
   OWNER_OPEN_ID=your-open-id
   OWNER_NAME=Your Name
   
   # Built-in Services (optional, for future features)
   BUILT_IN_FORGE_API_URL=https://forge.manus.im
   BUILT_IN_FORGE_API_KEY=your-api-key-if-needed
   VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
   VITE_FRONTEND_FORGE_API_URL=https://forge.manus.im
   
   # Analytics (optional)
   VITE_ANALYTICS_ENDPOINT=your-analytics-endpoint
   VITE_ANALYTICS_WEBSITE_ID=your-website-id
   
   # App Configuration
   VITE_APP_TITLE=Pick N Learn
   VITE_APP_LOGO=/logo.png
   
   # Node Environment
   NODE_ENV=production
   
   # Port Configuration (optional, Railway auto-assigns)
   PORT=8080
   ```

3. **Important notes:**
   - Replace `JWT_SECRET` with a strong random string (use a password generator)
   - Update `OWNER_OPEN_ID` and `OWNER_NAME` with your information
   - The OAuth variables can stay as-is for now (authentication will work)

## Step 5: Configure Build Settings

Railway should auto-detect the build settings, but verify:

1. **Build Command:** `pnpm build`
2. **Start Command:** `pnpm start`
3. **Install Command:** `pnpm install`

If not auto-detected:
- Go to "Settings" tab
- Scroll to "Build & Deploy"
- Set the commands manually

## Step 6: Run Database Migrations

After the first deployment:

1. **Open Railway CLI or use the web terminal:**
   ```bash
   # Install Railway CLI (if not installed)
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Link to your project
   railway link
   
   # Run migrations
   railway run pnpm db:push
   ```

2. **Alternative: Use Railway's web terminal:**
   - In your Railway project
   - Click on your web service
   - Go to "Settings" > "Deploy"
   - Use the terminal to run: `pnpm db:push`

## Step 7: Seed Initial Data

1. **Seed the database with initial content:**
   ```bash
   railway run pnpm tsx server/seed-complete.mjs
   railway run pnpm tsx server/seed-achievements.mjs
   ```

2. **This will populate:**
   - 8+ comprehensive lessons
   - 2 interactive quizzes
   - 30+ glossary terms
   - 15 achievement badges

## Step 8: Configure Custom Domain (Optional)

1. **In Railway project settings:**
   - Go to "Settings" > "Domains"
   - Click "Generate Domain" for a free Railway subdomain
   - Or click "Custom Domain" to add your own domain

2. **For custom domains:**
   - Add your domain in Railway
   - Update your domain's DNS records as instructed
   - Railway provides automatic SSL certificates

## Step 9: Enable Auto-Deployment

Railway automatically enables auto-deployment from GitHub:

1. **Every push to your main branch will:**
   - Trigger a new deployment
   - Run build process
   - Deploy automatically
   - Zero downtime

2. **To deploy changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

## Step 10: Verify Deployment

1. **Check deployment status:**
   - Go to your Railway project
   - Click on "Deployments" tab
   - Wait for "Success" status

2. **Test your application:**
   - Click on the generated URL
   - Verify all pages load correctly
   - Test authentication (Sign In)
   - Check lessons, quizzes, glossary
   - Test dashboard features

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. **Verify DATABASE_URL:**
   - Check that it's correctly copied from MySQL service
   - Ensure no extra spaces or characters

2. **Check MySQL service status:**
   - Go to MySQL service in Railway
   - Verify it's running (green status)

3. **Run migrations again:**
   ```bash
   railway run pnpm db:push
   ```

### Build Failures

If deployment fails during build:

1. **Check build logs:**
   - Go to "Deployments" tab
   - Click on the failed deployment
   - Review error messages

2. **Common issues:**
   - Missing environment variables
   - TypeScript errors (run `pnpm check` locally)
   - Dependency issues (ensure `package.json` is committed)

### Application Crashes

If app crashes after deployment:

1. **Check runtime logs:**
   - Go to your web service
   - Click "Logs" tab
   - Look for error messages

2. **Common issues:**
   - Missing JWT_SECRET
   - Database connection timeout
   - Port binding issues (Railway handles this automatically)

## Environment-Specific Notes

### Development vs Production

The application automatically detects the environment:

- **Development:** `NODE_ENV=development` (local)
- **Production:** `NODE_ENV=production` (Railway)

### Database Differences

- **Local:** TiDB (MySQL-compatible) provided by Manus
- **Railway:** MySQL 8.0+
- **Schema:** Identical, fully compatible

### Authentication

The authentication system uses Manus OAuth, which works in both environments. If you want to implement custom authentication in the future, you'll need to:

1. Replace OAuth logic in `server/_core/oauth.ts`
2. Update authentication context in `server/_core/context.ts`
3. Implement custom login/signup pages

## Monitoring & Maintenance

### View Logs

```bash
# Using Railway CLI
railway logs

# Or use Railway web dashboard
# Go to your service > Logs tab
```

### Database Backups

Railway provides automatic backups for MySQL:

1. Go to MySQL service
2. Click "Backups" tab
3. Configure backup frequency
4. Download backups as needed

### Scaling

Railway automatically scales based on usage:

- **Free tier:** Limited resources
- **Paid plans:** Auto-scaling, more resources
- **Upgrade:** Go to "Settings" > "Plan"

## Cost Estimates

### Railway Pricing

- **Free tier:** $5 credit/month
  - Suitable for development/testing
  - Limited to 500 hours/month

- **Hobby plan:** $5/month
  - Unlimited hours
  - Better performance
  - Priority support

- **Pro plan:** $20/month+
  - Team features
  - Advanced scaling
  - SLA guarantees

### MySQL Database

- **Included in plan limits**
- **Storage:** Charged per GB
- **Typical usage:** 100-500 MB for this app

## Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong JWT_SECRET
   - Rotate secrets regularly

2. **Database:**
   - Use Railway's private networking
   - Enable SSL connections
   - Regular backups

3. **Authentication:**
   - Keep OAuth credentials secure
   - Monitor failed login attempts
   - Implement rate limiting if needed

4. **Updates:**
   - Keep dependencies updated
   - Monitor security advisories
   - Test updates in staging first

## Support & Resources

- **Railway Documentation:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **GitHub Issues:** Create issues in your repository
- **Railway Status:** https://status.railway.app

## Next Steps

After successful deployment:

1. **Add more content:**
   - Create additional lessons
   - Add more quizzes
   - Expand glossary

2. **Customize branding:**
   - Update logo and favicon
   - Customize color scheme
   - Add your own content

3. **Monitor usage:**
   - Set up analytics
   - Track user engagement
   - Gather feedback

4. **Optimize performance:**
   - Enable caching
   - Optimize images
   - Monitor load times

---

**Congratulations!** Your Pick N Learn platform is now live on Railway with MySQL database and auto-deployment from GitHub. 🎉
