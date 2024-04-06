const Booking = require('../models/Booking');

// Fetch all the bookings for a specific user
const getBookingsForUser = async (req, res) => {
  try {
    const { userId } = req.params;  // Assuming you pass the userId as a URL parameter
    const allBookings = await Booking.find({ customer: userId });

    const now = new Date();
    const activeBookings = allBookings.filter(booking => booking.endDate > now);
    const pastBookings = allBookings.filter(booking => booking.endDate <= now);

    res.json({ activeBookings, pastBookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
};

module.exports = {
  getBookingsForUser
};