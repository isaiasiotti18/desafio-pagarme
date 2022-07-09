import { Router } from 'express';
import listTransactionsFactory from '../useCases/listTransactions/list-transactions.factory';

const transactionsListRoute = Router();

transactionsListRoute.get(
  '/transactions-list/:customerId',
  (request, response) => {
    listTransactionsFactory().handle(request, response);
  },
);

export default transactionsListRoute;
