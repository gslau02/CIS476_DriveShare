const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Route to handle getting bookings for a user (both active and history)
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Retrieve all bookings where the user is either the renter or the owner.
    // You can further refine the search based on the user's role.
    const bookings = await Booking.find({
      $or: [{ renter: userId }, { owner: userId }]
    }).populate('car'); // Assuming you'd like to also retrieve the car details

    // You can sort the bookings based on their start date.
    bookings.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    // Separate the bookings into 'active' and 'history' based on some criteria, e.g., endDate
    const now = new Date();
    const activeBookings = bookings.filter(booking => booking.endDate > now);
    const pastBookings = bookings.filter(booking => booking.endDate <= now);

    res.json({ active: activeBookings, history: pastBookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

module.exports = router;