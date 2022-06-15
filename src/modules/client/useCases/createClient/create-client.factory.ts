import ClientRepository from 'modules/client/client.repository';
import CreateClientController from './create-client.controller';
import CreateClientService from './create-client.service';

const createClientFactory = () => {
  const clientRepository = new ClientRepository();
  const createClientService = new CreateClientService(clientRepository);
  const createClientController = new CreateClientController(
    createClientService,
  );
  return createClientController;
};

export default createClientFactory;
