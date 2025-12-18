const express = require('express');
const { getMovies, getMovie, createMovie, updateMovie } = require('../controllers/movieController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', protect, authorize('admin'), createMovie);
router.put('/:id', protect, authorize('admin'), updateMovie);

module.exports = router;
