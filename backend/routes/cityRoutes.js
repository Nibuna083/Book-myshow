const express = require('express');
const { getCities, createCity } = require('../controllers/cityController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCities);
router.post('/', protect, authorize('admin'), createCity);

module.exports = router;
