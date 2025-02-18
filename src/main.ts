import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.use(cookieParser());

  await app.listen(8081);
}
bootstrap();
