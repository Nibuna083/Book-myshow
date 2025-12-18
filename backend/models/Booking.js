const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: [true, 'Show is required']
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie is required']
  },
  theatre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Theatre',
    required: [true, 'Theatre is required']
  },
  seats: [{
    seatNumber: {
      type: String,
      required: true
    },
    row: String,
    column: Number,
    category: String,
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'expired'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
  },
  showDate: Date,
  showTime: String
}, {
  timestamps: true
});

bookingSchema.index({ user: 1, bookingStatus: 1 });
bookingSchema.index({ show: 1 });
bookingSchema.index({ expiresAt: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
