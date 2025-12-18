# ✅ Setup Checklist - BookMyShow Clone

## 🎯 Complete This Checklist to Get Started

### Step 1: Verify Project Structure ✓
- [ ] Navigate to project folder: `e:\SANJAY PC OFFICIAL FILES\SANJAY pc\SEMESTER 5\system design\bookmyshow`
- [ ] Confirm you see `backend` and `frontend` folders
- [ ] Check that all files are present

### Step 2: Install Backend Dependencies
- [ ] Open PowerShell/Terminal
- [ ] Run: `cd backend`
- [ ] Run: `npm install`
- [ ] Wait for installation to complete
- [ ] Verify `node_modules` folder exists

**Expected output:**
```
added 200+ packages
```

### Step 3: Verify Environment Configuration
- [ ] Check `backend/.env` file exists
- [ ] Verify MongoDB connection string is present
- [ ] Confirm JWT_SECRET is set
- [ ] Check all environment variables

**Required variables in backend/.env:**
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret...
JWT_EXPIRE=7d
SEAT_LOCK_TIMEOUT=300000
NODE_ENV=development
```

### Step 4: Seed the Database ⚡ IMPORTANT
- [ ] In terminal (backend folder): `node seedDatabase.js`
- [ ] Wait for completion message
- [ ] Verify success messages appear

**Expected output:**
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Created 5 cities
✅ Created 4 movies
✅ Created 10 theatres
✅ Created 280+ shows
✅ Created 2 users
🎉 Database seeded successfully!
```

### Step 5: Start Backend Server
- [ ] In terminal (backend folder): `npm run dev`
- [ ] Wait for server to start
- [ ] Verify MongoDB connection message

**Expected output:**
```
✅ MongoDB Atlas Connected Successfully
🚀 Server is running on port 5000
🌍 Environment: development
```

- [ ] Test API: Open http://localhost:5000 in browser
- [ ] You should see: `{"message": "BookMyShow API is running"...}`

### Step 6: Install Frontend Dependencies
- [ ] Open NEW PowerShell/Terminal window
- [ ] Run: `cd frontend`
- [ ] Run: `npm install`
- [ ] Wait for installation to complete

**Expected output:**
```
added 1400+ packages
```

### Step 7: Verify Frontend Environment
- [ ] Check `frontend/.env` file exists
- [ ] Verify API URL points to backend

**Required variables in frontend/.env:**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SEAT_LOCK_TIMEOUT=300000
```

### Step 8: Start Frontend Application
- [ ] In terminal (frontend folder): `npm start`
- [ ] Wait for React to compile
- [ ] Browser should open automatically

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

### Step 9: First Time Setup Test
- [ ] Browser opens at http://localhost:3000
- [ ] You see the BookMyShow homepage
- [ ] Click "Select Your City"
- [ ] Cities are displayed (Mumbai, Delhi, etc.)

### Step 10: Test User Registration
- [ ] Click "Register" button
- [ ] Fill in the form:
  - Name: Your Name
  - Email: test@example.com
  - Phone: 9876543210
  - Password: password123
- [ ] Click "Register"
- [ ] You should be logged in automatically

### Step 11: Test City Selection
- [ ] Select any city (e.g., Mumbai)
- [ ] You're redirected to Movies page
- [ ] Movies are displayed

### Step 12: Test Movie Browsing
- [ ] Click on any movie
- [ ] Movie details page opens
- [ ] Shows are displayed

### Step 13: Test Seat Selection
- [ ] Click on a show time
- [ ] Seat selection page opens
- [ ] Visual seat layout is displayed
- [ ] Seats are color-coded

### Step 14: Test Seat Locking
- [ ] Click on available seats (green)
- [ ] Selected seats turn blue
- [ ] Bottom shows total amount
- [ ] Click "Proceed to Payment"

### Step 15: Test Payment Flow
- [ ] Payment page opens
- [ ] Timer countdown starts
- [ ] Booking details are displayed
- [ ] Select payment method
- [ ] Click "Pay" button

### Step 16: Test Booking Confirmation
- [ ] Confirmation page appears
- [ ] Green checkmark is displayed
- [ ] Booking ID is shown
- [ ] All booking details are visible

### Step 17: Test My Bookings
- [ ] Click "My Bookings" in navbar
- [ ] Your booking is displayed
- [ ] Status shows "CONFIRMED"
- [ ] All details are correct

---

## 🧪 Advanced Testing Checklist

### Test Seat Lock Timeout
- [ ] Start a booking but DON'T complete payment
- [ ] Wait for 5 minutes
- [ ] Seats should be released
- [ ] Booking status should be "EXPIRED"

### Test Race Condition Prevention
- [ ] Open TWO browser windows
- [ ] Login with DIFFERENT users in each
- [ ] Select SAME show
- [ ] Try to book SAME seats simultaneously
- [ ] Only ONE booking should succeed
- [ ] Other should show error

### Test Multiple Bookings
- [ ] Make 2-3 different bookings
- [ ] Check "My Bookings" page
- [ ] All bookings should be listed
- [ ] Each has unique booking ID

### Test Validation
- [ ] Try registering with invalid email
- [ ] Try 9-digit phone number
- [ ] Try short password (< 6 chars)
- [ ] Validation errors should appear

### Test Authentication
- [ ] Logout from application
- [ ] Try to access `/my-bookings` directly
- [ ] You should be redirected to login
- [ ] Login again to access

---

## 🐛 Troubleshooting Checklist

### Backend Won't Start
- [ ] Check if port 5000 is free
- [ ] Verify MongoDB connection string
- [ ] Check `.env` file exists
- [ ] Run `npm install` again

### Frontend Won't Start
- [ ] Check if backend is running first
- [ ] Verify port 3000 is free
- [ ] Check `.env` file exists
- [ ] Run `npm install` again

### No Movies Showing
- [ ] Verify database was seeded
- [ ] Run `node seedDatabase.js` again
- [ ] Refresh the page
- [ ] Check browser console for errors

### Seats Not Updating
- [ ] Check backend terminal for errors
- [ ] Verify cron job is running
- [ ] Refresh the page
- [ ] Check network tab in browser

### Payment Not Working
- [ ] Check booking hasn't expired
- [ ] Verify payment status in console
- [ ] Try again with new booking
- [ ] Check backend logs

---

## 📝 Sample Test Credentials

### Pre-seeded User Account
```
Email: john@example.com
Password: password123
Role: User
```

### Pre-seeded Admin Account
```
Email: admin@bookmyshow.com
Password: admin123
Role: Admin
```

---

## 🎯 Success Criteria

You're all set when:
- ✅ Backend server running on port 5000
- ✅ Frontend running on port 3000
- ✅ Can register new user
- ✅ Can login successfully
- ✅ Can browse movies
- ✅ Can select seats
- ✅ Can complete payment
- ✅ Can view booking confirmation
- ✅ Can see booking history

---

## 📊 Expected Data After Seeding

| Entity | Count |
|--------|-------|
| Cities | 5 |
| Movies | 4 |
| Theatres | 10 |
| Shows | 280+ |
| Users | 2 |

---

## 🚀 Ready to Go!

Once you've completed this checklist:

✅ Your application is fully functional  
✅ Database is populated with sample data  
✅ You can test all features  
✅ You're ready to demo or extend  

---

## 📞 Quick Commands Reference

### Backend
```bash
cd backend
npm install              # Install dependencies
node seedDatabase.js     # Seed database
npm run dev             # Start development server
npm start               # Start production server
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm start               # Start development server
npm run build           # Build for production
```

---

## 🎬 Next Actions After Setup

1. **Explore the application**
   - Try all features
   - Test different scenarios
   - Check mobile responsiveness

2. **Review the code**
   - Understand the architecture
   - Study the seat locking mechanism
   - Learn the authentication flow

3. **Read documentation**
   - README.md for overview
   - ARCHITECTURE.md for design
   - API_TESTING.md for endpoints

4. **Customize**
   - Change colors/styling
   - Add your logo
   - Modify content

5. **Extend**
   - Add new features
   - Improve UI/UX
   - Add more validations

---

**🎉 Happy Booking! Your BookMyShow clone is ready to use! 🎬🍿**

---

## ✨ Completion Certificate

Once all items are checked:

```
╔══════════════════════════════════════════════════╗
║                                                  ║
║     ✅ BOOKMYSHOW CLONE SETUP COMPLETE ✅        ║
║                                                  ║
║  Congratulations! Your application is ready!    ║
║                                                  ║
║  🎬 Production-Ready Movie Booking System 🎬     ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```
