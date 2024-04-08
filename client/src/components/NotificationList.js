// NotificationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationCard from './NotificationCard';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/notification/getNotificationsByUser/${userId}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, [userId]);

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
