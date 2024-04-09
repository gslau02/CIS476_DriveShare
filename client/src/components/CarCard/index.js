import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import defaultCarImage from '../../assets/images/default_car.jpg';
import locationIcon from '../../assets/images/location.png';

// CarCard component that takes car object
const CarCard = ({ car }) => {
  const navigate = useNavigate();

  // Handle click on the car card
  const handleCardClick = () => {
    navigate(`/car/${car._id}`); // Navigate to the single car page with the car ID
  };

  // JSX structure to render CarCard 
  return (
    <div className="car-card" onClick={handleCardClick}>
      <div className="car-image-container">
        <img src={defaultCarImage} alt={`${car.make} ${car.model}`} className="car-image" />
        <div className="price-tag">${car.rentalPricing}/day</div>
      </div>
      <div className="car-details">
        <h3>{car.make} {car.model} {car.year}</h3>
        <p>Mileage: {car.mileage} miles</p>
        <div style={{display: 'flex'}}>
          <img src={locationIcon} className="car-location-image" />
          <p>{car.pickUpLocation}</p>
        </div>
        <p>Available from {car.availability.startDate.substring(0, 10)} to {car.availability.endDate.substring(0, 10)}</p>
      </div>
    </div>
  );
};

export default CarCard;