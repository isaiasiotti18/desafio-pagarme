import CreateCustomerDto from './dtos/create-customer.dto';
import CustomerRepository from '../customer.repository';

export default async function createCustomerService(
  createCustomerDto: CreateCustomerDto,
) {
  const customerRepository = new CustomerRepository();

  const customerExists = await customerRepository.exists(
    createCustomerDto.email,
  );

  if (customerExists) throw new Error('Customer already exists!');

  const newCustomer = await customerRepository.create({
    ...createCustomerDto,
  });

  return newCustomer;
}
