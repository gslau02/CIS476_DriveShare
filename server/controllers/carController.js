const Car = require('../models/Car'); // Replace with your actual car rental model

// This controller will handle the logic for listing a new car for rent
const listCarForRent = async (req, res) => {
  try {
    const { make, model, year, pricePerDay, location, owner } = req.body;

    // Create a new Car instance representing a rentable car
    const car = new Car({
      make,
      model,
      year,
      pricePerDay,
      location,
      owner
    });

    // Save the car to the database
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

const fetchAllCars = async (req, res) => {
  try {
    const currentDate = new Date();
    const cars = await Car.find({
      'availability.startDate': { $lte: currentDate },
      $or: [
        { 'availability.endDate': { $gte: currentDate } },
        { 'availability.endDate': { $exists: false } }
      ]
    });
    return res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching all cars: ', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    listCarForRent,
    fetchAllCars
};
