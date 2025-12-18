import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/bookings');
      setBookings(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch bookings');
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      case 'expired':
        return 'status-expired';
      default:
        return '';
    }
  };

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1>My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>You haven't made any bookings yet.</p>
            <Link to="/movies" className="btn btn-primary">
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.movie.title}</h3>
                  <span className={`status ${getStatusClass(booking.bookingStatus)}`}>
                    {booking.bookingStatus.toUpperCase()}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-item">
                    <span className="label">Theatre:</span>
                    <span>{booking.theatre.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Date & Time:</span>
                    <span>
                      {new Date(booking.showDate).toLocaleDateString()} | {booking.showTime}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Seats:</span>
                    <span>{booking.seats.map(s => s.seatNumber).join(', ')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Total Amount:</span>
                    <span className="amount">₹{booking.totalAmount}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Booking ID:</span>
                    <span className="booking-id">{booking._id}</span>
                  </div>
                </div>

                {booking.bookingStatus === 'confirmed' && (
                  <div className="booking-actions">
                    <Link 
                      to={`/booking-confirmation/${booking._id}`}
                      className="btn btn-secondary"
                    >
                      View Details
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
