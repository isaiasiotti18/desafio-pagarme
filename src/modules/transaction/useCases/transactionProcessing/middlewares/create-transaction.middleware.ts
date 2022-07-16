import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import CreateTransactionDto from '../../createTransaction/dtos/create-transaction.dto';

export default async function createTransactionMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { customerId, value, description } = request.body;

    const createTransactionDto = new CreateTransactionDto();

    createTransactionDto.customerId = customerId;
    createTransactionDto.description = description;
    createTransactionDto.value = value;

    const validations = await validate(createTransactionDto);

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
