const mongoose = require('mongoose');

// Car schema definition
const carSchema = new mongoose.Schema({
  make: { type: String, required: true }, // Car make
  model: { type: String, required: true }, // Car model
  year: { type: Number, required: true }, // Production year
  mileage: { type: Number, required: true }, // Car mileage
  rentalPricing: { type: Number, required: true }, // Car rental price
  pickUpLocation: { type: String, required: true }, // Pickup location
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Car owner (referenced to the User model)
  availability: { type: { startDate: Date, endDate: Date }, default: {} } // Booking availability (start and end dates)
});

// Car model creation using the car schema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;