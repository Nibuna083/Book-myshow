import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './SeatSelection.css';

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingInProgress, setBookingInProgress] = useState(false);

  useEffect(() => {
    fetchShow();
    const interval = setInterval(fetchShow, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [id]);

  const fetchShow = async () => {
    try {
      const response = await axios.get(`/shows/${id}`);
      setShow(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch show details');
      setLoading(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.status !== 'available') return;

    const isSelected = selectedSeats.find(s => s.seatNumber === seat.seatNumber);
    
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.seatNumber !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleProceedToPayment = async () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    setBookingInProgress(true);
    setError('');

    try {
      const response = await axios.post('/bookings/lock-seats', {
        showId: id,
        seatNumbers: selectedSeats.map(s => s.seatNumber)
      });

      if (response.data.success) {
        const bookingId = response.data.data.booking._id;
        navigate(`/payment/${bookingId}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to lock seats. Please try again.');
      setBookingInProgress(false);
    }
  };

  const getSeatClassName = (seat) => {
    if (selectedSeats.find(s => s.seatNumber === seat.seatNumber)) {
      return 'seat selected';
    }
    return `seat ${seat.status}`;
  };

  const getTotalAmount = () => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  };

  const groupSeatsByRow = () => {
    if (!show) return {};
    
    const grouped = {};
    show.seats.forEach(seat => {
      if (!grouped[seat.row]) {
        grouped[seat.row] = [];
      }
      grouped[seat.row].push(seat);
    });
    
    // Sort seats within each row by column
    Object.keys(grouped).forEach(row => {
      grouped[row].sort((a, b) => a.column - b.column);
    });
    
    return grouped;
  };

  if (loading) return <div className="loading">Loading seats...</div>;
  if (!show) return <div className="error">Show not found</div>;

  const seatsByRow = groupSeatsByRow();
  const rows = Object.keys(seatsByRow).sort();

  return (
    <div className="seat-selection-page">
      <div className="container">
        <div className="show-info">
          <h2>{show.movie.title}</h2>
          <p>
            {show.theatre.name} | {new Date(show.showDate).toLocaleDateString()} | {show.showTime}
          </p>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="screen-container">
          <div className="screen">SCREEN</div>
        </div>

        <div className="seats-container">
          {rows.map(row => (
            <div key={row} className="seat-row">
              <span className="row-label">{row}</span>
              <div className="seats">
                {seatsByRow[row].map(seat => (
                  <div
                    key={seat.seatNumber}
                    className={getSeatClassName(seat)}
                    onClick={() => handleSeatClick(seat)}
                    title={`${seat.seatNumber} - ₹${seat.price} - ${seat.category}`}
                  >
                    {seat.column}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat booked"></div>
            <span>Booked</span>
          </div>
          <div className="legend-item">
            <div className="seat locked"></div>
            <span>Locked</span>
          </div>
        </div>

        <div className="booking-summary">
          <div className="summary-content">
            <div className="selected-seats-info">
              <p>
                <strong>Selected Seats:</strong> {selectedSeats.map(s => s.seatNumber).join(', ') || 'None'}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{getTotalAmount()}
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={handleProceedToPayment}
              disabled={selectedSeats.length === 0 || bookingInProgress}
            >
              {bookingInProgress ? 'Processing...' : `Proceed to Payment (${selectedSeats.length} seats)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
