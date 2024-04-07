const Booking = require('../models/Booking');
const User = require('../models/User');
const { Car } = require('../models/Car');

const createBooking = async (req, res) => {
  try {
    const { renterId, carId, startDate, endDate } = req.body;
    const booking = new Booking({ renterId, carId, startDate, endDate, status: 'REQUESTED' });
    await booking.save();
    await updateBookingStatus();
    
    // Extract the ID of the newly created booking
    const bookingId = booking._id;

    // Send the booking ID in the response
    res.status(201).json({ bookingId, message: 'Booking created successfully' });
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

const updateBookingStatus = async () => {
  try {
    const now = new Date();
    await Booking.updateMany(
      { endDate: { $lt: now }, status: { $ne: 'COMPLETED' } },
      { $set: { status: 'COMPLETED' } }
    );
    await Booking.updateMany(
      { startDate: { $lt: now }, endDate: { $gte: now }, status: { $ne: 'ACTIVE' } },
      { $set: { status: 'ACTIVE' } }
    );
  } catch (error) {
    console.error('Error updating booking status:', error);
  }
};

const activateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    await Booking.findByIdAndUpdate(bookingId, { status: 'ACTIVE' });
    res.status(200).json({ message: 'Booking activated successfully' });
  } catch (error) {
    console.error('Error activating booking:', error);
    res.status(500).json({ error: 'Failed to activate booking' });
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

const fetchOrdersByOwner = async (req, res) => {
  try {
    const { userId } = req.params;
    const owner = await User.findById(userId);
    const car = await Car.findOne({ owner: owner._id }).select('make model year pickUpLocation owner');
    const allOrders = await Booking.find({ carId: car._id });
    console.log(allOrders);

    const now = new Date();
    const activeOrders = await Promise.all(
      allOrders
        .filter(order => order.endDate > now)
        .map(async order => {
          const renter = await User.findById(order.renterId).select('email');
          return { ...order.toObject(), car, renter };
        })
    );
    console.log(activeOrders);

    const pastOrders = await Promise.all(
      allOrders
        .filter(order => order.endDate <= now)
        .map(async order => {
          const renter = await User.findById(order.renterId).select('email');
          return { ...order.toObject(), car, renter };
        })
    );

    res.json({ activeOrders, pastOrders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};

module.exports = {
  createBooking,
  checkForClashes,
  activateBooking,
  fetchBookingsByUser,
  fetchOrdersByOwner
}
