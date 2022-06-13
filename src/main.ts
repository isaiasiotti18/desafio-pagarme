import 'reflect-metadata';
import 'express-async-errors';
import logger from 'config/logger';
import app from './app';

function bootstrap() {
  app.listen(process.env.PORT, () => {
    try {
      logger.info(`Pagar.me challenge api started ${process.env.PORT} port.`);
    } catch (error: any) {
      logger.error(error?.message);
    }
  });
}

bootstrap();
