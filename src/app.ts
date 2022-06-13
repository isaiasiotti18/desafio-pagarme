import express, { NextFunction, Request, Response } from 'express';

import { pinoHttp } from 'pino-http';

import routes from './infra/http/routes';
import logger from './config/logger';

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err}`,
    });
  },
);

export default app;
