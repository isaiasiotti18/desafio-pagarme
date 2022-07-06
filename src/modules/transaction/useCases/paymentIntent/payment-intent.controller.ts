import { Request, Response } from 'express';
import PaymentIntentService from './payment-intent.service';

export default class PaymentIntentController {
  constructor(private readonly paymentIntentService: PaymentIntentService) {}

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

      await this.paymentIntentService.execute({
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

      return response.json({
        value,
        description,
        cardType,
        cardNumber,
        cardHolderName,
        validThru,
        cardVerificationValue,
      });
    } catch (error: any) {
      response.status(400).json({
        message: error?.message,
      });
    }
  }
}
