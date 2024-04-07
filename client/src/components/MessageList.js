// client/components/MessageList.js
import React from 'react';

const MessageList = ({ messages, onSelectUser }) => {
  return (
    <div>
      <h3>Messages</h3>
      {messages.map((message) => (
        <div key={message._id} onClick={() => onSelectUser(message.sender)}>
          <p>From: {message.sender}</p>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
