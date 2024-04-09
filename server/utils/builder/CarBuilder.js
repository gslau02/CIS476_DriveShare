const Car = require('../../models/Car');

class CarBuilderBase {
  constructor() {
    if (this.constructor === CarBuilderBase) {
      throw new Error('Cannot instantiate abstract class');
    }
  }

  setMake(make) {
    throw new Error('Method setMake must be implemented');
  }

  setModel(model) {
    throw new Error('Method setModel must be implemented');
  }

  setYear(year) {
    throw new Error('Method setYear must be implemented');
  }

  setMileage(mileage) {
    throw new Error('Method setMileage must be implemented');
  }

  setRentalPricing(rentalPricing) {
    throw new Error('Method setRentalPricing must be implemented');
  }

  setPickUpLocation(pickUpLocation) {
    throw new Error('Method setPickUpLocation must be implemented');
  }

  setOwner(owner) {
    throw new Error('Method setOwner must be implemented');
  }

  addAvailability(startDate, endDate) {
    throw new Error('Method addAvailability must be implemented');
  }

  build() {
    throw new Error('Method build must be implemented');
  }
}

class CarBuilder extends CarBuilderBase {
  constructor() {
    super();
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

module.exports = CarBuilder;