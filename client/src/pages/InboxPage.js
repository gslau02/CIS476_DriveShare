import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageCard from '../components/MessageList';
import NotificationCard from '../components/NotificationList';

const InboxPage = () => {
  const [currentTab, setCurrentTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInboxData = async () => {
      try {
        const messagesResponse = await axios.get('http://localhost:3001/inbox/messages');
        const notificationsResponse = await axios.get('http://localhost:3001/inbox/notifications');
        setMessages(messagesResponse.data);
        setNotifications(notificationsResponse.data);
      } catch (error) {
        console.error('Failed to load inbox data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInboxData();
  }, []);

  return (
    <div>
      <h2>Inbox</h2>
      <div className="tabs">
        <button onClick={() => setCurrentTab('messages')}>Messages</button>
        <button onClick={() => setCurrentTab('notifications')}>Notifications</button>
      </div>

      {loading ? (
        <div>Loading inbox data...</div>
      ) : (
        <>
          {currentTab === 'messages' && messages.length === 0 ? (
            <p>No messages found.</p>
          ) : null}
          {currentTab === 'notifications' && notifications.length === 0 ? (
            <p>No notifications found.</p>
          ) : null}

          {currentTab === 'messages' &&
            messages.map((message) => (
              <MessageCard key={message._id} message={message} />
            ))}

          {currentTab === 'notifications' &&
            notifications.map((notification) => (
              <NotificationCard key={notification._id} notification={notification} />
            ))}
        </>
      )}
    </div>
  );
};

export default InboxPage;
