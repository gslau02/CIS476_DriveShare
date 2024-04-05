import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.userId) {
      localStorage.setItem('userId', response.data.userId);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const authenticateUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, userData);
    if (response.data.userId) {
      localStorage.setItem('userId', response.data.userId);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
