# 📋 Deployment Checklist for BookMyShow Clone

## ✅ Pre-Deployment Checklist

### Code Preparation
- [x] Remove all comments from code
- [x] Environment files created (.env.example)
- [x] .gitignore configured
- [x] Package.json engines specified
- [x] Axios configured for production
- [x] render.yaml created
- [x] vercel.json created (optional)

### Repository
- [ ] Code pushed to GitHub: https://github.com/san9566dy-desig/Bookmyshow_clone.git
- [ ] All files committed
- [ ] .env files NOT committed (check .gitignore)

---

## 🗄️ MongoDB Atlas Setup

- [ ] Account created at https://www.mongodb.com/cloud/atlas
- [ ] Free M0 cluster created
- [ ] Database user created (username: bookmyshow_user)
- [ ] Password saved securely
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied:
      ```
      mongodb+srv://bookmyshow_user:PASSWORD@cluster.mongodb.net/bookmyshow
      ```

---

## 🚀 Backend Deployment (Render.com)

- [ ] Account created at https://render.com
- [ ] GitHub connected
- [ ] New Web Service created
- [ ] Repository selected
- [ ] Configuration:
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Instance Type: Free
- [ ] Environment Variables Added:
  - [ ] NODE_ENV = production
  - [ ] MONGODB_URI = (your MongoDB Atlas connection string)
  - [ ] JWT_SECRET = (random secure string)
  - [ ] JWT_EXPIRE = 7d
  - [ ] SEAT_LOCK_TIMEOUT = 300000
  - [ ] PORT = 10000
- [ ] Deployment successful
- [ ] Backend URL copied: `https://bookmyshow-backend.onrender.com`
- [ ] Backend tested (visit URL/health or base route)

---

## 🌱 Database Seeding

Choose one method:

### Method A: Local Seeding
- [ ] Run locally:
      ```bash
      cd backend
      set MONGODB_URI=your-atlas-connection-string
      node seedDatabase.js
      ```

### Method B: Render Shell
- [ ] Open Render dashboard → Shell tab
- [ ] Run: `node seedDatabase.js`

### Verification
- [ ] Check MongoDB Atlas → Browse Collections
- [ ] Verify data exists:
  - [ ] Cities (5 documents)
  - [ ] Movies (4 documents)
  - [ ] Theatres (10 documents)
  - [ ] Shows (~280 documents)
  - [ ] Users (2 documents)

---

## 🎨 Frontend Deployment (Vercel)

- [ ] Account created at https://vercel.com
- [ ] GitHub connected
- [ ] Project imported
- [ ] Configuration:
  - [ ] Root Directory: `frontend`
  - [ ] Framework: Create React App
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`
- [ ] Environment Variable Added:
  - [ ] REACT_APP_API_URL = `https://bookmyshow-backend.onrender.com/api`
  - [ ] (Replace with your actual backend URL)
- [ ] Deployment successful
- [ ] Frontend URL copied: `https://your-project.vercel.app`

---

## 🧪 Testing Deployed Application

### Backend Testing
- [ ] Visit backend URL: https://bookmyshow-backend.onrender.com
- [ ] Test API endpoint: https://bookmyshow-backend.onrender.com/api/cities
- [ ] Check response is valid JSON

### Frontend Testing
- [ ] Visit frontend URL
- [ ] Homepage loads correctly
- [ ] Movies display
- [ ] Cities dropdown works

### User Flow Testing
- [ ] Register new user works
- [ ] Login works with test credentials:
  - [ ] Email: john@example.com / Password: password123
  - [ ] Email: admin@bookmyshow.com / Password: admin123
- [ ] Select city
- [ ] Browse movies
- [ ] View movie details
- [ ] View shows for a movie
- [ ] Select seats
- [ ] Complete booking
- [ ] Make payment
- [ ] View booking confirmation
- [ ] Check "My Bookings" page

### API Testing
- [ ] GET /api/cities - Returns cities
- [ ] GET /api/movies - Returns movies
- [ ] GET /api/theatres - Returns theatres
- [ ] GET /api/shows - Returns shows
- [ ] POST /api/auth/login - Login works
- [ ] POST /api/auth/register - Registration works

---

## 🔧 Post-Deployment Configuration

### Performance
- [ ] Backend wakes up within 30 seconds (cold start is normal on free tier)
- [ ] Frontend loads quickly
- [ ] API responses are reasonable

### Monitoring
- [ ] Render dashboard checked for logs
- [ ] Vercel analytics reviewed
- [ ] MongoDB Atlas metrics reviewed

### Security
- [ ] .env files not in repository
- [ ] Sensitive credentials secured
- [ ] JWT_SECRET is strong and unique

---

## 📝 Documentation

- [ ] README.md updated with live URLs
- [ ] DEPLOYMENT_GUIDE.md created
- [ ] Environment variables documented
- [ ] Test credentials documented

---

## 🎯 Final Checks

- [ ] All features working
- [ ] No console errors in browser
- [ ] No server errors in Render logs
- [ ] Database connections stable
- [ ] CORS configured correctly
- [ ] Mobile responsive (optional check)

---

## 📱 Share Your Project

Your deployed application URLs:

**Frontend**: https://your-project.vercel.app
**Backend**: https://bookmyshow-backend.onrender.com
**GitHub**: https://github.com/san9566dy-desig/Bookmyshow_clone

**Test Credentials**:
- User: john@example.com / password123
- Admin: admin@bookmyshow.com / admin123

---

## 🐛 Common Issues & Solutions

### Issue: Backend not starting
**Solution**: 
- Check Render logs
- Verify MongoDB connection string
- Ensure all environment variables are set

### Issue: CORS errors
**Solution**:
- Backend CORS already configured
- Check frontend API URL is correct

### Issue: Database connection failed
**Solution**:
- Verify MongoDB Atlas network access (0.0.0.0/0)
- Check connection string format
- Ensure password doesn't contain special characters

### Issue: Frontend shows "Cannot connect to server"
**Solution**:
- Wait 30 seconds (cold start)
- Check REACT_APP_API_URL in Vercel
- Verify backend is deployed and running

### Issue: No data showing
**Solution**:
- Run database seeding script
- Check MongoDB Atlas for data

---

## 🔄 Auto-Deploy

Both services auto-deploy on git push:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

- Render will auto-deploy backend
- Vercel will auto-deploy frontend

---

## ✨ Success!

If all checkboxes are checked, your BookMyShow clone is successfully deployed! 🎉

**Next Steps**:
1. Share your project URL
2. Add custom domain (optional)
3. Monitor usage on free tiers
4. Add more features and redeploy

---

**Deployment Date**: _______________
**Deployed By**: san9566dy-desig
**Status**: 🚀 Live
