import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from '../components/BookingCard';

const MyBookingsPage = () => {
  const [currentTab, setCurrentTab] = useState('active');
  const [activeBookings, setActiveBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const activeResponse = await axios.get(`/bookings/active/${userId}`);
        const historyResponse = await axios.get(`/bookings/history/${userId}`);
        setActiveBookings(activeResponse.data);
        setBookingHistory(historyResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load bookings:', error);
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

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
      <button onClick={() => setCurrentTab('history')}>
        History
      </button>

      {(currentTab === 'active' && activeBookings.length === 0) && (
        <p>No active bookings found.</p>
      )}
      {(currentTab === 'history' && bookingHistory.length === 0) && (
        <p>No booking history found.</p>
      )}

      {currentTab === 'active' && activeBookings.map(booking => 
        <BookingCard key={booking._id} booking={booking} />
      )}

      {currentTab === 'history' && bookingHistory.map(booking => 
        <BookingCard key={booking._id} booking={booking} />
      )}
    </div>
  );
};

export default MyBookingsPage;
