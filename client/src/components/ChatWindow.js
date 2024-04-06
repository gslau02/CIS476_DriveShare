import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_BASE_URL = '/*actual API base URL*/'; 

const ChatWindow = ({ conversation }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/messages`, {
        conversationId: conversation.id,
        content: newMessage
      });
      // Update the conversation message list with the new message
      // need to re-fetch or append the message manually
      console.log(response.data);
      setNewMessage(''); // Clear the input field after sending the message
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="chat-window">
      <h3>Chat with {conversation.name}</h3>
      <div className="messages">
        {conversation.messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'userId' ? 'sent' : 'received'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <textarea 
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

ChatWindow.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      sender: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default ChatWindow;