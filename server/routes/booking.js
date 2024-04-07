const express = require('express');
const router = express.Router();
const { createBooking, checkForClashes, activateBooking, fetchBookingsByUser } = require('../controllers/bookingController')

router.post('/createBooking', createBooking);
router.get('/checkForClashes/:carId', checkForClashes);
router.put('/activateBooking/:bookingId', activateBooking);
router.get('/fetchBookingsByUser/:userId', fetchBookingsByUser);

module.exports = router;

