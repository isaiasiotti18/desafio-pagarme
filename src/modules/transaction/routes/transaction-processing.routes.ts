import { Router } from 'express';
import paymentIntentFactory from '../useCases/paymentIntent/payment-intent.factory';
import createPaymentIntentMiddleware from '../useCases/paymentIntent/middlewares/payment-intent.middleware';

const transactionProcessingRoute = Router();

transactionProcessingRoute.post(
  '/transaction-processing',
  createPaymentIntentMiddleware,
  (request, response) => {
    paymentIntentFactory().handle(request, response);
  },
);

export default transactionProcessingRoute;
