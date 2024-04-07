const express = require('express');
const router = express.Router();
const { fetchActiveBookings, fetchBookingHistory } = require('../controllers/bookingController');

// Routes for managing bookings
router.get('/active', fetchActiveBookings);
router.get('/history', fetchBookingHistory);

module.exports = router;
