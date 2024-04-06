// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    //userSession.logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to DriveShare</h1>
      <nav>
        <button onClick={() => navigate('/myBookings')}>My Bookings</button>
        <button onClick={() => navigate('/myListings')}>My Listings</button>
        <button onClick={() => navigate('/inbox')}>Inbox</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {/* ... other content ... */}
    </div>
  );
};

export default HomePage;