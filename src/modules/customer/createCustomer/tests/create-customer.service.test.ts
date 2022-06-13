/* eslint-disable no-undef */
import { CustomerRepositoryInterface } from 'modules/customer/interfaces/customer-repository.interface';
import CreateCustomerService from '../create-customer.service';
import CustomerRepositoryInMemory from '../inMemory/customer.repository.inMemory';
import CreateCustomerDto from '../dtos/create-customer.dto';

describe('Create Customer Service', () => {
  let customerRepository: CustomerRepositoryInterface;
  let createCustomerService: CreateCustomerService;

  beforeAll(() => {
    customerRepository = new CustomerRepositoryInMemory();
    createCustomerService = new CreateCustomerService(customerRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer: CreateCustomerDto = {
      email: 'teste@email.com',
      cpf: '51555677002',
      name: 'Teste Service',
      password: 'Teste@2022',
    };

    const newCustomer = await createCustomerService.execute(customer);

    expect(newCustomer).toHaveProperty('id');
    expect(newCustomer?.email).toBe('teste@email.com');
  });

  it('should not be able to create a an existing customer', async () => {
    const customer: CreateCustomerDto = {
      email: 'teste-existe@email.com',
      cpf: '03660347078',
      name: 'Teste Service',
      password: 'Teste@2022',
    };

    await createCustomerService.execute(customer);

    await expect(createCustomerService.execute(customer)).rejects.toEqual(
      new Error('Customer already exists!'),
    );
  });
});
