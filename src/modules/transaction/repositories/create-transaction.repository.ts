import { prisma } from '../../../config/database/prisma-client';
import CreateTransactionDto from '../dtos/create-transaction.dto';

export default async function createTransaction(
  createTransactionDto: CreateTransactionDto,
) {
  const { value, description, paymentMethodId, customerId, clientId } =
    createTransactionDto;

  const newTransaction = await prisma.transaction.create({
    data: {
      value,
      description,
      paymentMethodId,
      customerId,
      clientId,
    },
  });

  return newTransaction;
}
