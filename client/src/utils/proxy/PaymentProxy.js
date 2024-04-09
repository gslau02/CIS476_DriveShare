// // PaymentProxy.js
// import axios from 'axios';

// const PaymentProxy = {
//   handlePayment: async (bookingId) => {
//     try {
//       // Simulate secure communication and transaction with the payment system
//       // For demonstration purposes, we'll just log a success message
//       console.log('Proxy: Initiating payment transaction...');
//       console.log('Proxy: Payment successful! Booking status changed to ACTIVE.');

//       // Change the booking status to ACTIVE using the provided bookingId
//       await axios.put(`http://localhost:3001/booking/activateBooking/${bookingId}`, { status: 'ACTIVE' });

//       return true; // Indicate successful payment
//     } catch (error) {
//       console.error('Proxy: Error processing payment:', error.message);
//       throw new Error('Failed to process payment.');
//     }
//   }
// };

// export default PaymentProxy;

import PaymentService from './PaymentService';
import RealPaymentService from './RealPaymentService';

class PaymentProxy extends PaymentService {
  constructor() {
    super();
    this.realPaymentService = new RealPaymentService();
  }

  async handlePayment(bookingId) {
    try {
      console.log('PaymentProxy: Initiating payment transaction...');
      console.log('PaymentProxy: Pre-processing payment...');

      const result = await this.realPaymentService.handlePayment(bookingId);

      console.log('PaymentProxy: Post-processing payment...');

      return result;
    } catch (error) {
      console.error('PaymentProxy: Error processing payment:', error.message);
      throw new Error('Failed to process payment.');
    }
  }
}

export default PaymentProxy;


