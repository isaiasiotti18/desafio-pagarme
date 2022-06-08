import { Router } from 'express';
import createCustomerRoute from 'modules/customer/createCustomer/create-customer.route';

import transactionProcessingRoute from 'modules/transaction/routes/transaction-processing.routes';
import transactionsListRoute from 'modules/transaction/routes/transactions-list.routes';

const routes = Router();

routes.use('/transactions', [
  transactionsListRoute,
  transactionProcessingRoute,
]);

routes.use('/customers', [createCustomerRoute]);

routes.use('/auth', async (request, response) =>
  response.json({
    message: 'Auth',
  }),
);

export default routes;
