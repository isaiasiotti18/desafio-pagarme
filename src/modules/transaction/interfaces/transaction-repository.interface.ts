import { Transaction } from '@prisma/client';
import CreateTransactionDto from '../useCases/createTransaction/dtos/create-transaction.dto';

export default interface TransactionRepositoryInterface {
  create(createTransactionDto: CreateTransactionDto): Promise<Transaction>;
  exists(transactionId: string): Promise<boolean>;
}
