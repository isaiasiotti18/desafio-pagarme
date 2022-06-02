import { Router } from 'express';

const transactionProcessingRoute = Router();

transactionProcessingRoute.post(
  '/transaction-processing',
  (request, response) => {
    response.send({
      message: 'transaction-processing',
    });
  },
);

export default transactionProcessingRoute;
