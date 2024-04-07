import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/bookings/${booking._id}');
  };

  return (
    <div className="booking-card" onClick={handleCardClick}>
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
      {/* You can include additional information about the booking here */}
    </div>
  );
};

export default BookingCard;
