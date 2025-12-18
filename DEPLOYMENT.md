# BookMyShow Deployment Guide

## Free Deployment Setup

This guide will help you deploy the BookMyShow application completely free using:
- **MongoDB Atlas** (Database) - Free tier
- **Render.com** (Backend) - Free tier
- **Vercel** (Frontend) - Free tier

---

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Render.com account
- Vercel account

---

## Step 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster:
   - Choose **M0 Free** tier
   - Select a region close to you
   - Click "Create Cluster"
4. Create Database User:
   - Go to **Database Access** → **Add New Database User**
   - Create username and password (save these!)
   - Give "Read and Write to any database" permission
5. Whitelist IP Addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
6. Get Connection String:
   - Go to **Database** → **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bookmyshow?retryWrites=true&w=majority`

---

## Step 2: Deploy Backend to Render.com

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. Go to [Render.com](https://render.com) and sign up

3. Create New Web Service:
   - Click **New +** → **Web Service**
   - Connect your GitHub account
   - Select your repository: `san9566dy-desig/Bookmyshow_clone`
   - Configure:
     - **Name**: `bookmyshow-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Instance Type**: `Free`

4. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=your-super-secret-jwt-key-change-this-12345
   JWT_EXPIRE=7d
   SEAT_LOCK_TIMEOUT=300000
   PORT=10000
   ```

5. Click **Create Web Service**

6. Wait for deployment (5-10 minutes)

7. Copy your backend URL (e.g., `https://bookmyshow-backend.onrender.com`)

---

## Step 3: Seed Database

After backend is deployed, you need to add sample data:

**Option 1: Run locally with production database**
```bash
cd backend
set MONGODB_URI=<your-mongodb-atlas-connection-string>
node seedDatabase.js
```

**Option 2: Create one-time job on Render**
1. In Render dashboard, go to your service
2. Click "Shell" tab
3. Run: `node seedDatabase.js`

---

## Step 4: Deploy Frontend to Vercel

1. Update frontend environment file:
   - Edit `frontend/.env.production`
   - Replace URL with your Render backend URL:
     ```
     REACT_APP_API_URL=https://bookmyshow-backend.onrender.com/api
     ```

2. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update production API URL"
   git push origin main
   ```

3. Go to [Vercel](https://vercel.com) and sign up with GitHub

4. Import Project:
   - Click **Add New** → **Project**
   - Import `san9566dy-desig/Bookmyshow_clone`
   - Configure:
     - **Framework Preset**: `Create React App`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `build`

5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://bookmyshow-backend.onrender.com/api
   ```

6. Click **Deploy**

7. Wait for deployment (3-5 minutes)

8. Your app will be live at `https://your-project.vercel.app`

---

## Step 5: Update Backend CORS

Update your backend `server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-project.vercel.app',
    'https://*.vercel.app'
  ],
  credentials: true
}));
```

Then push and redeploy.

---

## Alternative: Deploy Frontend to Netlify

1. Go to [Netlify](https://netlify.com)
2. **Add new site** → **Import an existing project**
3. Connect GitHub and select your repo
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Add environment variable:
   ```
   REACT_APP_API_URL=https://bookmyshow-backend.onrender.com/api
   ```
6. Deploy

---

## Testing Your Deployment

1. Visit your Vercel URL
2. Try to register a new user
3. Login with credentials
4. Browse movies
5. Try booking flow

**Sample Login (after seeding):**
- User: `john@example.com` / `password123`
- Admin: `admin@bookmyshow.com` / `admin123`

---

## Important Notes

### Free Tier Limitations:
- **Render**: Service sleeps after 15 minutes of inactivity (first request takes ~30s)
- **MongoDB Atlas**: 512MB storage limit
- **Vercel**: Unlimited deployments

### Troubleshooting:

**Backend not responding:**
- Check Render logs
- Verify environment variables are set
- First request after sleep takes 20-30 seconds

**Frontend can't connect:**
- Check CORS settings in backend
- Verify API URL in frontend environment variables
- Check browser console for errors

**Database connection failed:**
- Verify MongoDB connection string
- Check if IP whitelist includes 0.0.0.0/0
- Confirm database user credentials

---

## Automatic Deployments

Both Render and Vercel support automatic deployments:
- Push to `main` branch → Auto deploy backend (Render)
- Push to `main` branch → Auto deploy frontend (Vercel)

---

## Custom Domain (Optional - Free)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

**Render:**
1. Upgrade to paid plan for custom domains

---

## Cost Summary

| Service | Plan | Cost |
|---------|------|------|
| MongoDB Atlas | M0 Free | $0/month |
| Render.com | Free | $0/month |
| Vercel | Hobby | $0/month |
| **Total** | | **$0/month** |

---

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Monitor Render logs
3. ✅ Set up error tracking (optional: Sentry free tier)
4. ✅ Add analytics (optional: Google Analytics)
5. ✅ Share your live URL!

---

## Your Deployment URLs

After deployment, update these:

- **Frontend**: https://_____.vercel.app
- **Backend**: https://bookmyshow-backend.onrender.com
- **GitHub**: https://github.com/san9566dy-desig/Bookmyshow_clone

---

## Support

If you encounter issues:
1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas is accessible
