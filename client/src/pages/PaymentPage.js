import React from 'react';
import PaymentProxy from '../proxy/PaymentProxy';

const PaymentPage = ({ bookingData, car, bookingId }) => {
  const { startDate, endDate } = bookingData;
  const { rentalPricing } = car;
  
  // Convert startDate and endDate to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Calculate rental duration in days
  const rentalDuration = `${startDate} to ${endDate}`;
  const durationInDays = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)) + 1;

  // Calculate total price
  const totalPrice = durationInDays * rentalPricing;

  const handlePayment = async () => {
    try {
        // Use the PaymentProxy to handle the payment transaction
        const paymentProxy = new PaymentProxy();
        await paymentProxy.handlePayment(bookingId);
        alert('Payment successful! Booking status changed to ACTIVE.');
      } catch (error) {
        console.error('Error processing payment:', error.message);
        alert('Failed to process payment.');
      }
  };

  return (
    <div className="invoice-container">
      <h2>Payment Details</h2>
      <div className="invoice-details">
        <p><strong>Car:</strong> <span>{car.make} {car.model}</span></p>
        <p><strong>Rental Duration:</strong> <span>{rentalDuration}</span></p>
        <p><strong>Price per Day:</strong> <span>${rentalPricing}</span></p>
        <p><strong>Total Price:</strong> <span>${totalPrice}</span></p>
      </div>
      <button onClick={handlePayment} className="pay-button">Pay Now</button>
    </div>
  );
};

export default PaymentPage;


