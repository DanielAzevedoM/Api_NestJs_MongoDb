import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonController } from 'src/controllers/person.controller';
import { Adress, AdressSchema } from 'src/models/adress.model';
import { Person, PersonSchema } from 'src/models/person.model';
import { User, UserSchema } from 'src/models/user.model';
import { PersonService } from 'src/services/person.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Person.name, schema: PersonSchema}, 
        { name: Adress.name, schema: AdressSchema}]),
        ],
    controllers: [PersonController],
    providers: [PersonService],
})

export class PersonModule {}
