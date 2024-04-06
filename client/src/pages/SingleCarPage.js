import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchSingleCar } from '../utils/car'
//import { getCarDetails } from '../../../server/controllers/carController';

const SingleCarPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  useEffect(() => {
    const fetchCar = async () => {
      try {
        //const fetchedCar = await getCarDetails(carId);
        const response = await axios.put(`http://localhost:3001/car/${carId}`, car);
        setCar(response);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };
    fetchCar();
  }, [carId]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{car.make} {car.model}</h2>
      <p>Year: {car.year}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Rental Pricing: ${car.rentalPricing}/day</p>
      <p>Pick Up Location: {car.pickUpLocation}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default SingleCarPage;
