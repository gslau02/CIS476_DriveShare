// NotificationList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          <div key={notification._id}>
            {/* Render notification details */}
            <p>{notification.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
