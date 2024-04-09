import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data) {
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('sessionToken', response.data.sessionToken);
    }
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
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const verifySession = async (sessionToken) => {
  try {
    const response = await axios.post(`${API_URL}/verify-session`, { sessionToken });
    if (response.data) {
      localStorage.setItem('userId', response.data.userId);
    }
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

export const getSecurityQuestions = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/questions`, { email })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const verifySecurityQuestions = async (email, answers) => {
  try {
    const response = await axios.post(`${API_URL}/verify-answers`, { email, answers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const updatePassword = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/update-password`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}