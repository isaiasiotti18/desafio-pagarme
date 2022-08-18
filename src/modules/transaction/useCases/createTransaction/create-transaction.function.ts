import { prisma } from '../../../../config/database/prisma-client';
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
      clientId,
      customerId,
      paymentMethodId,
    },
  });

  return newTransaction;
}
