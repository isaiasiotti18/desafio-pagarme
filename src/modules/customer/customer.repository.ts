import * as bcrypt from 'bcryptjs';
import { prisma } from '../../config/database/prisma-client';
import CreateCustomerDto from './createCustomer/dtos/create-customer.dto';
import { CustomerRepositoryInterface } from './interfaces/customer-repository.interface';
import { CustomerInterface } from './interfaces/customer.interface';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerInterface> {
    const { name, cpf, email, password } = createCustomerDto;

    const passwordHash = await bcrypt.hash(password, 10);

    const findCustomerByCpf = await prisma.customer.findUnique({
      where: {
        cpf,
      },
    });

    if (findCustomerByCpf) {
      throw new Error('Verify the informations.');
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        cpf,
        email,
        password: passwordHash,
      },
    });

    return {
      ...newCustomer,
    };
  }

  async exists(email: string): Promise<boolean> {
    const customer = prisma.customer.findUnique({
      where: {
        email,
      },
    });

    return !!customer;
  }
}
