import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from '../components/BookingCard';
import { fetchBookingsByUser } from '../utils/booking';

const MyBookingsPage = () => {
  const userId = localStorage.getItem('userId');
  const [currentTab, setCurrentTab] = useState('active');
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await fetchBookingsByUser(userId);
        setActiveBookings(allBookings.activeBookings);
        setHistoryBookings(allBookings.pastBookings);
      } catch (error) {
        console.error('Failed to load bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      <div className="tabs">
        <button onClick={() => setCurrentTab('active')}>Active</button>
        <button onClick={() => setCurrentTab('history')}>History</button>
      </div>

      {loading ? (
        <div>Loading bookings...</div>
      ) : (
        <>
          {currentTab === 'active' && activeBookings.length === 0 ? (
            <p>No active bookings found.</p>
          ) : null}
          {currentTab === 'history' && historyBookings.length === 0 ? (
            <p>No booking history found.</p>
          ) : null}

          {currentTab === 'active' &&
            activeBookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}

          {currentTab === 'history' &&
            historyBookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
