import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/config/auth/jwt-auth.guard";
import { AdressDto } from "src/dtos/adress.dto";
import { Adress } from "src/interfaces/adress.interface";
import { AdressService } from "src/services/adress.service";

@Controller('person/adress')
export class AdressController {
    constructor(private readonly adressService: AdressService ){}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    create(@Body() adress: AdressDto, @Req() req){
        return this.adressService.create(adress, req.user.personId)
    }

    @UseGuards(JwtAuthGuard)
    @Get('data')
    find(@Req() req){
        return this.adressService.findAll(req.user.personId)
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    update(@Body() adress: Adress, @Param() param){
        return this.adressService.update(param.id, adress)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delete(@Param() params){
        return this.adressService.delete(params.id)
    }
 
  
}