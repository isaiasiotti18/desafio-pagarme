import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import CreateCustomerDto from '../dtos/create-customer.dto';

export default async function createCustomerRepository(
  createCustomerDto: CreateCustomerDto,
) {
  const prisma = new PrismaClient();

  const { name, Cpf, email, password } = createCustomerDto;

  const passwordHash = await bcrypt.hash(password, 10);

  const findCustomerByCpf = await prisma.customer.findUnique({
    where: {
      Cpf,
    },
  });

  if (findCustomerByCpf) {
    throw new Error('Verify the informations.');
  }

  const newCustomer = await prisma.customer.create({
    data: {
      name,
      Cpf,
      email,
      password: passwordHash,
    },
  });

  return newCustomer;
}