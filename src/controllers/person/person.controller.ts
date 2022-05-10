import { Body, Controller, Delete,Get,Param, Patch, Post, Put, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { filter } from 'src/config/multer/multer.config';
import { CreatePersonDto, UpdatePersonDto } from 'src/dtos/person/person.dto';
import { PersonService } from 'src/services/person/person.service';


@Controller('user/person')
export class PersonController {

    constructor( private readonly personService: PersonService ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Body() createPersonDto: CreatePersonDto){
        await this.personService.remove(req.user.personId);

        const person = await this.personService.create(createPersonDto);
        
        const personUpdated = await this.personService.updateFk(req.user.id, person);

        return personUpdated;
          
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findOne(@Req() req) {
        return this.personService.findOne(req.user.personId);
    }

    @UseGuards(JwtAuthGuard)
    @Post('location')
    findByCityOrState(@Param() params) {
        return this.personService.findByCityOrState(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Req() req, @Body() updatePersonDto: UpdatePersonDto) {
       return this.personService.update(req.user.personId, updatePersonDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete()   
    remove(@Req() req) {
        return this.personService.remove(req.user.personId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @UseInterceptors(FileInterceptor('image', {...filter}),
    )
    uploadFile(@Req() req,@UploadedFile() file: Express.Multer.File) {

        return this.personService.updateSelfie(req.user.personId , file.path)   
    }
}


