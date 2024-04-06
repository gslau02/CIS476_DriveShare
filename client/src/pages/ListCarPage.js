import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { listCarForRent } from '../utils/car';

const ListCarPage = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    pricePerDay: '',
    location: '',
    owner: localStorage.getItem('userId'), // I'm assuming we want to read this only once when the component mounts
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await listCarForRent(formData);
      alert('Car listed successfully!');
    } catch (error) {
      console.error(error.message);
      alert('Failed to list the car.');
    }
  };

  return (
    <div>
      <h2>List Your Car for Sale</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Make" required />
        <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" required />
        <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
        <input type="text" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
        <button type="submit">List Car</button>
      </form>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default ListCarPage;