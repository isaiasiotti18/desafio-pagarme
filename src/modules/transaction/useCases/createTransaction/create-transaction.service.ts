import { Transaction } from '@prisma/client';
import TransactionRepositoryInterface from 'modules/transaction/interfaces/transaction-repository.interface';
import CreateTransactionDto from './dtos/create-transaction.dto';

export default class CreateTransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  async execute(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    
  }
}
