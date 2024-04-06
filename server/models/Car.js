// Car.js
const mongoose = require('mongoose');

class CarBuilder {
  constructor() {
    this.carData = {};
  }

  setMake(make) {
    this.carData.make = make;
    return this;
  }

  setModel(model) {
    this.carData.model = model;
    return this;
  }

  setYear(year) {
    this.carData.year = year;
    return this;
  }

  setMileage(mileage) {
    this.carData.mileage = mileage;
    return this;
  }

  setRentalPricing(rentalPricing) {
    this.carData.rentalPricing = rentalPricing;
    return this;
  }

  setPickUpLocation(pickUpLocation) {
    this.carData.pickUpLocation = pickUpLocation;
    return this;
  }

  setOwner(owner) {
    this.carData.owner = owner;
    return this;
  }

  addAvailability(startDate, endDate) {
    this.carData.availability = { startDate, endDate };
    return this;
  }

  build() {
    return new Car(this.carData);
  }
}

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  mileage: { type: Number, required: true },
  rentalPricing: { type: Number, required: true },
  pickUpLocation: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  availability: { type: { startDate: Date, endDate: Date }, default: {} }
});

const Car = mongoose.model('Car', carSchema);

module.exports = { Car, CarBuilder };
