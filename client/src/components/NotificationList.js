// NotificationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationCard from './NotificationCard';

// NotificationList component that takes userId
const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notification when userId changes using Effect hook
  useEffect(() => {
    // Fetch notifications based on userId
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notification/getNotificationsByUser/${userId}`);
        // Update notifications state
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, [userId]);

  // JSX structure to render NotificationList
  return (
    <div>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        notifications.map(notification => (
          <NotificationCard key={notification._id} title={notification.message} date={notification.timestamp} />
        ))
      )}
    </div>
  );
};

export default NotificationList;
