// NotificationList.js
import React from 'react';
import NotificationCard from '../NotificationCard';

// NotificationList component that takes notifications as an object
const NotificationList = ({ notifications }) => {
  // JSX structure to render NotificationCard
  return (
    <div>
      {notifications.length === 0 ? (
        <p>No notifications found.</p> // If no notifications are found, display this message
      ) : (
        notifications.map(notification => (
          <NotificationCard key={notification._id} title={notification.message} date={notification.timestamp} /> // Display notification card with title and date
        ))
      )}
    </div>
  );
};

export default NotificationList;
