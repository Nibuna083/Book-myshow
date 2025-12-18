const express = require('express');
const router = express.Router();
const { getCacheStats, clearCache } = require('../utils/cache');

/**
 * @route   GET /api/cache/stats
 * @desc    Get cache statistics for all caches
 * @access  Public (can be protected with auth middleware)
 */
router.get('/stats', (req, res) => {
  try {
    const stats = getCacheStats();
    
    res.status(200).json({
      success: true,
      message: 'Cache statistics retrieved successfully',
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cache statistics',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/cache/clear/:type
 * @desc    Clear specific cache or all caches
 * @params  type - 'cities', 'movies', 'theatres', 'shows', 'all'
 * @access  Public (should be protected with admin auth in production)
 */
router.post('/clear/:type', (req, res) => {
  try {
    const { type } = req.params;
    
    const validTypes = ['cities', 'movies', 'theatres', 'shows', 'all'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid cache type. Must be one of: ${validTypes.join(', ')}`
      });
    }
    
    clearCache(type);
    
    res.status(200).json({
      success: true,
      message: `${type} cache cleared successfully`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear cache',
      error: error.message
    });
  }
});

module.exports = router;
