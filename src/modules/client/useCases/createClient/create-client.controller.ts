import { Request, Response } from 'express';
import CreateClientService from './create-client.service';

export default class CreateClientController {
  constructor(private readonly createClientService: CreateClientService) {}

  async handle(request: Request, response: Response) {
    return response.json({});
  }
}
