import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import routes from 'infra/http/routes';

function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/v1', routes);

  app.use(morgan('short'));

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

  app.listen(8080, () => {
    try {
      console.log('Pagar.me challenge api started 8080 port.');
    } catch (error: any) {
      console.error(error?.message);
    }
  });
}

bootstrap();
