import { v4 as uuid } from 'uuid';
import CustomerRepositoryInterface from 'modules/customer/interfaces/customer-repository.interface';
import CustomerInterface from 'modules/customer/interfaces/customer.interface';
import CreateCustomerDto from '../dtos/create-customer.dto';

export default class CustomerRepositoryInMemory
  implements CustomerRepositoryInterface
{
  private customers: CustomerInterface[] = [];

  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerInterface> {
    const customer = Object.assign(createCustomerDto, {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.customers.push(customer);

    return customer;
  }

  async exists(email: string): Promise<boolean> {
    // eslint-disable-next-line no-shadow
    const customer = this.customers.some(customer => customer.email === email);
    return customer;
  }
}
