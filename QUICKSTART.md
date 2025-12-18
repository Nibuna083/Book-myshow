# 🚀 Quick Start Guide - BookMyShow Clone

## ⚡ Fast Setup (5 Minutes)

### 1️⃣ Install Dependencies

Open **TWO** terminal windows in the project folder:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

### 2️⃣ Seed Database (Important!)

In Terminal 1 (backend):
```bash
node seedDatabase.js
```

This will create:
- ✅ 5 cities
- ✅ 4 movies
- ✅ 10 theatres
- ✅ 280+ shows (for next 7 days)
- ✅ 2 sample users

### 3️⃣ Start the Application

**Terminal 1 - Start Backend:**
```bash
npm run dev
```
Wait for: `✅ MongoDB Atlas Connected Successfully`

**Terminal 2 - Start Frontend:**
```bash
npm start
```
Browser will open at: http://localhost:3000

---

## 🎯 Test the Application

### Option 1: Use Seeded User
```
Email: john@example.com
Password: password123
```

### Option 2: Create New Account
Click "Register" and create your own account.

---

## 🎬 Complete User Journey

1. **Home Page** → Select a city (e.g., Mumbai)
2. **Movies Page** → Browse available movies
3. **Movie Details** → Click on a movie
4. **Select Show** → Choose date, theatre, and time
5. **Seat Selection** → Pick your seats (visual layout)
6. **Payment** → Complete payment (simulated)
7. **Confirmation** → View booking details
8. **My Bookings** → See all your bookings

---

## 🧪 Test Seat Locking Feature

### Test Case 1: Seat Lock Timeout
1. Login and select seats
2. Go to payment page
3. Wait for 5 minutes WITHOUT paying
4. Booking will expire
5. Seats will be released automatically

### Test Case 2: Race Condition Prevention
1. Open TWO browser windows
2. Login as DIFFERENT users in each
3. Select SAME show
4. Try to book SAME seats simultaneously
5. ✅ Only ONE booking will succeed
6. ❌ Other will get "seats already locked" error

---

## 📊 Admin Features (Optional)

Login as admin:
```
Email: admin@bookmyshow.com
Password: admin123
```

Admin can create:
- New cities
- New movies
- New theatres
- New shows

---

## 🔍 Verify Backend is Working

Open: http://localhost:5000

You should see:
```json
{
  "message": "BookMyShow API is running",
  "version": "1.0.0",
  "status": "active"
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to MongoDB"
**Solution:** Check internet connection. MongoDB Atlas requires internet.

### Issue 2: "Port 5000 already in use"
**Solution:** 
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change PORT in backend/.env
PORT=5001
```

### Issue 3: "Port 3000 already in use"
**Solution:** React will ask if you want to use another port. Press 'Y'.

### Issue 4: "No movies showing"
**Solution:** Run the seed script again:
```bash
cd backend
node seedDatabase.js
```

### Issue 5: "JWT token invalid"
**Solution:** Logout and login again. Token may have expired.

---

## 📱 Mobile Testing

The app is responsive! Test on mobile:

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. Update frontend/.env:
   ```
   REACT_APP_API_URL=http://YOUR_IP:5000/api
   ```

3. Open on phone: `http://YOUR_IP:3000`

---

## 🎓 What You'll Learn

- ✅ Full-stack MERN development
- ✅ JWT authentication
- ✅ MongoDB transactions
- ✅ Race condition handling
- ✅ Seat locking mechanism
- ✅ Payment flow
- ✅ Real-time updates
- ✅ Responsive UI design

---

## 📚 Project Structure

```
bookmyshow/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   ├── utils/           # Helper functions
│   ├── server.js        # Entry point
│   └── seedDatabase.js  # Sample data
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Global state
│   │   ├── utils/       # Axios config
│   │   └── App.js       # Main app
│   └── public/
│
├── README.md            # Full documentation
├── API_TESTING.md       # API guide
└── QUICKSTART.md        # This file
```

---

## 🎯 Next Steps

1. ✅ Test complete booking flow
2. ✅ Test seat locking timeout
3. ✅ Test race condition prevention
4. ✅ Try booking same seats from 2 accounts
5. ✅ Check "My Bookings" page
6. ✅ Verify email format validation
7. ✅ Test mobile responsiveness

---

## 💡 Tips

- **Database Reset:** Run `node seedDatabase.js` anytime
- **Clear State:** Logout and login if something seems stuck
- **Check Console:** Browser console shows helpful errors
- **Backend Logs:** Terminal shows all API requests
- **Scheduled Job:** Seat cleanup runs every minute

---

## 🚀 Production Deployment (Future)

Ready to deploy? You'll need:
- Frontend: Vercel/Netlify
- Backend: Heroku/Railway/Render
- Database: MongoDB Atlas (already setup)
- Environment Variables: Set on hosting platform

---

## 📞 Support

Having issues? Check:
1. All dependencies installed? (`npm install`)
2. Database seeded? (`node seedDatabase.js`)
3. Both servers running?
4. Correct ports (5000 & 3000)?
5. Environment files exist?

---

**Happy Booking! 🎬🍿**

Now go to: http://localhost:3000
