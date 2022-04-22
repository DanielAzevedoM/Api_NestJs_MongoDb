import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdressController } from 'src/controllers/adress/adress.controller';
import { AdressService } from 'src/services/adress/adress.service';
import { Adress, AdressSchema } from 'src/models/adress/adress.entity';
import { Person, PersonSchema } from 'src/models/person/person.entity';
import { User, UserSchema } from 'src/models/user/user.entity';




@Module({
    imports: [MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Person.name, schema: PersonSchema },
      { name: Adress.name, schema: AdressSchema }
    ])],
    controllers: [AdressController],
    providers: [AdressService],
    
  })
  export class AdressModule {}