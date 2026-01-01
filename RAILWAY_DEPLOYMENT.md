# Railway Deployment Guide - Pick N Learn

This guide will help you deploy the Pick N Learn fantasy cricket education platform to Railway with **custom email/password authentication**.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Repository**: Code is at https://github.com/ashwin24121995/picknlearn
3. **MySQL Database**: You'll create this in Railway

## Important: Authentication System

**This platform now uses custom email/password authentication** (not OAuth). Users register directly on your platform with email and password. All authentication is handled securely with bcrypt password hashing and JWT tokens.

## Step 1: Create a New Project in Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose the repository: `ashwin24121995/picknlearn`
5. Railway will automatically detect it as a Node.js project

## Step 2: Add MySQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add MySQL"**
3. Railway will create a MySQL instance and provide connection details
4. Copy the **MySQL Connection URL** (you'll need this for environment variables)

## Step 3: Configure Environment Variables

Go to your web service → **Variables** tab and add these:

### Required Variables (MINIMUM)

```env
# Database (REQUIRED - copy from MySQL service)
DATABASE_URL=mysql://root:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/railway

# Server Configuration (REQUIRED)
PORT=8080
NODE_ENV=production

# JWT Secret (REQUIRED - MUST be a strong random string)
JWT_SECRET=P9kL2mN8qR5tY7wX3vB6nM1aS4dF0gH9jK2lZ5xC8vB3nM6qW9eR2tY5uI8oP1aS
```

### How to Generate a Secure JWT_SECRET

**Option 1:** Run this command locally:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2:** Use an online generator: https://www.uuidgenerator.net/

**⚠️ CRITICAL:** Never use the example JWT_SECRET in production! Generate your own random string.

## Step 4: Deploy

1. Railway will automatically deploy when you push to GitHub
2. Or click **"Deploy"** in the Railway dashboard
3. Wait for the build to complete (usually 2-5 minutes)

## Step 5: Run Database Migrations

After the first deployment, you need to populate the database:

### Option A: Using Railway CLI (Recommended)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Link to your project:
   ```bash
   railway link
   ```

4. Run migrations and seed data:
   ```bash
   railway run pnpm db:push
   railway run pnpm tsx server/seed-complete.mjs
   railway run pnpm tsx server/seed-achievements.mjs
   ```

### Option B: Using Railway Dashboard

1. Go to your service → **Settings** → **Deploy**
2. Under "Custom Start Command", temporarily set:
   ```
   pnpm db:push && pnpm tsx server/seed-complete.mjs && pnpm tsx server/seed-achievements.mjs && pnpm start
   ```
3. Redeploy
4. After successful deployment, remove the custom start command (it will use the default from package.json)

## Step 6: Test Your Deployment

After deployment, test these features:

1. **Homepage**: Visit your Railway URL (e.g., `picknlearn-production.up.railway.app`)
2. **Registration**: Click "Sign Up" and create an account with email/password
3. **Login**: Sign in with your new account
4. **Dashboard**: Access `/dashboard` to see your profile and progress
5. **Lessons**: Browse 8 comprehensive lessons at `/lessons`
6. **Quizzes**: Take interactive quizzes at `/quizzes`
7. **Glossary**: Check 30+ terms at `/glossary`

## Step 7: Configure Custom Domain (Optional)

1. Go to your service → **Settings** → **Domains**
2. Click **"Generate Domain"** for a Railway subdomain (e.g., `picknlearn-production.up.railway.app`)
3. Or add your own custom domain:
   - Click "Custom Domain"
   - Enter your domain name
   - Update your DNS records as instructed
   - Railway provides automatic SSL certificates

## Step 8: Enable Auto-Deploy from GitHub

1. Go to your service → **Settings** → **Source**
2. Ensure **"Auto-deploy"** is enabled
3. Now every push to the `main` branch will automatically deploy

## Troubleshooting

### Build Fails

**Check build logs:**
- Go to Railway dashboard → Your service → Deployments
- Click on the failed deployment
- Review error messages

**Common issues:**
- Missing dependencies in `package.json`
- TypeScript errors (run `pnpm tsc --noEmit` locally)
- Node.js version mismatch

### Database Connection Issues

**Verify DATABASE_URL:**
- Go to MySQL service → Variables tab
- Copy the exact `DATABASE_URL` value
- Paste it into your web service variables
- Ensure no extra spaces or characters

**Check MySQL status:**
- MySQL service should show "Active" status
- If not, restart the MySQL service

**Run migrations again:**
```bash
railway run pnpm db:push
```

### Authentication Not Working

**Verify JWT_SECRET:**
- Ensure `JWT_SECRET` is set in environment variables
- Must be a strong random string (64+ characters recommended)
- Never use the example secret in production

**Check browser console:**
- Open browser DevTools (F12)
- Look for authentication errors
- Verify API requests are returning 200 status

**Clear browser data:**
- Clear localStorage: `localStorage.clear()`
- Clear cookies
- Try registration/login again

### Application Crashes

**Check runtime logs:**
```bash
railway logs
```

Or in Railway dashboard:
- Go to your service → Logs tab
- Look for error messages

**Common issues:**
- Missing `JWT_SECRET` environment variable
- Database connection timeout (check `DATABASE_URL`)
- Port binding issues (ensure `PORT=8080` is set)

### "Invalid URL" Error

This usually means missing environment variables:
- Ensure `PORT=8080` is set
- Verify `NODE_ENV=production` is set
- Check that all required variables are configured

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | MySQL connection string from Railway | `mysql://root:pass@host:3306/railway` |
| `PORT` | ✅ Yes | Server port | `8080` |
| `NODE_ENV` | ✅ Yes | Environment | `production` |
| `JWT_SECRET` | ✅ Yes | Strong random secret for JWT tokens | Generate your own 64+ char string |

## Security Best Practices

1. **JWT Secret:**
   - Generate a strong random string (64+ characters)
   - Never commit secrets to GitHub
   - Rotate periodically for security

2. **Database:**
   - Use Railway's private networking (automatic)
   - Enable SSL connections (automatic)
   - Set up regular backups in Railway

3. **HTTPS:**
   - Railway provides automatic HTTPS
   - All traffic is encrypted
   - SSL certificates auto-renewed

4. **Password Security:**
   - Passwords are hashed with bcrypt (10 rounds)
   - Never stored in plain text
   - Minimum 6 characters enforced

## Monitoring & Maintenance

### View Logs

**Using Railway CLI:**
```bash
railway logs
```

**Using Railway Dashboard:**
- Go to your service → Logs tab
- Filter by severity (info, warning, error)
- Search for specific errors

### Database Backups

**Enable automatic backups:**
1. Go to MySQL service
2. Click "Backups" tab
3. Configure backup frequency
4. Download backups as needed

**Manual backup:**
```bash
railway run mysqldump -u root -p railway > backup.sql
```

### Performance Monitoring

**Railway provides:**
- CPU usage metrics
- Memory usage metrics
- Network traffic
- Response times

**Access metrics:**
- Go to your service → Metrics tab
- View real-time and historical data

## Cost Estimates

### Railway Pricing

- **Hobby Plan**: $5/month
  - 500 hours of usage
  - Suitable for small projects
  
- **Pro Plan**: $20/month
  - Unlimited hours
  - Better performance
  - Priority support

### MySQL Database

- **Storage**: ~$0.25/GB per month
- **Typical usage**: 100-500 MB for this app
- **Estimated cost**: $1-2/month

### Total Monthly Cost

- **Hobby**: ~$6-7/month
- **Pro**: ~$21-22/month

## Updating Your Application

### Push Updates to GitHub

```bash
# Make your changes locally
git add .
git commit -m "Your update description"
git push origin main
```

Railway will automatically:
1. Detect the push
2. Build the new version
3. Deploy with zero downtime
4. Rollback if deployment fails

### Manual Deployment

In Railway dashboard:
1. Go to your service → Deployments
2. Click "Redeploy" on any previous deployment
3. Or trigger a new deployment from GitHub

## Database Migrations

When you update the database schema:

1. **Update `drizzle/schema.ts`** locally
2. **Generate migration:**
   ```bash
   pnpm db:push
   ```
3. **Commit and push** to GitHub
4. **Run migration on Railway:**
   ```bash
   railway run pnpm db:push
   ```

## Support & Resources

- **Railway Documentation**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **Railway Status**: https://status.railway.app
- **GitHub Repository**: https://github.com/ashwin24121995/picknlearn
- **Create Issues**: https://github.com/ashwin24121995/picknlearn/issues

## Next Steps After Deployment

1. **Test thoroughly:**
   - Create test accounts
   - Complete lessons and quizzes
   - Test all features

2. **Add content:**
   - Create more lessons (target: 15-20 total)
   - Add more quizzes
   - Expand glossary

3. **Customize:**
   - Update branding and colors
   - Add your logo
   - Customize content

4. **Monitor:**
   - Set up error tracking
   - Monitor user activity
   - Track performance

5. **Optimize:**
   - Enable caching
   - Optimize images
   - Improve load times

## What's Included

Your deployed platform includes:

- ✅ **8 comprehensive lessons** (3000-5000 words each)
- ✅ **2 interactive quizzes** with 10 questions
- ✅ **30+ glossary terms** with definitions and examples
- ✅ **15 achievement badges** for user progress
- ✅ **User dashboard** with progress tracking
- ✅ **Bookmark system** for lessons and terms
- ✅ **Premium dark theme** with glass-morphism effects
- ✅ **4 CSS visual components** for educational content
- ✅ **Legal pages**: Terms, Privacy, Responsible Learning
- ✅ **18+ age disclaimer** and state restrictions
- ✅ **Fully responsive** mobile and desktop design

---

**Congratulations!** Your Pick N Learn platform is now live on Railway with custom authentication and MySQL database. 🎉

**Important Reminder**: This platform uses **custom email/password authentication**. There are no OAuth dependencies or external authentication services. All user data is stored securely in your MySQL database.
