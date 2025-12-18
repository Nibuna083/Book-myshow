const Booking = require('../models/Booking');
const Show = require('../models/Show');
const User = require('../models/User');
const mongoose = require('mongoose');

const lockSeats = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { showId, seatNumbers } = req.body;
    const userId = req.user._id;

    const show = await Show.findById(showId).session(session);

    if (!show) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Show not found'
      });
    }

    const requestedSeats = show.seats.filter(seat => 
      seatNumbers.includes(seat.seatNumber)
    );

    if (requestedSeats.length !== seatNumbers.length) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Some seats not found'
      });
    }

    const unavailableSeats = requestedSeats.filter(seat => 
      seat.status !== 'available'
    );

    if (unavailableSeats.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Some seats are already booked or locked',
        unavailableSeats: unavailableSeats.map(s => s.seatNumber)
      });
    }

    const lockExpiry = new Date(Date.now() + parseInt(process.env.SEAT_LOCK_TIMEOUT));

    for (const seatNumber of seatNumbers) {
      const seatIndex = show.seats.findIndex(s => s.seatNumber === seatNumber);
      show.seats[seatIndex].status = 'locked';
      show.seats[seatIndex].lockedBy = userId;
      show.seats[seatIndex].lockedAt = new Date();
    }

    await show.save({ session });

    const totalAmount = requestedSeats.reduce((sum, seat) => sum + seat.price, 0);

    const booking = await Booking.create([{
      user: userId,
      show: showId,
      movie: show.movie,
      theatre: show.theatre,
      seats: requestedSeats.map(seat => ({
        seatNumber: seat.seatNumber,
        row: seat.row,
        column: seat.column,
        category: seat.category,
        price: seat.price
      })),
      totalAmount,
      showDate: show.showDate,
      showTime: show.showTime,
      expiresAt: lockExpiry
    }], { session });

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Seats locked successfully',
      data: {
        booking: booking[0],
        expiresIn: process.env.SEAT_LOCK_TIMEOUT
      }
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Failed to lock seats',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

const confirmBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingId } = req.params;
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
        message: 'Booking has expired. Please try again.'
      });
    }

    if (booking.paymentStatus !== 'completed') {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Payment not completed'
      });
    }

    const show = await Show.findById(booking.show).session(session);
    const seatNumbers = booking.seats.map(s => s.seatNumber);

    for (const seatNumber of seatNumbers) {
      const seatIndex = show.seats.findIndex(s => s.seatNumber === seatNumber);
      show.seats[seatIndex].status = 'booked';
      show.seats[seatIndex].bookedBy = userId;
      show.seats[seatIndex].lockedBy = undefined;
      show.seats[seatIndex].lockedAt = undefined;
    }

    await show.save({ session });

    booking.bookingStatus = 'confirmed';
    await booking.save({ session });

    await User.findByIdAndUpdate(
      userId,
      { $push: { bookings: booking._id } },
      { session }
    );

    await session.commitTransaction();

    const confirmedBooking = await Booking.findById(bookingId)
      .populate('movie', 'title duration posterUrl')
      .populate('theatre', 'name address')
      .populate('show', 'showDate showTime');

    res.status(200).json({
      success: true,
      message: 'Booking confirmed successfully',
      data: confirmedBooking
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Failed to confirm booking',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

const cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bookingId } = req.params;
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

    const show = await Show.findById(booking.show).session(session);
    const seatNumbers = booking.seats.map(s => s.seatNumber);

    for (const seatNumber of seatNumbers) {
      const seatIndex = show.seats.findIndex(s => s.seatNumber === seatNumber);
      if (seatIndex !== -1) {
        show.seats[seatIndex].status = 'available';
        show.seats[seatIndex].lockedBy = undefined;
        show.seats[seatIndex].lockedAt = undefined;
        show.seats[seatIndex].bookedBy = undefined;
      }
    }

    await show.save({ session });

    booking.bookingStatus = 'cancelled';
    await booking.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ user: userId })
      .populate('movie', 'title posterUrl duration')
      .populate('theatre', 'name address')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

const getBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;

    const booking = await Booking.findById(bookingId)
      .populate('movie', 'title posterUrl duration rating')
      .populate('theatre', 'name address')
      .populate('show', 'showDate showTime')
      .populate('payment');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to booking'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
};

module.exports = {
  lockSeats,
  confirmBooking,
  cancelBooking,
  getUserBookings,
  getBooking
};
