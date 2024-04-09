import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

// ButtonLink component that takes 'to' and 'children' object
const ButtonLink = ({ to, children }) => {
  // // Link component is rendered with defined destination and CSS class
  return (
    <Link to={to} className="button-link">
      {children}
    </Link>
  );
};

export default ButtonLink;
