import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConversationsList from '../components/ConversationsList';
import NotificationsList from '../components/NotificationsList';

const InboxPage = () => {
  const [currentTab, setCurrentTab] = useState('messages');
  const [conversations, setConversations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchConversations = async () => {
      const { data } = await axios.get(`/messages/${userId}`);
      setConversations(data);
    };

    const fetchNotifications = async () => {
      const { data } = await axios.get(`/notifications/${userId}`);
      setNotifications(data);
    };

    // Execute both fetch operations concurrently
    Promise.all([fetchConversations(), fetchNotifications()]);
  }, [userId]);

  const handleSelectConversation = (conversation) => {
    // Set state related to the selected conversation, like displaying the chat
  };

  return (
    <div className="inbox-page">
      <button onClick={() => setCurrentTab('messages')}>Messages</button>
      <button onClick={() => setCurrentTab('notifications')}>Notifications</button>
      {currentTab === 'messages' && (
        <ConversationsList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
        />
      )}
      {currentTab === 'notifications' && (
        <NotificationsList notifications={notifications} />
      )}
    </div>
  );
};

export default InboxPage;