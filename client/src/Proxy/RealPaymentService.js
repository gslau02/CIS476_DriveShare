// RealPaymentService.js
import axios from 'axios';
import PaymentService from './PaymentService';

// Concrete class of RealPaymentService, extending from PaymentService
class RealPaymentService extends PaymentService{
  async handlePayment(bookingId) {
    try {
      // Simulate secure communication and transaction with the payment system
      console.log('RealPaymentService: Initiating payment transaction...');
      console.log('RealPaymentService: Payment successful! Booking status changed to ACTIVE.');

      // Change the booking status to ACTIVE using the provided bookingId
      await axios.put(`http://localhost:3001/booking/activateBooking/${bookingId}`, { status: 'ACTIVE' });

      // In a real scenario, this would actually change the booking status
      // For demonstration purposes, we'll just log the bookingId
      console.log('RealPaymentService: BookingId changed:', bookingId);

      return true; // Indicate successful payment
    } catch (error) {
      console.error('RealPaymentService: Error processing payment:', error.message);
      throw new Error('Failed to process payment.');
    }
  }
}

export default RealPaymentService;


