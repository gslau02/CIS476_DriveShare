const Booking = require('../models/Booking');

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
    const activeBookings = allBookings.filter(booking => booking.endDate > now);
    const pastBookings = allBookings.filter(booking => booking.endDate <= now);

    res.json({ activeBookings, pastBookings });
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ message: 'Error retrieving bookings' });
  }
};

module.exports = {
  createBooking,
  checkForClashes,
  activateBooking,
  fetchBookingsByUser
}
