import React, { useState, useEffect } from 'react';
import { fetchAllCars } from '../utils/car';
import CarCard from '../components/CarCard';

const AllCarsPage = () => {
  const [cars, setCars] = useState([]);

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
      <ul>
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </ul>
    </div>
  );
};

export default AllCarsPage;
