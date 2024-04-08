import React from 'react';
import './style.css';

const RatingStars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>★</span>);
  }
  return <div className="star-container">{stars}</div>;
};

export default RatingStars;