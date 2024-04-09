const mongoose = require('mongoose');

// Booking schema definition
const bookingSchema = new mongoose.Schema({
  renterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Renter Id (referenced to the User Model)
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }, // Car Id (referenced to the Car model)
  startDate: { type: Date, required: true }, // Booking start date
  endDate: { type: Date, required: true }, // Booking end date
  status: { type: String, enum: ['REQUESTED', 'ACTIVE', 'COMPLETED'], default: 'REQUESTED' }, // Booking status
  renterReview: { // Renter review
    rating: { type: Number, min: 0, max: 5, default: null }, // Renter rating (0-5)
    feedback: { type: String, default: '' } // Renter feedback
  },
  ownerReview: { // Owner review
    rating: { type: Number, min: 0, max: 5, default: null }, // Owner rating (0-5)
    feedback: { type: String, default: '' } // Owner feedback
  }
});

// Booking model creation using the booking schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

