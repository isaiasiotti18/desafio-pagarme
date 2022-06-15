import { prisma } from '../../config/database/prisma-client';
import ClientRepositoryInterface from './interfaces/client-repository.interface';
import clientInterface from './interfaces/client.interface';
import CreateClientDto from './useCases/createClient/dtos/create-client.dto';

export default class ClientRepository implements ClientRepositoryInterface {
  async create(createClientDto: CreateClientDto): Promise<clientInterface> {
    const { name, cnpj, email, password } = createClientDto;

    const newClient = await prisma.client.create({
      data: {
        cnpj,
        email,
        name,
        password,
      },
    });

    return { ...newClient };
  }

  async exists(cnpj: string): Promise<boolean> {
    const client = await prisma.client.findUnique({
      where: {
        cnpj,
      },
    });

    return !!client;
  }
}
