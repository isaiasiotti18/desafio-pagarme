import { Request, Response } from 'express';
import CreateClientService from './create-client.service';

export default class CreateClientController {
  constructor(private readonly createClientService: CreateClientService) {}

  async handle(request: Request, response: Response) {
    try {
      const { name, cnpj, email, password } = request.body;

      const newClient = await this.createClientService.execute({
        name,
        cnpj,
        email,
        password,
      });

      return response.json({
        ...newClient,
        password: undefined,
      });
    } catch (error: any) {
      response.status(400).json({
        message: error?.message,
      });
    }
  }
}
