// MyListingsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import defaultCarImage from '../assets/images/default_car.jpg';
import locationIcon from '../assets/images/location.png';
import ButtonLink from '../components/ButtonLink/ButtonLink';

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
    <div style={{textAlign: 'center'}}>
      <h2>My Car Listings</h2>
      <button style={{ width: '610px' }} onClick={() => navigate('/listCar')}>List New Car</button>
      <div style={{ textAlign: '-webkit-center' }}>
        {carListings.map((car, index) => (
          <div key={index} className="car-card">
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
              <ButtonLink to={`/editCar/${car._id}`}>Edit</ButtonLink>
              <button onClick={() => handleDelete(car._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListingsPage;
