/* eslint-disable import/prefer-default-export */
import CustomerRepository from '../../customer.repository';
import CreateCustomerController from './create-customer.controller';
import CreateCustomerService from './create-customer.service';

const createCustomerFactory = () => {
  const customerRepository = new CustomerRepository();
  const createCustomerService = new CreateCustomerService(customerRepository);
  const createCustomerController = new CreateCustomerController(
    createCustomerService,
  );
  return createCustomerController;
};

export default createCustomerFactory;
