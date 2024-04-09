import React, { useState, useEffect } from 'react';
import BookingCard from '../components/BookingCard';
import { fetchBookingsByUser, postRenterReview } from '../middlewares/booking';

const MyBookingsPage = () => {
  // Get user ID from localStorage
  const userId = localStorage.getItem('userId');
  // Initialize state variables
  const [currentTab, setCurrentTab] = useState('active');
  const [activeBookings, setActiveBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({});

  // Fetch user bookings on component mount
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

  // Update review data when input changes
  const handleReviewChange = (bookingId, key, value) => {
    setReviewData({
      ...reviewData,
      [bookingId]: {
        ...reviewData[bookingId],
        [key]: value,
      },
    });
  };

  // Submit renter review
  const handleReviewSubmit = async (bookingId) => {
    const { rating, feedback } = reviewData[bookingId] || {};
    if (!rating || !feedback || isNaN(rating) || rating < 0 || rating > 5) {
      alert('Please provide a valid rating (0-5) and feedback before submitting.');
      return;
    }
    try {
      await postRenterReview(bookingId, rating, feedback);
      const updatedHistoryBookings = historyBookings.map((booking) => {
        if (booking._id === bookingId) {
          return {
            ...booking,
            renterReview: {
              rating: rating,
              feedback: feedback,
            },
          };
        } else {
          return booking;
        }
      });
      setHistoryBookings(updatedHistoryBookings);
      alert('Thank you for submitting your review!');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  // Render the component
  return (
    <div style={{ textAlign: '-webkit-center'}}>
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
                <div className='review-card'>
                  <label htmlFor={`rating-${booking._id}`}>Rating:</label>
                  <div className="star-rating">
                    {[...Array(5)].map((_, index) => (
                      <label key={index}>
                        <input
                          type="radio"
                          name={`rating-${booking._id}`}
                          value={index + 1}
                          checked={reviewData[booking._id]?.rating === index + 1}
                          onChange={(e) => handleReviewChange(booking._id, 'rating', parseInt(e.target.value))}
                        />
                        <span className="star">&#9733;</span>
                      </label>
                    ))}
                  </div>
                  <label htmlFor={`feedback-${booking._id}`}>Feedback:</label>
                  <textarea
                    style={{margin: '0px 10px 0px 10px'}}
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
