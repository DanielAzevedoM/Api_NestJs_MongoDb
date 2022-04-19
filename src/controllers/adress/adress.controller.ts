import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAdressDto } from 'src/dtos/adress/adress.dto';
import { UpdateAdressDto } from 'src/dtos/adress/adress.update.dto';
import { AdressService } from 'src/services/adress/adress.service';

@Controller('user/:userId/person/:personId/adress/')
export class AdressController {

  constructor( private readonly adressService: AdressService ){}

    @Post()
    async create(@Param() params,@Body() createAdressDto: CreateAdressDto){


        const adress = await this.adressService.create(params, createAdressDto);

        const adressUpdated =  await this.adressService.updateFk(params, adress);

        return adressUpdated;
    }

    @Get()
    findAll(@Param() params) {
        return this.adressService.findAll(params);
    }

    @Get(':id')
    findOne(@Param() params) {
        return this.adressService.findOne(params);
    }

    @Put(':id')
    update(@Param() params, @Body() updateAdressDto: UpdateAdressDto) {
       return this.adressService.update(params, updateAdressDto);
    }

    @Delete(':id')
    remove(@Param() params) {
        return this.adressService.remove(params);
    }

}
