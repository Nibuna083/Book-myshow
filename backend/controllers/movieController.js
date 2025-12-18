const Movie = require('../models/Movie');
const { movieCache, getOrSetCache, clearCache } = require('../utils/cache');

const getMovies = async (req, res) => {
  try {
    const { cityId } = req.query;
    
    let filter = { isActive: true };
    
    if (cityId) {
      filter.cities = cityId;
    }

    const cacheKey = cityId ? `movies_city_${cityId}` : 'all_movies';

    const movies = await getOrSetCache(
      movieCache,
      cacheKey,
      async () => {
        return await Movie.find(filter)
          .populate('cities', 'name')
          .sort({ releaseDate: -1 });
      }
    );

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
      cached: movieCache.has(cacheKey)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movies',
      error: error.message
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const cacheKey = `movie_${req.params.id}`;

    const movie = await getOrSetCache(
      movieCache,
      cacheKey,
      async () => {
        return await Movie.findById(req.params.id).populate('cities', 'name');
      }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
      cached: movieCache.has(cacheKey)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch movie',
      error: error.message
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create movie',
      error: error.message
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update movie',
      error: error.message
    });
  }
};

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie
};
