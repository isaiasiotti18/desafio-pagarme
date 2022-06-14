import { prisma } from '../../config/database/prisma-client';
import CreateCustomerDto from './useCases/createCustomer/dtos/create-customer.dto';
import CustomerRepositoryInterface from './interfaces/customer-repository.interface';
import CustomerInterface from './interfaces/customer.interface';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerInterface> {
    const { name, cpf, email, password } = createCustomerDto;

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        cpf,
        email,
        password,
      },
    });

    return {
      ...newCustomer,
    };
  }

  async exists(email: string): Promise<boolean> {
    const customer = await prisma.customer.findUnique({
      where: {
        email,
      },
    });

    return !!customer;
  }
}
