import { Router } from 'express';

import createClientRoute from 'modules/client/routes/create-client.route';
import transactionProcessingRoute from '../../modules/transaction/routes/transaction-processing.routes';
import transactionsListRoute from '../../modules/transaction/routes/transactions-list.routes';
import createCustomerRoute from '../../modules/customer/routes/create-customer.route';

const routes = Router();

routes.use('/transactions', [
  transactionsListRoute,
  transactionProcessingRoute,
]);

routes.use('/customers', [createCustomerRoute]);

routes.use('/clients', [createClientRoute]);

routes.use('/auth', async (request, response) =>
  response.json({
    message: 'Auth',
  }),
);

export default routes;
