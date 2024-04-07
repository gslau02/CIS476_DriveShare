// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   car: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Car',
//     required: true
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   renter: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date,
//     required: true
//   },
//   pricePerDay: {
//     type: Number,
//     required: true
//   },
//   totalPrice: {
//     type: Number,
//     required: true
//   },
//   status: { // Keeping track of the booking's current status
//     type: String,
//     enum: ['active', 'completed', 'cancelled'],
//     required: true,
//     default: 'active'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // You can use a virtual to check if a booking is past or current without an extra field
// bookingSchema.virtual('isActive').get(function() {
//   return new Date() >= this.startDate && new Date() <= this.endDate;
// });

// bookingSchema.set('toJSON', { virtuals: true });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;



// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  renter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED'], default: 'ACTIVE' }, // Status property
  paymentStatus: { type: String, enum: ['PAID', 'UNPAID'], default: 'UNPAID' } // Payment status property
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

