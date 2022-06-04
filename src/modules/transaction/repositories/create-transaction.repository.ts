import { PrismaClient } from '@prisma/client';
import CreateTransactionDto from '../dtos/create-transaction.dto';

export default async function createCustomerTransaction(
  createTransactionDto: CreateTransactionDto,
) {
  const { value, description, paymentMethodId, customerId } =
    createTransactionDto;

  const prisma = new PrismaClient();

  const newTransaction = await prisma.transaction.create({
    data: {
      value,
      description,
      paymentMethodId,
      clientId: '308f41ca-e580-4292-b4e5-9926cc65e6d0',
      customerId,
    },
  });

  return newTransaction;
}
