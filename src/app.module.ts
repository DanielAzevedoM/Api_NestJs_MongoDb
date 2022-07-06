import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AdressModule } from './modules/adress.module';
import { AuthModule } from './modules/auth.module';
import { PersonModule } from './modules/person.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/nestapi',
      }),
    }),
    AuthModule,
    UserModule,
    PersonModule,
    AdressModule
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule {}
