/* eslint-disable no-undef */

import createCustomerService from '../create-customer.service';
import CreateCustomerDto from '../dtos/create-customer.dto';

describe('Create Customer Service', async () => {
  it('Should be able to create a new customer', () => {
    const customer: CreateCustomerDto = {
      email: 'teste@email.com',
      cpf: '51555677002',
      name: 'Teste Service',
      password: 'Teste@2022',
    };

    const newCustomer = createCustomerService(customer);
  });
});
