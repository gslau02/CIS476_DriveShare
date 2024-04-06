const { Booking } = require('../models/Booking');

const fetchActiveBookings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const activeBookings = await Booking.find({ renter: userId, status: 'active' });

        return res.status(200).json(activeBookings);
    } catch (error) {
        console.error('Error fetching active bookings:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const fetchBookingHistory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const bookingHistory = await Booking.find({ renter: userId, status: 'history' });

        return res.status(200).json(bookingHistory);
    } catch (error) {
        console.error('Error fetching booking history:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    fetchActiveBookings,
    fetchBookingHistory
};