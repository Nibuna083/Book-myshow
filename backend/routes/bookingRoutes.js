const express = require('express');
const { 
  lockSeats, 
  confirmBooking, 
  cancelBooking, 
  getUserBookings, 
  getBooking 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/lock-seats', lockSeats);
router.post('/:bookingId/confirm', confirmBooking);
router.post('/:bookingId/cancel', cancelBooking);
router.get('/', getUserBookings);
router.get('/:bookingId', getBooking);

module.exports = router;
