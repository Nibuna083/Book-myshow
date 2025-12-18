import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Shows from './pages/Shows';
import SeatSelection from './pages/SeatSelection';
import Payment from './pages/Payment';
import BookingConfirmation from './pages/BookingConfirmation';
import MyBookings from './pages/MyBookings';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/shows" element={<Shows />} />
            <Route 
              path="/shows/:id/seats" 
              element={
                <ProtectedRoute>
                  <SeatSelection />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment/:bookingId" 
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/booking-confirmation/:bookingId" 
              element={
                <ProtectedRoute>
                  <BookingConfirmation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/my-bookings" 
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
