import React, { useState, useEffect } from 'react';
import BookingCard from '../components/BookingCard';
import { fetchBookingsByUser, postRenterReview } from '../utils/booking';

const MyBookingsPage = () => {
  const userId = localStorage.getItem('userId');
  const [currentTab, setCurrentTab] = useState('active');
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({});

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

  const handleReviewChange = (bookingId, key, value) => {
    setReviewData({
      ...reviewData,
      [bookingId]: {
        ...reviewData[bookingId],
        [key]: value,
      },
    });
  };

  const handleReviewSubmit = async (bookingId) => {
    const { rating, feedback } = reviewData[bookingId] || {};
    if (!rating || !feedback || isNaN(rating) || rating < 0 || rating > 5) {
      alert('Please provide a valid rating (0-5) and feedback before submitting.');
      return;
    }
    try {
      await postRenterReview(bookingId, rating, feedback);
      const updatedHistoryBookings = historyBookings.map((booking) => {
        booking.renterReview.rating = rating;
        booking.renterReview.feedback = feedback;
        alert('Thank you for submitting your review!');
        return booking;
      });
      setHistoryBookings(updatedHistoryBookings);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

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
              <div key={booking._id}>
                <BookingCard booking={booking} />
                {booking.status === 'COMPLETED' && booking.renterReview.rating === null ? (
                  <div>
                    <label htmlFor={`rating-${booking._id}`}>Rating:</label>
                    <input
                      type="number"
                      id={`rating-${booking._id}`}
                      required
                      min="0"
                      max="5"
                      value={reviewData[booking._id]?.rating || ''}
                      onChange={(e) => handleReviewChange(booking._id, 'rating', e.target.value)}
                    />
                    <label htmlFor={`feedback-${booking._id}`}>Feedback:</label>
                    <textarea
                      id={`feedback-${booking._id}`}
                      required
                      value={reviewData[booking._id]?.feedback || ''}
                      onChange={(e) => handleReviewChange(booking._id, 'feedback', e.target.value)}
                    />
                    <button onClick={() => handleReviewSubmit(booking._id)}>Submit Review</button>
                  </div>
                ) : null}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
