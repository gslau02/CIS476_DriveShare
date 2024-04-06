import React from 'react';
import './style.css';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <h3>{car.make} {car.model}</h3>
      <p>Year: {car.year}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Rental Pricing: ${car.rentalPricing}/day</p>
      <p>Pick Up Location: {car.pickUpLocation}</p>
    </div>
  );
};

export default CarCard;
