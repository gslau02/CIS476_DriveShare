import React from 'react';

const NotificationList = ({ notifications }) => {
  return (
    <div>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        notifications.map(notification => (
          <div key={notification._id}>
            {/* Render notification details */}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationList;
