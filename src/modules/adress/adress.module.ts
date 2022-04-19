import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdressController } from 'src/controllers/adress/adress.controller';
import { AdressService } from 'src/services/adress/adress.service';
import { Adress } from 'src/models/adress/adress.entity';
import { Person } from 'src/models/person/person.entity';
import { User } from 'src/models/user/user.entity';




@Module({
    imports: [TypeOrmModule.forFeature([User, Person, Adress])],
    controllers: [AdressController],
    providers: [AdressService],
    
  })
  export class AdressModule {}