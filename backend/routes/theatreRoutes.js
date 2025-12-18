const express = require('express');
const { getTheatres, getTheatre, createTheatre } = require('../controllers/theatreController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getTheatres);
router.get('/:id', getTheatre);
router.post('/', protect, authorize('admin'), createTheatre);

module.exports = router;
