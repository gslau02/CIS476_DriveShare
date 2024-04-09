import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

// Register a new user function
export const registerUser = async (userData) => {
  try {
    // POST request to register user data to endpoint
    const response = await axios.post(`${API_URL}/register`, userData);
    // Store userId and sessionToken in local storage
    if (response.data) {
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('sessionToken', response.data.sessionToken);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Authenticate user function
export const authenticateUser = async (userData) => {
  try {
    // POST request to authenticate user date to endpoint
    const response = await axios.post(`${API_URL}/auth`, userData);
    // If response data exists, store userId and sessionToken in local storage
    if (response.data) {
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('sessionToken', response.data.sessionToken);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Verify session function
export const verifySession = async (sessionToken) => {
  try {
    // POST request to verify user session
    const response = await axios.post(`${API_URL}/verify-session`, { sessionToken });
    if (response.data) {
      localStorage.setItem('userId', response.data.userId);
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Logout user function
export const logout = async () => {
  try {
    // Get sessionToken from local storage
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      // POST request to logout endpoint with sessionToken
      await axios.post(`${API_URL}/logout`, { sessionToken });
      // Remove userId and sessionToken from local storage
      localStorage.removeItem('userId');
      localStorage.removeItem('sessionToken');
    }
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

// Retrieve security questions for password recovery function
export const getSecurityQuestions = async (email) => {
  try {
    // POST request to security questions endpoint with email
    const response = await axios.post(`${API_URL}/questions`, { email })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

// Verify security questions for password recovery function
export const verifySecurityQuestions = async (email, answers) => {
  try {
    // POST request to verify answers
    const response = await axios.post(`${API_URL}/verify-answers`, { email, answers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

// Update password for password recovery function
export const updatePassword = async (email, password) => {
  try {
    // POST request to update password endpoint with new password
    const response = await axios.post(`${API_URL}/update-password`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}