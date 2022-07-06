import { Transaction } from '@prisma/client';
import { prisma } from '../../config/database/prisma-client';
import CreateTransactionDto from './useCases/createTransaction/dtos/create-transaction.dto';

import TransactionRepositoryInterface from './interfaces/transaction-repository.interface';

export default class TransactionRepository
  implements TransactionRepositoryInterface
{
  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const { clientId, customerId, description, value, paymentMethodId } =
      createTransactionDto;

    const newTransaction = await prisma.transaction.create({
      data: {
        clientId,
        customerId,
        description,
        value,
        paymentMethodId,
      },
    });

    return newTransaction;
  }

  async exists(transactionId: string): Promise<boolean> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        transactionId,
      },
    });

    return !!transaction;
  }
}
