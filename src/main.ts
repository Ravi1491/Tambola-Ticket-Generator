import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { applicationConfig } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(morgan('combined'));
  await app.listen(applicationConfig.app.port, '0.0.0.0');

  console.log(`Application is running on: ${applicationConfig.app.port}`);
}
bootstrap();
