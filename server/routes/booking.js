const express = require('express');
const router = express.Router();
const { createBooking, checkForClashes, fetchBookingsByUser } = require('../controllers/bookingController')

router.post('/createBooking', createBooking);
router.get('/checkForClashes/:carId', checkForClashes);
router.get('/fetchBookingsByUser/:userId', fetchBookingsByUser);

module.exports = router;

