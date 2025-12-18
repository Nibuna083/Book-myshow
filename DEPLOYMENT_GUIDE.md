# 🚀 BookMyShow Clone - Complete Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (free)
- Render.com account (free)
- Vercel account (free)

---

## Step 1: MongoDB Atlas Setup (Database)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Select **M0 FREE** tier
   - Choose cloud provider and region (nearest to you)
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `bookmyshow_user`
   - Password: (Generate secure password - save it!)
   - User Privileges: **Read and write to any database**
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect"
   - Select "Connect your application"
   - Copy the connection string:
     ```
     mongodb+srv://bookmyshow_user:<password>@cluster0.xxxxx.mongodb.net/bookmyshow?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Save this for later!

---

## Step 2: Push Code to GitHub

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit - BookMyShow clone"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/san9566dy-desig/Bookmyshow_clone.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 3: Deploy Backend to Render.com

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Select "Build and deploy from a Git repository"
   - Connect your GitHub account
   - Select repository: `Bookmyshow_clone`
   - Click "Connect"

3. **Configure Service**
   - **Name**: `bookmyshow-backend`
   - **Region**: Choose nearest region
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

4. **Add Environment Variables**
   Click "Advanced" → Add Environment Variables:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | (paste your MongoDB Atlas connection string) |
   | `JWT_SECRET` | `your-super-secret-key-12345-change-this` |
   | `JWT_EXPIRE` | `7d` |
   | `SEAT_LOCK_TIMEOUT` | `300000` |
   | `PORT` | `10000` |

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Once deployed, copy your backend URL:
     ```
     https://bookmyshow-backend.onrender.com
     ```

---

## Step 4: Seed Database

After backend is deployed, you need to add initial data:

**Option A: Run locally with production database**
```bash
cd backend
npm install
set MONGODB_URI=your-mongodb-atlas-connection-string
node seedDatabase.js
```

**Option B: Create one-time job on Render**
1. In Render dashboard, go to your web service
2. Click "Shell" tab
3. Run: `node seedDatabase.js`

---

## Step 5: Deploy Frontend to Vercel

1. **Create Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your repository: `Bookmyshow_clone`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     | Name | Value |
     |------|-------|
     | `REACT_APP_API_URL` | `https://bookmyshow-backend.onrender.com/api` |
   
   (Use your actual Render backend URL)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your frontend will be live at:
     ```
     https://your-project.vercel.app
     ```

---

## Step 6: Update Production Environment Variable

After frontend is deployed:

1. Go to Vercel dashboard → Your project
2. Settings → Environment Variables
3. Update `REACT_APP_API_URL` if needed
4. Redeploy from Deployments tab

---

## Step 7: Test Your Application

1. **Open Frontend URL**: `https://your-project.vercel.app`

2. **Test Login**:
   - Email: `john@example.com`
   - Password: `password123`

3. **Or Admin Login**:
   - Email: `admin@bookmyshow.com`
   - Password: `admin123`

4. **Check Features**:
   - Browse movies
   - Select city
   - View shows
   - Book tickets
   - Make payment

---

## Important Notes

⚠️ **Render Free Tier Limitations**:
- Service sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- 750 hours/month limit (about 31 days if always active)

💡 **MongoDB Atlas Free Tier**:
- 512 MB storage
- Sufficient for this project

🎉 **Vercel Free Tier**:
- Unlimited bandwidth
- Auto-deploy on git push
- Custom domains supported

---

## Troubleshooting

### Backend Issues:

**Problem**: Backend not starting
- Check Render logs for errors
- Verify all environment variables are set
- Check MongoDB connection string is correct

**Problem**: CORS errors
- Backend already configured for CORS
- Verify frontend URL in Vercel matches

### Frontend Issues:

**Problem**: API connection errors
- Check `REACT_APP_API_URL` in Vercel
- Ensure it ends with `/api`
- Redeploy after environment variable changes

**Problem**: Login not working
- Check browser console for errors
- Verify backend is running (visit backend URL)
- Ensure database is seeded

---

## Auto-Deploy Setup

Both Render and Vercel auto-deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Automatically deploys to:
# - Backend: Render
# - Frontend: Vercel
```

---

## Custom Domain (Optional)

### For Frontend (Vercel):
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Configure DNS records as instructed

### For Backend (Render):
1. Render Dashboard → Your Service → Settings → Custom Domain
2. Add your domain
3. Configure DNS records

---

## Monitoring

**Render Dashboard**: Monitor backend uptime, logs, metrics
**Vercel Dashboard**: Monitor frontend deployment, analytics
**MongoDB Atlas**: Monitor database usage, performance

---

## Costs

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 Free | $0/month |
| Render.com | Free | $0/month |
| Vercel | Hobby (Free) | $0/month |
| **Total** | | **$0/month** ✅

---

## Support

If you encounter issues:
1. Check Render logs
2. Check browser console
3. Verify all environment variables
4. Ensure database is seeded

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel
3. ✅ Seed database with sample data
4. ✅ Test all features
5. 🎉 Share your live application!

**Your Live URLs**:
- Frontend: `https://your-project.vercel.app`
- Backend: `https://bookmyshow-backend.onrender.com`
- GitHub: `https://github.com/san9566dy-desig/Bookmyshow_clone`

---

Good luck with your deployment! 🚀
