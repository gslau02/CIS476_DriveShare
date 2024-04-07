// client/components/SendMessageForm.js
import React, { useState } from 'react';

const SendMessageForm = ({ userId, recipientId, onSendMessage }) => {
  const [messageContent, setMessageContent] = useState('');

  const handleChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(messageContent);
    setMessageContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={messageContent} onChange={handleChange}></textarea>
      <button type="submit">Send Message</button>
    </form>
  );
};

export default SendMessageForm;
