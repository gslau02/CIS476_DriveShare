/*
import React from 'react';
import PropTypes from 'prop-types';
//import { cancelBooking, leaveReview, sendMessage } from '../api/booking'; // Placeholder for the real API functions

const BookingCard = ({ booking }) => {
  // Grab the userID from localStorage to check if user is logged in
  const userId = localStorage.getItem('userId');

  const handleCancelBooking = async (bookingId) => {
    if (!userId) {
      alert('Please log in to cancel booking.');
      return;
    }
    // Call the API to cancel the booking
    try {
      //const response = await cancelBooking(bookingId, userId);
      //console.log(response);
      // Update the booking UI here after cancellation
    } catch (error) {
      console.error("Error cancelling the booking:", error.message);
    }
  };

  const handleLeaveReview = (bookingId) => {
    if (!userId) {
      alert('Please log in to leave a review.');
      return;
    }
    // Navigate to review page or show review modal
  };

  const handleContactOwner = (ownerId) => {
    if (!userId) {
      alert('Please log in to contact the owner.');
      return;
    }
    // Show message composition UI
  };

  return (
    <div className="booking-card">
      {// Card content here }
      {userId && (
        <>
          {booking.active && (
            <>
              <button onClick={() => handleContactOwner(booking.owner)}>Contact Owner</button>
              <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
            </>
          )}
          {!booking.active && (
            <button onClick={() => handleLeaveReview(booking.id)}>Leave Review</button>
          )}
        </>
      )}
    </div>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    // Include other booking properties and their prop types as needed
  }).isRequired,
};

export default BookingCard;
*/

import React from 'react';
import PropTypes from 'prop-types';

const BookingCard = ({ booking }) => {
  const { id, carModel, owner, bookingTime, location, active } = booking;

  const handleContactOwner = () => {
    // Placeholder for handling contact owner logic
    alert(`Contacting ${owner}`);
  };

  const handleCancelBooking = () => {
    // Placeholder for handling cancel booking logic
    alert(`Cancelling booking for ${carModel}`);
  };

  const handleLeaveReview = () => {
    // Placeholder for handling leave review logic
    alert(`Leaving review for ${carModel}`);
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
};

export default BookingCard;
