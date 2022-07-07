import { Router } from 'express';
import paymentIntentFactory from '../useCases/paymentIntent/payment-intent.factory';

const transactionProcessingRoute = Router();

transactionProcessingRoute.post(
  '/transaction-processing',
  (request, response) => {
    paymentIntentFactory().handle(request, response);
  },
);

export default transactionProcessingRoute;
