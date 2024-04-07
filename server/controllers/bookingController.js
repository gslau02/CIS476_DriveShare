// const Booking = require('../models/Booking');

// // Fetch all the bookings for a specific user
// const getBookingsForUser = async (req, res) => {
//   try {
//     const { userId } = req.params;  // Assuming you pass the userId as a URL parameter
//     const allBookings = await Booking.find({ customer: userId });

//     const now = new Date();
//     const activeBookings = allBookings.filter(booking => booking.endDate > now);
//     const pastBookings = allBookings.filter(booking => booking.endDate <= now);

//     res.json({ activeBookings, pastBookings });
//   } catch (error) {
//     console.error('Error retrieving bookings:', error);
//     res.status(500).json({ message: 'Error retrieving bookings' });
//   }
// };

// module.exports = {
//   getBookingsForUser
// };

// controllers/bookingController.js
const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { renter, carId, startDate, endDate } = req.body;
    const booking = new Booking({ renter, carId, startDate, endDate, status: 'ACTIVE', paymentStatus: 'UNPAID' });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const checkForClashes = async (req, res) => {
  try {
    const { carId } = req.params;
    const { startDate, endDate } = req.query;

    const clashes = await Booking.find({
      carId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gte: startDate } },
        { startDate: { $lte: endDate }, endDate: { $gt: startDate } }
      ]
    });

    res.status(200).json({ clashes });
  } catch (error) {
    console.error('Error checking for clashes:', error);
    res.status(500).json({ error: 'Failed to check for clashes' });
  }
};

module.exports = {
  createBooking,
  checkForClashes
}
