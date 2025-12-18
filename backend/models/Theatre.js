const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Theatre name is required'],
    trim: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: [true, 'City is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  screens: [{
    screenNumber: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    totalSeats: {
      type: Number,
      required: true
    },
    seatLayout: {
      rows: {
        type: Number,
        required: true
      },
      columns: {
        type: Number,
        required: true
      },
      categories: [{
        name: {
          type: String, // e.g., 'Premium', 'Gold', 'Silver'
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        rows: [{
          type: String // e.g., ['A', 'B', 'C']
        }]
      }]
    }
  }],
  amenities: [{
    type: String,
    enum: ['Parking', 'Food Court', 'Wheelchair Accessible', 'Dolby Atmos', '3D', 'IMAX']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

theatreSchema.index({ city: 1, isActive: 1 });

module.exports = mongoose.model('Theatre', theatreSchema);
