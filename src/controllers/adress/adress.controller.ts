import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateAdressDto } from 'src/dtos/adress/adress.dto';
import { UpdateAdressDto } from 'src/dtos/adress/adress.update.dto';
import { AdressService } from 'src/services/adress/adress.service';

@Controller('user/person/:personId/adress')
export class AdressController {

  constructor( private readonly adressService: AdressService ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Param() params,@Body() createAdressDto: CreateAdressDto){
        const adress = await this.adressService.create(params, createAdressDto);

        const adressUpdated =  await this.adressService.updateFk(params, adress);

        return adressUpdated;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Param() params) {
        return this.adressService.findAll(params);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param() params) {
        return this.adressService.findOne(params);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param() params, @Body() updateAdressDto: UpdateAdressDto) {
       return this.adressService.update(params, updateAdressDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param() params) {
        return this.adressService.remove(params);
    }

}
