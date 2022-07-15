import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import CreatePaymentMethodDto from 'modules/paymentMethod/dtos/create-paymentMethod.dto';
import CreateTransactionDto from '../../createTransaction/dtos/create-transaction.dto';

export default async function createTransactionProcessingMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
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

    const createTransactionDto = new CreateTransactionDto();

    createTransactionDto.customerId = customerId;
    createTransactionDto.description = description;
    createTransactionDto.value = value;

    const createPaymentMethodDto = new CreatePaymentMethodDto();

    createPaymentMethodDto.cardNumber = cardNumber;
    createPaymentMethodDto.cardHolderName = cardHolderName;
    createPaymentMethodDto.validThru = validThru;
    createPaymentMethodDto.cardVerificationValue = cardVerificationValue;
    createPaymentMethodDto.cardType = cardType;

    const validations = await validate({
      ...createTransactionDto,
      ...createPaymentMethodDto,
    });

    if (validations.length) {
      return response.status(400).json({
        messages: validations.reduce((acc: any, curr: any) => {
          return [...acc, ...Object.values(curr?.constraints)];
        }, []),
      });
    }

    next();
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
