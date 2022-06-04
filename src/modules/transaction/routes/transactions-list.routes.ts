import { Router } from 'express';

const transactionListRoute = Router();

transactionListRoute.get('/transactions-list', (request, response) => {
  response.json({
    message: 'transactions-list',
  });
});

export default transactionListRoute;
