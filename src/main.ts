import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cookieSession = require("cookie-session")

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.use(cookieSession({
    keys: ["sjsjsdjsfj"]
  }))

  await app.listen(3000);
}
bootstrap();
