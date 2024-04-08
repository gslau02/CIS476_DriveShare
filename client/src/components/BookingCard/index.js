import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const handleContactOwner = () => {
    navigate(`/chat/${booking.owner._id}`, { state: { recipient: booking.owner } });
  };

  return (
    <div className="booking-card">
      <h3>{booking.car.make} {booking.car.model} {booking.car.year}</h3>
      <p>Car Owner: {booking.owner.name}</p>
      <p>Pickup Locaation: {booking.car.pickUpLocation}</p>
      <p>Start Date: {booking.startDate}</p>
      <p>End Date: {booking.endDate}</p>
      <p>Status: {booking.status}</p>
      {booking.status === 'COMPLETED' && booking.renterReview.rating ? (
        <div>
          <p>My Review: </p>
          <p>Rating: {booking.renterReview.rating}</p>
          <p>Feedback: {booking.renterReview.feedback}</p>
        </div>
      ): null } 
      {booking.status === 'COMPLETED' && booking.ownerReview.rating ? (
        <div>
          <p>Review from Car Onwer: </p>
          <p>Rating: {booking.ownerReview.rating}</p>
          <p>Feedback: {booking.ownerReview.feedback}</p>
        </div>
      ): null } 
      {(booking.status === 'REQUESTED' || booking.status === 'ACTIVE') && (
        <button onClick={handleContactOwner}>Contact Car Owner</button>
      )}
      {/* You can include additional information about the booking here */}
    </div>
  );
};

export default BookingCard;
