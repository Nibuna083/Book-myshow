const City = require('../models/City');
const { cityCache, getOrSetCache, clearCache } = require('../utils/cache');

const getCities = async (req, res) => {
  try {
    const cities = await getOrSetCache(
      cityCache,
      'all_active_cities',
      async () => {
        return await City.find({ isActive: true }).sort({ name: 1 });
      }
    );

    res.status(200).json({
      success: true,
      count: cities.length,
      data: cities,
      cached: cityCache.has('all_active_cities')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cities',
      error: error.message
    });
  }
};

const createCity = async (req, res) => {
  try {
    const { name, state } = req.body;

    const city = await City.create({ name, state });

    clearCache('cities');

    res.status(201).json({
      success: true,
      message: 'City created successfully',
      data: city
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create city',
      error: error.message
    });
  }
};

module.exports = {
  getCities,
  createCity
};
