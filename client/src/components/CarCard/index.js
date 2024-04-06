import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${car._id}`); // Navigate to the single car page with the car ID
  };

  return (
    <div className="car-card" onClick={handleCardClick}>
      <h3>{car.make} {car.model}</h3>
      <p>Year: {car.year}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Rental Pricing: ${car.rentalPricing}/day</p>
      <p>Pick Up Location: {car.pickUpLocation}</p>
    </div>
  );
};

export default CarCard;
