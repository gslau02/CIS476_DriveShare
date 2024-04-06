// EditCarPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCarPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    rentalPricing: '',
    pickUpLocation: '',
    availability: []
  });

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/car/${carId}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    
    fetchCarDetails();
  }, [carId]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/car/${carId}`, car);
      console.log('Car updated successfully:', response.data);
      // Optionally: Redirect to My Listings page or show a success message
    } catch (error) {
      console.error('Error updating car listing:', error);
      // Handle error: Display error message or show error notification
    }
  };

  return (
    <div>
      <h1>Edit Car Listing</h1>
      <form onSubmit={handleSubmit}>
        <label>Make:</label>
        <input type="text" name="make" value={car.make} onChange={handleChange} />
        <label>Model:</label>
        <input type="text" name="model" value={car.model} onChange={handleChange} />
        <label>Year:</label>
        <input type="number" name="year" value={car.year} onChange={handleChange} />
        <label>Mileage:</label>
        <input type="text" name="mileage" value={car.mileage} onChange={handleChange} />
        <label>Rental Pricing:</label>
        <input type="text" name="rentalPricing" value={car.rentalPricing} onChange={handleChange} />
        <label>Pick Up Location:</label>
        <input type="text" name="pickUpLocation" value={car.pickUpLocation} onChange={handleChange} />
        {/* Add input fields for availability if needed */}
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCarPage;
