import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import defaultCarImage from '../../assets/images/default_car.jpg';
import locationIcon from '../../assets/images/location.png';

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleContactCustomer = () => {
    navigate(`/chat/${order.renter._id}`, { state: { recipient: order.renter } } );
  };

  return (
    <div className="car-card">
      <div className="car-image-container">
        <img src={defaultCarImage} alt={`${order.car.make} ${order.car.model}`} className="car-image" />
      </div>
      <div className="car-details">
        <h3>{order.car.make} {order.car.model} {order.car.year}</h3>
        <p>Customer: {order.renter.name}</p>
        <div style={{display: 'flex'}}>
          <img src={locationIcon} className="car-location-image" />
          <p>{order.car.pickUpLocation}</p>
        </div>
        <p>Start from {order.startDate.substring(0, 10)} to {order.endDate.substring(0, 10)}</p>
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
      </div>
    </div>
  );
};

export default OrderCard;
