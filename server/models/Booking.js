const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', // Reference to the Car model
    required: true
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'history'], // Possible statuses for the booking
    default: 'active' // Default status when a booking is created
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = { Booking, bookingSchema };
