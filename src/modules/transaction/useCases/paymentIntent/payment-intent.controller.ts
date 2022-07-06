import { Request, Response } from 'express';
import PaymentIntentService from './payment-intent.service';

export default class PaymentIntentController {
  constructor(paymentIntentService: PaymentIntentService) {}

  async handle(request: Request, response: Response) {
    const {
      value,
      description,
      paymentMethod,
      cardNumber,
      cardHolderName,
      validThru,
      cardVerificationValue,
    } = request.body;
  }
}
