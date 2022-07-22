import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import CreatePaymentMethodDto from '../../../../paymentMethod/dtos/create-paymentMethod.dto';

export default async function paymentMethodMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const {
      cardNumber,
      cardHolderName,
      validThru,
      cardVerificationValue,
      cardType,
    } = request.body;

    const createPaymentMethodDto = new CreatePaymentMethodDto();

    createPaymentMethodDto.cardNumber = cardNumber;
    createPaymentMethodDto.cardHolderName = cardHolderName;
    createPaymentMethodDto.validThru = validThru;
    createPaymentMethodDto.cardVerificationValue = cardVerificationValue;
    createPaymentMethodDto.cardType = cardType;

    const validations = await validate(createPaymentMethodDto);

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
