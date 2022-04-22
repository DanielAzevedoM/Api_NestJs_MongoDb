import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { HtppExceptionFilter } from './common/filters/htpp-exception-filter';
import { AuthModule } from './modules/auth/auth.module';
import { AdressModule } from './modules/adress/adress.module';
import { PersonModule } from './modules/person/person.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/kunlatek',
      }),
    }),
    UserModule, 
    AdressModule,
    PersonModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HtppExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
  ],
})
export class AppModule {}
