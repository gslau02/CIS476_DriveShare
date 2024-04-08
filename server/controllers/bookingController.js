const cron = require('node-cron');

const Booking = require('../models/Booking');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { Car } = require('../models/Car');
const NotificationObserver = require('../observer/NotificationObserver');
// Create an instance of NotificationObserver
const Subject = require('../observer/Subject');
const BookingSubject = new Subject();
const notificationObserver = new NotificationObserver(BookingSubject);

const createBooking = async (req, res) => {
  try {
    const { renterId, carId, startDate, endDate, ownerId } = req.body;
    const booking = new Booking({ renterId, carId, startDate, endDate, status: 'REQUESTED' });
    await booking.save();
    await updateBookingStatus();
    
    // Extract the ID of the newly created booking
    const bookingId = booking._id;

    // Fetch car details
    const car = await Car.findById(carId);
    const carName = car ? `${car.make} ${car.model}` : 'Unknown Car'; // Get the car name

    // Concatenate car name with the message
    const renterMessage = `Your booking for ${carName} was successful`;
    const ownerMessage = `Your car (${carName}) has been booked`;

    BookingSubject.notifyObservers(renterId, renterMessage);
    BookingSubject.notifyObservers(ownerId, ownerMessage);
    // // Notify observers with modified message
    // notificationObserver.update(renterId, renterMessage);
    // notificationObserver.update(ownerId, ownerMessage);

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

// Schedule the updateBookingStatus function to run every minute
cron.schedule('* * * * *', updateBookingStatus);

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
          const owner = await User.findById(car.owner).select('name');
          return { ...booking.toObject(), car, owner };
        })
    );

    const pastBookings = await Promise.all(
      allBookings
        .filter(booking => booking.endDate <= now)
        .map(async booking => {
          const car = await Car.findById(booking.carId).select('make model year pickUpLocation owner');
          const owner = await User.findById(car.owner).select('name _id');
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
    const cars = await Car.find({ owner: owner._id }).select('make model year pickUpLocation owner');
    const carIds = cars.map(car => car._id); // Extract unique carIds

    const allOrders = await Booking.find({ carId: { $in: carIds } });
    
    const now = new Date();
    const activeOrders = await Promise.all(
      allOrders
        .filter(order => order.endDate > now)
        .map(async order => {
          const renter = await User.findById(order.renterId).select('name _id');
          const car = cars.find(car => car._id.equals(order.carId));
          return { ...order.toObject(), car, renter };
        })
    );

    const pastOrders = await Promise.all(
      allOrders
        .filter(order => order.endDate <= now)
        .map(async order => {
          const renter = await User.findById(order.renterId).select('name');
          const car = cars.find(car => car._id.equals(order.carId));
          return { ...order.toObject(), car, renter };
        })
    );

    res.json({ activeOrders, pastOrders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ message: 'Error retrieving orders' });
  }
};

const postRenterReview = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating, feedback } = req.body;

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the booking with the review data
    booking.renterReview = { rating, feedback };
    await booking.save();

    // Fetch the details of the booked car
    const car = await Car.findById(booking.carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Notify the owner about the renter's review
    const ownerMessage = `The renter has submitted a review for the booking ${bookingId}`;
    BookingSubject.notifyObservers(car.owner, ownerMessage);
    // notificationObserver.update(car.owner, ownerMessage);
    
    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const postOnwerReview = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { rating, feedback } = req.body;

    // Find the booking by ID
    const order = await Booking.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the booking with the review data
    order.ownerReview = { rating, feedback };
    await order.save();

    // Notify the renter about the owner's review
    const renterMessage = `The owner has submitted a review for the booking ${orderId}`;
    BookingSubject.notifyObservers(order.renterId, renterMessage);
    // notificationObserver.update(order.renterId, renterMessage);

    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  checkForClashes,
  activateBooking,
  fetchBookingsByUser,
  fetchOrdersByOwner,
  postRenterReview,
  postOnwerReview
}
