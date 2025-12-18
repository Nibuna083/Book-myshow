const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

const initiatePayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingId, paymentMethod } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId).session(session);

    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.user.toString() !== userId.toString()) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to booking'
      });
    }

    if (new Date() > booking.expiresAt) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Booking has expired'
      });
    }

    if (booking.bookingStatus !== 'pending') {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Booking is not in pending state'
      });
    }

    const payment = await Payment.create([{
      booking: bookingId,
      user: userId,
      amount: booking.totalAmount,
      paymentMethod,
      paymentStatus: 'initiated',
      transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    }], { session });

    booking.payment = payment[0]._id;
    await booking.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        payment: payment[0],
        booking: {
          id: booking._id,
          totalAmount: booking.totalAmount,
          expiresAt: booking.expiresAt
        }
      }
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

const processPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { paymentId } = req.params;
    const { success } = req.body;
    const userId = req.user._id;

    const payment = await Payment.findById(paymentId).session(session);

    if (!payment) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.user.toString() !== userId.toString()) {
      await session.abortTransaction();
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to payment'
      });
    }

    const booking = await Booking.findById(payment.booking).session(session);

    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Associated booking not found'
      });
    }

    if (new Date() > booking.expiresAt) {
      payment.paymentStatus = 'failed';
      booking.bookingStatus = 'expired';
      booking.paymentStatus = 'failed';
      
      await payment.save({ session });
      await booking.save({ session });
      await session.commitTransaction();

      return res.status(400).json({
        success: false,
        message: 'Booking has expired during payment'
      });
    }

    if (success) {
      payment.paymentStatus = 'completed';
      payment.paidAt = new Date();
      payment.paymentGatewayResponse = {
        status: 'success',
        message: 'Payment completed successfully',
        timestamp: new Date()
      };

      booking.paymentStatus = 'completed';
    } else {
      payment.paymentStatus = 'failed';
      payment.paymentGatewayResponse = {
        status: 'failed',
        message: 'Payment failed',
        timestamp: new Date()
      };

      booking.paymentStatus = 'failed';
    }

    await payment.save({ session });
    await booking.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      success: success,
      message: success ? 'Payment completed successfully' : 'Payment failed',
      data: {
        payment,
        booking: {
          id: booking._id,
          paymentStatus: booking.paymentStatus,
          bookingStatus: booking.bookingStatus
        }
      }
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Failed to process payment',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

const getPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const userId = req.user._id;

    const payment = await Payment.findById(paymentId)
      .populate('booking')
      .populate('user', 'name email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    if (payment.user._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to payment'
      });
    }

    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment',
      error: error.message
    });
  }
};

module.exports = {
  initiatePayment,
  processPayment,
  getPayment
};
