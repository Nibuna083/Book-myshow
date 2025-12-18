## Quick Start - Deploy to Production

### 1️⃣ MongoDB Atlas Setup (5 mins)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free M0 cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Copy connection string

### 2️⃣ Deploy Backend to Render (10 mins)
```bash
# Push to GitHub first
git add .
git commit -m "Deploy to production"
git push origin main
```

1. Go to https://render.com
2. New → Web Service → Connect GitHub repo
3. Settings:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Add Environment Variables:
   ```
   MONGODB_URI=<your-atlas-uri>
   JWT_SECRET=super-secret-key-12345
   JWT_EXPIRE=7d
   SEAT_LOCK_TIMEOUT=300000
   NODE_ENV=production
   ```
5. Deploy → Copy backend URL

### 3️⃣ Seed Database
```bash
cd backend
set MONGODB_URI=<your-atlas-uri>
node seedDatabase.js
```

### 4️⃣ Deploy Frontend to Vercel (5 mins)
1. Update `frontend/.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```
2. Push to GitHub
3. Go to https://vercel.com
4. Import project → Select repo
5. Settings:
   - Root: `frontend`
   - Framework: Create React App
6. Add env var: `REACT_APP_API_URL=https://your-backend.onrender.com/api`
7. Deploy

### ✅ Done! Your app is live!

**Test with:**
- User: `john@example.com` / `password123`
- Admin: `admin@bookmyshow.com` / `admin123`

**Total Cost:** $0/month

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guide.
