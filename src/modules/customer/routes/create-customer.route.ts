import { Router } from 'express';
import createCustomerController from '../controllers/create-customer.controller';
import createCustomerMiddleware from '../middlewares/create-customer.middleware';

const createCustomerRoute = Router();

createCustomerRoute.post(
  '/create-customer',
  createCustomerMiddleware,
  createCustomerController,
);

export default createCustomerRoute;
