# Railway Deployment Guide

This guide will walk you through deploying the Pick N Learn platform to Railway with MySQL database and auto-deployment from GitHub.

## Prerequisites

- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- Your code pushed to a GitHub repository

## Step 1: Push to GitHub

1. **Create a new GitHub repository**
   ```bash
   # On GitHub.com, create a new repository named "pick-n-learn-platform"
   ```

2. **Push your code**
   ```bash
   cd /path/to/pick-n-learn-platform
   git remote add origin https://github.com/YOUR_USERNAME/pick-n-learn-platform.git
   git branch -M main
   git commit -m "Initial commit: Fantasy cricket education platform"
   git push -u origin main
   ```

## Step 2: Set Up Railway Project

1. **Create new Railway project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `pick-n-learn-platform` repository
   - Railway will automatically detect it's a Node.js project

2. **Add MySQL Database**
   - In your Railway project dashboard, click "+ New"
   - Select "Database" → "MySQL"
   - Railway will provision a MySQL database
   - Click on the MySQL service to view connection details

## Step 3: Configure Environment Variables

1. **Get MySQL connection string**
   - Click on your MySQL service in Railway
   - Go to "Variables" tab
   - Copy the `DATABASE_URL` value (it looks like: `mysql://user:pass@host:port/database`)

2. **Add environment variables to your app**
   - Click on your web service (pick-n-learn-platform)
   - Go to "Variables" tab
   - Click "+ New Variable" and add these:

   ```
   DATABASE_URL=<paste-your-mysql-url-here>
   NODE_ENV=production
   JWT_SECRET=<generate-a-random-secret-string>
   ```

   **To generate JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Optional OAuth variables** (if you're using authentication):
   ```
   OAUTH_SERVER_URL=your-oauth-server
   VITE_OAUTH_PORTAL_URL=your-oauth-portal
   VITE_APP_ID=your-app-id
   OWNER_OPEN_ID=your-owner-id
   OWNER_NAME=your-name
   ```

## Step 4: Configure Build and Start Commands

Railway should auto-detect these, but verify:

1. **Build Command**:
   ```bash
   pnpm install && pnpm db:push && pnpm build
   ```

2. **Start Command**:
   ```bash
   pnpm start
   ```

3. **Root Directory**: `/` (leave as default)

## Step 5: Deploy

1. **Trigger deployment**
   - Railway will automatically start deploying
   - Monitor the build logs in the "Deployments" tab
   - First deployment takes 3-5 minutes

2. **Seed the database** (one-time setup)
   
   After first successful deployment:
   - Go to your Railway project
   - Click on your web service
   - Go to "Settings" tab
   - Scroll to "Service" section
   - Click "Run Command"
   - Enter: `pnpm tsx server/seed-complete.mjs`
   - Click "Run"

   This will populate your database with:
   - 6 lesson categories
   - 6 comprehensive lessons
   - 2 quizzes with 10 questions
   - 15 glossary terms

## Step 6: Get Your URL

1. **Generate domain**
   - In your web service, go to "Settings"
   - Scroll to "Networking"
   - Click "Generate Domain"
   - Railway will provide a URL like: `pick-n-learn-platform-production.up.railway.app`

2. **Custom domain** (optional)
   - In "Networking" section, click "+ Custom Domain"
   - Enter your domain name
   - Follow DNS configuration instructions

## Step 7: Enable Auto-Deployment

Railway automatically sets up auto-deployment from GitHub:

- Every push to `main` branch triggers a new deployment
- Pull requests create preview deployments
- Monitor all deployments in Railway dashboard

**To disable auto-deploy:**
- Go to "Settings" → "Service"
- Toggle "Auto Deploy" off

## Troubleshooting

### Build Fails

**Error: Cannot find module**
- Solution: Ensure all dependencies are in `package.json`
- Run `pnpm install` locally to verify

**Error: Database connection failed**
- Solution: Verify `DATABASE_URL` is correctly set
- Check MySQL service is running in Railway

### Database Migration Issues

**Error: Table already exists**
- Solution: This is normal if tables were created previously
- The app will continue to work

**Error: Cannot connect to database**
- Solution: Ensure MySQL service is in the same Railway project
- Verify `DATABASE_URL` format is correct

### Runtime Errors

**Error: Port already in use**
- Solution: Railway automatically assigns ports, no action needed

**Error: Missing environment variables**
- Solution: Double-check all required variables are set in Railway dashboard

## Monitoring

### View Logs
- Click on your web service
- Go to "Deployments" tab
- Click on a deployment to view logs

### Check Database
- Click on MySQL service
- Go to "Data" tab to view tables
- Use "Query" tab to run SQL queries

### Metrics
- Railway provides CPU, Memory, and Network metrics
- View in the "Metrics" tab of your service

## Updating Your App

1. **Make changes locally**
   ```bash
   # Edit your code
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Railway auto-deploys**
   - Watch deployment progress in Railway dashboard
   - Deployment typically takes 2-3 minutes

3. **Rollback if needed**
   - Go to "Deployments" tab
   - Click on a previous successful deployment
   - Click "Redeploy"

## Database Backups

Railway Pro plan includes automatic backups. For manual backups:

1. **Export database**
   - Click on MySQL service
   - Go to "Data" tab
   - Click "Backup" button
   - Download SQL dump

2. **Restore from backup**
   - Upload SQL file to Railway
   - Run restore command in Railway CLI

## Cost Estimation

Railway pricing (as of 2024):
- **Hobby Plan**: $5/month
  - 500 hours of usage
  - $0.000231/GB-hour for RAM
  - $0.000463/vCPU-hour

- **Pro Plan**: $20/month
  - Includes $20 usage credit
  - Better support and features

**Estimated monthly cost for this app:**
- Small traffic: ~$5-10/month (Hobby plan)
- Medium traffic: ~$15-25/month (Pro plan)
- High traffic: ~$30-50/month (Pro plan with scaling)

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files to Git
   - Use Railway's environment variables for secrets
   - Rotate `JWT_SECRET` periodically

2. **Database**
   - Railway MySQL is private by default (good!)
   - Enable SSL for database connections in production
   - Regular backups (Pro plan feature)

3. **Application**
   - Keep dependencies updated
   - Monitor Railway logs for suspicious activity
   - Use Railway's built-in DDoS protection

## Next Steps

- [ ] Set up custom domain
- [ ] Configure SSL certificate (automatic with Railway)
- [ ] Set up monitoring alerts
- [ ] Configure backup strategy
- [ ] Add more content (lessons, quizzes, glossary terms)
- [ ] Implement analytics tracking
- [ ] Add user feedback system

## Support

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Project Issues**: Open an issue on GitHub

---

**Congratulations!** Your Pick N Learn platform is now live on Railway! 🎉
