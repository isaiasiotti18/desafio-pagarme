import TransactionRepository from 'modules/transaction/transaction.repository';
import PaymentIntentController from './payment-intent.controller';
import PaymentIntentService from './payment-intent.service';

const paymentIntentFactory = () => {
  const transactionRepository = new TransactionRepository();
  const paymentIntentService = new PaymentIntentService(transactionRepository);
  const paymentIntentController = new PaymentIntentController(
    paymentIntentService,
  );
  return paymentIntentController;
};

export default paymentIntentFactory;
