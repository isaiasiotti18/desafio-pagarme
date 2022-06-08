import { Response, Request } from 'express';
import createCustomerService from './create-customer.service';

export default async function createCustomerController(
  request: Request,
  response: Response,
) {
  try {
    const { name, cpf, email, password } = request.body;

    const newCustomer = await createCustomerService({
      name,
      cpf,
      email,
      password,
    });

    return response.json({
      ...newCustomer,
      password: undefined,
    });
  } catch (error: any) {
    response.status(400).json({
      message: error?.message,
    });
  }
}
