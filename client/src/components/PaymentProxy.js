// PaymentProxy.js
import axios from 'axios';

const PaymentProxy = {
  handlePayment: async (bookingId) => {
    try {
      // Simulate secure communication and transaction with the payment system
      // For demonstration purposes, we'll just log a success message
      console.log('Proxy: Initiating payment transaction...');
      console.log('Proxy: Payment successful! Booking status changed to ACTIVE.');

      // Change the booking status to ACTIVE using the provided bookingId
      await axios.put(`http://localhost:3001/booking/activateBooking/${bookingId}`, { status: 'ACTIVE' });

      return true; // Indicate successful payment
    } catch (error) {
      console.error('Proxy: Error processing payment:', error.message);
      throw new Error('Failed to process payment.');
    }
  }
};

export default PaymentProxy;
