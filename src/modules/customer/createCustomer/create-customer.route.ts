import { Router } from 'express';
import createCustomerController from './create-customer.controller';
import createCustomerMiddleware from './create-customer.middleware';

const createCustomerRoute = Router();

createCustomerRoute.post(
  '/create-customer',
  createCustomerMiddleware,
  createCustomerController,
);

export default createCustomerRoute;
