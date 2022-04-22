import { Body, Controller, Delete,Get,Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePersonDto } from 'src/dtos/person/person.dto';
import { UpdatePersonDto } from 'src/dtos/person/person.update.dto';
import { PersonService } from 'src/services/person/person.service';


@Controller('user/:userId/person')
export class PersonController {

    constructor( private readonly personService: PersonService ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Param() param,@Body() createPersonDto: CreatePersonDto){

        await this.personService.remove(param);

        const person = await this.personService.create(param, createPersonDto);

       
        const personUpdated = await this.personService.updateFk(param, person);

        return personUpdated;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findOne(@Param() params) {
        return this.personService.findOne(params);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Param() params, @Body() UpdatePersonDto: UpdatePersonDto) {
       return this.personService.update(params, UpdatePersonDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    remove(@Param() params) {

        return this.personService.remove(params);
    }
}
