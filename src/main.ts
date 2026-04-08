import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEnv } from './shared/utils/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(getEnv('PORT') ?? 3000);
}
bootstrap();
