import { Body, Controller, Delete,Get,Param, Post, Put } from '@nestjs/common';
import { CreatePersonDto } from 'src/dtos/person/person.dto';
import { UpdatePersonDto } from 'src/dtos/person/person.update.dto';
import { PersonService } from 'src/services/person/person.service';


@Controller('user/:userId/person')
export class PersonController {

    constructor( private readonly personService: PersonService ){}

    @Post()
    async create(@Param() param,@Body() createPersonDto: CreatePersonDto){

        await this.personService.remove(param);

        const person = await this.personService.create(param, createPersonDto);
     
        const personUpdated = await this.personService.updateFk(param, person);

        return personUpdated;
    }

    @Get()
    findOne(@Param() params) {
        return this.personService.findOne(params);
    }

    @Put()
    update(@Param() params, @Body() UpdatePersonDto: UpdatePersonDto) {
       return this.personService.update(params, UpdatePersonDto);
    }


    @Delete()
    remove(@Param() params) {
        return this.personService.remove(params);
    }
}
