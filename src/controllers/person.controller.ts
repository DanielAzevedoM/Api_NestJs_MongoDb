import { Body, Controller, Delete, Get, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express/multer";
import { JwtAuthGuard } from "src/config/auth/jwt-auth.guard";
import { personUpload } from "src/config/multer";
import { PersonDto } from "src/dtos/person.dto";
import { Person } from "src/interfaces/person.interface";
import { PersonService } from "src/services/person.service";


@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService ){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() person: PersonDto, @Req() req){
        await this.personService.delete(req.user.personId)

        const createPerson = await this.personService.create(person);

        await this.personService.updateFk(req.user.userId, createPerson);

        return createPerson;
    }

    @UseGuards(JwtAuthGuard)
    @Get('data')
    findOne(@Req() req){
        return this.personService.findOne(req.user.personId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('data/location')
    findByLocation(@Req() req, @Body() body:{city: string, state: string}){
        return this.personService.findByLocation(req.user.personId, body)
    }


    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    delete(@Req() req){
        return this.personService.delete(req.user.personId)
    } 

    @UseGuards(JwtAuthGuard)
    @Put('update')
    update(@Body() person: Person, @Req() req){
        return this.personService.update(req.user.personId, person)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('upload')
    @UseInterceptors(FileInterceptor('file', {...personUpload}))
    uploadFile( @Req() req, @UploadedFile() file: Express.Multer.File) {
        return this.personService.upload(req.user.personId, file.path)
    }
}