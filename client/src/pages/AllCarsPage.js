import React, { useState, useEffect } from 'react';
import { fetchAllCars } from '../middlewares/car';
import CarCard from '../components/CarCard';

const AllCarsPage = () => {
  // Define state variables for cars, location, fromDate, and toDate
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Define a function to handle search when the form is submitted
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Prepare search parameters based on user input
      const searchParams = {};
      if (location) searchParams.location = location;
      if (fromDate) searchParams.fromDate = fromDate;
      if (toDate) searchParams.toDate = toDate;

      // Fetch cars based on search parameters
      const cars = await fetchAllCars(searchParams);
      setCars(cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // Fetch all cars when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await fetchAllCars();
        setCars(cars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  // Render the component
  return (
    <div>
      <h2>Find the Perfect Car from your Peers</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <div className='form-group'>
          <p>Location:</p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <p>From Date:</p>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <p>To Date:</p>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button className='search-button' type="submit">Search</button>
      </form>
      <ul style={{ textAlign: "-webkit-center"}}>
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </ul>
    </div>
  );
};

export default AllCarsPage;
