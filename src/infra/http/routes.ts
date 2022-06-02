import { Router } from 'express';
import transactionProcessingRoute from 'modules/transactions/routes/transaction-processing.routes';
import transactionsListRoute from 'modules/transactions/routes/transactions-list.routes';

const routes = Router();

routes.use('/transactions', [
  transactionsListRoute,
  transactionProcessingRoute,
]);

routes.use('/clients', async (request, response) =>
  response.json({
    message: 'Clients',
  }),
);

routes.use('/auth', async (request, response) =>
  response.json({
    message: 'Auth',
  }),
);

export default routes;
