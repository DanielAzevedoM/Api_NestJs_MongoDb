import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { HtppExceptionFilter } from './common/filters/htpp-exception-filter';
import { AuthModule } from './modules/auth/auth.module';
import { AdressModule } from './modules/adress/adress.module';
import { PersonModule } from './modules/person/person.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';



@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/kunlatek',
      }),
    }),

    MulterModule.register({
      dest: './upload',
      
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
