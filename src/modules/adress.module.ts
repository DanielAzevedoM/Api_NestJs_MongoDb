import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdressController } from 'src/controllers/adress.controller';
import { Adress, AdressSchema } from 'src/models/adress.model';
import { Person, PersonSchema } from 'src/models/person.model';
import { AdressService } from 'src/services/adress.service';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema },{ name: Adress.name, schema: AdressSchema }]),
        ],
    controllers: [AdressController],
    providers: [AdressService],
})

export class AdressModule {}
