import { prisma } from 'config/database/prisma-client';
import CreateTransactionDto from './dtos/create-transaction.dto';

export default async function createTransaction(
  createTransactionDto: CreateTransactionDto,
  paymentMethodId: string,
) {
  const { value, description, customerId, clientId } = createTransactionDto;

  const newTransaction = await prisma.transaction.create({
    data: {
      value,
      description,
      clientId: '308f41ca-e580-4292-b4e5-9926cc65e6d0',
      paymentMethodId,
      customerId,
    },
  });

  return newTransaction;
}
