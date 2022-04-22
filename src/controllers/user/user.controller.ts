import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from 'src/dtos/user/user.dto';
import { UpdateUserDto } from 'src/dtos/user/user.update.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor( private readonly userService: UserService ){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Get()
    async findAll(){
      return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
     findOne(@Param() params) {
        return this.userService.findOne(params.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param() params, @Body() updateUserDto: UpdateUserDto) {
       return this.userService.update(params.id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param() params) {
        return this.userService.remove(params.id);
    }
}
