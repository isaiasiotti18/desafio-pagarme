import * as bcrypt from 'bcryptjs';
import { CustomerRepositoryInterface } from '../../interfaces/customer-repository.interface';
import { CustomerInterface } from '../../interfaces/customer.interface';
import CreateCustomerDto from './dtos/create-customer.dto';

export default class CreateCustomerService {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerInterface> {
    const customerExists = await this.customerRepository.exists(
      createCustomerDto.email,
    );

    if (customerExists) throw new Error('Customer already exists!');

    const passwordHash = await bcrypt.hash(createCustomerDto.password, 10);

    const newCustomer = await this.customerRepository.create({
      ...createCustomerDto,
      password: passwordHash,
    });

    return newCustomer;
  }
}
