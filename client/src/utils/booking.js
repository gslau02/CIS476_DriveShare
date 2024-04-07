import axios from 'axios';

const BASE_URL = 'http://localhost:3001/booking';

export const fetchBookingsByUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/fetchBookingsByUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
