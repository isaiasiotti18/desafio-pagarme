import { Router } from 'express';
import listTransactionsFactory from '../useCases/listTransactions/list-transactions.factory';

const listTransactionsRoute = Router();

listTransactionsRoute.get('/list-transactions', (request, response) => {
  listTransactionsFactory().handle(request, response);
});

export default listTransactionsRoute;
