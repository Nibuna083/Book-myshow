import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`/bookings/${bookingId}`);
      setBooking(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!booking) return <div className="error">Booking not found</div>;

  return (
    <div className="confirmation-page">
      <div className="container">
        <div className="confirmation-container">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p className="success-message">
            Your tickets have been booked successfully
          </p>

          <div className="booking-details">
            <h2>Booking Details</h2>
            
            <div className="detail-section">
              <div className="detail-row">
                <span>Booking ID:</span>
                <strong>{booking._id}</strong>
              </div>
              <div className="detail-row">
                <span>Movie:</span>
                <strong>{booking.movie.title}</strong>
              </div>
              <div className="detail-row">
                <span>Theatre:</span>
                <strong>{booking.theatre.name}</strong>
              </div>
              <div className="detail-row">
                <span>Address:</span>
                <strong>{booking.theatre.address}</strong>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <strong>{new Date(booking.showDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</strong>
              </div>
              <div className="detail-row">
                <span>Show Time:</span>
                <strong>{booking.showTime}</strong>
              </div>
              <div className="detail-row">
                <span>Seats:</span>
                <strong>{booking.seats.map(s => s.seatNumber).join(', ')}</strong>
              </div>
              <div className="detail-row">
                <span>Number of Tickets:</span>
                <strong>{booking.seats.length}</strong>
              </div>
            </div>

            <div className="payment-info">
              <div className="detail-row total">
                <span>Total Paid:</span>
                <strong>₹{booking.totalAmount}</strong>
              </div>
              <div className="detail-row">
                <span>Payment Status:</span>
                <strong className="success-text">{booking.paymentStatus.toUpperCase()}</strong>
              </div>
              <div className="detail-row">
                <span>Booking Status:</span>
                <strong className="success-text">{booking.bookingStatus.toUpperCase()}</strong>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/my-bookings" className="btn btn-primary">
              View All Bookings
            </Link>
            <Link to="/movies" className="btn btn-secondary">
              Book More Tickets
            </Link>
          </div>

          <div className="note">
            <p>📧 A confirmation email has been sent to your registered email address.</p>
            <p>🎫 Please show this booking ID at the theatre counter.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
