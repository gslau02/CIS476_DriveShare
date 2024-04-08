import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import { fetchOrdersByOwner, postOwnerReview } from '../utils/booking';

const MyOrdersPage = () => {
  const userId = localStorage.getItem('userId');
  const [currentTab, setCurrentTab] = useState('active');
  const [activeOrders, setactiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await fetchOrdersByOwner(userId);
        setactiveOrders(allOrders.activeOrders);
        setHistoryOrders(allOrders.pastOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReviewChange = (orderId, key, value) => {
    setReviewData({
      ...reviewData,
      [orderId]: {
        ...reviewData[orderId],
        [key]: value,
      },
    });
  };

  const handleReviewSubmit = async (orderId) => {
    const { rating, feedback } = reviewData[orderId] || {};
    if (!rating || !feedback || isNaN(rating) || rating < 0 || rating > 5) {
      alert('Please provide a valid rating (0-5) and feedback before submitting.');
      return;
    }
    try {
      await postOwnerReview(orderId, rating, feedback);
      const updatedHistoryOrders = historyOrders.map((order) => {
        if (order._id === orderId) {
          return {
            ...order,
            ownerReview: {
              rating: rating,
              feedback: feedback,
            },
          };
        } else {
          return order;
        }
      });
      setHistoryOrders(updatedHistoryOrders);
      alert('Thank you for submitting your review!');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <div>
      <h2>My Orders</h2>
      <div className="tabs">
        <button onClick={() => setCurrentTab('active')}>Active</button>
        <button onClick={() => setCurrentTab('history')}>History</button>
      </div>

      {loading ? (
        <div>Loading orders...</div>
      ) : (
        <>
          {currentTab === 'active' && activeOrders.length === 0 ? (
            <p>No active order found.</p>
          ) : null}
          {currentTab === 'history' && historyOrders.length === 0 ? (
            <p>No order history found.</p>
          ) : null}

          {currentTab === 'active' &&
            activeOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}

          {currentTab === 'history' &&
            historyOrders.map((order) => (
              <div key={order._id}>
                <OrderCard order={order} />
                {order.status === 'COMPLETED' && order.ownerReview.rating === null ? (
                  <div>
                    <label htmlFor={`rating-${order._id}`}>Rating:</label>
                    <input
                      type="number"
                      id={`rating-${order._id}`}
                      required
                      min="0"
                      max="5"
                      value={reviewData[order._id]?.rating || ''}
                      onChange={(e) => handleReviewChange(order._id, 'rating', e.target.value)}
                    />
                    <label htmlFor={`feedback-${order._id}`}>Feedback:</label>
                    <textarea
                      id={`feedback-${order._id}`}
                      required
                      value={reviewData[order._id]?.feedback || ''}
                      onChange={(e) => handleReviewChange(order._id, 'feedback', e.target.value)}
                    />
                    <button onClick={() => handleReviewSubmit(order._id)}>Submit Review</button>
                  </div>
                ) : null}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default MyOrdersPage;
