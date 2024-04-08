// client/pages/InboxPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InboxCard from '../components/InboxCard';
import NotificationList from '../components/NotificationList';
import { fetchMessagesByUser, fetchNotifications } from '../utils/inbox';

const InboxPage = () => {
  const userId = localStorage.getItem('userId');
  const [selectedTab, setSelectedTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const uniqueUsers = new Set();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesData = await fetchMessagesByUser(userId); // Fetch user's messages
        setMessages(messagesData); // Set messages state

        const notificationsData = await fetchNotifications(); // Fetch notifications
        setNotifications(notificationsData); // Set notifications state
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectMessage = (message) => {
    const targetId = (userId === message.sender) ? message.recipient : message.sender;
    navigate(
      `/chat/${targetId}`,
       { state: { recipient: { _id: targetId, name: message.targetName } } }
    );
  };

  // Filter messages to keep only the first occurrence of each title
  const uniqueMessages = messages.filter((message) => {
    if (uniqueUsers.has(message.targetName)) {
      return false; // Skip this message if its title has already been added
    } else {
      uniqueUsers.add(message.targetName); // Add the title to the Set
      return true; // Include this message in the uniqueMessages array
    }
  });

  return (
    <div>
      <h2>Inbox</h2>
      <div className="tabs">
        <button onClick={() => setSelectedTab('messages')}>Messages</button>
        <button onClick={() => setSelectedTab('notifications')}>Notifications</button>
      </div>
      {selectedTab === 'messages' && (
        <div className="inbox-container">
          {uniqueMessages.map((message) => (
            <InboxCard
              title={message.targetName}
              description={message.content}
              date={message.createdAt}
              onClick={() => handleSelectMessage(message)}
            />
          ))}
        </div>
      )}
      {selectedTab === 'notifications' && (
        <NotificationList notifications={notifications} />
      )}
    </div>
  );
};

export default InboxPage;
