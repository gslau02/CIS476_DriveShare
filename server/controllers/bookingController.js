const Booking = require('../models/Booking');
const User = require('../models/User');
const { Car } = require('../models/Car');

const createBooking = async (req, res) => {
  try {
    const { renterId, carId, startDate, endDate } = req.body;
    const booking = new Booking({ renterId, carId, startDate, endDate, status: 'REQUESTED' });
    await booking.save();
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const checkForClashes = async (req, res) => {
  try {
    const { carId } = req.params;
    const { startDate, endDate } = req.query;

    const clashes = await Booking.find({
      carId,
      $or: [
        { startDate: { $lt: endDate }, endDate: { $gte: startDate } },
        { startDate: { $lte: endDate }, endDate: { $gt: startDate } }
      ]
    });

    res.status(200).json({ clashes });
  } catch (error) {
    console.error('Error checking for clashes:', error);
    res.status(500).json({ error: 'Failed to check for clashes' });
  }
};

const fetchBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const allBookings = await Booking.find({ renterId: userId });

    const now = new Date();
    const activeBookings = await Promise.all(
      allBookings
        .filter(booking => booking.endDate > now)
        .map(async booking => {
          const car = await Car.findById(booking.carId).select('make model year pickUpLocation owner');
          const owner = await User.findById(car.owner).select('email');
          return { ...booking.toObject(), car, owner };
        })
    );

    const pastBookings = await Promise.all(
      allBookings
        .filter(booking => booking.endDate <= now)
        .map(async booking => {
          const car = await Car.findById(booking.carId).select('make model year pickUpLocation owner');
          const owner = await User.findById(car.owner).select('email');
          return { ...booking.toObject(), car, owner };
        })
    );

    res.json({ activeBookings, pastBookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
};

module.exports = {
  createBooking,
  checkForClashes,
  fetchBookingsByUser
}
