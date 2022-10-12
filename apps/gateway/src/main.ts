import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Request, Response } from 'express';
import { GatewayAppModule } from './app/gateway.app.module';

const getApp = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(GatewayAppModule);

  app.setGlobalPrefix('/apis/auth-service');
  app.use('/apis/auth-service/health', (req: Request, res: Response) => {
    return res.status(200).send();
  });

  return app;
};

async function bootstrap(): Promise<void> {
  const app = await getApp();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
