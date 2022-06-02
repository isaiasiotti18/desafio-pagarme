import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import routes from 'infra/http/routes';

function bootstrap() {
  const app = express();

  app.use(express.json());

  app.use('/api/v1', routes);

  app.use(morgan('short'));

  app.listen(8080, () => {
    try {
      console.log('Pagar.me challenge api started 8080 port.');
    } catch (error: any) {
      console.error(error?.message);
    }
  });
}

bootstrap();
