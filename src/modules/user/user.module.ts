import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { verifyEmailExistsConstraint } from 'src/validators/user/verifyEmailExists.validator';
import { User } from '../../models/user/user.entity';
import { Person } from 'src/models/person/person.entity';



@Module({
    imports: [TypeOrmModule.forFeature([User, Person])],
    controllers: [UserController],
    providers: [UserService, verifyEmailExistsConstraint],
    exports: []

    
  })
  export class UserModule {}