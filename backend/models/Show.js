const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
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
  screenNumber: {
    type: Number,
    required: [true, 'Screen number is required']
  },
  showDate: {
    type: Date,
    required: [true, 'Show date is required']
  },
  showTime: {
    type: String, // Format: "HH:MM" (24-hour format)
    required: [true, 'Show time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  seats: [{
    seatNumber: {
      type: String,
      required: true
    },
    row: {
      type: String,
      required: true
    },
    column: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['available', 'locked', 'booked'],
      default: 'available'
    },
    lockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    lockedAt: {
      type: Date
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  language: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ['2D', '3D', 'IMAX', 'Dolby Atmos'],
    default: '2D'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

showSchema.index({ movie: 1, theatre: 1, showDate: 1, showTime: 1 });
showSchema.index({ showDate: 1, isActive: 1 });
showSchema.index({ 'seats.status': 1 });

module.exports = mongoose.model('Show', showSchema);
