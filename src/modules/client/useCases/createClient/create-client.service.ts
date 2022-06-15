import ClientRepositoryInterface from 'modules/client/interfaces/client-repository.interface';
import ClientInterface from 'modules/client/interfaces/client.interface';
import * as bcrypt from 'bcryptjs';
import CreateClientDto from './dtos/create-client.dto';

export default class CreateClientService {
  constructor(private readonly clientRepository: ClientRepositoryInterface) {}

  async execute(createClientDto: CreateClientDto): Promise<ClientInterface> {
    const clientExists = await this.clientRepository.exists(
      createClientDto.cnpj,
    );

    if (clientExists) {
      throw new Error('Client already exists!');
    }

    const passwordHash = await bcrypt.hash(createClientDto.password, 10);

    const newClient = await this.clientRepository.create({
      ...createClientDto,
      password: passwordHash,
    });

    return newClient;
  }
}
