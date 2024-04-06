const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET endpoint to retrieve current and past bookings for a user
router.get('/mybookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const activeBookings = await Booking.find({ renter: userId, status: 'active' });
    const pastBookings = await Booking.find({ renter: userId, status: { $in: ['completed', 'cancelled'] } });

    res.json({ active: activeBookings, history: pastBookings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error });
  }
});

module.exports = router;