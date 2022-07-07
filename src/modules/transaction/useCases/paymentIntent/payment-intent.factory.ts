import PaymentIntentController from './payment-intent.controller';
import PaymentIntentService from './payment-intent.service';

const paymentIntentFactory = () => {
  const paymentIntentService = new PaymentIntentService();
  const paymentIntentController = new PaymentIntentController(
    paymentIntentService,
  );
  return paymentIntentController;
};

export default paymentIntentFactory;
