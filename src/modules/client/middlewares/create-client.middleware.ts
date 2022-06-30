import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import CreateClientDto from '../useCases/createClient/dtos/create-client.dto';

export default async function createClientMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const { name, cnpj, email, password } = request.body;

    const createClientValidate = new CreateClientDto();

    createClientValidate.name = name;
    createClientValidate.cnpj = cnpj;
    createClientValidate.email = email;
    createClientValidate.password = password;

    const validations = await validate(createClientValidate);

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
