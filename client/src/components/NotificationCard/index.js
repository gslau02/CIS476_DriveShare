import React from 'react';
import defaultImage from '../../assets/images/default_profile_picture.webp';
import './style.css';

const NotificationCard = ({ imageSrc, title, date }) => {
  const imageUrl = imageSrc || defaultImage;

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
