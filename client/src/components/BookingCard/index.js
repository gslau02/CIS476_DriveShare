import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import defaultCarImage from '../../assets/images/default_car.jpg';
import locationIcon from '../../assets/images/location.png';

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const handleContactOwner = () => {
    navigate(`/chat/${booking.owner._id}`, { state: { recipient: booking.owner } });
  };

  return (
    // <div className="car-card" onClick={handleCardClick}>
    //   <div className="car-image-container">
    //     <img src={defaultCarImage} alt={`${car.make} ${car.model}`} className="car-image" />
    //     <div className="price-tag">${car.rentalPricing}/day</div>
    //   </div>
    //   <div className="car-details">
    //     <h3>{car.make} {car.model} {car.year}</h3>
    //     <p>Mileage: {car.mileage} miles</p>
    //     <div style={{display: 'flex'}}>
    //       <img src={locationIcon} className="car-location-image" />
    //       <p>{car.pickUpLocation}</p>
    //     </div>
    //     <p>Available from {car.availability.startDate.substring(0, 10)} to {car.availability.endDate.substring(0, 10)}</p>
    //   </div>
    // </div>
    <div className="car-card">
      <div className="car-image-container">
        <img src={defaultCarImage} alt={`${booking.car.make} ${booking.car.model}`} className="car-image" />
      </div>
      <div className="car-details">
        <h3>{booking.car.make} {booking.car.model} {booking.car.year}</h3>
        <p>Car Owner: {booking.owner.name}</p>
        <div style={{display: 'flex'}}>
          <img src={locationIcon} className="car-location-image" />
          <p>{booking.car.pickUpLocation}</p>
        </div>
        <p>Start from {booking.startDate.substring(0, 10)} to {booking.endDate.substring(0, 10)}</p>
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
      </div>
    </div>
  );
};

export default BookingCard;
