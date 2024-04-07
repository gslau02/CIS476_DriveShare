import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/bookings';

export const fetchBookings = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw new Error('Failed to fetch bookings. Please try again.');
  }
};
