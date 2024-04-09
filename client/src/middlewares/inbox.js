import axios from 'axios';

const API_ENDPOINT = 'http://localhost:3001/inbox';

export const createMessage = async (messageData) => {
  try {
    await axios.post(`${API_ENDPOINT}/messages`, messageData);
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message. Please try again.');
  }
};

export const fetchAllMessages = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages. Please try again.');
  }
};

export const fetchMessagesByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/messages/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages by user:', error);
    throw new Error('Failed to fetch messages by user. Please try again.');
  }
}

export const fetchChatRoomMessages = async (userId, recipientId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/messages/${userId}/${recipientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chat room messages:', error);
    throw new Error('Failed to fetch chat room messages. Please try again.');
  }
}

export const getNotificationsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/notifications/getNotificationsByUser/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw new Error('Failed to fetch notifications. Please try again.');
  }
}

