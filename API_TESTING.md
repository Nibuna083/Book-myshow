# API Testing Guide - BookMyShow Clone

## Base URL
```
http://localhost:5000/api
```

## 1. Authentication APIs

### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

### Login User
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Profile (Protected)
```bash
GET /auth/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

## 2. Cities APIs

### Get All Cities
```bash
GET /cities

Response:
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "name": "Mumbai",
      "state": "Maharashtra"
    }
  ]
}
```

## 3. Movies APIs

### Get All Movies
```bash
GET /movies
```

### Get Movies by City
```bash
GET /movies?cityId=CITY_ID
```

### Get Single Movie
```bash
GET /movies/MOVIE_ID
```

## 4. Theatres APIs

### Get Theatres by City
```bash
GET /theatres?cityId=CITY_ID
```

## 5. Shows APIs

### Get Shows
```bash
GET /shows?movieId=MOVIE_ID&cityId=CITY_ID&date=2024-01-15
```

### Get Single Show
```bash
GET /shows/SHOW_ID

Response includes seat layout and availability
```

## 6. Booking APIs (Protected)

### Lock Seats
```bash
POST /bookings/lock-seats
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "showId": "SHOW_ID",
  "seatNumbers": ["A1", "A2", "A3"]
}

Response:
{
  "success": true,
  "data": {
    "booking": { ... },
    "expiresIn": 300000
  }
}
```

### Get User Bookings
```bash
GET /bookings
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get Single Booking
```bash
GET /bookings/BOOKING_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

### Confirm Booking
```bash
POST /bookings/BOOKING_ID/confirm
Authorization: Bearer YOUR_JWT_TOKEN
```

### Cancel Booking
```bash
POST /bookings/BOOKING_ID/cancel
Authorization: Bearer YOUR_JWT_TOKEN
```

## 7. Payment APIs (Protected)

### Initiate Payment
```bash
POST /payments/initiate
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "bookingId": "BOOKING_ID",
  "paymentMethod": "upi"
}

paymentMethod options: "upi", "credit_card", "debit_card", "net_banking", "wallet"
```

### Process Payment
```bash
POST /payments/PAYMENT_ID/process
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "success": true
}
```

### Get Payment Details
```bash
GET /payments/PAYMENT_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

## Complete Booking Flow Example

### Step 1: Register/Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Step 2: Get Cities
```bash
curl http://localhost:5000/api/cities
```

### Step 3: Get Movies for City
```bash
curl "http://localhost:5000/api/movies?cityId=CITY_ID"
```

### Step 4: Get Shows for Movie
```bash
curl "http://localhost:5000/api/shows?movieId=MOVIE_ID&date=2024-01-15"
```

### Step 5: View Show Seats
```bash
curl http://localhost:5000/api/shows/SHOW_ID
```

### Step 6: Lock Seats
```bash
curl -X POST http://localhost:5000/api/bookings/lock-seats \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "showId": "SHOW_ID",
    "seatNumbers": ["A1", "A2"]
  }'
```

### Step 7: Initiate Payment
```bash
curl -X POST http://localhost:5000/api/payments/initiate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "BOOKING_ID",
    "paymentMethod": "upi"
  }'
```

### Step 8: Process Payment
```bash
curl -X POST http://localhost:5000/api/payments/PAYMENT_ID/process \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "success": true
  }'
```

### Step 9: Confirm Booking
```bash
curl -X POST http://localhost:5000/api/bookings/BOOKING_ID/confirm \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [...]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error",
  "error": "..."
}
```

## Testing with Postman

1. Import the collection (create manually or use these endpoints)
2. Set environment variable `BASE_URL` = `http://localhost:5000/api`
3. Set environment variable `TOKEN` after login
4. Use `{{BASE_URL}}` and `{{TOKEN}}` in requests

## Testing Seat Locking

1. Login with two different users
2. Select same show
3. Try to book same seats simultaneously
4. One should succeed, other should fail
5. Wait 5 minutes, expired booking seats should be released
