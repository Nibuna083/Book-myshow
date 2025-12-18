const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  genre: [{
    type: String,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller', 'Sci-Fi', 'Fantasy', 'Animation', 'Documentary']
  }],
  language: [{
    type: String,
    required: true
  }],
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required']
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  releaseDate: {
    type: Date,
    required: [true, 'Release date is required']
  },
  posterUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x450'
  },
  trailerUrl: {
    type: String
  },
  cast: [{
    type: String
  }],
  director: {
    type: String
  },
  cities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

movieSchema.index({ title: 1, cities: 1 });
movieSchema.index({ releaseDate: -1 });

module.exports = mongoose.model('Movie', movieSchema);
