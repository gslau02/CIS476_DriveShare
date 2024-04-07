import React, { useState, useEffect } from 'react';
import { fetchAllCars } from '../utils/car';
import CarCard from '../components/CarCard';

const AllCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const searchParams = {};
      if (location) searchParams.location = location;
      if (fromDate) searchParams.fromDate = fromDate;
      if (toDate) searchParams.toDate = toDate;

      const cars = await fetchAllCars(searchParams);
      setCars(cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

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

  return (
    <div>
      <h2>All Available Cars</h2>
      <form onSubmit={handleSearch}>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </ul>
    </div>
  );
};

export default AllCarsPage;
