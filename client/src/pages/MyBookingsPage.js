import React, { useState, useEffect } from 'react';
import BookingCard from '../components/BookingCard';
//import { getUserBookings } from '../api';
// import { mockActiveBookings, mockPastBookings } from '../__mock__/mockData';

const MyBookingsPage = () => {
  const [currentTab, setCurrentTab] = useState('active'); // 'active' or 'history'
  const [activeBookings, setActiveBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        //const response = await getUserBookings(); // Add any required headers or authorization tokens
        // setActiveBookings(mockActiveBookings);
        // setPastBookings(mockPastBookings);
        const now = new Date();
        //setActiveBookings(response.data.filter(booking => new Date(booking.end) >= now));
        //setPastBookings(response.data.filter(booking => new Date(booking.end) < now));
        setLoading(false);
      } catch (err) {
        setError('Failed to load bookings.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>My Bookings</h2>
      <div>
        <button onClick={() => setCurrentTab('active')} disabled={currentTab === 'active'}>Active</button>
        <button onClick={() => setCurrentTab('history')} disabled={currentTab === 'history'}>History</button>
      </div>

      <div>
        {currentTab === 'active' && (
          <>
            <h3>Active Bookings</h3>
            {activeBookings.length > 0 ? (
              activeBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} active={true} />
              ))
            ) : (
              <p>No active bookings found.</p>
            )}
          </>
        )}

        {currentTab === 'history' && (
          <>
            <h3>Past Bookings</h3>
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} active={false} />
              ))
            ) : (
              <p>No past bookings found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
