import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { verifyEmailExistsConstraint } from 'src/validators/user/verifyEmailExists.validator';
import { User, UserSchema } from '../../models/user/user.entity';





@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]) ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]

    
  })
  export class UserModule {}