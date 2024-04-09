import React from 'react';
import defaultImage from '../../assets/images/default_profile_picture.webp';
import './style.css';

// NotificationCard component that takes imageSrc, title, and date
const NotificationCard = ({ imageSrc, title, date }) => {
  const imageUrl = imageSrc || defaultImage;

  // JSX structure to render NotificationCard
  return (
    <div className="inbox-card">
      <div className="inbox-card-left">
        <img src={imageUrl} alt="Profile" className="inbox-card-image" />
      </div>
      <div className="inbox-card-right">
        <div className="inbox-card-title">{title}</div>
        <div className="inbox-card-date">{date.substring(0, 19)}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
