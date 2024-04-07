// carController.js
const { Car, CarBuilder } = require('../models/Car');

const listCarForRent = async (req, res) => {
    try {
      const { make, model, year, mileage, rentalPricing, pickUpLocation, owner, startDate, endDate } = req.body;
  
      const car = new CarBuilder()
        .setMake(make)
        .setModel(model)
        .setYear(year)
        .setMileage(mileage)
        .setRentalPricing(rentalPricing)
        .setPickUpLocation(pickUpLocation)
        .setOwner(owner)
        .addAvailability(startDate, endDate)
        .build();
  
      await car.save();
  
      return res.status(201).json({
        message: "Car listed for rent successfully!",
        car
      });
    } catch (error) {
      console.error('Error listing the car for rent: ', error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

const listUserCarListings = async (req, res) => {
    try {
        const userId = req.params.userId; // Get the user ID from the request parameters
        const userCarListings = await Car.find({ owner: userId });

        return res.status(200).json(userCarListings);
    } catch (error) {
        console.error('Error fetching user car listings:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateCarListing = async (req, res) => {
    try {
      const { carId } = req.params;
      const updatedCarData = req.body; // Update with the new car details
  
      const updatedCar = await Car.findByIdAndUpdate(carId, updatedCarData, { new: true });
  
      return res.status(200).json(updatedCar);
    } catch (error) {
      console.error('Error updating car listing:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCarListing = async (req, res) => {
    try {
      const { carId } = req.params;
      const deletedCar = await Car.findByIdAndDelete(carId);
      if (!deletedCar) {
        return res.status(404).json({ message: "Car not found" });
      }
      return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
      console.error('Error deleting car:', error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

const fetchAllCars = async (req, res) => {
  try {
    const { location, fromDate, toDate } = req.query;
    const currentDate = new Date();
    let query = { 'availability.endDate': { $gte: currentDate } };

    if (location) {
      query.pickUpLocation = location;
    }

    if (fromDate && toDate) {
      query['availability.startDate'] = { $lte: new Date(fromDate) };
      query.$or[0]['availability.endDate'] = { $gte: new Date(toDate) };
    }

    const cars = await Car.find(query);
    return res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching all cars: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const fetchSingleCar = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching single car: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
    listCarForRent,
    fetchAllCars,
    fetchSingleCar,
    listUserCarListings,
    updateCarListing,
    deleteCarListing
};
