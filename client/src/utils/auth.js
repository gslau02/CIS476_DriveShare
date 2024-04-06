import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data) {
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('sessionToken', response.data.sessionToken);
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
    if (response.data) {
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('sessionToken', response.data.sessionToken);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const verifySession = async (sessionToken) => {
  try {
    const response = await axios.post(`${API_URL}/verify-session`, { sessionToken });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const logout = async () => {
  try {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      await axios.post(`${API_URL}/logout`, { sessionToken });
      localStorage.removeItem('userId');
      localStorage.removeItem('sessionToken');
    }
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}
