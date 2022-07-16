import { Router } from 'express';
import createTransactionMiddleware from '../useCases/transactionProcessing/middlewares/create-transaction.middleware';
import paymentMethodMiddleware from '../useCases/transactionProcessing/middlewares/payment-method.middleware';
import transactionProcessingFactory from '../useCases/transactionProcessing/transaction-processing.factory';

const transactionProcessingRoute = Router();

transactionProcessingRoute.post(
  '/transaction-processing',
  paymentMethodMiddleware,
  createTransactionMiddleware,
  (request, response) => {
    transactionProcessingFactory().handle(request, response);
  },
);

export default transactionProcessingRoute;
