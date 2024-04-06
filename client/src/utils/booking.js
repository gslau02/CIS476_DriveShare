import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/booking';

export const fetchBookingsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};