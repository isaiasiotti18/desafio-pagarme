import { Router } from 'express';
import { createCustomerFactory } from '../useCases/createCustomer/create-customer.factory';
import createCustomerMiddleware from '../middlewares/create-customer.middleware';

const createCustomerRoute = Router();

createCustomerRoute.post(
  '/create-customer',
  createCustomerMiddleware,
  (request, response) => {
    createCustomerFactory().handle(request, response);
  },
);

export default createCustomerRoute;
