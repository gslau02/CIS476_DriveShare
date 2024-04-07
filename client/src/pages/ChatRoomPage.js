import React from 'react';
import { useParams } from 'react-router-dom';

const ChatRoomPage = () => {
  const { receiverId } = useParams();

  return (
    <div>
      <p>Sending message to user {receiverId}!</p>
    </div>
  );
};

export default ChatRoomPage;
