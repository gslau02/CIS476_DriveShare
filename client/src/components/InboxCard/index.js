import React from 'react';
import defaultImage from '../../assets/images/default_profile_picture.webp';
import './style.css';

const InboxCard = ({ imageSrc, title, description, date, onClick }) => {
  const imageUrl = imageSrc || defaultImage;

  return (
    <div className="inbox-card" onClick={onClick}>
      <div className="inbox-card-left">
        <img src={imageUrl} alt="Profile" className="inbox-card-image" />
      </div>
      <div className="inbox-card-right">
        <div className="inbox-card-title">{title}</div>
        <div className="inbox-card-description">{description}</div>
        <div className="inbox-card-date">{date}</div>
      </div>
    </div>
  );
};

export default InboxCard;
