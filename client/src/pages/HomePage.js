import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import AllCarsPage from './AllCarsPage';
import '../styles/style.css';

const HomePage = () => {
  // Initialize navigate function from useNavigate hook
  const navigate = useNavigate();
  // Check if the user is a car owner
  const isCarOwner = localStorage.getItem('isCarOwner');

  // Handle logout function
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate('/auth');
      alert('Logout successful');
    } catch (error) {
      alert('Logout failed');
      console.error(error.message);
    }
  };

  // Render the component
  return (
    <div>
      <nav>
        <button onClick={() => navigate('/myBookings')}>My Bookings</button>
        {isCarOwner === 'true' && <button onClick={() => navigate('/myOrders')}>My Orders</button>}
        <button onClick={() => navigate('/myListings')}>My Listings</button>
        <button onClick={() => navigate('/inbox')}>Inbox</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <AllCarsPage />
    </div>
  );
};

export default HomePage;
