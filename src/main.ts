import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  useContainer(app.select(AppModule), {fallbackOnErrors: true} );

  await app.listen(3000);
}
bootstrap();
