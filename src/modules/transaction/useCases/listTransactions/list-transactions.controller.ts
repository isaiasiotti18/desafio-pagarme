import { Request, Response } from 'express';
import ListTransactionService from './list-transactions.service';

export default class ListTransactionsController {
  constructor(
    private readonly listTransactionsService: ListTransactionService,
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const { customerId } = request.body;

      const listTransactions = await this.listTransactionsService.execute(
        customerId,
      );

      return response.json({
        ...listTransactions,
      });
    } catch (error: any) {
      response.status(400).json({
        message: error?.message,
      });
    }
  }
}
