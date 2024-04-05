import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCar } from '../utils/carUtils';


const ListCarPage = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    pricePerDay: '',
    features: '',
    imageUrl: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar(formData);
      // Redirect to another page or show success message
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>List a New Car</h1>
      <form onSubmit={handleSubmit}>
        {/* Form Inputs */}
        <input type="text" name="make" value={formData.make} onChange={handleChange} required placeholder="Make" />
        <input type="text" name="model" value={formData.model} onChange={handleChange} required placeholder="Model" />
        <input type="number" name="year" value={formData.year} onChange={handleChange} required placeholder="Year" />
        <input type="text" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required placeholder="Price Per Day" />
        <input type="text" name="features" value={formData.features} onChange={handleChange} placeholder="Features (comma separated)" />
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" />
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
};

export default ListCarPage;