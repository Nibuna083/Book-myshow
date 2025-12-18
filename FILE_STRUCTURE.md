# 📁 Complete File Structure - BookMyShow Clone

## 🌳 Full Project Tree

```
bookmyshow/
│
├── 📂 backend/
│   │
│   ├── 📂 controllers/
│   │   ├── authController.js          ✅ User authentication logic
│   │   ├── cityController.js          ✅ City management
│   │   ├── movieController.js         ✅ Movie CRUD operations
│   │   ├── theatreController.js       ✅ Theatre management
│   │   ├── showController.js          ✅ Show scheduling & seat generation
│   │   ├── bookingController.js       ✅ Booking with seat locking (CRITICAL)
│   │   └── paymentController.js       ✅ Payment processing
│   │
│   ├── 📂 models/
│   │   ├── User.js                    ✅ User schema with password hashing
│   │   ├── City.js                    ✅ City schema
│   │   ├── Movie.js                   ✅ Movie schema with city references
│   │   ├── Theatre.js                 ✅ Theatre with multiple screens
│   │   ├── Show.js                    ✅ Show with seat inventory
│   │   ├── Booking.js                 ✅ Booking with expiration
│   │   └── Payment.js                 ✅ Payment transactions
│   │
│   ├── 📂 routes/
│   │   ├── authRoutes.js              ✅ Authentication endpoints
│   │   ├── cityRoutes.js              ✅ City endpoints
│   │   ├── movieRoutes.js             ✅ Movie endpoints
│   │   ├── theatreRoutes.js           ✅ Theatre endpoints
│   │   ├── showRoutes.js              ✅ Show endpoints
│   │   ├── bookingRoutes.js           ✅ Booking endpoints (protected)
│   │   └── paymentRoutes.js           ✅ Payment endpoints (protected)
│   │
│   ├── 📂 middleware/
│   │   ├── auth.js                    ✅ JWT authentication middleware
│   │   └── validator.js               ✅ Input validation middleware
│   │
│   ├── 📂 utils/
│   │   └── scheduledJobs.js           ✅ Cron jobs for seat cleanup
│   │
│   ├── server.js                      ✅ Express server entry point
│   ├── seedDatabase.js                ✅ Database seeding script
│   ├── package.json                   ✅ Backend dependencies
│   ├── .env                           ✅ Environment variables
│   └── node_modules/                  📦 Dependencies (after npm install)
│
├── 📂 frontend/
│   │
│   ├── 📂 public/
│   │   └── index.html                 ✅ HTML template
│   │
│   ├── 📂 src/
│   │   │
│   │   ├── 📂 components/
│   │   │   ├── Navbar.js              ✅ Navigation bar
│   │   │   └── Navbar.css             ✅ Navbar styles
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── Home.js                ✅ City selection page
│   │   │   ├── Home.css               ✅ Home styles
│   │   │   ├── Login.js               ✅ Login page
│   │   │   ├── Register.js            ✅ Registration page
│   │   │   ├── Auth.css               ✅ Auth pages styles
│   │   │   ├── Movies.js              ✅ Movie listing page
│   │   │   ├── Movies.css             ✅ Movies styles
│   │   │   ├── MovieDetails.js        ✅ Movie details & show selection
│   │   │   ├── MovieDetails.css       ✅ Movie details styles
│   │   │   ├── Shows.js               ✅ Shows page (placeholder)
│   │   │   ├── SeatSelection.js       ✅ Seat booking page (CRITICAL)
│   │   │   ├── SeatSelection.css      ✅ Seat selection styles
│   │   │   ├── Payment.js             ✅ Payment page with timer
│   │   │   ├── Payment.css            ✅ Payment styles
│   │   │   ├── BookingConfirmation.js ✅ Confirmation page
│   │   │   ├── BookingConfirmation.css✅ Confirmation styles
│   │   │   ├── MyBookings.js          ✅ Booking history
│   │   │   └── MyBookings.css         ✅ Bookings styles
│   │   │
│   │   ├── 📂 context/
│   │   │   └── AuthContext.js         ✅ Global authentication state
│   │   │
│   │   ├── 📂 utils/
│   │   │   └── axios.js               ✅ Axios instance with interceptors
│   │   │
│   │   ├── App.js                     ✅ Main app with routing
│   │   ├── index.js                   ✅ React entry point
│   │   └── index.css                  ✅ Global styles
│   │
│   ├── package.json                   ✅ Frontend dependencies
│   ├── .env                           ✅ Environment variables
│   └── node_modules/                  📦 Dependencies (after npm install)
│
├── 📄 README.md                       ✅ Main project documentation
├── 📄 README_ROOT.md                  ✅ Root README (comprehensive)
├── 📄 QUICKSTART.md                   ✅ Quick setup guide (5 minutes)
├── 📄 ARCHITECTURE.md                 ✅ System design documentation
├── 📄 API_TESTING.md                  ✅ API endpoint documentation
├── 📄 PROJECT_SUMMARY.md              ✅ Complete feature summary
├── 📄 SETUP_CHECKLIST.md              ✅ Step-by-step setup checklist
├── 📄 FILE_STRUCTURE.md               ✅ This file
├── 📄 .gitignore                      ✅ Git ignore rules
└── 📄 package.json                    ✅ Root package.json with scripts

```

---

## 📊 File Statistics

### Backend Files
| Category | Count | Files |
|----------|-------|-------|
| Controllers | 7 | Business logic |
| Models | 7 | MongoDB schemas |
| Routes | 7 | API endpoints |
| Middleware | 2 | Auth & validation |
| Utils | 1 | Scheduled jobs |
| **Total** | **24** | |

### Frontend Files
| Category | Count | Files |
|----------|-------|-------|
| Pages | 9 | Page components |
| Components | 1 | Reusable UI |
| Context | 1 | Global state |
| Utils | 1 | API client |
| Styles | 9 | CSS files |
| **Total** | **21** | |

### Documentation Files
| Document | Purpose |
|----------|---------|
| README.md | Main documentation |
| README_ROOT.md | Comprehensive guide |
| QUICKSTART.md | Fast setup |
| ARCHITECTURE.md | System design |
| API_TESTING.md | API reference |
| PROJECT_SUMMARY.md | Feature list |
| SETUP_CHECKLIST.md | Setup steps |
| FILE_STRUCTURE.md | This file |

### Configuration Files
| File | Purpose |
|------|---------|
| backend/.env | Backend config |
| frontend/.env | Frontend config |
| backend/package.json | Backend deps |
| frontend/package.json | Frontend deps |
| package.json | Root scripts |
| .gitignore | Git exclusions |

---

## 🎯 Key Files Explained

### 🔥 Most Critical Files

#### 1. `backend/controllers/bookingController.js`
**Why:** Contains the core seat locking mechanism
- Implements MongoDB transactions
- Prevents race conditions
- Handles seat expiration
- **Lines:** ~200
- **Complexity:** High

#### 2. `backend/models/Show.js`
**Why:** Manages seat inventory
- Stores seat layout
- Tracks seat status
- Handles seat locks
- **Lines:** ~80
- **Complexity:** Medium

#### 3. `frontend/src/pages/SeatSelection.js`
**Why:** User-facing seat booking
- Visual seat layout
- Real-time updates
- Seat selection logic
- **Lines:** ~150
- **Complexity:** Medium-High

#### 4. `backend/utils/scheduledJobs.js`
**Why:** Automatic cleanup
- Releases stale locks
- Prevents stuck seats
- Runs every minute
- **Lines:** ~50
- **Complexity:** Medium

#### 5. `backend/server.js`
**Why:** Application entry point
- Sets up Express
- Connects database
- Configures middleware
- Starts cron jobs
- **Lines:** ~60
- **Complexity:** Low

---

## 📈 Code Distribution

```
Total Lines of Code: ~5,000+

Backend:  ~2,500 lines (50%)
├── Controllers: ~800 lines
├── Models: ~600 lines
├── Routes: ~400 lines
├── Middleware: ~150 lines
└── Utils: ~100 lines

Frontend: ~2,200 lines (44%)
├── Pages: ~1,500 lines
├── Components: ~200 lines
├── Context: ~100 lines
└── Utils: ~100 lines

Docs:     ~300 lines (6%)
```

---

## 🔍 File Dependencies

### Backend Dependencies Flow
```
server.js
  ├─→ routes/*.js
  │     ├─→ controllers/*.js
  │     │     └─→ models/*.js
  │     └─→ middleware/*.js
  └─→ utils/scheduledJobs.js
        └─→ models/Show.js, Booking.js
```

### Frontend Dependencies Flow
```
index.js
  └─→ App.js
        ├─→ context/AuthContext.js
        ├─→ components/Navbar.js
        ├─→ pages/*.js
        │     └─→ utils/axios.js
        └─→ React Router
```

---

## 🎨 File Naming Conventions

### Backend
- **Controllers:** `*Controller.js` (camelCase + Controller suffix)
- **Models:** `*.js` (PascalCase, singular)
- **Routes:** `*Routes.js` (camelCase + Routes suffix)
- **Middleware:** `*.js` (camelCase)

### Frontend
- **Components:** `*.js` (PascalCase)
- **Pages:** `*.js` (PascalCase)
- **Context:** `*Context.js` (PascalCase + Context suffix)
- **Styles:** `*.css` (PascalCase, matches component)

---

## 📝 File Templates

### Backend Controller Template
```javascript
// controllers/exampleController.js
const Model = require('../models/Model');

const getItems = async (req, res) => {
  try {
    // Logic here
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getItems };
```

### Frontend Page Template
```javascript
// pages/ExamplePage.js
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import './ExamplePage.css';

const ExamplePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/endpoint');
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="example-page">
      {/* Content */}
    </div>
  );
};

export default ExamplePage;
```

---

## 🗂️ File Organization Best Practices

### ✅ What We Did Right
1. **Separation of Concerns**
   - Controllers for business logic
   - Models for data structure
   - Routes for API endpoints

2. **Clear Naming**
   - Self-documenting file names
   - Consistent conventions
   - Purpose-driven structure

3. **Modular Design**
   - Each file has one responsibility
   - Easy to locate and modify
   - Scalable structure

4. **Documentation**
   - Multiple doc files
   - Clear README files
   - Inline comments

---

## 🔄 File Modification Workflow

### Adding a New Feature

1. **Backend:**
```
1. Create model in models/
2. Create controller in controllers/
3. Create route in routes/
4. Register route in server.js
```

2. **Frontend:**
```
1. Create page in pages/
2. Create CSS in pages/
3. Add route in App.js
4. Update Navbar if needed
```

---

## 📊 File Size Reference

| File | Approx. Lines | Complexity |
|------|---------------|------------|
| bookingController.js | ~200 | High |
| SeatSelection.js | ~150 | Medium-High |
| MovieDetails.js | ~130 | Medium |
| Payment.js | ~120 | Medium |
| Show.js (model) | ~80 | Medium |
| server.js | ~60 | Low |
| AuthContext.js | ~50 | Low |

---

## 🎯 Where to Find What

### Authentication
- **Backend:** `controllers/authController.js`
- **Frontend:** `pages/Login.js`, `pages/Register.js`
- **Context:** `context/AuthContext.js`

### Seat Booking
- **Backend:** `controllers/bookingController.js`
- **Frontend:** `pages/SeatSelection.js`
- **Model:** `models/Show.js`, `models/Booking.js`

### Payment
- **Backend:** `controllers/paymentController.js`
- **Frontend:** `pages/Payment.js`
- **Model:** `models/Payment.js`

### Scheduled Jobs
- **Backend:** `utils/scheduledJobs.js`
- **Config:** `server.js` (cron setup)

---

## ✨ Files You Might Want to Customize

### Easy to Customize
- ✅ All CSS files (colors, fonts, spacing)
- ✅ `frontend/src/index.css` (global styles)
- ✅ `frontend/public/index.html` (page title)
- ✅ Environment variables (.env files)

### Medium Difficulty
- ✅ `pages/*.js` (UI components)
- ✅ `components/Navbar.js` (navigation)
- ✅ Seat pricing in `models/Theatre.js`

### Advanced
- ✅ Seat locking logic in `bookingController.js`
- ✅ Payment processing in `paymentController.js`
- ✅ Scheduled job timing in `scheduledJobs.js`

---

**This file structure is production-ready and scalable! 🚀**

**Navigate with confidence! Each file has a clear purpose. 📁**
