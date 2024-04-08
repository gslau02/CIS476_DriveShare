import React, { useRef, useEffect } from 'react';
import recipientImage from '../../assets/images/default_profile_picture.webp';
import userImage from '../../assets/images/default_profile_picture.webp';
import './style.css';

const MessageDisplay = ({ messages }) => {
  const userId = localStorage.getItem('userId');
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the message display area when a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="message-display">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-container ${userId === message.sender ? 'message-right' : 'message-left'}`}
        >
          {/* Display recipient image on the left and user image on the right */}
          {userId !== message.sender && (
            <img
              src={recipientImage}
              alt="Recipient"
              className="message-image"
            />
          )}
          {userId === message.sender && (
            <img
              src={userImage}
              alt="User"
              className="message-image"
            />
          )}
          <div
            className={`message-content ${userId === message.sender ? 'sender-box' : 'recipient-box'}`}
          >
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageDisplay;