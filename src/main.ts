import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEnv } from './shared/utils/env';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(getEnv('PORT') ?? 3000);
}
bootstrap();
