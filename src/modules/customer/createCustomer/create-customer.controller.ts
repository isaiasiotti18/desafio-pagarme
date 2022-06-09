import { Response, Request } from 'express';
import CreateCustomerService from './create-customer.service';

export default class CreateCustomerController {
  constructor(private createCustomerService: CreateCustomerService) {}

  async handle(request: Request, response: Response) {
    try {
      const { name, cpf, email, password } = request.body;

      const newCustomer = await this.createCustomerService.execute({
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
}
