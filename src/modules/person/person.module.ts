import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonController } from 'src/controllers/person/person.controller';
import { PersonService } from 'src/services/person/person.service';
import { User, UserSchema } from 'src/models/user/user.entity';
import { Person, PersonSchema } from 'src/models/person/person.entity';



@Module({
    imports: [MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Person.name, schema: PersonSchema },
    ])],
    controllers: [PersonController],
    providers: [PersonService],
    
  })
  export class PersonModule {}