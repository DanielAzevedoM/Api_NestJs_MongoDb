import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAdressDto } from 'src/dtos/adress/adress.dto';
import { UpdateAdressDto } from 'src/dtos/adress/adress.update.dto';
import { AdressService } from 'src/services/adress/adress.service';

@Controller('person/adress')
export class AdressController {

  constructor( private readonly adressService: AdressService ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Req() req, @Body() createAdressDto: CreateAdressDto){
        
        const adress = await this.adressService.create(createAdressDto);

        const adressUpdated =  await this.adressService.updateFk(req.user.personId, adress);

        return adressUpdated;

    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req) {
        return this.adressService.findAll(req.user.personId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param() params) {
        return this.adressService.findOne(params.id);
    }

  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param() params, @Body() updateAdressDto: UpdateAdressDto) {
       return this.adressService.update(params.id, updateAdressDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param() params) {
        return this.adressService.remove(params.id);
    }

}
