import React from 'react';
import './style.css';

// RatingStars component that takes rating object
const RatingStars = ({ rating }) => {
  const stars = [];
  // Loop to generate star elements based on the rating
  for (let i = 1; i <= 5; i++) {
    stars.push(<span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>★</span>);
  }
  // JSX structure to render RatingStars
  return <div className="star-container">{stars}</div>;
};

export default RatingStars;