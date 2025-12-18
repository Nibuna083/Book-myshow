# 🎬 BookMyShow Clone - Movie Ticket Booking Platform

A full-stack production-ready movie ticket booking system built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 🌟 Features

### Core Functionality
- ✅ User authentication and authorization (JWT-based)
- ✅ City-based movie browsing
- ✅ Real-time seat selection with visual layout
- ✅ **Seat locking mechanism** to prevent double booking
- ✅ Automatic seat release after timeout
- ✅ Secure payment processing (simulated)
- ✅ Booking confirmation and history
- ✅ Transaction-based atomic operations

### Technical Highlights
- 🔒 **Race condition prevention** with MongoDB transactions
- ⏱️ **Seat lock timeout** (5 minutes) with automatic cleanup
- 🔄 **Real-time seat updates** (polling every 5 seconds)
- 🎯 **RESTful API** architecture
- 📱 **Responsive design** for mobile and desktop
- 🔐 **Secure authentication** with bcrypt and JWT
- 💾 **MongoDB Atlas** cloud database

## 🏗️ System Architecture

```
┌─────────────┐         ┌─────────────┐         ┌──────────────┐
│   React.js  │ ◄─────► │  Express.js │ ◄─────► │   MongoDB    │
│  (Frontend) │   HTTP  │  (Backend)  │  Async  │    Atlas     │
└─────────────┘         └─────────────┘         └──────────────┘
```

### Backend Components
- **Models**: User, City, Movie, Theatre, Show, Booking, Payment
- **Controllers**: Business logic for each entity
- **Middleware**: Authentication, validation
- **Scheduled Jobs**: Seat lock cleanup (cron)

### Frontend Components
- **Context**: AuthContext for global state
- **Pages**: Home, Movies, MovieDetails, SeatSelection, Payment, Confirmation
- **Components**: Navbar, reusable UI elements

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (connection string provided)

## 🚀 Installation & Setup

### 1. Clone or Navigate to Project
```bash
cd "e:\SANJAY PC OFFICIAL FILES\SANJAY pc\SEMESTER 5\system design\bookmyshow"
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file (already created):
```env
PORT=5000
MONGODB_URI=mongodb+srv://bookmyshow:bookmyshow@cluster0.qai11yd.mongodb.net/bookmyshow?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=7d
SEAT_LOCK_TIMEOUT=300000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file (already created):
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SEAT_LOCK_TIMEOUT=300000
```

## 🎯 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
# or
npm start
```
Backend runs on: http://localhost:5000

### Start Frontend
```bash
cd frontend
npm start
```
Frontend runs on: http://localhost:3000

## 📊 Database Schema

### Collections Overview

#### Users
- Authentication details
- Booking history reference
- Role-based access (user/admin)

#### Cities
- Available cities for movie browsing

#### Movies
- Movie details (title, genre, rating, etc.)
- City associations

#### Theatres
- Theatre information
- Multiple screens per theatre
- Seat layout configuration

#### Shows
- Movie + Theatre + DateTime
- Seat inventory with status tracking
- Real-time seat locking

#### Bookings
- User booking records
- Seat details and pricing
- Status tracking (pending, confirmed, cancelled, expired)
- Auto-expiry mechanism

#### Payments
- Payment transaction records
- Multiple payment methods
- Gateway response tracking

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token generated and stored
3. Token sent with each API request in Authorization header
4. Backend middleware validates token
5. Protected routes accessible only with valid token

## 🎫 Booking Flow

1. **Select City** → Browse available movies
2. **Select Movie** → View movie details
3. **Select Theatre & Show** → Choose date and time
4. **Select Seats** → Visual seat selection
5. **Lock Seats** → Temporary lock (5 minutes)
6. **Payment** → Select payment method and pay
7. **Confirmation** → Booking confirmed, seats marked as booked

### Seat Locking Mechanism

```javascript
// Seats have 3 states:
- available: Can be selected
- locked: Temporarily reserved during payment (5 min)
- booked: Permanently booked after payment

// Automatic cleanup:
- Cron job runs every minute
- Releases seats from expired bookings
- Updates booking status to 'expired'
```

## 🛡️ Race Condition Prevention

Uses **MongoDB Transactions** to ensure atomicity:

```javascript
// Lock seats atomically
session.startTransaction()
1. Check seat availability
2. Lock seats
3. Create booking
session.commitTransaction()

// If any step fails → rollback entire transaction
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Cities
- `GET /api/cities` - Get all cities

### Movies
- `GET /api/movies?cityId=xxx` - Get movies by city
- `GET /api/movies/:id` - Get single movie

### Theatres
- `GET /api/theatres?cityId=xxx` - Get theatres by city

### Shows
- `GET /api/shows?movieId=xxx&date=xxx` - Get shows
- `GET /api/shows/:id` - Get single show with seats

### Bookings (Protected)
- `POST /api/bookings/lock-seats` - Lock seats for booking
- `POST /api/bookings/:id/confirm` - Confirm booking after payment
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking

### Payments (Protected)
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/:id/process` - Process payment

## 🎨 Frontend Routes

- `/` - Home (city selection)
- `/movies` - Browse movies
- `/movies/:id` - Movie details and shows
- `/shows/:id/seats` - Seat selection (protected)
- `/payment/:bookingId` - Payment (protected)
- `/booking-confirmation/:bookingId` - Confirmation (protected)
- `/my-bookings` - Booking history (protected)
- `/login` - Login page
- `/register` - Registration page

## 🔧 Key Technologies

### Backend
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **node-cron** - Scheduled tasks
- **cors** - Cross-origin requests

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management

## 📈 Scalability Features

- ✅ Stateless authentication (JWT)
- ✅ Indexed database queries
- ✅ Transaction-based consistency
- ✅ Cloud database (MongoDB Atlas)
- ✅ Modular architecture
- ✅ RESTful API design

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token expiration
- ✅ Protected routes
- ✅ Input validation
- ✅ CORS enabled
- ✅ Environment variables for secrets

## 🧪 Testing the Application

### Test User Flow
1. Register a new account
2. Login with credentials
3. Select a city
4. Browse and select a movie
5. Choose theatre and show time
6. Select seats (try selecting booked/locked seats)
7. Complete payment (simulated)
8. View booking confirmation
9. Check "My Bookings"

### Test Admin Features (Optional)
Create an admin user manually in MongoDB:
```javascript
{ role: "admin" }
```

## 🚧 Future Enhancements

- [ ] Admin dashboard for managing movies/theatres
- [ ] WebSocket for real-time seat updates
- [ ] Email/SMS notifications
- [ ] Booking cancellation with refund
- [ ] Movie reviews and ratings
- [ ] Offers and coupons
- [ ] Multiple payment gateways
- [ ] QR code tickets

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
JWT_EXPIRE=7d
SEAT_LOCK_TIMEOUT=300000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SEAT_LOCK_TIMEOUT=300000
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure port 5000 is not in use
- Verify all dependencies installed

### Frontend won't start
- Check backend is running
- Verify REACT_APP_API_URL is correct
- Clear node_modules and reinstall

### Seats not updating
- Check backend scheduled job is running
- Verify MongoDB transactions are supported
- Check browser console for errors

## 📚 Learning Outcomes

This project demonstrates:
- Full-stack development skills
- Database design and optimization
- Transaction management
- Real-time data handling
- Security best practices
- Production-ready architecture
- Interview-level system design

## 👨‍💻 Author

Built as a comprehensive system design project for academic purposes.

## 📄 License

This project is for educational purposes.

---

**Happy Booking! 🎬🍿**
