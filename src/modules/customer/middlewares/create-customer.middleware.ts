import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import CreateCustomerDto from '../dtos/create-customer.dto';

export default async function createCustomerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { name, Cpf, email, password } = request.body;

    const createCustomerValidate = new CreateCustomerDto();

    createCustomerValidate.name = name;
    createCustomerValidate.Cpf = Cpf;
    createCustomerValidate.email = email;
    createCustomerValidate.password = password;

    const validations = await validate(createCustomerValidate);

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
