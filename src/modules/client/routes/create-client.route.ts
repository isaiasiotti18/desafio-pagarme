import { Router } from 'express';

import createClientFactory from '../useCases/createClient/create-client.factory';
import createClientMiddleware from '../middlewares/create-client.middleware';

const createClientRoute = Router();

createClientRoute.post(
  '/create-client',
  createClientMiddleware,
  (request, response) => {
    createClientFactory().handle(request, response);
  },
);

export default createClientRoute;
