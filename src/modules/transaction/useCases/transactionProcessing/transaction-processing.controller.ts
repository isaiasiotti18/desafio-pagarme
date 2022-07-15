import { Request, Response } from 'express';
import TransactionProcessingService from './transaction-processing.service';

export default class TransactionProcessingController {
  constructor(
    private readonly transactionProcessingService: TransactionProcessingService,
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const {
        customerId,
        value,
        description,
        cardNumber,
        cardHolderName,
        validThru,
        cardVerificationValue,
        cardType,
      } = request.body;

      const transactionProcessing =
        await this.transactionProcessingService.execute({
          createTransactionDto: {
            value,
            description,
            customerId,
          },
          createPaymentMethodDto: {
            cardType,
            cardNumber,
            cardHolderName,
            validThru,
            cardVerificationValue,
          },
        });

      return response.json(transactionProcessing);
    } catch (error: any) {
      response.status(400).json({
        message: error?.message,
      });
    }
  }
}
