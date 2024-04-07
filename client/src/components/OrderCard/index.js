import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/orders/${order._id}');
  };

  return (
    <div className="order-card" onClick={handleCardClick}>
      <h3>{order.car.make} {order.car.model} {order.car.year}</h3>
      <p>Car Owner: {order.renter.email}</p>
      <p>Pickup Locaation: {order.car.pickUpLocation}</p>
      <p>Start Date: {order.startDate}</p>
      <p>End Date: {order.endDate}</p>
      <p>Status: {order.status}</p>
      {/* You can include additional information about the order here */}
    </div>
  );
};

export default OrderCard;
