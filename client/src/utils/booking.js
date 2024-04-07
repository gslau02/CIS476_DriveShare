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

export const fetchOrdersByOwner = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/fetchOrdersByOwner/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postRenterReview = async (bookingId, rating, feedback) => {
  try {
    await axios.put(`${BASE_URL}/postRenterReview/${bookingId}`, { rating, feedback });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const postOwnerReview = async (orderId, rating, feedback) => {
  try {
    await axios.put(`${BASE_URL}/postOwnerReview/${orderId}`, { rating, feedback });
  } catch (error) {
    console.error(error);
    throw error;
  }
}