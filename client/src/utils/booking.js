// import axios from 'axios';

// const API_ENDPOINT = 'http://localhost:3001/booking';

// export const fetchBookingsByUser = async (userId) => {
//   try {
//     const response = await axios.get(`${API_ENDPOINT}/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// utils/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/booking';

export const bookCar = async (bookingData) => {
  try {
    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getExistingBookings = async (carId) => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings/${carId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
