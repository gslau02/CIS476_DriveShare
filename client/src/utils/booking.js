import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/bookings'

export const fetchUserBookings = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw new Error('Failed to fetch user bookings. Please try again.');
  }
};
