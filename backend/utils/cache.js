const NodeCache = require('node-cache');

// Create cache instances with different TTL (Time To Live)
const cityCache = new NodeCache({ 
  stdTTL: 86400,  // 24 hours (cities rarely change)
  checkperiod: 600 // Check for expired keys every 10 minutes
});

const movieCache = new NodeCache({ 
  stdTTL: 3600,   // 1 hour (movies change occasionally)
  checkperiod: 300 
});

const theatreCache = new NodeCache({ 
  stdTTL: 43200,  // 12 hours (theatres rarely change)
  checkperiod: 600 
});

const showCache = new NodeCache({ 
  stdTTL: 900,    // 15 minutes (shows change frequently)
  checkperiod: 120 
});

/**
 * Get data from cache or fetch from database
 * @param {NodeCache} cache - Cache instance to use
 * @param {string} key - Cache key
 * @param {Function} fetchFunction - Function to fetch data from DB if cache miss
 * @returns {Promise<any>} - Cached or fresh data
 */
const getOrSetCache = async (cache, key, fetchFunction) => {
  try {
    // Check if data exists in cache
    const cachedData = cache.get(key);
    
    if (cachedData !== undefined) {
      console.log(`✅ Cache HIT: ${key}`);
      return cachedData;
    }

    // Cache miss - fetch from database
    console.log(`❌ Cache MISS: ${key} - Fetching from database...`);
    const freshData = await fetchFunction();
    
    // Store in cache
    cache.set(key, freshData);
    console.log(`💾 Cached: ${key}`);
    
    return freshData;
  } catch (error) {
    console.error('Cache error:', error.message);
    // Fallback to database on cache error
    return await fetchFunction();
  }
};

/**
 * Clear specific cache or all caches
 * @param {string} cacheName - Name of cache to clear ('cities', 'movies', 'theatres', 'shows', 'all')
 */
const clearCache = (cacheName) => {
  switch(cacheName) {
    case 'cities':
      cityCache.flushAll();
      console.log('🗑️  City cache cleared');
      break;
    case 'movies':
      movieCache.flushAll();
      console.log('🗑️  Movie cache cleared');
      break;
    case 'theatres':
      theatreCache.flushAll();
      console.log('🗑️  Theatre cache cleared');
      break;
    case 'shows':
      showCache.flushAll();
      console.log('🗑️  Show cache cleared');
      break;
    case 'all':
      cityCache.flushAll();
      movieCache.flushAll();
      theatreCache.flushAll();
      showCache.flushAll();
      console.log('🗑️  All caches cleared');
      break;
    default:
      console.log('❌ Invalid cache name');
  }
};

/**
 * Get cache statistics
 * @returns {Object} - Statistics for all caches
 */
const getCacheStats = () => {
  const calculateHitRate = (hits, misses) => {
    const total = hits + misses;
    return total > 0 ? ((hits / total) * 100).toFixed(2) + '%' : '0%';
  };

  const cityStats = cityCache.getStats();
  const movieStats = movieCache.getStats();
  const theatreStats = theatreCache.getStats();
  const showStats = showCache.getStats();

  return {
    cities: {
      keys: cityCache.keys().length,
      hits: cityStats.hits,
      misses: cityStats.misses,
      hitRate: calculateHitRate(cityStats.hits, cityStats.misses),
      ksize: cityStats.ksize,
      vsize: cityStats.vsize
    },
    movies: {
      keys: movieCache.keys().length,
      hits: movieStats.hits,
      misses: movieStats.misses,
      hitRate: calculateHitRate(movieStats.hits, movieStats.misses),
      ksize: movieStats.ksize,
      vsize: movieStats.vsize
    },
    theatres: {
      keys: theatreCache.keys().length,
      hits: theatreStats.hits,
      misses: theatreStats.misses,
      hitRate: calculateHitRate(theatreStats.hits, theatreStats.misses),
      ksize: theatreStats.ksize,
      vsize: theatreStats.vsize
    },
    shows: {
      keys: showCache.keys().length,
      hits: showStats.hits,
      misses: showStats.misses,
      hitRate: calculateHitRate(showStats.hits, showStats.misses),
      ksize: showStats.ksize,
      vsize: showStats.vsize
    }
  };
};

module.exports = {
  cityCache,
  movieCache,
  theatreCache,
  showCache,
  getOrSetCache,
  clearCache,
  getCacheStats
};
