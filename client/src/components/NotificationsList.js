import React from 'react';
import PropTypes from 'prop-types';

const NotificationsList = ({ notifications }) => {
  return (
    <div className="notifications-list">
      {notifications.map((notification) => (
        <div key={notification._id}>
          {/* Display notification content */}
        </div>
      ))}
    </div>
  );
};

NotificationsList.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default NotificationsList;