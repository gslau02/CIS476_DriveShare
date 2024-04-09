import React from 'react';
import defaultImage from '../../assets/images/default_profile_picture.webp';
import './style.css';

// MessageCard component that takas imageSrc, title, description, date, onClick as objects
const MessageCard = ({ imageSrc, title, description, date, onClick }) => {
  const imageUrl = imageSrc || defaultImage;

  // JSX structure to render MessageCard
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

export default MessageCard;
