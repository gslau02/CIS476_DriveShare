import React from 'react';
import PropTypes from 'prop-types';

const BookingCard = ({ booking, onBookingCancel, onBookingReview }) => {
  const { id, carModel, owner, bookingTime, location, active } = booking;

  const handleContactOwner = () => {
    // Implementation to open a modal or navigate to a page with a messaging form
    console.log(`Opening message composition to contact owner ${owner}`);
    // You would implement the UI interaction here
  };

  const handleCancelBooking = () => {
    onBookingCancel(id);
  };

  const handleLeaveReview = () => {
    onBookingReview(id);
  };

  return (
    <div className="booking-card">
      <h3>Car Model: {carModel}</h3>
      <p>Owner: {owner}</p>
      <p>Booking Time: {bookingTime}</p>
      <p>Location: {location}</p>
      {active && (
        <>
          <button onClick={handleContactOwner}>Contact Owner</button>
          <button onClick={handleCancelBooking}>Cancel Booking</button>
        </>
      )}
      {!active && (
        <button onClick={handleLeaveReview}>Leave Review</button>
      )}
    </div>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    carModel: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    bookingTime: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  onBookingCancel: PropTypes.func.isRequired,
  onBookingReview: PropTypes.func.isRequired,
};

export default BookingCard;