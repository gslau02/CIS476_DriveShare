// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchSingleCar } from '../utils/car'

// const SingleCarPage = () => {
//   const { carId } = useParams();
//   const [car, setCar] = useState(null);
//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const fetchedCar = await fetchSingleCar(carId);
//         setCar(fetchedCar);
//       } catch (error) {
//         console.error('Error fetching car:', error);
//       }
//     };
//     fetchCar();
//   }, [carId]);

//   if (!car) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{car.make} {car.model}</h2>
//       <p>Year: {car.year}</p>
//       <p>Mileage: {car.mileage}</p>
//       <p>Rental Pricing: ${car.rentalPricing}/day</p>
//       <p>Pick Up Location: {car.pickUpLocation}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// };

// export default SingleCarPage;

// SingleCarPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { fetchSingleCar } from '../utils/car';

const SingleCarPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const fetchedCar = await fetchSingleCar(carId);
        setCar(fetchedCar);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };
    fetchCar();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const startDate = new Date(car.availability.startDate).toISOString().split('T')[0];
    const endDate = new Date(car.availability.endDate).toISOString().split('T')[0];
    
    // Check if the entered date is within the allowed range
    if (name === 'startDate' && (value < startDate || value > endDate)) {
      // If the start date is outside the allowed range, reset it
      setBookingData({ ...bookingData, startDate: '' });
      alert('Please select a start date within the available period.');
    } else if (name === 'endDate' && (value < startDate || value > endDate)) {
      // If the end date is outside the allowed range, reset it
      setBookingData({ ...bookingData, endDate: '' });
      alert('Please select an end date within the available period.');
    } else {
      // If the entered date is within the allowed range, update the state
      setBookingData({ ...bookingData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate } = bookingData;

    // Check if the end date is after the start date
    if (new Date(startDate) >= new Date(endDate)) {
      alert('End date must be after the start date.');
      return;
    }

    try {
      // Check for clashes before creating the booking
      const clashes = await checkForClashes(carId, bookingData.startDate, bookingData.endDate);
      if (clashes.length > 0) {
        // If there are clashes, inform the user and prevent booking creation
        alert('There are existing bookings that clash with the selected dates. Please choose different dates.');
        return;
      }

      // If no clashes, proceed with booking creation
      await axios.post('http://localhost:3001/booking/createBooking', {
        ...bookingData,
        carId: car._id,
        renter: localStorage.getItem("userId")
      });
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error.message);
      alert('Failed to create the booking.');
    }
  };

  // Function to check for clashes
  const checkForClashes = async (carId, startDate, endDate) => {
    try {
      const response = await axios.get(`http://localhost:3001/booking/checkForClashes/${carId}`, {
        params: {
          startDate,
          endDate
        }
      });
      return response.data.clashes;
    } catch (error) {
      console.error('Error checking for clashes:', error.message);
      return [];
    }
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{car.make} {car.model}</h2>
      <p>Year: {car.year}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Rental Pricing: {car.rentalPricing}</p>
      <p>Pick Up Location: {car.pickUpLocation}</p>
      <p>Available from: {car.availability.startDate}</p>
      <p>Available until: {car.availability.endDate}</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="date" 
          name="startDate" 
          value={bookingData.startDate} 
          onChange={handleChange} 
          min={car.availability.startDate} // Set the minimum allowed date
          max={car.availability.endDate}   // Set the maximum allowed date
          placeholder="Start Date" 
          required 
        />
        <input 
          type="date" 
          name="endDate" 
          value={bookingData.endDate} 
          onChange={handleChange} 
          min={car.availability.startDate} // Set the minimum allowed date
          max={car.availability.endDate}   // Set the maximum allowed date
          placeholder="End Date" 
          required 
        />

        <button type="submit">Book Car</button>
      </form>
    </div>
  );
};

export default SingleCarPage;


