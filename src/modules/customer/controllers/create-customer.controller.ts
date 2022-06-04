import { Response, Request } from 'express';
import createCustomerRepository from '../repositories/create-customer.repository';

export default async function createCustomerController(
  request: Request,
  response: Response,
) {
  try {
    const { name, Cpf, email, password } = request.body;

    const createCustomer = await createCustomerRepository({
      name,
      Cpf,
      email,
      password,
    });

    return response.json({
      ...createCustomer,
      password: undefined,
    });
  } catch (error: any) {
    response.status(400).json({
      message: error?.message,
    });
  }
}
