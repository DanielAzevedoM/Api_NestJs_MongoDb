import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/models/person/person.entity';
import { PersonController } from 'src/controllers/person/person.controller';
import { PersonService } from 'src/services/person/person.service';
import { User } from 'src/models/user/user.entity';



@Module({
    imports: [TypeOrmModule.forFeature([User, Person])],
    controllers: [PersonController],
    providers: [PersonService],
    
  })
  export class PersonModule {}