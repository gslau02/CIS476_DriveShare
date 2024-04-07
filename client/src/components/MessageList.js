import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        messages.map(message => (
          <div key={message._id}>
            {/* Render message details */}
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
