import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCard from '../components/BookingCard';
import { verifySession } from '../utils/auth';

const MyBookingsPage = () => {
  const [currentTab, setCurrentTab] = useState('active'); // Could also be 'history'
  const [activeBookings, setActiveBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken'); // Or fetch from a more secure place

    const initFetch = async () => {
      if (!sessionToken) {
        // TODO: Handle the lack of sessionToken (redirect to login?)
        return;
      }

      try {
        const sessionValid = await verifySession(sessionToken);
        setIsSessionValid(sessionValid);

        if (!sessionValid) {
          // TODO: Handle invalid session (redirect to login?)
          return;
        }

        const response = await axios.get('/api/bookings', {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        
        const now = new Date();
        setActiveBookings(response.data.filter(booking => new Date(booking.endDate) >= now));
        setPastBookings(response.data.filter(booking => new Date(booking.endDate) < now));
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching bookings', error);
      }
    };

    initFetch();
  }, []);

  if (!isSessionValid) {
    // TODO: Render something else here or redirect to the login page.
    return <div>Please log in to view your bookings.</div>;
  }

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      <div className="tab-container">
        <button onClick={() => setCurrentTab('active')} disabled={currentTab === 'active'}>
          Active Bookings
        </button>
        <button onClick={() => setCurrentTab('history')} disabled={currentTab === 'history'}>
          Past Bookings
        </button>
      </div>

      <div>
        {currentTab === 'active' && activeBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} isActive={true} />
        ))}
        
        {currentTab === 'history' && pastBookings.map(booking => (
          <BookingCard key={booking.id} booking={booking} isActive={false} />
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
