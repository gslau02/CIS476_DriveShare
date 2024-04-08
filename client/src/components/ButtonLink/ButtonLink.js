import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ButtonLink = ({ to, children }) => {
  return (
    <Link to={to} className="button-link">
      {children}
    </Link>
  );
};

export default ButtonLink;
