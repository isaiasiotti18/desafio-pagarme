import CreateCustomerDto from '../createCustomer/dtos/create-customer.dto';
import { CustomerInterface } from './customer.interface';

export interface CustomerRepositoryInterface {
  create(createCustomerDto: CreateCustomerDto): Promise<CustomerInterface>;
  exists(email: string): Promise<boolean>;
}
