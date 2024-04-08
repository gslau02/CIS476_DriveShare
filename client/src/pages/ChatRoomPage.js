import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createMessage, fetchChatRoomMessages } from '../utils/inbox';
import MessageDisplay from '../components/MessageDisplay';

const ChatRoomPage = () => {
  const location = useLocation();
  const { recipient } = location.state;
  const userId = localStorage.getItem('userId');

  const [inputMessage, setInputMessage] = useState('');
  const [loadedMessages, setLoadedMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await fetchChatRoomMessages(userId, recipient._id);
        console.log(messages);
        setLoadedMessages(messages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [userId, recipient._id]);

  const messageData = { 
    sender: userId,
    recipient: recipient._id, 
    content: inputMessage
  }

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      createMessage(messageData);
      const newMessage = { sender: userId, recipient: recipient._id, content: inputMessage, createdAt: new Date() };
      setLoadedMessages([...loadedMessages, newMessage]);
      setInputMessage('');
    }
  };  

  return (
    <div>
      <h2>Chat with {recipient.name}</h2>
      <MessageDisplay messages={loadedMessages} />
      <div>
        <input
          type="text"
          required
          placeholder="Type your message..."
          value={inputMessage}
          onChange={handleInputMessageChange}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoomPage;
