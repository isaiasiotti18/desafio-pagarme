import CreateClientDto from '../useCases/createClient/dtos/create-client.dto';
import ClientInterface from './client.interface';

export default interface ClientRepositoryInterface {
  create(createClientDto: CreateClientDto): Promise<ClientInterface>;
  exists(cnpj: string): Promise<boolean>;
}
