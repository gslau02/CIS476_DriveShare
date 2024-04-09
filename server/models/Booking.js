const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  renterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['REQUESTED', 'ACTIVE', 'COMPLETED'], default: 'REQUESTED' },
  renterReview: {
    rating: { type: Number, min: 0, max: 5, default: null },
    feedback: { type: String, default: '' }
  },
  ownerReview: {
    rating: { type: Number, min: 0, max: 5, default: null },
    feedback: { type: String, default: '' }
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

