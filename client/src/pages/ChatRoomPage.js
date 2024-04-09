import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createMessage, fetchChatRoomMessages } from '../utils/inbox';
import MessageDisplay from '../components/MessageDisplay';

const ChatRoomPage = () => {
  // Get recipient from location state
  const location = useLocation();
  const { recipient } = location.state;

  // Get user ID from localStorage
  const userId = localStorage.getItem('userId');

  // Define state for input message and loaded messages
  const [inputMessage, setInputMessage] = useState('');
  const [loadedMessages, setLoadedMessages] = useState([]);

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await fetchChatRoomMessages(userId, recipient._id);
        console.log(messages);
        // Set loaded messages state
        setLoadedMessages(messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [userId, recipient._id]);

  // Define message data object
  const messageData = { 
    sender: userId,
    recipient: recipient._id, 
    content: inputMessage
  }

  // Handle input message change
  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      // Create message and update loaded messages state
      createMessage(messageData);
      const newMessage = { sender: userId, recipient: recipient._id, content: inputMessage, createdAt: new Date() };
      setLoadedMessages([...loadedMessages, newMessage]);
      setInputMessage('');
    }
  };  

  // Render the component
  return (
    <div style={{ textAlign:'-webkit-center' }}>
      <h2>{recipient.name}</h2>
      <div style={{width: '50%'}}>
      <MessageDisplay messages={loadedMessages} />
      <div style={{ display: 'flex'}}>
        <input
          type="text"
          required
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputMessageChange}
          style={{ margin: '0px' }}
        />
        <button onClick={handleSendMessage} style={{ width: '100px' }}>Send</button>
      </div>
      </div>
      
    </div>
  );
};

export default ChatRoomPage;
