const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Assuming an ObjectID is used for owner's reference
    required: true,
    ref: 'User'
  },
  isAvailable: {
    type: Boolean,
    default: true // Assuming a car is available by default when created
  },
  // you might want to add more details, like images, features, number of seats
});

// Compile the model using the schema
const Car = mongoose.model('Car', carSchema);

module.exports = Car;