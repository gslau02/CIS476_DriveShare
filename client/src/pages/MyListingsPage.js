// MyListingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const MyListingsPage = () => {
  const navigate = useNavigate();
  const [carListings, setCarListings] = useState([]);

  useEffect(() => {
    const fetchUserCarListings = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://localhost:3001/car/listUserCarListings/${userId}`);
          setCarListings(response.data);
          (response.data.length === 0) ? localStorage.setItem('isCarOwner', false) : localStorage.setItem('isCarOwner', true);          
        } else {
          console.error('User ID not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching car listings:', error);
      }
    };
    
    fetchUserCarListings();
  }, []);

  const handleDelete = async (carId) => {
    try {
      await axios.delete(`http://localhost:3001/car/${carId}`);
      // After successful deletion, remove the deleted car from the carListings state
      setCarListings(carListings.filter(car => car._id !== carId));
    } catch (error) {
      console.error('Error deleting car listing:', error);
      // Handle error: Display error message or show error notification
    }
  };

  return (
    <div>
      <h2>My Car Listings</h2>
      <button onClick={() => navigate('/listCar')}>List a Car</button>
      <div>
        {carListings.map((car, index) => (
          <div key={index}>
            <h2>{car.make} {car.model} {car.year}</h2>
            <p>Mileage: {car.mileage}</p>
            <p>Rental Pricing: {car.rentalPricing}</p>
            <p>Pick Up Location: {car.pickUpLocation}</p>
            <p>Availability Start Date: {car.availability.startDate.slice(0, 10)}</p>
            <p>Availability End Date: {car.availability.endDate.slice(0, 10)}</p>
            <Link to={`/editCar/${car._id}`}>Edit</Link>
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListingsPage;
