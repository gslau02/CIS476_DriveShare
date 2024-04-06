import axios from 'axios';

const API_MESSAGES_ENDPOINT = 'http://localhost:3001/inbox'; // Replace with the actual messages API endpoint
const API_NOTIFICATIONS_ENDPOINT = 'http://localhost:3001/inbox'; // Replace with the actual notifications API endpoint

export const fetchMessagesByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_MESSAGES_ENDPOINT}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchNotificationsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_NOTIFICATIONS_ENDPOINT}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};