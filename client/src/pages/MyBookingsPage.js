import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from '../components/BookingCard';

const MyBookingsPage = () => {
  const [currentTab, setCurrentTab] = useState('active');
  const [activeBookings, setActiveBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`/myBookings/${userId}`);
        setActiveBookings(response.data.activeBookings);
        setPastBookings(response.data.pastBookings);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load bookings:', error);
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

    const userId = localStorage.getItem('userId'); // Replace with secure authentication method
    fetchBookings();
  }, []);

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Your Bookings</h2>
      <button onClick={() => setCurrentTab('active')}>
        Active
      </button>
      <button onClick={() => setCurrentTab('completed')}>
        History
      </button>

      <div>
        {currentTab === 'active' && activeBookings.map(booking => 
          <BookingCard key={booking._id} booking={booking} />
        )}
        {currentTab === 'completed' && pastBookings.map(booking => 
          <BookingCard key={booking._id} booking={booking} />
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;