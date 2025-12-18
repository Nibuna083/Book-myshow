const Theatre = require('../models/Theatre');
const { theatreCache, getOrSetCache, clearCache } = require('../utils/cache');

const getTheatres = async (req, res) => {
  try {
    const { cityId } = req.query;

    const filter = { isActive: true };
    if (cityId) {
      filter.city = cityId;
    }

    const cacheKey = cityId ? `theatres_city_${cityId}` : 'all_theatres';

    const theatres = await getOrSetCache(
      theatreCache,
      cacheKey,
      async () => {
        return await Theatre.find(filter).populate('city', 'name state');
      }
    );

    res.status(200).json({
      success: true,
      count: theatres.length,
      data: theatres,
      cached: theatreCache.has(cacheKey)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch theatres',
      error: error.message
    });
  }
};

const getTheatre = async (req, res) => {
  try {
    const cacheKey = `theatre_${req.params.id}`;

    const theatre = await getOrSetCache(
      theatreCache,
      cacheKey,
      async () => {
        return await Theatre.findById(req.params.id).populate('city', 'name state');
      }
    );

    if (!theatre) {
      return res.status(404).json({
        success: false,
        message: 'Theatre not found'
      });
    }

    res.status(200).json({
      success: true,
      data: theatre,
      cached: theatreCache.has(cacheKey)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch theatre',
      error: error.message
    });
  }
};

const createTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Theatre created successfully',
      data: theatre
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create theatre',
      error: error.message
    });
  }
};

module.exports = {
  getTheatres,
  getTheatre,
  createTheatre
};
