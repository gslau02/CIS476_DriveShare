// EditCarPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCarPage = () => {
  // Get carId from URL parameters
  const { carId } = useParams();

  // Define state for car details
  const [car, setCar] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    rentalPricing: '',
    pickUpLocation: '',
    availability: []
  });

  // Fetch car details on component mount
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/car/${carId}`);
        // Set car details state
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    
    fetchCarDetails();
  }, [carId]);

  // Handle input change
  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/car/${carId}`, car);
      console.log('Car updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating car listing:', error);
    }
  };

  // Render the component
  return (
    <div>
      <form className='form-container' onSubmit={handleSubmit}>
        <h2>Edit Car Listing</h2>
        <p>Make:</p>
        <input type="text" name="make" value={car.make} onChange={handleChange} />
        <p>Model:</p>
        <input type="text" name="model" value={car.model} onChange={handleChange} />
        <p>Year:</p>
        <input type="number" name="year" value={car.year} onChange={handleChange} />
        <p>Mileage:</p>
        <input type="text" name="mileage" value={car.mileage} onChange={handleChange} />
        <p>Rental Pricing:</p>
        <input type="text" name="rentalPricing" value={car.rentalPricing} onChange={handleChange} />
        <p>Pick Up Location:</p>
        <input type="text" name="pickUpLocation" value={car.pickUpLocation} onChange={handleChange} />
        {/* Add input fields for availability if needed */}
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCarPage;
