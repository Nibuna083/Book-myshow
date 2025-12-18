import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './Payment.css';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  useEffect(() => {
    if (booking) {
      const expiryTime = new Date(booking.expiresAt).getTime();
      
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const remaining = Math.max(0, expiryTime - now);
        setTimeRemaining(remaining);

        if (remaining === 0) {
          clearInterval(timer);
          setError('Booking has expired. Please try again.');
          setTimeout(() => navigate('/movies'), 3000);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [booking]);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`/bookings/${bookingId}`);
      setBooking(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch booking details');
      setLoading(false);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePayment = async () => {
    setProcessing(true);
    setError('');

    try {
      // Step 1: Initiate payment
      const initiateResponse = await axios.post('/payments/initiate', {
        bookingId,
        paymentMethod
      });

      const paymentId = initiateResponse.data.data.payment._id;

      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 2: Process payment (simulated - always succeeds for demo)
      const processResponse = await axios.post(`/payments/${paymentId}/process`, {
        success: true // In real scenario, this comes from payment gateway
      });

      if (processResponse.data.success) {
        // Step 3: Confirm booking
        await axios.post(`/bookings/${bookingId}/confirm`);
        
        navigate(`/booking-confirmation/${bookingId}`);
      } else {
        setError('Payment failed. Please try again.');
        setProcessing(false);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking? Your seats will be released.')) {
      return;
    }

    try {
      setProcessing(true);
      await axios.post(`/bookings/${bookingId}/cancel`);
      alert('Booking cancelled successfully. Seats have been released.');
      navigate('/movies');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to cancel booking');
      setProcessing(false);
    }
  };

  const handleGoBack = () => {
    if (window.confirm('Going back will keep your seats locked for 5 minutes. Do you want to continue?')) {
      navigate(-1);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!booking) return <div className="error">Booking not found</div>;

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-container">
          <div className="timer-section">
            <h3>Complete payment within</h3>
            <div className="timer">{formatTime(timeRemaining)}</div>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="booking-details">
            <h2>Booking Summary</h2>
            <div className="detail-row">
              <span>Movie:</span>
              <strong>{booking.movie.title}</strong>
            </div>
            <div className="detail-row">
              <span>Theatre:</span>
              <strong>{booking.theatre.name}</strong>
            </div>
            <div className="detail-row">
              <span>Date & Time:</span>
              <strong>
                {new Date(booking.showDate).toLocaleDateString()} | {booking.showTime}
              </strong>
            </div>
            <div className="detail-row">
              <span>Seats:</span>
              <strong>{booking.seats.map(s => s.seatNumber).join(', ')}</strong>
            </div>
            <div className="detail-row total">
              <span>Total Amount:</span>
              <strong>₹{booking.totalAmount}</strong>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <div className="payment-options">
              <label className={paymentMethod === 'upi' ? 'selected' : ''}>
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>UPI</span>
              </label>
              <label className={paymentMethod === 'credit_card' ? 'selected' : ''}>
                <input
                  type="radio"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit Card</span>
              </label>
              <label className={paymentMethod === 'debit_card' ? 'selected' : ''}>
                <input
                  type="radio"
                  value="debit_card"
                  checked={paymentMethod === 'debit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Debit Card</span>
              </label>
              <label className={paymentMethod === 'net_banking' ? 'selected' : ''}>
                <input
                  type="radio"
                  value="net_banking"
                  checked={paymentMethod === 'net_banking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Net Banking</span>
              </label>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handlePayment}
            disabled={processing || timeRemaining === 0}
          >
            {processing ? 'Processing Payment...' : `Pay ₹${booking.totalAmount}`}
          </button>

          <div className="action-buttons">
            <button
              className="btn btn-secondary"
              onClick={handleGoBack}
              disabled={processing}
            >
              ← Go Back
            </button>
            <button
              className="btn btn-danger"
              onClick={handleCancelBooking}
              disabled={processing}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
