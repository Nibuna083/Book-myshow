const Show = require('../models/Show');
const Booking = require('../models/Booking');

const releaseStaleLocks = async () => {
  try {
    const now = new Date();

    const expiredBookings = await Booking.find({
      bookingStatus: 'pending',
      expiresAt: { $lt: now }
    });

    console.log(`Found ${expiredBookings.length} expired bookings to process`);

    for (const booking of expiredBookings) {
      try {
        const show = await Show.findById(booking.show);

        if (show) {
          const seatNumbers = booking.seats.map(s => s.seatNumber);

          let seatsReleased = 0;
          for (const seatNumber of seatNumbers) {
            const seatIndex = show.seats.findIndex(s => s.seatNumber === seatNumber);
            if (seatIndex !== -1 && show.seats[seatIndex].status === 'locked') {
              show.seats[seatIndex].status = 'available';
              show.seats[seatIndex].lockedBy = undefined;
              show.seats[seatIndex].lockedAt = undefined;
              seatsReleased++;
            }
          }

          await show.save();
          console.log(`Released ${seatsReleased} seats for booking ${booking._id}`);
        }

        booking.bookingStatus = 'expired';
        await booking.save();
      } catch (error) {
        console.error(`Error processing booking ${booking._id}:`, error.message);
      }
    }

    if (expiredBookings.length > 0) {
      console.log(`✅ Processed ${expiredBookings.length} expired bookings`);
    }
  } catch (error) {
    console.error('Error in releaseStaleLocks:', error.message);
  }
};

module.exports = {
  releaseStaleLocks
};
