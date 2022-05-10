import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  useContainer(app.select(AppModule), {fallbackOnErrors: true} );
  await app.listen(3000);
}
bootstrap();