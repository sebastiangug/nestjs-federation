import {
  INestApplication,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { AuthServiceAppModule } from './app/auth-service.app.module';


const getApp = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AuthServiceAppModule);

  app.setGlobalPrefix('/apis/auth-service');
  app.use('/apis/auth-service/health', (req: Request, res: Response) => {
    return res.status(200).send();
  });

  return app;
};

async function bootstrap(): Promise<void> {
  const app = await getApp();
  await app.listen(process.env.PORT ?? 3100);
}

bootstrap();
