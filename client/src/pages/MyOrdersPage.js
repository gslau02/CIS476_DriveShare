import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import { fetchOrdersByOwner } from '../utils/booking';

const MyOrdersPage = () => {
  const userId = localStorage.getItem('userId');
  const [currentTab, setCurrentTab] = useState('active');
  const [activeOrders, setactiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
              <OrderCard key={order._id} order={order} />
            ))}
        </>
      )}
    </div>
  );
};

export default MyOrdersPage;
