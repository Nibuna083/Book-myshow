const express = require('express');
const { getShows, getShow, createShow } = require('../controllers/showController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getShows);
router.get('/:id', getShow);
router.post('/', protect, authorize('admin'), createShow);

module.exports = router;
