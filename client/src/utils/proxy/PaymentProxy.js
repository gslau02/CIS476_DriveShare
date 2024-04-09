// // PaymentProxy.js
import PaymentService from './PaymentService';
import RealPaymentService from './RealPaymentService';

// Concrete class of PaymentProxy, extending from PaymentService
class PaymentProxy extends PaymentService {
  constructor() {
    // Call parent class constructore
    super();
    this.realPaymentService = new RealPaymentService();
  }

  // Handle payment method
  async handlePayment(bookingId) {
    try {
      console.log('PaymentProxy: Initiating payment transaction...');
      console.log('PaymentProxy: Pre-processing payment...');

      // Call handle payment method of realPaymentService 
      const result = await this.realPaymentService.handlePayment(bookingId);

      console.log('PaymentProxy: Post-processing payment...');

      // Return payment result
      return result; 
    } catch (error) {
      console.error('PaymentProxy: Error processing payment:', error.message);
      throw new Error('Failed to process payment.');
    }
  }
}

export default PaymentProxy;


