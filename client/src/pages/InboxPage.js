// client/pages/InboxPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageCard from '../components/MessageCard';
import NotificationList from '../components/NotificationList/NotificationList';
import { fetchMessagesByUser, getNotificationsByUser } from '../middlewares/inbox';

const InboxPage = () => {
  // Retrieve userId from localStorage
  const userId = localStorage.getItem('userId');
  // Initialize state variables
  const [selectedTab, setSelectedTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  // Create a set to store unique user IDs
  const uniqueUsers = new Set();
  // Initialize navigate function from useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's messages
        const messagesData = await fetchMessagesByUser(userId); // Fetch user's messages
        // Set messages state
        setMessages(messagesData); // Set messages state

        // Fetch notifications
        const notificationsData = await getNotificationsByUser(userId); 
        // Set notifications state
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Handle selection of a message
  const handleSelectMessage = (message) => {
    // Determine the ID of the target user (either sender or recipient)
    const targetId = (userId === message.sender) ? message.recipient : message.sender;
    // Navigate to the chat room page with recipient information
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

  // Render the component
  return (
    <div style={{textAlign: '-webkit-center'}}>
      <h2>Inbox</h2>
      <div className="tabs">
        <button onClick={() => setSelectedTab('messages')}>Messages</button>
        <button onClick={() => setSelectedTab('notifications')}>Notifications</button>
      </div>
      {selectedTab === 'messages' && (
        <div className="inbox-container">
          {uniqueMessages.map((message) => (
            <MessageCard
              title={message.targetName}
              description={message.content}
              date={message.createdAt.substring(0, 19)}
              onClick={() => handleSelectMessage(message)}
            />
          ))}
        </div>
      )}
      {selectedTab === 'notifications' && (
        <NotificationList 
          notifications={notifications}
        />
      )}
    </div>
  );
};

export default InboxPage;
