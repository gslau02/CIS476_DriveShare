// NotificationList.js
import React from 'react';
import NotificationCard from '../NotificationCard';

const NotificationList = ({ notifications }) => {
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
