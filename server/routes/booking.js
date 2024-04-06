const express = require('express');
const router = express.Router();
const { fetchActiveBookings, fetchBookingHistory } = require('../controllers/bookingController');

// Routes for managing bookings
router.get('/active/:userId', fetchActiveBookings); // Get active bookings for a user
router.get('/history/:userId', fetchBookingHistory); // Get booking history for a user

module.exports = router;