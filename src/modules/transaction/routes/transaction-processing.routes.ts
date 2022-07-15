import { Router } from 'express';
import transactionProcessingFactory from '../useCases/transactionProcessing/transaction-processing.factory';
import createTransactionProcessingMiddleware from '../useCases/transactionProcessing/middlewares/transaction-processing.middleware';

const transactionProcessingRoute = Router();

transactionProcessingRoute.post(
  '/transaction-processing',
  createTransactionProcessingMiddleware,
  (request, response) => {
    transactionProcessingFactory().handle(request, response);
  },
);

export default transactionProcessingRoute;
