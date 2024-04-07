import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleContactCustomer = () => {
    navigate(`/chat/${order.renter._id}`);
  };

  return (
    <div className="order-card">
      <h3>{order.car.make} {order.car.model} {order.car.year}</h3>
      <p>Customer: {order.renter.name}</p>
      <p>Pickup Locaation: {order.car.pickUpLocation}</p>
      <p>Start Date: {order.startDate}</p>
      <p>End Date: {order.endDate}</p>
      <p>Status: {order.status}</p>
      {order.status === 'COMPLETED' && order.ownerReview.rating ? (
        <div>
          <p>My Review: </p>
          <p>Rating: {order.ownerReview.rating}</p>
          <p>Feedback: {order.ownerReview.feedback}</p>
        </div>
      ): null } 
      {order.status === 'COMPLETED' && order.renterReview.rating ? (
        <div>
          <p>Review from Customer: </p>
          <p>Rating: {order.renterReview.rating}</p>
          <p>Feedback: {order.renterReview.feedback}</p>
        </div>
      ): null } 
      {(order.status === 'REQUESTED' || order.status === 'ACTIVE') && (
        <button onClick={handleContactCustomer}>Contact Customer</button>
      )}
      {/* You can include additional information about the order here */}
    </div>
  );
};

export default OrderCard;
