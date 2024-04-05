import axios from 'axios';

const API_URL = 'http://localhost:3001/car';

export const addCar = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/addCar`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};