const Show = require('../models/Show');
const Theatre = require('../models/Theatre');
const { showCache, getOrSetCache, clearCache } = require('../utils/cache');

const getShows = async (req, res) => {
  try {
    const { movieId, cityId, date } = req.query;

    let filter = { isActive: true };
    
    if (movieId) {
      filter.movie = movieId;
    }
    
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      filter.showDate = { $gte: startDate, $lte: endDate };
    }

    const cacheKey = `shows_${movieId || 'all'}_${cityId || 'all'}_${date || 'all'}`;

    let shows = await getOrSetCache(
      showCache,
      cacheKey,
      async () => {
        return await Show.find(filter)
          .populate('movie', 'title duration rating posterUrl')
          .populate('theatre', 'name address city')
          .sort({ showDate: 1, showTime: 1 });
      }
    );

    if (cityId) {
      shows = shows.filter(show => 
        show.theatre.city.toString() === cityId
      );
    }

    res.status(200).json({
      success: true,
      count: shows.length,
      data: shows,
      cached: showCache.has(cacheKey)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch shows',
      error: error.message
    });
  }
};

const getShow = async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate('movie', 'title duration rating posterUrl')
      .populate('theatre', 'name address city screens');

    if (!show) {
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    res.status(200).json({
      success: true,
      data: show
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch show',
      error: error.message
    });
  }
};

const createShow = async (req, res) => {
  try {
    const { theatre, screenNumber, movie, showDate, showTime, language, format } = req.body;

    const theatreData = await Theatre.findById(theatre);
    
    if (!theatreData) {
      return res.status(404).json({
        success: false,
        message: 'Theatre not found'
      });
    }

    const screen = theatreData.screens.find(s => s.screenNumber === screenNumber);
    
    if (!screen) {
      return res.status(404).json({
        success: false,
        message: 'Screen not found in theatre'
      });
    }

    const seats = [];
    
    for (const category of screen.seatLayout.categories) {
      for (const row of category.rows) {
        for (let col = 1; col <= screen.seatLayout.columns; col++) {
          seats.push({
            seatNumber: `${row}${col}`,
            row: row,
            column: col,
            category: category.name,
            price: category.price,
            status: 'available'
          });
        }
      }
    }

    const show = await Show.create({
      movie,
      theatre,
      screenNumber,
      showDate,
      showTime,
      language,
      format,
      seats
    });

    res.status(201).json({
      success: true,
      message: 'Show created successfully',
      data: show
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create show',
      error: error.message
    });
  }
};

module.exports = {
  getShows,
  getShow,
  createShow
};
