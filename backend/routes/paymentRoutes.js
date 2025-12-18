const express = require('express');
const { initiatePayment, processPayment, getPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/initiate', initiatePayment);
router.post('/:paymentId/process', processPayment);
router.get('/:paymentId', getPayment);

module.exports = router;
