import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/user.dto';
import { UpdateUserDto } from 'src/dtos/user/user.update.dto';
import { UserService } from 'src/services/user/user.service';
import { User } from '../../interfaces/user/user.interface';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        return this.userService.create(createUserDto)
    }

    @Get()
    async findAll(){
      return this.userService.findAll();
    }

    @Get(':id')
     findOne(@Param() params) {
        return this.userService.findOne(params.id);
    }

    @Put(':id')
    update(@Param() params, @Body() updateUserDto: UpdateUserDto) {
       return this.userService.update(params.id, updateUserDto);
    }


    @Delete(':id')
    remove(@Param() params) {
        return this.userService.remove(params.id);
    }
}
