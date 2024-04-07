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
      <p>Car Owner: {booking.owner.email}</p>
      <p>Pickup Locaation: {booking.car.pickUpLocation}</p>
      <p>Start Date: {booking.startDate}</p>
      <p>End Date: {booking.endDate}</p>
      <p>Status: {booking.status}</p>
      {/* You can include additional information about the booking here */}
    </div>
  );
};

export default BookingCard;
