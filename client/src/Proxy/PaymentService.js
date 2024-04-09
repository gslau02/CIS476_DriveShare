// Abstract class of PaymentService
class PaymentService {
  // Handle payment abstract method
    async handlePayment(bookingId) {
      throw new Error('Method handlePayment must be implemented');
    }
}

export default PaymentService;